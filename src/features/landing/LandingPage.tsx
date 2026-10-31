import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ArrowUpRight, 
  ChevronDown, 
  ShieldCheck, 
  Layers, 
  Menu, 
  X,
  Store,
  FileText,
  Activity,
  Sliders,
  Sparkles,
  Search,
  CheckCircle2,
  Box,
  Cpu,
  Truck,
  Building2,
  Check
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PublicHeader from '../../components/PublicHeader';
import ConstellationBackground from '../../components/ConstellationBackground';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fbfbfa] font-sans text-[#111111] selection:bg-[#f5cb39] selection:text-[#111111] relative">
      
      {/* 1. VISIBLE BACKGROUND LAYER: Constellation Grid Pattern + Mouse-Following Canvas */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 keychain-network-bg opacity-75" />
        <ConstellationBackground interactiveRadius={200} className="w-full h-full" />
      </div>

      {/* 2. FIXED TOP NAVIGATION BAR (Matching Keychain) */}
      <PublicHeader transparentAtTop={true} />

      {/* 3. HERO SECTION (Foreground Layer) */}
      <section className="relative z-10 pt-16 pb-16 md:pt-24 md:pb-24">
        <div className="mx-auto max-w-5xl px-6 sm:px-8 text-center flex flex-col items-center">
          
          {/* Top Live Ticker Pill (Exact Keychain Style) */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e8e8e5] bg-white px-4 py-1.5 text-xs text-[#555555] mb-8 shadow-2xs select-none hover:border-[#d0d0ca] transition-colors">
            <span className="w-2 h-2 rounded-full bg-[#f5cb39] animate-pulse" />
            <span>A custom packaging manufacturer in Ohio just completed a 15,000 unit run on FabricateOS</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#111111] leading-[1.08] max-w-4xl">
            The AI Platform for CPG
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-[#666666] max-w-2xl leading-relaxed">
            Powering over $10 billion in manufacturing for the world's most innovative brands and certified facilities.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <Link 
              to="/register" 
              className="btn-keychain-primary text-base px-7 py-3 w-full sm:w-auto text-center"
            >
              Request access
            </Link>
            <Link 
              to="/register?role=brand" 
              className="btn-keychain-secondary text-base px-7 py-3 w-full sm:w-auto text-center"
            >
              Find a manufacturer
            </Link>
          </div>
        </div>

        {/* 3. THREE PRODUCT PILLAR CARDS (Connect, Edge, OS - Exact Keychain Hero Layout) */}
        <div id="connect" className="mx-auto max-w-7xl px-6 sm:px-8 mt-16 sm:mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Fabricate Connect */}
            <div className="keychain-card keychain-card-hover flex flex-col justify-between overflow-hidden p-6 sm:p-7">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#888888] uppercase tracking-wider mb-2">
                  <div className="w-6 h-6 rounded-md bg-[#f4f4f2] border border-[#e8e8e5] flex items-center justify-center text-[#111111]">
                    <Layers size={13} />
                  </div>
                  <span>Fabricate <strong className="text-[#111111]">Connect</strong></span>
                </div>
                <h3 className="text-base font-bold text-[#111111]">The largest global manufacturing network.</h3>

                {/* Network Graphic Visualization */}
                <div className="my-6 h-40 rounded-xl bg-[#fafaf9] border border-[#e8e8e5] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-44 h-44 rounded-full border border-dashed border-[#e2e2de]" />
                  </div>
                  {/* Outer Nodes */}
                  <div className="absolute top-4 left-6 w-8 h-8 rounded-lg bg-white border border-[#e8e8e5] flex items-center justify-center text-[#666666] shadow-2xs">
                    <Store size={15} />
                  </div>
                  <div className="absolute bottom-4 left-8 w-8 h-8 rounded-lg bg-white border border-[#e8e8e5] flex items-center justify-center text-[#666666] shadow-2xs">
                    <Box size={15} />
                  </div>
                  <div className="absolute top-4 right-6 w-8 h-8 rounded-lg bg-white border border-[#e8e8e5] flex items-center justify-center text-[#666666] shadow-2xs">
                    <Cpu size={15} />
                  </div>
                  <div className="absolute bottom-4 right-8 w-8 h-8 rounded-lg bg-white border border-[#e8e8e5] flex items-center justify-center text-[#666666] shadow-2xs">
                    <Truck size={15} />
                  </div>

                  {/* Central Yellow Node */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-[#f5cb39] text-[#111111] font-black text-lg flex items-center justify-center shadow-sm">
                    F
                  </div>
                </div>

                <h4 className="text-sm font-bold text-[#111111] mb-1">Connect with brands.</h4>
                <p className="text-xs text-[#666666] leading-relaxed">
                  The largest network in CPG — 28,000+ brands and manufacturers, and the intelligence between them.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#f0f0ed]">
                <Link
                  to="/register?role=brand"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#111111] hover:text-[#555555] transition-colors"
                >
                  <span>Explore Connect</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* Card 2: Fabricate Edge */}
            <div className="keychain-card keychain-card-hover flex flex-col justify-between overflow-hidden p-6 sm:p-7">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#888888] uppercase tracking-wider mb-2">
                  <div className="w-6 h-6 rounded-md bg-[#f4f4f2] border border-[#e8e8e5] flex items-center justify-center text-[#111111]">
                    <Sliders size={13} />
                  </div>
                  <span>Fabricate <strong className="text-[#111111]">Edge</strong></span>
                </div>
                <h3 className="text-base font-bold text-[#111111]">The CRM Revenue Platform for CPG.</h3>

                {/* Growth Chart Visualization */}
                <div className="my-6 h-40 rounded-xl bg-[#fafaf9] border border-[#e8e8e5] p-4 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-center justify-between text-[11px] text-[#888888] font-bold">
                    <span>RFQ Bids</span>
                    <span className="text-emerald-700 font-extrabold">+42% Match Rate</span>
                  </div>
                  
                  {/* Simulated SVG Wave */}
                  <svg className="w-full h-16 text-[#f5cb39]" viewBox="0 0 100 40" fill="none">
                    <path 
                      d="M0 35 Q 25 30, 45 18 T 80 12 T 100 4" 
                      stroke="#111111" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                    />
                    <path 
                      d="M0 35 Q 25 30, 45 18 T 80 12 T 100 4 L 100 40 L 0 40 Z" 
                      fill="url(#yellowGradient)" 
                      opacity="0.25" 
                    />
                    <defs>
                      <linearGradient id="yellowGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f5cb39" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="flex items-center justify-between text-[10px] text-[#888888]">
                    <span>Submission</span>
                    <span>Tolerances Match</span>
                    <span>Accepted</span>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-[#111111] mb-1">Grow your revenue.</h4>
                <p className="text-xs text-[#666666] leading-relaxed">
                  A CRM and revenue platform built for how CPG actually sells — from first touch to high-volume reorder.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#f0f0ed]">
                <Link
                  to="/register?role=manufacturer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#111111] hover:text-[#555555] transition-colors"
                >
                  <span>Explore Edge</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* Card 3: Fabricate OS */}
            <div className="keychain-card keychain-card-hover flex flex-col justify-between overflow-hidden p-6 sm:p-7">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#888888] uppercase tracking-wider mb-2">
                  <div className="w-6 h-6 rounded-md bg-[#f4f4f2] border border-[#e8e8e5] flex items-center justify-center text-[#111111]">
                    <Activity size={13} />
                  </div>
                  <span>Fabricate <strong className="text-[#111111]">OS</strong></span>
                </div>
                <h3 className="text-base font-bold text-[#111111]">The AI-Powered ERP System.</h3>

                {/* Operations Wheel Visualization */}
                <div className="my-6 h-40 rounded-xl bg-[#fafaf9] border border-[#e8e8e5] flex items-center justify-center relative overflow-hidden">
                  <div className="w-32 h-32 rounded-full border border-[#e2e2de] flex items-center justify-center relative">
                    <div className="w-20 h-20 rounded-full border border-dashed border-[#e2e2de] flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-[#f5cb39] text-[#111111] font-black text-sm flex items-center justify-center shadow-xs">
                        OS
                      </div>
                    </div>
                    {/* Floating Badges */}
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-white border border-[#e8e8e5] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs whitespace-nowrap">
                      Audits
                    </span>
                    <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-white border border-[#e8e8e5] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs whitespace-nowrap">
                      QA Lines
                    </span>
                    <span className="absolute top-1/2 -translate-y-1/2 -left-4 -translate-x-1/2 bg-white border border-[#e8e8e5] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs whitespace-nowrap">
                      Milestones
                    </span>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-[#111111] mb-1">Run your operations.</h4>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Food safety, inventory, purchasing, production, traceability — one connected system of record.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#f0f0ed]">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#111111] hover:text-[#555555] transition-colors"
                >
                  <span>Explore OS</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. TRUST & LOGOS SECTION (Exact Keychain Layout with SOC2 Badge) */}
      <section className="py-16 border-t border-b border-[#e8e8e5] bg-white/60">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 text-center">
          
          <p className="text-xs sm:text-sm font-medium text-[#666666]">
            Trusted by over 28,000 CPG brands and manufacturers <br className="hidden sm:inline" />
            From single-facility co-packers to national brands.
          </p>

          <div className="mt-5 mb-10 flex justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4f4f2] border border-[#e8e8e5] text-xs font-bold text-[#111111]">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white text-[9px] flex items-center justify-center font-black">
                SOC
              </span>
              <span>SOC 2 compliant</span>
            </div>
          </div>

          {/* Monochrome Brand Logos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-7 items-center justify-items-center opacity-80 filter grayscale">
            <span className="font-extrabold text-lg tracking-tight text-[#111111]">amazon</span>
            <span className="font-bold text-base tracking-widest text-[#111111]">KRAFT</span>
            <span className="font-extrabold text-lg italic text-[#111111]">feastables</span>
            <span className="font-bold text-base tracking-widest text-[#111111]">FERRERO</span>
            <span className="font-bold text-base tracking-wider text-[#111111]">MARS</span>
            <span className="font-bold text-lg text-[#111111]">Target</span>
            <span className="font-extrabold text-lg text-[#111111]">Walmart</span>
            <span className="font-bold text-base tracking-wide text-[#111111]">NESTLÉ</span>
            <span className="font-bold text-base tracking-wider text-[#111111]">UNILEVER</span>
            <span className="font-bold text-base tracking-widest text-[#111111]">WHOLE FOODS</span>
            <span className="font-bold text-base text-[#111111]">gopuff</span>
            <span className="font-extrabold text-base tracking-widest text-[#111111]">LIDL</span>
          </div>

        </div>
      </section>

      {/* 5. YELLOW MOCKUP WORKFLOW SECTION (Exact Signature Keychain Showcase) */}
      <section id="features" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#111111] uppercase tracking-wider">
                <div className="w-6 h-6 rounded-md bg-[#f4f4f2] border border-[#e8e8e5] flex items-center justify-center">
                  <Layers size={13} />
                </div>
                <span>Fabricate Connect</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight leading-[1.1]">
                The largest network in CPG.
              </h2>

              <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
                Tens of thousands of brands and manufacturers, billions of data points on products, categories, and capabilities - the foundation everything else is built on.
              </p>

              <div className="pt-2 flex items-center gap-3">
                <Link to="/register" className="btn-keychain-primary text-sm font-bold">
                  Request access
                </Link>
                <Link to="/register?role=brand" className="btn-keychain-secondary text-sm font-bold flex items-center gap-1.5">
                  <span>Explore</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right: Golden Yellow Background with Embedded Platform Console */}
            <div className="lg:col-span-7 rounded-3xl bg-[#f5cb39] p-6 sm:p-10 shadow-lg relative overflow-hidden">
              {/* Console Mockup Card */}
              <div className="rounded-2xl bg-white border border-[#e8e8e5] shadow-xl p-5 space-y-4">
                {/* Console Topbar */}
                <div className="flex items-center justify-between pb-3 border-b border-[#f0f0ed]">
                  <span className="font-logo font-black text-lg lowercase tracking-tight">fabricate</span>
                  
                  <div className="w-60 max-w-xs flex items-center gap-2 bg-[#f4f4f2] px-3 py-1.5 rounded-lg border border-[#e8e8e5] text-xs text-[#888888]">
                    <Search size={13} />
                    <span className="truncate">Search by product or manufacturer...</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#f5cb39] text-[#111111]">
                      + Invite
                    </span>
                  </div>
                </div>

                <div className="text-xs font-bold text-[#111111]">
                  152 verified manufacturers you could work with
                </div>

                {/* Sample Manufacturer Row 1 */}
                <div className="p-3.5 rounded-xl border border-[#e8e8e5] hover:border-[#f5cb39] transition-colors space-y-2 bg-[#fafaf9]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#e8e8e5] flex items-center justify-center font-bold text-xs">
                        <Building2 size={16} className="text-[#111111]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#111111]">Apex Precision Labs</h4>
                        <span className="text-[10px] text-[#777777]">California, US • Accepting Projects</span>
                      </div>
                    </div>
                    <span className="btn-keychain-primary text-[11px] px-3 py-1">
                      Request quote
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded bg-white border border-[#e8e8e5] text-[10px] font-semibold text-[#555555]">
                      CNC Machining
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white border border-[#e8e8e5] text-[10px] font-semibold text-[#555555]">
                      ISO9001
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white border border-[#e8e8e5] text-[10px] font-semibold text-[#555555]">
                      MOQ: 100
                    </span>
                  </div>
                </div>

                {/* Sample Manufacturer Row 2 */}
                <div className="p-3.5 rounded-xl border border-[#e8e8e5] hover:border-[#f5cb39] transition-colors space-y-2 bg-[#fafaf9]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#e8e8e5] flex items-center justify-center font-bold text-xs">
                        <Store size={16} className="text-[#111111]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#111111]">Veritas Custom Co-Packers</h4>
                        <span className="text-[10px] text-[#777777]">Chicago, IL • Accepting Projects</span>
                      </div>
                    </div>
                    <span className="btn-keychain-primary text-[11px] px-3 py-1">
                      Request quote
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded bg-white border border-[#e8e8e5] text-[10px] font-semibold text-[#555555]">
                      Beverage Canning
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white border border-[#e8e8e5] text-[10px] font-semibold text-[#555555]">
                      FDA Registered
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white border border-[#e8e8e5] text-[10px] font-semibold text-[#555555]">
                      Organic
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. CLEAN BOTTOM CTA (Keychain Style) */}
      <section className="px-6 sm:px-8 pb-20">
        <div className="mx-auto max-w-7xl rounded-3xl bg-[#111111] p-10 md:p-16 text-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ready to scale your production?
            </h2>
            <p className="text-sm sm:text-base text-[#999999] leading-relaxed">
              Join thousands of brands and manufacturers finding production capacity and managing contracts on Fabricate.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/register?role=brand" className="btn-keychain-primary text-sm font-bold w-full sm:w-auto">
                Find a Manufacturer
              </Link>
              <Link 
                to="/register?role=manufacturer" 
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 rounded-lg px-5 py-2.5 transition-colors text-sm"
              >
                Join as Manufacturer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CLEAN MINIMAL FOOTER */}
      <footer className="border-t border-[#e8e8e5] bg-[#fbfbfa] py-12">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-xl lowercase tracking-tight text-[#111111]">
              fabricate<span className="text-[#f5cb39]">.</span>
            </span>
            <span className="text-xs text-[#888880]">&copy; 2026 Fabricate Technologies Inc.</span>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold text-[#555555]">
            <Link to="/connect" className="hover:text-[#111111] transition-colors">Connect</Link>
            <Link to="/edge" className="hover:text-[#111111] transition-colors">Edge</Link>
            <Link to="/os" className="hover:text-[#111111] transition-colors">OS</Link>
            <Link to="/login" className="hover:text-[#111111] transition-colors">Sign in</Link>
            <Link to="/register" className="text-[#111111] font-bold hover:underline">Request access</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
