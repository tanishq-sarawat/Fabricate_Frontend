import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  ShieldCheck, 
  Zap, 
  Globe2, 
  Award, 
  BarChart3, 
  Users, 
  Factory,
  ChevronRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';

import { PublicHeader } from '../../components/PublicHeader';
import { ConstellationBackground } from '../../components/ConstellationBackground';

export const ConnectPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      navigate(`/register?role=manufacturer&email=${encodeURIComponent(email)}`);
    } else {
      navigate('/register?role=manufacturer');
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbfa] text-[#111111] font-sans antialiased selection:bg-[#f5cb39] selection:text-[#111111] relative">
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <ConstellationBackground interactiveRadius={180} className="w-full h-full" />
      </div>
      <PublicHeader transparentAtTop={false} />

      {/* Hero Section */}
      <section className="relative z-10 overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-[#e8e8e5]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline & Value Prop */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4f4f2] border border-[#e8e8e5] text-[11px] font-semibold text-[#111111]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f5cb39]" />
                <span className="tracking-wide uppercase">Fabricate Connect®</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#111111] tracking-tight leading-[1.08]">
                Join the largest supplier network in CPG.
              </h1>

              <p className="text-base sm:text-lg text-[#555550] leading-relaxed max-w-xl font-normal">
                Fabricate Connect puts your manufacturing and co-packing business in front of tens of thousands of consumer brands and retailers actively looking for production capacity.
              </p>

              {/* Quick Perks */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#333330]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#854d0e] shrink-0" />
                  <span>Zero cold calling — direct qualified buyer RFQs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#854d0e] shrink-0" />
                  <span>Verified buyer specifications & target volumes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#854d0e] shrink-0" />
                  <span>Showcase audited certifications (SQF, GMP, FDA)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#854d0e] shrink-0" />
                  <span>Real-time bid submission & contract awards</span>
                </div>
              </div>
            </div>

            {/* Right Column: Keychain Hero Demo Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-[#e8e8e5] p-8 sm:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-semibold tracking-wider text-[#666660] uppercase">
                    Manufacturer Access
                  </span>
                  <h3 className="text-2xl font-light text-[#111111] tracking-tight">
                    Get Your Free Demo
                  </h3>
                  <p className="text-xs text-[#666660] leading-relaxed">
                    Connect with qualified CPG buyers and fill idle factory capacity.
                  </p>
                </div>

                <form onSubmit={handleGetStarted} className="space-y-4">
                  <div>
                    <label htmlFor="connect-email" className="block text-xs font-medium text-[#222222] mb-1.5">
                      Work Email <span className="text-rose-500 font-semibold">*</span>
                    </label>
                    <input
                      id="connect-email"
                      type="email"
                      required
                      placeholder="e.g. name@co-packer.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-[#e5e5e2] rounded-lg px-3.5 py-2.5 text-sm text-[#111111] placeholder:text-[#999990] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#f5cb39] hover:bg-[#ebd034] text-[#111111] font-medium text-sm py-3 px-4 rounded-lg transition-all duration-150 select-none shadow-xs text-center cursor-pointer active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <span>Request Supplier Invitation</span>
                    <ArrowRight size={15} />
                  </button>

                  <p className="text-[11px] text-[#888880] text-center pt-1">
                    Free evaluation for verified manufacturing and packaging facilities.
                  </p>
                </form>

                <div className="mt-6 pt-6 border-t border-[#f0f0ed] flex items-center justify-between text-xs text-[#666660]">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={15} className="text-[#854d0e]" />
                    <span className="font-medium">100% Verified Network</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award size={15} className="text-[#854d0e]" />
                    <span className="font-medium">Fast Company Finalist</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="bg-white py-12 border-b border-[#e8e8e5]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-[#e8e8e5]">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">26,000+</span>
              <p className="text-xs text-[#666660] font-medium uppercase tracking-wider">Manufacturers Worldwide</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">$4.2B+</span>
              <p className="text-xs text-[#666660] font-medium uppercase tracking-wider">In RFQ Sourcing Volume</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">15 Days</span>
              <p className="text-xs text-[#666660] font-medium uppercase tracking-wider">Average Contract Turnaround</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">99.4%</span>
              <p className="text-xs text-[#666660] font-medium uppercase tracking-wider">Audit Pass Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Value Pillars */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[11px] font-semibold tracking-wider text-[#666660] uppercase">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-[#111111] tracking-tight">
              Designed for modern manufacturers and co-packers.
            </h2>
            <p className="text-sm text-[#666660]">
              Replace outdated trade shows and agency brokers with a single intelligent commercial pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl border border-[#e8e8e5] p-8 shadow-xs hover:border-[#d0d0ca] transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#fef9c3] border border-[#fef08a] flex items-center justify-center text-[#854d0e]">
                  <Globe2 size={24} />
                </div>
                <h3 className="text-xl font-medium text-[#111111] tracking-tight">
                  Global Buyer Discovery
                </h3>
                <p className="text-xs text-[#666660] leading-relaxed">
                  Brands search Fabricate daily for specific certifications, minimum order quantities, and manufacturing equipment capabilities. Your profile is automatically indexed and matched.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#f4f4f2] text-xs font-semibold text-[#111111] flex items-center gap-1.5">
                <span>Direct Search Indexing</span>
                <ChevronRight size={14} className="text-[#854d0e]" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl border border-[#e8e8e5] p-8 shadow-xs hover:border-[#d0d0ca] transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#fef9c3] border border-[#fef08a] flex items-center justify-center text-[#854d0e]">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-medium text-[#111111] tracking-tight">
                  Pre-Structured RFQs
                </h3>
                <p className="text-xs text-[#666660] leading-relaxed">
                  No more vague email threads. Incoming requests specify packaging requirements, ingredient constraints, annual volumes, target price, and launch timelines up front.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#f4f4f2] text-xs font-semibold text-[#111111] flex items-center gap-1.5">
                <span>Standardized Specs</span>
                <ChevronRight size={14} className="text-[#854d0e]" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl border border-[#e8e8e5] p-8 shadow-xs hover:border-[#d0d0ca] transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#fef9c3] border border-[#fef08a] flex items-center justify-center text-[#854d0e]">
                  <FileCheck size={24} />
                </div>
                <h3 className="text-xl font-medium text-[#111111] tracking-tight">
                  Instant Bid Submission
                </h3>
                <p className="text-xs text-[#666660] leading-relaxed">
                  Submit quotes with custom pricing per unit, production lead times, and terms in one click. Receive digital acceptances directly to lock in contracts.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#f4f4f2] text-xs font-semibold text-[#111111] flex items-center gap-1.5">
                <span>One-Click Contracting</span>
                <ChevronRight size={14} className="text-[#854d0e]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Mockup Section */}
      <section className="py-16 bg-[#f4f4f2] border-t border-b border-[#e8e8e5]">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="bg-white rounded-2xl border border-[#e8e8e5] p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e8e8e5]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#111111] text-white flex items-center justify-center font-bold">
                  B
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-[#111111]">Apex Natural Foods Co-Packing</h4>
                    <span className="px-2 py-0.5 rounded-full bg-[#fef9c3] border border-[#fef08a] text-[10px] font-bold text-[#854d0e]">
                      Verified Facility
                    </span>
                  </div>
                  <p className="text-xs text-[#666660]">Boulder, Colorado • SQF Level 3 • USDA Organic • NSF GMP</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/register?role=manufacturer"
                  className="btn-keychain-primary text-xs py-2 px-3.5"
                >
                  Claim Your Profile
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-center">
              <div className="p-3 bg-[#fbfbfa] rounded-xl border border-[#e8e8e5]">
                <span className="text-xs text-[#666660] block font-medium">Minimum Run</span>
                <span className="text-sm font-bold text-[#111111]">2,500 Units</span>
              </div>
              <div className="p-3 bg-[#fbfbfa] rounded-xl border border-[#e8e8e5]">
                <span className="text-xs text-[#666660] block font-medium">Lead Time</span>
                <span className="text-sm font-bold text-[#111111]">3-4 Weeks</span>
              </div>
              <div className="p-3 bg-[#fbfbfa] rounded-xl border border-[#e8e8e5]">
                <span className="text-xs text-[#666660] block font-medium">Audit Score</span>
                <span className="text-sm font-bold text-[#111111]">98.2 / 100</span>
              </div>
              <div className="p-3 bg-[#fbfbfa] rounded-xl border border-[#e8e8e5]">
                <span className="text-xs text-[#666660] block font-medium">Active Inquiries</span>
                <span className="text-sm font-bold text-[#854d0e]">14 Brands</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 text-center">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-light text-[#111111] tracking-tight">
            Ready to scale your production capacity?
          </h2>
          <p className="text-sm text-[#666660] max-w-xl mx-auto">
            Join thousands of verified suppliers closing production contracts with premier consumer brands.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/register?role=manufacturer"
              className="btn-keychain-primary text-sm py-3 px-6 shadow-xs w-full sm:w-auto"
            >
              Get Started with Fabricate Connect
            </Link>
            <Link
              to="/login"
              className="btn-keychain-secondary text-sm py-3 px-6 shadow-xs w-full sm:w-auto"
            >
              Sign In to Console
            </Link>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <footer className="bg-[#111111] text-white py-12 border-t border-[#222222]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#888880]">
          <div>
            <span className="font-bold text-white text-base lowercase tracking-tight">fabricate<span className="text-[#f5cb39]">.</span></span>
            <p className="mt-1">The AI Platform for Modern CPG Manufacturing & Sourcing.</p>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/connect" className="text-white hover:underline">Connect</Link>
            <Link to="/edge" className="hover:text-white transition-colors">Edge</Link>
            <Link to="/os" className="hover:text-white transition-colors">OS</Link>
            <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ConnectPage;
