import api from './api';

/**
 * Register Manufacturer profile (Role: MANUFACTURER)
 * @param {{ factoryname: string, location: string, moq: number, capabilitiesData?: object }} profileData
 */
export const registerManufacturer = async (profileData) => {
  const response = await api.post('/api/Marketplace/register', profileData);
  return response.data;
};

/**
 * Get All Manufacturers (Role: BRAND)
 * GET /api/Marketplace/getall
 */
export const getAllManufacturers = async () => {
  const response = await api.get('/api/Marketplace/getall');
  return response.data;
};

/**
 * Search Manufacturers (Role: BRAND required by backend @PreAuthorize)
 * GET /api/Marketplace/search or GET /api/Marketplace/getall if no filters provided
 * @param {{ location?: string, maxMoq?: number, certifications?: string }} searchFilter
 */
export const searchManufacturers = async (searchFilter = {}) => {
  const payload = {};
  if (searchFilter.location) payload.location = searchFilter.location;
  if (searchFilter.maxMoq) payload.maxMoq = searchFilter.maxMoq;
  if (searchFilter.certifications) payload.certifications = searchFilter.certifications;

  const hasFilters = Object.keys(payload).length > 0;

  if (!hasFilters) {
    return getAllManufacturers();
  }

  try {
    const response = await api.post('/api/Marketplace/search', payload);
    return response.data;
  } catch {
    // Fallback to getAll if search fails
    return getAllManufacturers();
  }
};

export default {
  registerManufacturer,
  getAllManufacturers,
  searchManufacturers,
};
