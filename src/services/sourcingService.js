import api from './api';

/**
 * Create RFQ (Role: BRAND)
 * @param {{ Title: string, Description: string, targetQuantity: number, productCategory: string, status?: string }} rfqData
 */
export const createRfq = async (rfqData) => {
  const response = await api.post('/api/Sourcing/create/Rfq', rfqData);
  return response.data;
};

/**
 * Get Brand's RFQs (Role: BRAND)
 */
export const getBrandRfqs = async () => {
  const response = await api.get('/api/Sourcing/allRfq');
  return response.data;
};

/**
 * Get All RFQs
 */
export const getAllRfqs = async () => {
  const response = await api.get('/api/Sourcing/get_all');
  return response.data;
};

/**
 * Submit Quote for an RFQ (Role: MANUFACTURER)
 * @param {number|string} rfqId
 * @param {{ PriceperUnit: number, TermsAndConditions: string, quoteStatus?: string }} quoteData
 */
export const submitQuote = async (rfqId, quoteData) => {
  const response = await api.post(`/api/Sourcing/quote/${rfqId}`, quoteData);
  return response.data;
};

/**
 * Update Quote Status (Role: BRAND)
 * @param {number|string} quoteId
 * @param {'ACCEPTED'|'DECLINED'} status
 */
export const updateQuoteStatus = async (quoteId, status) => {
  const response = await api.put(`/api/Sourcing/status/${quoteId}?status=${status}`);
  return response.data;
};

/**
 * Get All Quotes submitted by the logged in Manufacturer (Role: MANUFACTURER)
 * GET /api/Sourcing/getallQuoteOnRFQ
 */
export const getManufacturerQuotes = async () => {
  const response = await api.get('/api/Sourcing/getallQuoteOnRFQ');
  return response.data;
};

export default {
  createRfq,
  getBrandRfqs,
  getAllRfqs,
  submitQuote,
  updateQuoteStatus,
  getManufacturerQuotes,
};
