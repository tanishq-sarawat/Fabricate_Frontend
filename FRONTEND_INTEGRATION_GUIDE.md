# Fabricate Backend - Frontend Integration Guide

This document provides a comprehensive overview of the **Fabricate Backend** API architecture, authentication, endpoints, data contracts, and integration instructions tailored for a separate Frontend application (e.g. Next.js, React, Vue, Vite).

---

## 1. System Architecture & Base Specs

- **Base URL**: `http://localhost:8080`
- **Allowed Frontend Origin (CORS)**: `http://localhost:3000` (credentials enabled)
- **Content-Type**: `application/json`
- **Authentication**: Stateless JWT (JSON Web Tokens) sent in the HTTP `Authorization` header.

---

## 2. Authentication & Authorization

### Header Format
All protected endpoints require an HTTP `Authorization` header containing the JWT token received during login or registration:

```http
Authorization: Bearer <YOUR_JWT_TOKEN>
```

### User Roles
The system supports two user roles defined in the `Role` enum:
1. `BRAND`: Brands/Clients who publish RFQs (Request for Quotes), view their RFQs, and review/accept/decline manufacturer quotes.
2. `MANUFACTURER`: Manufacturers/Suppliers who register factory profiles, search marketplace suppliers, and submit quotes on RFQs.

---

## 3. Data Models & TypeScript Types

For frontend developers building with TypeScript, here are the exact TypeScript interfaces matching the backend entities and DTOs:

```typescript
// Enums
export type Role = 'BRAND' | 'MANUFACTURER';
export type RfqStatus = 'OPEN' | 'CLOSED' | 'COMPLETED';
export type QuoteStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED';

// Identity (User)
export interface Identity {
  id?: number;
  email: string;
  role: Role;
}

// Authentication DTOs
export interface AuthRequest {
  email: string;
  password?: string;
  role?: Role;
}

export interface AuthResponse {
  token: string;
  email: string;
  role: Role;
}

// Manufacturer Profile
export interface Manufacturer {
  id?: number;
  factoryname: string;
  location: string;
  moq: number;
  capabilitiesData?: Record<string, any>;
  identity?: Identity;
}

// Search DTO
export interface ManufacturerSearchRequest {
  location?: string;
  maxMoq?: number;
  certifications?: string;
}

// Quote Entity
export interface Quote {
  id?: number;
  PriceperUnit: number;
  TermsAndConditions: string;
  quoteStatus?: QuoteStatus;
  manufacturer?: Manufacturer;
}

// RFQ Entity
export interface RFQ {
  id?: number;
  Title: string;
  Description: string;
  targetQuantity: number;
  productCategory: string;
  status?: RfqStatus;
  quote?: Quote[];
  Brand?: Identity;
}
```

---

## 4. API Endpoints Reference

### 4.1 Authentication Module (`/api/auth`)

#### 1. Register User
- **Endpoint**: `POST /api/auth/register`
- **Access**: Public
- **Request Body**:
```json
{
  "email": "brand@example.com",
  "password": "SecurePassword123!",
  "role": "BRAND"
}
```
> Note: `role` can be `"BRAND"` or `"MANUFACTURER"`.

- **Response (`200 OK`)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "email": "brand@example.com",
  "role": "BRAND"
}
```

#### 2. Login User
- **Endpoint**: `POST /api/auth/login`
- **Access**: Public
- **Request Body**:
```json
{
  "email": "brand@example.com",
  "password": "SecurePassword123!"
}
```
- **Response (`200 OK`)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "email": "brand@example.com",
  "role": "BRAND"
}
```

---

### 4.2 Marketplace Module (`/api/Marketplace`)

#### 1. Register Manufacturer Profile
- **Endpoint**: `POST /api/Marketplace/register`
- **Access**: Protected (`MANUFACTURER` role required)
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Request Body**:
```json
{
  "factoryname": "Apex Precision Tech",
  "location": "California, USA",
  "moq": 100,
  "capabilitiesData": {
    "certifications": ["ISO9001"],
    "processes": ["CNC Milling", "Laser Cutting"]
  }
}
```
- **Response (`200 OK`)**: `Manufacturer` object.

#### 2. Search Manufacturers
- **Endpoint**: `POST /api/Marketplace/search`
- **Access**: Protected (`MANUFACTURER` role required)
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Request Body**:
```json
{
  "location": "California",
  "maxMoq": 500,
  "certifications": "ISO9001"
}
```
- **Response (`200 OK`)**: Array of `Manufacturer` objects (`Manufacturer[]`).

---

### 4.3 Sourcing Module (`/api/Sourcing`)

#### 1. Create RFQ (Request for Quote)
- **Endpoint**: `POST /api/Sourcing/create/Rfq`
- **Access**: Protected (`BRAND` role required)
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Request Body**:
```json
{
  "Title": "Custom Aluminum Enclosures",
  "Description": "Anodized aluminum 6061 enclosures, tolerance +/- 0.05mm",
  "targetQuantity": 500,
  "productCategory": "Electronics Enclosures",
  "status": "OPEN"
}
```
- **Response (`200 OK`)**: Created `RFQ` object.

#### 2. Get Brand's RFQs
- **Endpoint**: `GET /api/Sourcing/allRfq`
- **Access**: Protected (`BRAND` role required)
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Response (`200 OK`)**: List of `RFQ` objects associated with the authenticated Brand user.

#### 3. Get All RFQs
- **Endpoint**: `GET /api/Sourcing/get_all`
- **Access**: Protected (`BRAND` role required)
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Response (`200 OK`)**: List of all `RFQ` objects.

#### 4. Submit Quote for an RFQ
- **Endpoint**: `POST /api/Sourcing/quote/{rfqId}`
- **Access**: Protected (`MANUFACTURER` role required)
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Path Parameter**: `rfqId` (e.g. `/api/Sourcing/quote/1`)
- **Request Body**:
```json
{
  "PriceperUnit": 24.50,
  "TermsAndConditions": "Payment 50% advance, 50% on delivery. Lead time 10 days.",
  "quoteStatus": "PENDING"
}
```
- **Response (`200 OK`)**: Created `Quote` object.

#### 5. Update Quote Status (Accept / Decline)
- **Endpoint**: `PUT /api/Sourcing/status/{quoteId}?status={ACCEPTED|DECLINED}`
- **Access**: Protected (`BRAND` role required)
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Path Parameter**: `quoteId` (e.g. `/api/Sourcing/status/12`)
- **Query Parameter**: `status` (`ACCEPTED` or `DECLINED`)
- **Response (`200 OK`)**: Updated `Quote` object.

---

## 5. Sample Frontend Integration Code

### Axios Client Setup (React / Next.js)

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request Interceptor: Attach JWT Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Authentication Example

```typescript
import api from './api';
import { AuthRequest, AuthResponse } from './types';

// Login User
export const loginUser = async (credentials: AuthRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/api/auth/login', credentials);
  const { token, role } = response.data;
  localStorage.setItem('token', token);
  localStorage.setItem('userRole', role);
  return response.data;
};

// Create RFQ (Brand)
export const createRfq = async (rfqData: { Title: string; Description: string; targetQuantity: number; productCategory: string }) => {
  const response = await api.post('/api/Sourcing/create/Rfq', rfqData);
  return response.data;
};
```

---

## 6. Error Handling Notes

- **401 Unauthorized**: Missing, expired, or invalid JWT token. Redirect user to `/login`.
- **403 Forbidden**: Authenticated user role does not have permission for the requested endpoint (e.g. a `MANUFACTURER` attempting to create an RFQ or a `BRAND` attempting to submit a quote).
- **400 Bad Request**: Missing required parameters or invalid argument payloads.
