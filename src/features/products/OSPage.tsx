import React from 'react';
import { Link } from 'react-router-dom';
import { PublicHeader } from '../../components/PublicHeader';
import { ConstellationBackground } from '../../components/ConstellationBackground';
import { 
  Cpu, 
  Layers, 
  Workflow, 
  ShieldCheck, 
  Database, 
  BarChart, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Package, 
  AlertTriangle,
  FileSpreadsheet,
  Boxes,
  Calendar,
  LineChart
} from 'lucide-react';

export const OSPage = () => {
  const modules = [
    {
      title: 'Search and Discovery',
      desc: 'Real-time catalog search across raw materials, packaging substrates, and ingredient specs with instant supplier cross-referencing.',
      icon: Database,
    },
    {
      title: 'Purchasing & Procurement',
      desc: 'Auto-draft POs from verified RFQs, enforce contract pricing tiers, and monitor vendor lead-time variability with AI.',
      icon: FileSpreadsheet,
    },
    {
      title: 'Food Safety & Compliance',
      desc: 'Digital HACCP, FSMA, SQF, and BRC audit trails. Automatically flag expiring supplier COAs and non-compliant ingredient lots.',
      icon: ShieldCheck,
    },
    {
      title: 'Inventory & Forecasting',
      desc: 'Predictive stock replenishment modeling that factors in seasonal retail velocity spikes, ingredient shelf-life, and transit delays.',
      icon: Boxes,
    },
    {
      title: 'Lot Traceability & Genealogy',
      desc: 'Instant forward and backward recall simulation in seconds. Track raw lots from receiving dock to final customer carton.',
      icon: Workflow,
    },
    {
      title: 'Production Scheduling',
      desc: 'Dynamic Gantt scheduling that optimizes line changeovers, allergen washes, and crew allocation to maximize throughput.',
      icon: Calendar,
    },
    {
      title: 'Financial Intelligence',
      desc: 'Live batch-level COGS and yield tracking that surfaces scrap costs, overhead variance, and true unit profitability in real time.',
      icon: LineChart,
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
            <span className="tracking-wide uppercase">Next-Generation AI ERP</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#111111] tracking-tight max-w-4xl mx-auto leading-[1.08]">
            The AI-Powered Operating System for Modern Manufacturing
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#555550] max-w-2xl mx-auto leading-relaxed font-normal">
            FabricateOS is a next-generation ERP, built with best-in-class technology and AI to redefine how CPG manufacturers run procurement, scheduling, compliance, and plant operations.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/register"
              className="btn-keychain-primary text-sm py-3 px-6 shadow-xs w-full sm:w-auto"
            >
              Explore Fabricate OS
            </Link>
            <Link
              to="/login"
              className="btn-keychain-secondary text-sm py-3 px-6 shadow-xs w-full sm:w-auto"
            >
              Sign In to Console
            </Link>
          </div>
        </div>

        {/* Live ERP Interface Showcase Mockup */}
        <div className="mt-14 mx-auto max-w-6xl px-6 sm:px-8">
          <div className="bg-[#111111] rounded-2xl border border-[#2b2b2a] p-4 sm:p-7 shadow-2xl text-white overflow-hidden">
            {/* Top Bar Mockup */}
            <div className="flex items-center justify-between pb-4 border-b border-[#2b2b2a] text-xs text-white/70">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f5cb39]" />
                <span className="font-mono text-white">FabricateOS Plant #04 • Austin Co-Pack Facility</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono">SYSTEM: HEALTHY</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">OEE: 91.4%</span>
              </div>
            </div>

            {/* AI Copilot Alert Banner */}
            <div className="mt-4 p-3.5 rounded-xl bg-[#1c1c1b] border border-[#383835] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#f5cb39] text-[#111111] flex items-center justify-center font-bold">
                  <Sparkles size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>Fabricate Copilot Alert</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#f5cb39]/20 text-[#f5cb39]">Predicted Stockout</span>
                  </div>
                  <p className="text-[11px] text-white/70 mt-0.5">
                    Batch #8492 requires 450kg of Organic Agave Nectar in 4 days. Suggested re-order drafted from Verified Supplier #108.
                  </p>
                </div>
              </div>

              <button className="px-3 py-1.5 rounded-lg bg-[#f5cb39] text-[#111111] text-xs font-bold hover:bg-[#ebd034] shrink-0">
                Approve PO ($2,140)
              </button>
            </div>

            {/* Real-time KPI Widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-4">
              <div className="bg-[#1c1c1b] p-4 rounded-xl border border-[#2b2b2a]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/60">Live Line Velocity</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-white">142 bpm</span>
                  <span className="text-xs text-emerald-400">+6% vs benchmark</span>
                </div>
              </div>

              <div className="bg-[#1c1c1b] p-4 rounded-xl border border-[#2b2b2a]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/60">Lot Traceability SLA</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-white">1.8s</span>
                  <span className="text-xs text-white/60">Instant Recall Sim</span>
                </div>
              </div>

              <div className="bg-[#1c1c1b] p-4 rounded-xl border border-[#2b2b2a]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/60">COGS Margin Accuracy</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-white">99.8%</span>
                  <span className="text-xs text-[#f5cb39]">Real-time Yield</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 Enterprise Modules Grid */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[11px] font-semibold tracking-wider text-[#666660] uppercase">
              Modular Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-[#111111] tracking-tight">
              Seven purpose-built modules. Unified by AI.
            </h2>
            <p className="text-sm text-[#666660]">
              Legacy ERPs take two years to implement and require manual data entry. FabricateOS is intuitive from Day 1.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.title}
                  className="bg-white rounded-2xl border border-[#e8e8e5] p-7 shadow-xs hover:border-[#d0d0ca] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#fef9c3] border border-[#fef08a] flex items-center justify-center text-[#854d0e]">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-base font-bold text-[#111111] tracking-tight">
                      {m.title}
                    </h3>
                    <p className="text-xs text-[#666660] leading-relaxed">
                      {m.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#f4f4f2] flex items-center gap-1.5 text-xs font-semibold text-[#111111]">
                    <Check size={14} className="text-[#854d0e]" />
                    <span>Native Integration</span>
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
            <Link to="/edge" className="hover:text-white transition-colors">Edge</Link>
            <Link to="/os" className="text-white hover:underline">OS</Link>
            <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OSPage;
