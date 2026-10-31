import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Store, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Plus,
  RefreshCw,
  DollarSign,
  Building2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getBrandRfqs, getAllRfqs, getManufacturerQuotes } from '../../services/sourcingService';
import { getAllManufacturers } from '../../services/marketplaceService';

export const ConsoleDashboard = () => {
  const { user, isBrand, isManufacturer, role } = useAuth();
  const [rfqs, setRfqs] = useState([]);
  const [factories, setFactories] = useState([]);
  const [myQuotes, setMyQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      if (isManufacturer) {
        const [allRfqsData, quotesData] = await Promise.allSettled([
          getAllRfqs(),
          getManufacturerQuotes(),
        ]);
        if (allRfqsData.status === 'fulfilled') setRfqs(Array.isArray(allRfqsData.value) ? allRfqsData.value : []);
        if (quotesData.status === 'fulfilled') setMyQuotes(Array.isArray(quotesData.value) ? quotesData.value : []);
      } else {
        const [brandRfqsData, factoriesData] = await Promise.allSettled([
          getBrandRfqs(),
          getAllManufacturers(),
        ]);
        if (brandRfqsData.status === 'fulfilled') setRfqs(Array.isArray(brandRfqsData.value) ? brandRfqsData.value : []);
        if (factoriesData.status === 'fulfilled') setFactories(Array.isArray(factoriesData.value) ? factoriesData.value : []);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [role]);

  // Compute metrics
  const totalRfqs = rfqs.length;
  const openRfqs = rfqs.filter((r) => !r.status || r.status === 'OPEN').length;
  const completedRfqs = rfqs.filter((r) => r.status === 'COMPLETED' || r.status === 'ACCEPTED').length;
  
  // Total quotes in all brand RFQs
  const allReceivedQuotes = rfqs.flatMap((r) => r.quote || []);
  const acceptedQuotes = allReceivedQuotes.filter((q) => q.quoteStatus === 'ACCEPTED').length;

  return (
    <div className="space-y-8 font-sans max-w-7xl mx-auto">
      {/* Keychain Style Sleek Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#111111] border border-[#262626] p-7 md:p-9 text-white shadow-xl shadow-black/5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#f5cb39]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#f5cb39] text-xs font-medium uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f5cb39]" />
              <span>{isBrand ? 'Brand Operations Hub' : 'Manufacturer Workspace'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
              Welcome back, {user?.email?.split('@')[0] || 'Partner'}
            </h1>
            <p className="text-white/70 text-xs sm:text-sm font-normal leading-relaxed">
              {isBrand
                ? 'Oversee your product sourcing pipeline, track live manufacturer bids, and audit verified facilities across global hubs.'
                : 'Review open brand specifications, submit competitive bids, and scale your production capacity.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={fetchDashboardData}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>

            {isBrand ? (
              <Link to="/app/sourcing">
                <button className="btn-keychain-primary text-xs py-2 px-4 cursor-pointer gap-1.5">
                  <Plus size={15} />
                  <span>Create New RFQ</span>
                </button>
              </Link>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link to="/app/register-facility">
                  <button className="inline-flex items-center gap-1.5 text-xs py-2 px-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer font-medium">
                    <Building2 size={14} />
                    <span>Facility Profile</span>
                  </button>
                </Link>
                <Link to="/app/sourcing">
                  <button className="btn-keychain-primary text-xs py-2 px-4 cursor-pointer gap-1.5">
                    <span>View Open RFQs</span>
                    <ArrowRight size={15} />
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active RFQs */}
        <div className="keychain-card p-5 keychain-card-hover">
          <div className="flex items-center justify-between text-[#888880] mb-3">
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#888880]">
              {isBrand ? 'Active RFQs' : 'Open Projects'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#fef9c3] border border-[#fef08a] flex items-center justify-center text-[#854d0e]">
              <FileText size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-light text-[#111111] tracking-tight">{totalRfqs}</span>
            <span className="text-xs font-medium text-[#111111] bg-[#f8f8f7] px-2 py-0.5 rounded-full border border-[#e8e8e5]">
              {openRfqs} Open
            </span>
          </div>
          <p className="text-xs text-[#888880] font-normal mt-2">
            {isBrand ? `${completedRfqs} completed or awarded` : 'Available to submit quote'}
          </p>
        </div>

        {/* Card 2: Quotes / Bids */}
        <div className="keychain-card p-5 keychain-card-hover">
          <div className="flex items-center justify-between text-[#888880] mb-3">
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#888880]">
              {isBrand ? 'Received Quotes' : 'Submitted Bids'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#fef9c3] border border-[#fef08a] flex items-center justify-center text-[#854d0e]">
              <DollarSign size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-light text-[#111111] tracking-tight">
              {isBrand ? allReceivedQuotes.length : myQuotes.length}
            </span>
            <span className="text-xs font-medium text-[#111111] bg-[#f8f8f7] px-2 py-0.5 rounded-full border border-[#e8e8e5]">
              {isBrand ? `${acceptedQuotes} Accepted` : `${myQuotes.filter(q => q.quoteStatus === 'ACCEPTED').length} Accepted`}
            </span>
          </div>
          <p className="text-xs text-[#888880] font-normal mt-2">
            {isBrand ? 'Supplier proposals ready for review' : 'Active quotes in pipeline'}
          </p>
        </div>

        {/* Card 3: Network Suppliers */}
        {isBrand ? (
          <div className="keychain-card p-5 keychain-card-hover">
            <div className="flex items-center justify-between text-[#888880] mb-3">
              <span className="text-[11px] font-medium uppercase tracking-wider text-[#888880]">Verified Factories</span>
              <div className="w-8 h-8 rounded-lg bg-[#f8f8f7] border border-[#e8e8e5] flex items-center justify-center text-[#111111]">
                <Store size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-light text-[#111111] tracking-tight">{factories.length}</span>
              <span className="text-xs font-medium text-[#111111] bg-[#f8f8f7] px-2 py-0.5 rounded-full border border-[#e8e8e5]">
                Audit Verified
              </span>
            </div>
            <p className="text-xs text-[#888880] font-normal mt-2">Available across global production hubs</p>
          </div>
        ) : (
          <div className="keychain-card p-5 keychain-card-hover">
            <div className="flex items-center justify-between text-[#888880] mb-3">
              <span className="text-[11px] font-medium uppercase tracking-wider text-[#888880]">Pending Decisions</span>
              <div className="w-8 h-8 rounded-lg bg-[#fef9c3] border border-[#fef08a] flex items-center justify-center text-[#854d0e]">
                <Clock size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-light text-[#111111] tracking-tight">
                {myQuotes.filter(q => q.quoteStatus === 'PENDING').length}
              </span>
              <span className="text-xs font-medium text-[#111111] bg-[#f8f8f7] px-2 py-0.5 rounded-full border border-[#e8e8e5]">
                In Review
              </span>
            </div>
            <p className="text-xs text-[#888880] font-normal mt-2">Quotes pending buyer evaluation</p>
          </div>
        )}

        {/* Card 4: Match Velocity */}
        <div className="keychain-card p-5 keychain-card-hover">
          <div className="flex items-center justify-between text-[#888880] mb-3">
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#888880]">Direct Matching</span>
            <div className="w-8 h-8 rounded-lg bg-[#f8f8f7] border border-[#e8e8e5] flex items-center justify-center text-[#111111]">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-light text-[#111111] tracking-tight">100%</span>
            <span className="text-xs font-medium text-[#111111] bg-[#f8f8f7] px-2 py-0.5 rounded-full border border-[#e8e8e5]">
              Direct
            </span>
          </div>
          <p className="text-xs text-[#888880] font-normal mt-2">Zero broker markups on contracts</p>
        </div>
      </div>

      {/* Main Split: Recent RFQs Preview & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Projects (Span 2) */}
        <div className="lg:col-span-2 keychain-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#e8e8e5]">
            <div>
              <h2 className="text-base font-light text-[#111111] tracking-tight">
                {isBrand ? 'Recent RFQs' : 'Open Production Projects'}
              </h2>
              <p className="text-xs text-[#888880] font-normal mt-0.5">
                {isBrand ? 'Quick view of your active sourcing requirements' : 'Latest opportunities seeking manufacturing capacity'}
              </p>
            </div>

            <Link
              to="/app/sourcing"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#111111] hover:underline transition-colors"
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-[#888880] text-xs">
              <RefreshCw size={20} className="animate-spin text-[#f5cb39] mx-auto mb-2" />
              <span>Loading projects...</span>
            </div>
          ) : rfqs.length === 0 ? (
            <div className="py-10 text-center text-[#888880] space-y-3">
              <FileText size={32} className="mx-auto text-slate-300" />
              <p className="text-xs font-medium text-[#111111]">No projects to display.</p>
              {isBrand && (
                <Link to="/app/sourcing">
                  <button className="btn-keychain-secondary text-xs py-1.5 px-3 mt-1">
                    Post Your First RFQ
                  </button>
                </Link>
              )}
            </div>
          ) : (
            <div className="divide-y divide-[#e8e8e5]">
              {rfqs.slice(0, 4).map((rfq) => (
                <div key={rfq.id || rfq.Title} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="space-y-1 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-[#111111] truncate">
                        {rfq.Title || rfq.title}
                      </span>
                      {rfq.id && (
                        <span className="text-xs text-[#888880] font-mono">#RFQ-{rfq.id}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#888880]">
                      <span className="font-medium text-[11px] text-[#854d0e] bg-[#fef9c3] px-2 py-0.5 rounded border border-[#fef08a]">
                        {rfq.productCategory || 'General'}
                      </span>
                      <span>Target: <strong className="font-medium text-[#111111]">{rfq.targetQuantity || rfq.quantity} units</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f8f8f7] text-[#111111] border border-[#e8e8e5]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f5cb39]" />
                      <span>{rfq.status || 'OPEN'}</span>
                    </span>
                    <Link
                      to="/app/sourcing"
                      className="p-1.5 rounded-lg text-[#888880] hover:text-[#111111] hover:bg-[#f4f4f2] transition-colors"
                      title="Open in Sourcing Console"
                    >
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Quick Shortcuts & Resources */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="keychain-card p-6 space-y-4">
            <h3 className="text-[11px] font-medium uppercase tracking-wider text-[#888880]">
              Quick Operations
            </h3>

            <div className="space-y-2.5">
              {isBrand ? (
                <>
                  <Link
                    to="/app/sourcing"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#fbfbfa] hover:bg-[#f6f6f3] border border-[#e8e8e5] transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#e8e8e5] flex items-center justify-center text-[#854d0e] shadow-2xs group-hover:scale-105 transition-transform">
                        <Plus size={16} />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-[#111111] block">Post New RFQ</span>
                        <span className="text-[11px] font-normal text-[#888880]">Specify requirements & tolerances</span>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-[#888880] group-hover:text-[#111111] transition-colors" />
                  </Link>

                  <Link
                    to="/app/marketplace"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#fbfbfa] hover:bg-[#f6f6f3] border border-[#e8e8e5] transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#e8e8e5] flex items-center justify-center text-[#111111] shadow-2xs group-hover:scale-105 transition-transform">
                        <Store size={16} />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-[#111111] block">Search Supplier Directory</span>
                        <span className="text-[11px] font-normal text-[#888880]">Filter by MOQ & certifications</span>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-[#888880] group-hover:text-[#111111] transition-colors" />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/app/register-facility"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#fbfbfa] hover:bg-[#f6f6f3] border border-[#e8e8e5] transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#e8e8e5] flex items-center justify-center text-[#111111] shadow-2xs group-hover:scale-105 transition-transform">
                        <Building2 size={16} />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-[#111111] block">Register Facility Profile</span>
                        <span className="text-[11px] font-normal text-[#888880]">Setup capabilities to bid on RFQs</span>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-[#888880] group-hover:text-[#111111] transition-colors" />
                  </Link>

                  <Link
                    to="/app/sourcing"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#fbfbfa] hover:bg-[#f6f6f3] border border-[#e8e8e5] transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#e8e8e5] flex items-center justify-center text-[#854d0e] shadow-2xs group-hover:scale-105 transition-transform">
                        <FileText size={16} />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-[#111111] block">Browse Sourcing Projects</span>
                        <span className="text-[11px] font-normal text-[#888880]">Submit competitive quotes</span>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-[#888880] group-hover:text-[#111111] transition-colors" />
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Workflow Guide */}
          <div className="bg-[#fef9c3]/50 rounded-2xl border border-[#fef08a] p-5 space-y-2">
            <div className="flex items-center gap-2 text-[#854d0e] font-medium text-xs uppercase tracking-wider">
              <ShieldCheck size={16} className="text-[#854d0e]" />
              <span>Fabricate Network Guarantee</span>
            </div>
            <p className="text-xs text-[#713f12] font-normal leading-relaxed">
              All suppliers on the platform undergo verification of business licenses, facility capabilities, and quality audits before receiving RFQ specifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsoleDashboard;
