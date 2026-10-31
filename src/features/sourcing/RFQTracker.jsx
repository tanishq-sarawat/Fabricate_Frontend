import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ChevronDown, ChevronUp, Plus, RefreshCw, DollarSign, Check, X, Send, Tag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getBrandRfqs, getAllRfqs, createRfq, submitQuote, updateQuoteStatus, getManufacturerQuotes } from '../../services/sourcingService';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';

export const RFQTracker = () => {
  const { isBrand, isManufacturer, role } = useAuth();
  
  const [rfqs, setRfqs] = useState([]);
  const [myQuotes, setMyQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedRfqId, setExpandedRfqId] = useState(null);

  // 1. Create RFQ State (for BRAND)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetQuantity, setTargetQuantity] = useState('');
  const [productCategory, setProductCategory] = useState('Electronics Enclosures');
  const [createLoading, setCreateLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  // 2. Submit Quote State (for MANUFACTURER)
  const [quoteModalRfq, setQuoteModalRfq] = useState(null);
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [terms, setTerms] = useState('');
  const [quoteLoading, setQuoteLoading] = useState(false);

  // Fetch RFQs and Manufacturer Quotes based on user role
  const fetchRfqs = async () => {
    setLoading(true);
    setError('');
    try {
      if (isManufacturer) {
        const [allRfqsData, myQuotesData] = await Promise.allSettled([
          getAllRfqs(),
          getManufacturerQuotes(),
        ]);

        if (allRfqsData.status === 'fulfilled') {
          setRfqs(Array.isArray(allRfqsData.value) ? allRfqsData.value : []);
        } else {
          setError(allRfqsData.reason?.response?.data?.message || 'Failed to fetch open RFQs');
        }

        if (myQuotesData.status === 'fulfilled') {
          setMyQuotes(Array.isArray(myQuotesData.value) ? myQuotesData.value : []);
        }
      } else {
        const data = await getBrandRfqs();
        setRfqs(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch RFQs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRfqs();
  }, [role]);

  // Brand: Create RFQ Handler
  const handleCreateRFQ = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    setError('');
    setActionSuccess('');
    try {
      await createRfq({
        Title: title,
        Description: description,
        targetQuantity: parseInt(targetQuantity, 10) || 1,
        productCategory,
        status: 'OPEN',
      });
      setTitle('');
      setDescription('');
      setTargetQuantity('');
      setIsFormOpen(false);
      setActionSuccess('RFQ created successfully!');
      setTimeout(() => setActionSuccess(''), 3000);
      fetchRfqs();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create RFQ');
    } finally {
      setCreateLoading(false);
    }
  };

  // Manufacturer: Submit/Create Quote Handler
  const handleOpenQuoteModal = (rfq, e) => {
    if (e) e.stopPropagation();
    setQuoteModalRfq(rfq);
    setPricePerUnit('');
    setTerms('');
    setError('');
  };

  const handleSubmitQuote = async (e) => {
    e.preventDefault();
    if (!quoteModalRfq) return;
    setQuoteLoading(true);
    setError('');
    setActionSuccess('');
    try {
      await submitQuote(quoteModalRfq.id, {
        PriceperUnit: parseFloat(pricePerUnit),
        TermsAndConditions: terms,
      });
      setQuoteModalRfq(null);
      setActionSuccess('Quote submitted successfully to brand!');
      setTimeout(() => setActionSuccess(''), 3000);
      fetchRfqs();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to submit quote');
    } finally {
      setQuoteLoading(false);
    }
  };

  // Brand: Accept or Decline Quote Handler
  const handleUpdateQuoteStatus = async (quoteId, newStatus) => {
    setError('');
    setActionSuccess('');
    try {
      await updateQuoteStatus(quoteId, newStatus);
      setActionSuccess(`Quote status updated to ${newStatus}`);
      setTimeout(() => setActionSuccess(''), 3000);
      fetchRfqs();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update quote status');
    }
  };

  const getStatusBadge = (status) => {
    const s = status || 'OPEN';
    switch (s) {
      case 'COMPLETED':
      case 'ACCEPTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f8f8f7] border border-[#e8e8e5] text-[#111111]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span>Completed</span>
          </span>
        );
      case 'CLOSED':
      case 'DECLINED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 border border-rose-200 text-rose-800">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
            <span>Closed</span>
          </span>
        );
      case 'OPEN':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#fef9c3] border border-[#fef08a] text-[#854d0e]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f5cb39]" />
            <span>Open for Bids</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 font-sans max-w-6xl mx-auto">
      {/* BRAND ONLY Header */}
      {isBrand && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#e8e8e5]">
          <div>
            <h1 className="text-2xl font-light text-[#111111] tracking-tight">
              Brand RFQ Console
            </h1>
            <p className="text-[#888880] text-xs font-normal mt-1">
              Create RFQs, review incoming manufacturer bids, and manage production contracts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={fetchRfqs} disabled={loading} className="btn-keychain-secondary text-xs py-2 px-3.5 cursor-pointer gap-1.5 disabled:opacity-50">
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>

            <button onClick={() => setIsFormOpen(true)} className="btn-keychain-primary text-xs py-2 px-4 cursor-pointer gap-1.5">
              <Plus size={15} />
              <span>Create New RFQ</span>
            </button>
          </div>
        </div>
      )}

      {/* Notifications */}
      {actionSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
          <Check size={15} className="text-emerald-600" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <X size={15} className="text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
          {isManufacturer && (
            <Link
              to="/app/register-facility"
              className="underline font-bold text-rose-900 hover:text-black shrink-0"
            >
              Register Facility Profile →
            </Link>
          )}
        </div>
      )}

      {/* MANUFACTURER DEDICATED SECTION: My Submitted Quotes */}
      {isManufacturer && (
        <div className="keychain-card p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e8e8e5]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#fef9c3] border border-[#fef08a] flex items-center justify-center text-[#854d0e]">
                <Tag size={16} />
              </div>
              <div>
                <h2 className="text-sm font-medium text-[#111111] tracking-tight">
                  My Submitted Production Bids
                </h2>
                <p className="text-xs text-[#888880] font-normal">
                  Quotes submitted by your facility on active production requests
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="secondary" size="sm" onClick={fetchRfqs} disabled={loading} className="flex items-center gap-1.5">
                <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
                <span>Refresh</span>
              </Button>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-[#f8f8f7] text-[#111111] border border-[#e8e8e5]">
                {myQuotes.length} Submitted Bids
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                {myQuotes.filter((q) => q.quoteStatus === 'ACCEPTED').length} Accepted
              </span>
            </div>
          </div>

          {myQuotes.length === 0 ? (
            <div className="p-6 bg-[#fbfbfa] rounded-xl border border-[#e8e8e5] text-center space-y-2">
              <Tag size={26} className="mx-auto text-stone-300" />
              <p className="text-xs font-medium text-[#111111]">No quotes submitted yet.</p>
              <p className="text-[11px] text-[#888880] font-normal max-w-md mx-auto">
                Browse open RFQ requests below and click <strong>"Create Quote"</strong> to submit your pricing and production terms.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myQuotes.map((q) => (
                <div key={q.id || q.PriceperUnit} className="bg-[#f8f8f7] p-4 rounded-xl border border-[#e8e8e5] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#888880]">#Quote-{q.id || 'N/A'}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase ${
                      q.quoteStatus === 'ACCEPTED'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : q.quoteStatus === 'DECLINED'
                        ? 'bg-rose-50 text-rose-800 border border-rose-200'
                        : 'bg-[#fef9c3] text-[#854d0e] border border-[#fef08a]'
                    }`}>
                      {q.quoteStatus || 'PENDING'}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1.5">
                    <span className="font-light text-[#111111] text-base">${q.PriceperUnit}</span>
                    <span className="text-[11px] text-[#888880] font-normal">/ unit target</span>
                  </div>

                  <p className="text-[#666660] text-[11px] font-normal leading-relaxed line-clamp-2 bg-white p-2.5 rounded-lg border border-[#e8e8e5]">
                    {q.TermsAndConditions || 'No additional terms provided.'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* RFQS LIST */}
      <div className="bg-white rounded-2xl border border-[#e8e8e5] shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e8e8e5] bg-[#fbfbfa] flex items-center justify-between">
          <h2 className="text-xs font-medium text-[#888880] uppercase tracking-wider">
            {isManufacturer ? `Open Sourcing Projects (${rfqs.length})` : `My Brand RFQs (${rfqs.length})`}
          </h2>
          <span className="text-xs text-[#888880] font-normal">Click any RFQ to expand details</span>
        </div>

        {loading ? (
          <div className="py-16 text-center text-[#888880] text-sm">
            <RefreshCw size={24} className="animate-spin text-[#f5cb39] mx-auto mb-2" />
            <span>Loading RFQs...</span>
          </div>
        ) : rfqs.length === 0 ? (
          <div className="py-14 px-6 text-center max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#fef9c3] border border-[#fef08a] text-[#854d0e] flex items-center justify-center mx-auto shadow-2xs">
              <FileText size={26} />
            </div>
            <div>
              <h3 className="font-light text-[#111111] text-base">No RFQs Available</h3>
              <p className="text-xs text-[#888880] font-normal mt-1 leading-relaxed">
                {isBrand 
                  ? "Get started by posting your first Request for Quote. Verified manufacturers will submit bids with custom pricing and production terms."
                  : "There are currently no open RFQ projects matching your industry capabilities. Check back shortly for new buyer requests."}
              </p>
            </div>
            {isBrand && (
              <button onClick={() => setIsFormOpen(true)} className="btn-keychain-primary text-xs py-2 px-4 cursor-pointer gap-1.5">
                <Plus size={15} />
                <span>Create First RFQ</span>
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-[#e8e8e5]">
            {rfqs.map((rfq) => {
              const quotes = rfq.quote || [];
              const isExpanded = expandedRfqId === rfq.id;

              return (
                <div key={rfq.id || rfq.Title} className="transition-colors">
                  <div
                    className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-[#f6f6f3]"
                    onClick={() => setExpandedRfqId(isExpanded ? null : rfq.id)}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#f8f8f7] border border-[#e8e8e5] flex items-center justify-center text-[#111111] shrink-0 font-medium">
                        <FileText size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-medium text-[#111111]">{rfq.Title || rfq.title}</h3>
                          {rfq.id && <span className="text-xs text-[#888880] font-mono">#RFQ-{rfq.id}</span>}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#888880] mt-1">
                          <span className="font-medium text-[#111111] bg-[#f8f8f7] px-2.5 py-0.5 rounded-md border border-[#e8e8e5] text-xs">
                            {rfq.productCategory || 'General'}
                          </span>
                          <span>Target Volume: <strong className="font-medium text-[#111111]">{rfq.targetQuantity || rfq.quantity} units</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
                      {getStatusBadge(rfq.status)}

                      {/* MANUFACTURER: Create Quote Button on All RFQs */}
                      {isManufacturer && (
                        <button
                          onClick={(e) => handleOpenQuoteModal(rfq, e)}
                          className="btn-keychain-primary text-xs py-1.5 px-3 cursor-pointer gap-1.5"
                        >
                          <Send size={13} />
                          <span>Create Quote</span>
                        </button>
                      )}

                      <div className="p-1 rounded-lg hover:bg-[#f4f4f2] text-[#888880]">
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </div>
                  </div>

                  {/* EXPANDED CONTENT */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-3 bg-[#fbfbfa] border-t border-[#e8e8e5] space-y-4">
                      {/* Description */}
                      <div className="bg-white p-4 rounded-xl border border-[#e8e8e5] text-xs text-[#444444]">
                        <span className="font-medium text-[#888880] uppercase tracking-wider block text-[10px] mb-1">Description & Specs:</span>
                        <p className="leading-relaxed font-normal">{rfq.Description || 'No description provided.'}</p>
                      </div>

                      {/* BRAND ONLY: View All Submitted Quotes for this RFQ */}
                      {isBrand && (
                        <div>
                          <h4 className="text-xs font-medium text-[#888880] uppercase tracking-wider mb-2.5">
                            Received Quotes
                          </h4>

                          {quotes.length === 0 ? (
                            <div className="p-4 bg-white rounded-xl border border-[#e8e8e5] text-xs text-[#888880] text-center italic font-normal">
                              No quotes submitted for this RFQ yet.
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {quotes.map((q) => (
                                <div
                                  key={q.id || q.PriceperUnit}
                                  className="bg-white p-4 rounded-xl border border-[#e8e8e5] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs"
                                >
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2.5">
                                      <span className="font-light text-[#111111] text-base flex items-center gap-1">
                                        <DollarSign size={15} className="text-[#854d0e]" />
                                        {q.PriceperUnit} <span className="text-xs text-[#888880] font-normal">/ unit</span>
                                      </span>

                                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase ${
                                        q.quoteStatus === 'ACCEPTED'
                                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                          : q.quoteStatus === 'DECLINED'
                                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                                          : 'bg-[#fef9c3] text-[#854d0e] border border-[#fef08a]'
                                      }`}>
                                        {q.quoteStatus || 'PENDING'}
                                      </span>
                                    </div>
                                    <p className="text-xs text-[#666660] font-normal">{q.TermsAndConditions}</p>
                                  </div>

                                  {/* Accept / Decline Buttons */}
                                  <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-[#e8e8e5]">
                                    {q.quoteStatus !== 'ACCEPTED' && (
                                      <button
                                        onClick={() => handleUpdateQuoteStatus(q.id, 'ACCEPTED')}
                                        className="btn-keychain-primary text-xs py-1.5 px-3 cursor-pointer"
                                      >
                                        Accept Quote
                                      </button>
                                    )}

                                    {q.quoteStatus !== 'DECLINED' && (
                                      <button
                                        onClick={() => handleUpdateQuoteStatus(q.id, 'DECLINED')}
                                        className="btn-keychain-secondary text-xs py-1.5 px-3 cursor-pointer text-rose-600 hover:bg-rose-50 hover:border-rose-200"
                                      >
                                        Decline Quote
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* BRAND ONLY: CREATE RFQ MODAL */}
      {isBrand && (
        <Modal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          title="Create New RFQ"
        >
          <form onSubmit={handleCreateRFQ} className="space-y-4 font-sans">
            <Input 
              label="Requirement Title" 
              placeholder="e.g. Custom Aluminum Enclosures" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              id="rfq-title"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input 
                label="Target Quantity" 
                type="number"
                placeholder="500" 
                value={targetQuantity}
                onChange={(e) => setTargetQuantity(e.target.value)}
                required
                id="rfq-qty"
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#888880] tracking-wide uppercase">Product Category</label>
                <select 
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="glass-input px-3.5 py-2.5 text-sm w-full bg-white font-normal"
                >
                  <option value="Electronics Enclosures">Electronics Enclosures</option>
                  <option value="CNC Machined Parts">CNC Machined Parts</option>
                  <option value="Plastic Injection Components">Plastic Injection Components</option>
                  <option value="Sheet Metal Enclosures">Sheet Metal Enclosures</option>
                  <option value="PCB Assembly">PCB Assembly</option>
                  <option value="Food & Beverage Packaging">Food & Beverage Packaging</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#888880] tracking-wide uppercase">
                Description & Specifications <span className="text-rose-500 font-semibold">*</span>
              </label>
              <textarea
                className="glass-input px-3.5 py-2.5 text-sm w-full min-h-[100px] bg-white font-normal"
                placeholder="Detail your tolerances, material specs, finishing requests, and delivery timelines..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#e8e8e5]">
              <Button variant="secondary" size="md" onClick={() => setIsFormOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="amber" size="md" disabled={createLoading}>
                {createLoading ? 'Publishing...' : 'Create RFQ'}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* MANUFACTURER ONLY: CREATE / SUBMIT QUOTE MODAL */}
      {isManufacturer && quoteModalRfq && (
        <Modal
          isOpen={!!quoteModalRfq}
          onClose={() => setQuoteModalRfq(null)}
          title={`Create Quote for: ${quoteModalRfq.Title || 'RFQ'}`}
        >
          <form onSubmit={handleSubmitQuote} className="space-y-4 font-sans">
            <p className="text-xs text-[#888880] font-normal">
              Submit your price per unit and production lead time terms for <strong>#RFQ-{quoteModalRfq.id}</strong> (Target Qty: {quoteModalRfq.targetQuantity || quoteModalRfq.quantity}).
            </p>

            <Input
              label="Price Per Unit ($)"
              type="number"
              step="0.01"
              placeholder="24.50"
              value={pricePerUnit}
              onChange={(e) => setPricePerUnit(e.target.value)}
              required
              id="quote-price"
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#888880] tracking-wide uppercase">
                Terms and Conditions & Lead Time <span className="text-rose-500 font-semibold">*</span>
              </label>
              <textarea
                className="glass-input px-3.5 py-2.5 text-sm w-full min-h-[100px] bg-white font-normal"
                placeholder="Payment terms: 50% advance, 50% on delivery. Production lead time: 10 days..."
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#e8e8e5]">
              <Button variant="secondary" size="md" onClick={() => setQuoteModalRfq(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="amber" size="md" disabled={quoteLoading}>
                {quoteLoading ? 'Submitting...' : 'Submit Quote'}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default RFQTracker;
