import React from 'react';
import { Link } from 'react-router-dom';
import { PublicHeader } from '../../components/PublicHeader';
import { ConstellationBackground } from '../../components/ConstellationBackground';
import { 
  Building2, 
  MessageSquare, 
  Briefcase, 
  TrendingUp, 
  Sparkles, 
  Users, 
  ArrowRight, 
  Check, 
  Kanban,
  Target,
  Zap,
  Radio,
  FileText
} from 'lucide-react';

export const EdgePage = () => {
  const pillars = [
    {
      title: 'Unified Communications Timeline',
      desc: 'Consolidate every buyer email, phone call summary, sample tracking number, and NDA in a single chronological feed accessible by your entire team.',
      icon: MessageSquare,
    },
    {
      title: 'Enriched Account Intelligence',
      desc: 'Automatic data enrichment for retail brand accounts: estimated retail footprint, product categories, funding rounds, and key buyer contact emails.',
      icon: Users,
    },
    {
      title: 'Visual Pipeline & Deal Stages',
      desc: 'Custom deal stages tailored for CPG co-packing: Specification Intake, Recipe Approval, Lab Samples, Pilot Batch, and Production Contract Award.',
      icon: Kanban,
    },
    {
      title: 'Market Signals & Buying Triggers',
      desc: 'Real-time alerts when brands expand distribution (e.g. Target, Whole Foods rollout), launch new product lines, or seek alternative co-packers.',
      icon: Radio,
    },
    {
      title: 'AI Sales Pitch & Proposal Generator',
      desc: 'Generate tailored manufacturing proposals, pricing breakdown sheets, and follow-up emails in seconds using AI trained on your plant specifications.',
      icon: Sparkles,
    },
    {
      title: 'Direct Marketplace Opportunity Sync',
      desc: 'Seamlessly convert inbound marketplace inquiries and RFQ tracker bids directly into active CRM pipeline deals with zero double entry.',
      icon: Zap,
    },
  ];

  return (
    <div className="min-h-screen bg-[#fbfbfa] text-[#111111] font-sans antialiased selection:bg-[#f5cb39] selection:text-[#111111] relative">
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <ConstellationBackground interactiveRadius={180} className="w-full h-full" />
      </div>
      <PublicHeader transparentAtTop={false} />

      {/* Hero */}
      <section className="relative z-10 pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-[#e8e8e5]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4f4f2] border border-[#e8e8e5] text-[11px] font-semibold text-[#111111] mb-6">
            <Sparkles size={13} className="text-[#854d0e]" />
            <span className="tracking-wide uppercase">Fabricate EDGE® Enterprise CRM</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#111111] tracking-tight max-w-4xl mx-auto leading-[1.08]">
            AI-Powered, Enterprise-Grade CRM for Consumer Brands & Manufacturers
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#555550] max-w-2xl mx-auto leading-relaxed font-normal">
            Your single source of truth for managing all brand relationships, buyer conversations, pilot samples, and production contracts — enriched with live market intelligence from Day 1.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/register"
              className="btn-keychain-primary text-sm py-3 px-6 shadow-xs w-full sm:w-auto"
            >
              Schedule an Edge Demo
            </Link>
            <Link
              to="/login"
              className="btn-keychain-secondary text-sm py-3 px-6 shadow-xs w-full sm:w-auto"
            >
              Sign In to Console
            </Link>
          </div>
        </div>

        {/* Visual CRM Kanban & Pipeline Mockup */}
        <div className="mt-14 mx-auto max-w-6xl px-6 sm:px-8">
          <div className="bg-white rounded-2xl border border-[#e8e8e5] p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e8e8e5]">
              <div>
                <span className="text-[11px] font-semibold text-[#666660] uppercase tracking-wider">
                  Active Production Deals
                </span>
                <h3 className="text-xl font-bold text-[#111111] tracking-tight">
                  Q4 Commercial Co-Packing Pipeline
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#fef9c3] border border-[#fef08a] text-xs font-bold text-[#854d0e]">
                  $8.4M Total Pipeline
                </span>
              </div>
            </div>

            {/* Kanban Columns */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              {/* Stage 1 */}
              <div className="bg-[#fbfbfa] p-4 rounded-xl border border-[#e8e8e5] space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#111111]">
                  <span>1. Inbound Inquiries</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#e8e8e5] text-[10px]">3</span>
                </div>
                <div className="bg-white p-3.5 rounded-lg border border-[#e8e8e5] shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#111111]">Oat & Grain Co.</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold">HOT</span>
                  </div>
                  <p className="text-[11px] text-[#666660]">150k pouches ready-to-eat oatmeal</p>
                  <span className="text-xs font-extrabold text-[#111111] block">$320,000</span>
                </div>
              </div>

              {/* Stage 2 */}
              <div className="bg-[#fbfbfa] p-4 rounded-xl border border-[#e8e8e5] space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#111111]">
                  <span>2. Bench Samples</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#e8e8e5] text-[10px]">2</span>
                </div>
                <div className="bg-white p-3.5 rounded-lg border border-[#e8e8e5] shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#111111]">Pure Botanics</span>
                    <span className="text-[10px] text-[#854d0e] bg-[#fef9c3] px-1.5 py-0.2 rounded font-bold">IN LAB</span>
                  </div>
                  <p className="text-[11px] text-[#666660]">Adaptogenic sparkling tea formulation</p>
                  <span className="text-xs font-extrabold text-[#111111] block">$840,000</span>
                </div>
              </div>

              {/* Stage 3 */}
              <div className="bg-[#fbfbfa] p-4 rounded-xl border border-[#e8e8e5] space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#111111]">
                  <span>3. Pilot Run Scheduled</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#e8e8e5] text-[10px]">1</span>
                </div>
                <div className="bg-white p-3.5 rounded-lg border border-[#e8e8e5] shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#111111]">Keto Crisp LLC</span>
                    <span className="text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded font-bold">WEEK 46</span>
                  </div>
                  <p className="text-[11px] text-[#666660]">10,000 trial cartons extruded snack</p>
                  <span className="text-xs font-extrabold text-[#111111] block">$180,000</span>
                </div>
              </div>

              {/* Stage 4 */}
              <div className="bg-[#fbfbfa] p-4 rounded-xl border border-[#e8e8e5] space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#111111]">
                  <span>4. Annual Contract</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#e8e8e5] text-[10px]">2</span>
                </div>
                <div className="bg-white p-3.5 rounded-lg border border-[#fef08a] bg-[#fefce8]/40 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#111111]">Sol Organics</span>
                    <span className="text-[10px] text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded font-bold">SIGNED</span>
                  </div>
                  <p className="text-[11px] text-[#666660]">Multi-year cold-pressed juice co-packing</p>
                  <span className="text-xs font-extrabold text-[#111111] block">$3,200,000 / yr</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Capabilities Grid */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[11px] font-semibold tracking-wider text-[#666660] uppercase">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-[#111111] tracking-tight">
              Built exclusively for consumer packaged goods sales.
            </h2>
            <p className="text-sm text-[#666660]">
              Generic CRMs fail to understand ingredient specs, sample iterations, and minimum runs. Edge is tailored to how CPG manufactures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="bg-white rounded-2xl border border-[#e8e8e5] p-7 shadow-xs hover:border-[#d0d0ca] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#fef9c3] border border-[#fef08a] flex items-center justify-center text-[#854d0e]">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-base font-bold text-[#111111] tracking-tight">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[#666660] leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#f4f4f2] flex items-center gap-1.5 text-xs font-semibold text-[#111111]">
                    <Check size={14} className="text-[#854d0e]" />
                    <span>Always Enriched</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111111] text-white py-12 border-t border-[#222222]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#888880]">
          <div>
            <span className="font-bold text-white text-base lowercase tracking-tight">fabricate<span className="text-[#f5cb39]">.</span></span>
            <p className="mt-1">The AI Platform for Modern CPG Manufacturing & Sourcing.</p>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/connect" className="hover:text-white transition-colors">Connect</Link>
            <Link to="/edge" className="text-white hover:underline">Edge</Link>
            <Link to="/os" className="hover:text-white transition-colors">OS</Link>
            <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EdgePage;
