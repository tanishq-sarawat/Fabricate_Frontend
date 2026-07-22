import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle2, Clock, ChevronDown, ChevronUp, Plus, RefreshCw, XCircle, DollarSign, Check, X, Send, Tag } from 'lucide-react';
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
        // Manufacturer Dashboard: GET /api/Sourcing/get_all & GET /api/Sourcing/getallQuoteOnRFQ
        const [allRfqsData, myQuotesData] = await Promise.allSettled([
          getAllRfqs(), // GET /api/Sourcing/get_all
          getManufacturerQuotes(), // GET /api/Sourcing/getallQuoteOnRFQ
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
        // Brand Dashboard: GET /api/Sourcing/allRfq
        const data = await getBrandRfqs(); // GET /api/Sourcing/allRfq
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
        quoteStatus: 'PENDING',
      });
      setActionSuccess(`Quote submitted successfully for ${quoteModalRfq.Title || 'RFQ'}!`);
      setQuoteModalRfq(null);
      setTimeout(() => setActionSuccess(''), 3000);
      fetchRfqs();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to submit quote');
    } finally {
      setQuoteLoading(false);
    }
  };

  // Brand: Update Quote Status Handler (Accept / Decline)
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-50 border border-emerald-200 text-emerald-800">
            <CheckCircle2 size={13} /> Completed
          </span>
        );
      case 'CLOSED':
      case 'DECLINED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold bg-rose-50 border border-rose-200 text-rose-800">
            <XCircle size={13} /> Closed
          </span>
        );
      case 'OPEN':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold bg-amber-50 border border-amber-200 text-amber-800">
            <Clock size={13} /> Open for Bids
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 font-sans max-w-6xl mx-auto">
      {/* BRAND ONLY Header */}
      {isBrand && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Brand RFQ Console
            </h1>
            <p className="text-slate-500 text-xs mt-1">
              Create RFQs, view specifications (`/api/Sourcing/allRfq`), and manage quote statuses.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="secondary" size="md" onClick={fetchRfqs} disabled={loading} className="flex items-center gap-1.5">
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </Button>

            <Button variant="amber" size="md" onClick={() => setIsFormOpen(true)} className="flex items-center gap-1.5 shadow-sm">
              <Plus size={16} />
              <span>Create New RFQ</span>
            </Button>
          </div>
        </div>
      )}

      {/* Notifications */}
      {actionSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <Check size={16} className="text-emerald-600" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
          <X size={16} className="text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* MANUFACTURER DEDICATED SECTION: My Submitted Quotes (Calls /getallQuoteOnRFQ) */}
      {isManufacturer && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                <Tag size={16} />
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
                  My Submitted Production Bids
                </h2>
                <p className="text-[11px] text-slate-500 font-medium">
                  Quotes submitted by your manufacturer account on open RFQs (`/api/Sourcing/getallQuoteOnRFQ`)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="secondary" size="sm" onClick={fetchRfqs} disabled={loading} className="flex items-center gap-1.5">
                <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
                <span>Refresh</span>
              </Button>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-700 border border-slate-200">
                {myQuotes.length} Submitted Bids
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
                {myQuotes.filter((q) => q.quoteStatus === 'ACCEPTED').length} Accepted
              </span>
            </div>
          </div>

          {myQuotes.length === 0 ? (
            <div className="p-6 bg-slate-50/70 rounded-xl border border-slate-200/80 text-center space-y-2">
              <Tag size={28} className="mx-auto text-slate-300" />
              <p className="text-xs font-bold text-slate-700">No quotes submitted yet.</p>
              <p className="text-[11px] text-slate-500 max-w-md mx-auto">
                Browse open RFQ requests below and click <strong>"Create Quote"</strong> to submit your pricing and production terms.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myQuotes.map((q) => (
                <div key={q.id || q.PriceperUnit} className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-400">#Quote-{q.id || 'N/A'}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      q.quoteStatus === 'ACCEPTED'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : q.quoteStatus === 'DECLINED'
                        ? 'bg-rose-50 text-rose-800 border border-rose-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {q.quoteStatus || 'PENDING'}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1.5">
                    <span className="font-extrabold text-slate-900 text-base">${q.PriceperUnit}</span>
                    <span className="text-[11px] text-slate-500">/ unit target</span>
                  </div>

                  <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2 bg-white p-2.5 rounded-lg border border-slate-200/80">
                    {q.TermsAndConditions || 'No additional terms provided.'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* RFQS LIST */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            {isManufacturer ? `Open Sourcing Projects (${rfqs.length})` : `My Brand RFQs (${rfqs.length})`}
          </h2>
          <span className="text-xs text-slate-500 font-medium">Click any RFQ to expand details</span>
        </div>

        {loading ? (
          <div className="py-16 text-center text-slate-500 text-sm">
            <RefreshCw size={24} className="animate-spin text-amber-500 mx-auto mb-2" />
            <span>Loading RFQs...</span>
          </div>
        ) : rfqs.length === 0 ? (
          <div className="py-16 text-center text-slate-500 space-y-3">
            <FileText size={40} className="mx-auto text-slate-300" />
            <p className="font-bold text-slate-800 text-sm">No RFQs available.</p>
            {isBrand && (
              <Button variant="amber" size="sm" onClick={() => setIsFormOpen(true)}>
                Create First RFQ
              </Button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {rfqs.map((rfq) => {
              const quotes = rfq.quote || [];
              const isExpanded = expandedRfqId === rfq.id;

              return (
                <div key={rfq.id || rfq.Title} className="transition-colors">
                  <div
                    className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70"
                    onClick={() => setExpandedRfqId(isExpanded ? null : rfq.id)}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0 font-bold">
                        <FileText size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-extrabold text-slate-900">{rfq.Title || rfq.title}</h3>
                          {rfq.id && <span className="text-[10px] text-slate-400 font-mono">#RFQ-{rfq.id}</span>}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                          <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[10px]">
                            {rfq.productCategory || 'General'}
                          </span>
                          <span>Qty: <strong>{rfq.targetQuantity || rfq.quantity}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
                      {getStatusBadge(rfq.status)}

                      {/* MANUFACTURER: Create Quote Button on All RFQs */}
                      {isManufacturer && (
                        <Button
                          variant="amber"
                          size="sm"
                          onClick={(e) => handleOpenQuoteModal(rfq, e)}
                          className="flex items-center gap-1.5 text-xs font-extrabold shadow-2xs"
                        >
                          <Send size={13} />
                          <span>Create Quote</span>
                        </Button>
                      )}

                      <div className="p-1 rounded-lg hover:bg-slate-200/60 text-slate-400">
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </div>
                  </div>

                  {/* EXPANDED CONTENT */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-3 bg-slate-50/50 border-t border-slate-100 space-y-4">
                      {/* Description */}
                      <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-700">
                        <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px] mb-1">Description & Specs:</span>
                        <p className="leading-relaxed">{rfq.Description || 'No description provided.'}</p>
                      </div>

                      {/* BRAND ONLY: View All Submitted Quotes for this RFQ */}
                      {isBrand && (
                        <div>
                          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                            Received Quotes
                          </h4>

                          {quotes.length === 0 ? (
                            <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-500 text-center italic">
                              No quotes submitted for this RFQ yet.
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {quotes.map((q) => (
                                <div
                                  key={q.id || q.PriceperUnit}
                                  className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs"
                                >
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2.5">
                                      <span className="font-extrabold text-slate-900 text-base flex items-center gap-1">
                                        <DollarSign size={15} className="text-emerald-600" />
                                        {q.PriceperUnit} <span className="text-xs text-slate-400 font-normal">/ unit</span>
                                      </span>

                                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                                        q.quoteStatus === 'ACCEPTED'
                                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                          : q.quoteStatus === 'DECLINED'
                                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                                      }`}>
                                        {q.quoteStatus || 'PENDING'}
                                      </span>
                                    </div>
                                    <p className="text-xs text-slate-600 font-medium">{q.TermsAndConditions}</p>
                                  </div>

                                  {/* Accept / Decline Buttons */}
                                  <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                                    {q.quoteStatus !== 'ACCEPTED' && (
                                      <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => handleUpdateQuoteStatus(q.id, 'ACCEPTED')}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 text-xs px-3"
                                      >
                                        Accept Quote
                                      </Button>
                                    )}

                                    {q.quoteStatus !== 'DECLINED' && (
                                      <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => handleUpdateQuoteStatus(q.id, 'DECLINED')}
                                        className="text-rose-600 hover:bg-rose-50 border-rose-200 text-xs px-3"
                                      >
                                        Decline Quote
                                      </Button>
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
          <form onSubmit={handleCreateRFQ} className="space-y-4">
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
                <label className="text-xs font-bold text-slate-600 tracking-wide uppercase">Product Category</label>
                <select 
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="glass-input px-3.5 py-2.5 text-sm w-full bg-white"
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
              <label className="text-xs font-bold text-slate-600 tracking-wide uppercase">Description & Specifications</label>
              <textarea
                className="glass-input px-3.5 py-2.5 text-sm w-full min-h-[100px] bg-white"
                placeholder="Detail your tolerances, material specs, finishing requests, and delivery timelines..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
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
            <p className="text-xs text-slate-500">
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
              <label className="text-xs font-bold text-slate-600 tracking-wide uppercase">Terms and Conditions & Lead Time</label>
              <textarea
                className="glass-input px-3.5 py-2.5 text-sm w-full min-h-[100px] bg-white"
                placeholder="Payment terms: 50% advance, 50% on delivery. Production lead time: 10 days..."
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
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
