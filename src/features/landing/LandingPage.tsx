import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Layers, 
  Factory, 
  ArrowRight, 
  CheckCircle2, 
  Menu, 
  X, 
  Building2, 
  Clock, 
  ArrowUpRight, 
  Check, 
  Package, 
  Shirt, 
  Tag, 
  Cpu, 
  HeartPulse, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'For Brands', href: '#for-brands' },
  { label: 'For Manufacturers', href: '#for-manufacturers' },
  { label: 'Categories', href: '#categories' },
];

interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { value: '10,000+', label: 'Verified Manufacturers' },
  { value: '450+', label: 'Product Categories' },
  { value: '12-Day', label: 'Avg. Match Time' },
];

interface FeatureItem {
  title: string;
  description: string;
}

const brandFeatures: FeatureItem[] = [
  { title: 'Verified facility data', description: 'Access deep insights, audit reports, and certified capabilities directly.' },
  { title: 'Smart RFP matching', description: 'Submit specs once and receive qualified quotes from matched facilities.' },
  { title: 'Direct communication', description: 'Message verified representatives without middleman markups.' },
];

const manufacturerFeatures: FeatureItem[] = [
  { title: 'Fill idle capacity', description: 'Get matched with brands looking for your exact production capabilities.' },
  { title: 'Streamlined lead qualification', description: 'Receive high-intent RFPs that fit your tooling and run sizes.' },
  { title: 'Custom profile building', description: 'Showcase equipment, certifications, and past project galleries.' },
];

interface StepItem {
  number: string;
  title: string;
  description: string;
}

const steps: StepItem[] = [
  { number: '01', title: 'Define', description: 'Detail your product specifications, certifications, and volume needs.' },
  { number: '02', title: 'Match', description: 'Our platform matches you with vetted manufacturers possessing the exact capabilities.' },
  { number: '03', title: 'Produce', description: 'Compare quotes, manage communications, and begin production securely.' },
];

interface CategoryItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const categories: CategoryItem[] = [
  { title: 'Food & Beverage', icon: Package, description: 'Co-packers, FDA facilities, organic food processing, and custom canning.' },
  { title: 'Apparel & Textiles', icon: Shirt, description: 'Cut & sew shops, high-volume apparel, circular knits, and techwear production.' },
  { title: 'Cosmetics & Personal Care', icon: Sparkles, description: 'Clean beauty formulation, custom packaging, skin care labs, and GMP lines.' },
  { title: 'Packaging & Labeling', icon: Tag, description: 'Sustainable mailers, custom folding cartons, glass bottles, and digital labeling.' },
  { title: 'Health & Wellness', icon: HeartPulse, description: 'Nutraceuticals, vitamins, organic supplements, and ISO-certified production.' },
  { title: 'Electronics Assembly', icon: Cpu, description: 'PCB assembly, cleanroom operations, custom IoT enclosures, and testing.' },
];

export const LandingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-amber-500 selection:text-slate-950 overflow-x-hidden relative">
      
      {/* Background Grid Lines just like Keychain.com */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none">
        {/* Vertical Gridlines */}
        <div className="absolute inset-y-0 left-[16.666%] w-px bg-slate-100/60" />
        <div className="absolute inset-y-0 left-[33.333%] w-px bg-slate-100/60 hidden sm:block" />
        <div className="absolute inset-y-0 left-[50%] w-px bg-slate-100/60" />
        <div className="absolute inset-y-0 left-[66.666%] w-px bg-slate-100/60 hidden sm:block" />
        <div className="absolute inset-y-0 left-[83.333%] w-px bg-slate-100/60" />

        {/* Horizontal Gridlines */}
        <div className="absolute top-[80px] left-0 right-0 h-px bg-slate-100/60" />
        <div className="absolute top-[280px] left-0 right-0 h-px bg-slate-100/60" />
        <div className="absolute top-[480px] left-0 right-0 h-px bg-slate-100/60" />
        <div className="absolute top-[680px] left-0 right-0 h-px bg-slate-100/60" />
        <div className="absolute top-[880px] left-0 right-0 h-px bg-slate-100/60" />
        <div className="absolute top-[1080px] left-0 right-0 h-px bg-slate-100/60" />
      </div>

      {/* Radial Gradient Glows (Just like Keychain.com) */}
      <div className="absolute top-0 left-[5%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.06)_0%,transparent_75%)] pointer-events-none -z-10" />
      <div className="absolute top-[20%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.12)_0%,transparent_75%)] pointer-events-none -z-10" />

      {/* 1. STICKY NAVIGATION BAR */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'border-b border-slate-100/80 bg-white/80 backdrop-blur-md shadow-sm'
          : 'border-b border-transparent bg-transparent'
      }`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
          
          {/* Left: Brand Logo & Icon */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <Layers className="h-5 w-5" />
            </div>
            <Link 
              to="/" 
              className="group flex items-baseline font-logo text-2xl font-extrabold lowercase text-slate-900 tracking-logo-tight select-none"
            >
              <span>fabricate</span>
              <sup className="ml-0.5 text-[10px] font-semibold tracking-normal text-amber-500 select-none">®</sup>
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/login" 
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors duration-200 px-3 py-2"
            >
              Log In
            </Link>
            <Link 
              to="/register" 
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/10 active:scale-95 transition-all duration-150"
            >
              Join as Manufacturer
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 focus:outline-none"
            >
              <span className="sr-only">Toggle main menu</span>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-96 opacity-100 border-b border-slate-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="space-y-1.5 px-6 pb-6 pt-3 bg-white/95 backdrop-blur-lg">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-4">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center rounded-lg border border-slate-200 py-2.5 text-base font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center rounded-lg bg-slate-900 py-2.5 text-base font-semibold text-white hover:bg-slate-800 transition-colors shadow-md"
              >
                Join as Manufacturer
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 text-center flex flex-col items-center">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-850 mb-6 select-none">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
            <span>Fully Vetted B2B Manufacturing Marketplace</span>
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            Simplify your supply chain <br className="hidden sm:inline" />
            with <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">AI-Powered</span> CPG.
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-2xl text-base text-slate-600 sm:text-lg md:text-xl leading-relaxed">
            Create products, connect with suppliers, and manage your entire supply chain - all with the power of Fabricate.
          </p>

          {/* Interactive Search Bar (Taller like Keychain.com) */}
          <form 
            onSubmit={handleSearchSubmit}
            className="mt-10 w-full max-w-3xl rounded-2xl bg-white border border-slate-200/80 p-3 shadow-2xl shadow-slate-200/60 focus-within:border-amber-500/50 focus-within:ring-2 focus-within:ring-amber-500/10 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="flex-1 flex items-center gap-2 px-3">
                <Search className="h-5 w-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Describe your product... (e.g. Organic Energy Drink, Biodegradable Sacks)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent py-3 text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-200 px-6 py-3 text-sm font-bold active:scale-98 transition-all duration-150 shrink-0 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="h-4 w-4 text-amber-600" />
                <span>Generate Products</span>
              </button>
            </div>
          </form>

          {/* Quick Tags */}
          <div className="mt-5 flex flex-wrap justify-center items-center gap-2.5 text-xs text-slate-400">
            <span className="font-semibold text-slate-500">Popular:</span>
            <button 
              type="button" 
              onClick={() => setSearchQuery('Food & Beverage')} 
              className="px-3 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Food & Beverage
            </button>
            <button 
              type="button" 
              onClick={() => setSearchQuery('Packaging')} 
              className="px-3 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Packaging
            </button>
            <button 
              type="button" 
              onClick={() => setSearchQuery('Cosmetics')} 
              className="px-3 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Cosmetics
            </button>
          </div>
        </div>
      </section>

      {/* 3. TRUST & STATISTICS SECTION */}
      <section className="border-t border-b border-slate-100 bg-slate-50/50 py-12">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          
          {/* Logo Banner */}
          <div className="flex flex-col items-center justify-center gap-6">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Trusted by brands nationwide
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60 filter grayscale">
              <div className="h-6 flex items-center font-bold text-slate-800 tracking-widest text-sm">
                <span className="text-amber-500 mr-1">◆</span> APEX SOURCE
              </div>
              <div className="h-6 flex items-center font-bold text-slate-800 tracking-widest text-sm">
                <span className="text-blue-500 mr-1">▲</span> VELO GOODS
              </div>
              <div className="h-6 flex items-center font-bold text-slate-800 tracking-widest text-sm">
                <span className="text-purple-500 mr-1">●</span> CORE LABS
              </div>
              <div className="h-6 flex items-center font-bold text-slate-800 tracking-widest text-sm">
                <span className="text-rose-500 mr-1">■</span> MODERNA PACK
              </div>
              <div className="h-6 flex items-center font-bold text-slate-800 tracking-widest text-sm">
                <span className="text-amber-500 mr-1">▼</span> NOVA FOODS
              </div>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 border-t border-slate-200/60 pt-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <dd className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                  {stat.value}
                </dd>
                <dt className="mt-2.5 text-sm font-semibold text-slate-500">
                  {stat.label}
                </dt>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. DUAL-AUDIENCE SPLIT */}
      <section id="for-brands" className="py-20 md:py-28 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Engineered for both sides of the marketplace.
            </h2>
            <p className="mt-4 text-base text-slate-600">
              We connect retail leaders with industrial capacity through verified data and streamlined matchmaking workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Left Column: For Brands */}
            <div className="relative group rounded-2xl bg-white border border-slate-200 p-8 md:p-10 hover:border-amber-500/20 hover:shadow-xl hover:shadow-slate-100/65 transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 border border-amber-100 text-amber-600 mb-6">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">For Brands & Retailers</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Find, qualify, and secure the perfect production partner in a fraction of the time.
                </p>
                <ul className="mt-8 space-y-4">
                  {brandFeatures.map((feat, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-amber-50 p-1 text-amber-600">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800 block text-sm">{feat.title}</span>
                        <span className="text-xs text-slate-500 mt-0.5 block">{feat.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 border-t border-slate-100 pt-6">
                <Link 
                  to="/register?role=brand" 
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-705 group-hover:translate-x-0.5 transition-all duration-200"
                >
                  <span>Build your pipeline</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: For Manufacturers */}
            <div id="for-manufacturers" className="relative group rounded-2xl bg-white border border-slate-200 p-8 md:p-10 hover:border-blue-500/20 hover:shadow-xl hover:shadow-slate-100/65 transition-all duration-300 flex flex-col justify-between overflow-hidden scroll-mt-16">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600 mb-6">
                  <Factory className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">For Manufacturers & Co-packers</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Qualify incoming request-for-quotes and stabilize your run schedules.
                </p>
                <ul className="mt-8 space-y-4">
                  {manufacturerFeatures.map((feat, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-blue-50 p-1 text-blue-600">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800 block text-sm">{feat.title}</span>
                        <span className="text-xs text-slate-500 mt-0.5 block">{feat.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 border-t border-slate-100 pt-6">
                <Link 
                  to="/register?role=manufacturer" 
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 group-hover:translate-x-0.5 transition-all duration-200"
                >
                  <span>List your facility</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section id="how-it-works" className="border-t border-slate-100 bg-slate-50/50 py-20 md:py-28 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Workflow</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mt-2.5">
              Sourcing made straightforward.
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Skip weeks of searching and cold calls. Our system connects your specifications directly to capable facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Connective Line */}
            <div className="hidden md:block absolute top-1/4 left-[20%] right-[20%] h-px bg-slate-200 -z-10" />

            {steps.map((step, index) => (
              <div key={index} className="relative rounded-2xl bg-white border border-slate-200/80 p-8 flex flex-col justify-between shadow-sm hover:border-slate-350 transition-all duration-200">
                <div>
                  <span className="text-4xl font-black text-slate-100 tracking-tight block mb-6">{step.number}</span>
                  <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2.5 text-sm text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* 6. FEATURED CATEGORIES GRID */}
      <section id="categories" className="py-20 md:py-28 border-t border-slate-100 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Capabilities</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mt-2.5">
              Browse top manufacturing capabilities.
            </h2>
            <p className="mt-4 text-base text-slate-600">
              From regulated dietary supplements to precision electronics assembly, find certified industrial partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <div 
                  key={index}
                  className="group relative rounded-2xl bg-white border border-slate-200/80 p-6 hover:border-slate-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-amber-600 group-hover:border-amber-500/20 group-hover:bg-amber-50 transition-all duration-350 mb-6">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{cat.title}</h3>
                    <p className="mt-2 text-xs text-slate-500 leading-relaxed leading-5">
                      {cat.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-amber-600 transition-colors">
                    <span>Explore facilities</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-205" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. BOTTOM CALL TO ACTION (CTA) */}
      <section className="px-6 sm:px-8 pb-20">
        <div className="mx-auto max-w-7xl rounded-3xl bg-slate-900 p-8 md:p-16 text-center relative overflow-hidden shadow-xl shadow-slate-900/10">
          <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-amber-500/10 blur-[80px] pointer-events-none" />
          
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl leading-tight">
            Ready to scale your production?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm md:text-base text-slate-400 leading-relaxed">
            Create a free account to start searching our manufacturer directory or list your facility today.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/register?role=brand"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 active:scale-98 transition-all duration-150"
            >
              Find a Manufacturer
            </Link>
            <Link
              to="/register?role=manufacturer"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-950 px-6 py-3 text-sm font-semibold text-white active:scale-98 transition-all duration-150"
            >
              Claim Manufacturer Profile
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="border-t border-slate-200/80 bg-slate-50 pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          
          {/* 4-Column Layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Company</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#about" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">About Us</a></li>
                <li><a href="#careers" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">Careers</a></li>
                <li><a href="#news" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">Newsroom</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Solutions</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#for-brands" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">For Brands</a></li>
                <li><a href="#for-manufacturers" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">For Manufacturers</a></li>
                <li><a href="#enterprise" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">Enterprise</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Resources</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#directory" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">Directory</a></li>
                <li><a href="#guides" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">Sourcing Guides</a></li>
                <li><a href="#help" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Legal</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#privacy" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">Privacy Policy</a></li>
                <li><a href="#terms" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">Terms of Service</a></li>
                <li><a href="#security" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer Credits */}
          <div className="mt-16 border-t border-slate-200/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <Layers className="h-3 w-3" />
              </div>
              <span className="font-logo text-lg font-bold lowercase text-slate-900 tracking-logo-tight">
                fabricate<sup className="text-[8px] text-amber-500 font-semibold ml-0.5">®</sup>
              </span>
            </div>
            <p className="text-xs text-slate-400">
              &copy; 2026 Fabricate. All rights reserved.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
