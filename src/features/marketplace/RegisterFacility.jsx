import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ShieldCheck, Check, ArrowRight, Sparkles, Layers, Award } from 'lucide-react';
import { registerManufacturer } from '../../services/marketplaceService';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

const SUGGESTED_PROCESSES = [
  'CNC Machining',
  'Beverage Canning',
  'Aseptic Cold Fill',
  'Contract Bakery',
  'Powder Blending',
  'Pouch Packaging',
  'Injection Molding',
  'Cleanroom Extraction',
];

const SUGGESTED_CERTS = [
  'ISO9001',
  'FDA Registered',
  'cGMP Compliant',
  'HACCP Certified',
  'SQF Level 3',
  'USDA Organic',
  'Non-GMO Verified',
  'Kosher Certified',
];

export const RegisterFacility = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [factoryname, setFactoryname] = useState(user?.company || localStorage.getItem('userCompany') || '');
  const [location, setLocation] = useState('');
  const [moq, setMoq] = useState('');
  const [selectedProcesses, setSelectedProcesses] = useState(['CNC Machining']);
  const [customProcess, setCustomProcess] = useState('');
  const [selectedCerts, setSelectedCerts] = useState(['ISO9001', 'FDA Registered']);
  const [customCert, setCustomCert] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const toggleProcess = (p) => {
    setSelectedProcesses((prev) =>
      prev.includes(p) ? prev.filter((item) => item !== p) : [...prev, p]
    );
  };

  const handleAddCustomProcess = (e) => {
    e.preventDefault();
    if (customProcess.trim() && !selectedProcesses.includes(customProcess.trim())) {
      setSelectedProcesses((prev) => [...prev, customProcess.trim()]);
      setCustomProcess('');
    }
  };

  const toggleCert = (c) => {
    setSelectedCerts((prev) =>
      prev.includes(c) ? prev.filter((item) => item !== c) : [...prev, c]
    );
  };

  const handleAddCustomCert = (e) => {
    e.preventDefault();
    if (customCert.trim() && !selectedCerts.includes(customCert.trim())) {
      setSelectedCerts((prev) => [...prev, customCert.trim()]);
      setCustomCert('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!factoryname.trim()) {
      setError('Please provide a factory or facility name');
      return;
    }
    if (!location.trim()) {
      setError('Please provide your facility location (city, state/country)');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await registerManufacturer({
        factoryname: factoryname.trim(),
        location: location.trim(),
        moq: parseInt(moq, 10) || 100,
        capabilitiesData: {
          processes: selectedProcesses,
          certifications: selectedCerts,
        },
      });

      localStorage.setItem('hasFacilityProfile', 'true');
      setSuccess(true);

      setTimeout(() => {
        navigate('/app/sourcing', { replace: true });
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to register facility profile. Please try again.'
      );
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-2 font-sans space-y-3">
      {/* Onboarding Header */}
      <div className="keychain-card px-5 py-3.5 sm:py-4 bg-white border border-[#e8e8e5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#854d0e] uppercase tracking-wider mb-1">
            <Sparkles size={13} className="text-[#854d0e]" />
            <span>Manufacturer Onboarding</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-medium text-[#111111] tracking-tight">
            Register Facility Profile
          </h1>
        </div>
        <p className="text-xs text-[#666660] max-w-sm sm:text-right leading-snug">
          Complete facility specifications to unlock quotes and bidding on open brand RFQs.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="keychain-card p-5 sm:p-6">
        {success ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check size={20} />
            </div>
            <h2 className="text-lg font-light text-[#111111] tracking-tight">
              Facility Profile Registered!
            </h2>
            <p className="text-xs text-[#888880] max-w-sm mx-auto">
              Your capabilities are now live on the network. Redirecting you to open brand RFQs...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {error}
              </div>
            )}

            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-[#111111] flex items-center gap-2 pb-2 border-b border-[#f0f0ed]">
                <Building2 size={16} className="text-[#888880]" />
                <span>Facility Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Factory / Company Name"
                  placeholder="e.g. Apex Precision Labs"
                  value={factoryname}
                  onChange={(e) => setFactoryname(e.target.value)}
                  required
                  id="factoryname"
                />

                <Input
                  label="Facility Location / Hub"
                  placeholder="e.g. Chicago, IL, USA"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  id="location"
                />
              </div>

              <div>
                <Input
                  label="Minimum Order Quantity (MOQ)"
                  type="number"
                  placeholder="e.g. 500 units"
                  value={moq}
                  onChange={(e) => setMoq(e.target.value)}
                  required
                  id="moq"
                />
                <span className="text-[11px] text-[#888880] mt-1 block">
                  Lowest volume your facility accepts for standard production runs.
                </span>
              </div>
            </div>

            {/* Manufacturing Capabilities & Processes */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-semibold text-[#111111] flex items-center gap-2 pb-2 border-b border-[#f0f0ed]">
                <Layers size={16} className="text-[#888880]" />
                <span>Manufacturing Capabilities</span>
              </h3>
              <p className="text-xs text-[#888880]">
                Select the capabilities your facility supports so brand algorithms can match your machinery:
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTED_PROCESSES.map((proc) => {
                  const active = selectedProcesses.includes(proc);
                  return (
                    <button
                      type="button"
                      key={proc}
                      onClick={() => toggleProcess(proc)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                        active
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'bg-[#fafaf9] text-[#666660] border-[#e8e8e5] hover:border-[#111111]'
                      }`}
                    >
                      {proc}
                    </button>
                  );
                })}
              </div>

              {/* Add Custom Process */}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Add custom process (e.g. Sachet Packing)..."
                  value={customProcess}
                  onChange={(e) => setCustomProcess(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCustomProcess(e);
                    }
                  }}
                  className="flex-1 text-xs px-3 py-2 rounded-lg border border-[#e8e8e5] bg-[#fafaf9] focus:outline-none focus:border-[#111111]"
                />
                <button
                  type="button"
                  onClick={handleAddCustomProcess}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#fafaf9] border border-[#e8e8e5] hover:bg-[#f0f0ed] text-[#111111]"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Certifications & Quality Audits */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-semibold text-[#111111] flex items-center gap-2 pb-2 border-b border-[#f0f0ed]">
                <Award size={16} className="text-[#888880]" />
                <span>Facility Certifications</span>
              </h3>
              <p className="text-xs text-[#888880]">
                Select the quality standards and regulatory compliance audited at your plant:
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTED_CERTS.map((cert) => {
                  const active = selectedCerts.includes(cert);
                  return (
                    <button
                      type="button"
                      key={cert}
                      onClick={() => toggleCert(cert)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                        active
                          ? 'bg-[#f5cb39] text-[#111111] font-bold border-[#f5cb39]'
                          : 'bg-[#fafaf9] text-[#666660] border-[#e8e8e5] hover:border-[#111111]'
                      }`}
                    >
                      {cert}
                    </button>
                  );
                })}
              </div>

              {/* Add Custom Cert */}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Add custom certification (e.g. BRCGS)..."
                  value={customCert}
                  onChange={(e) => setCustomCert(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCustomCert(e);
                    }
                  }}
                  className="flex-1 text-xs px-3 py-2 rounded-lg border border-[#e8e8e5] bg-[#fafaf9] focus:outline-none focus:border-[#111111]"
                />
                <button
                  type="button"
                  onClick={handleAddCustomCert}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#fafaf9] border border-[#e8e8e5] hover:bg-[#f0f0ed] text-[#111111]"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-[#f0f0ed] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[11px] text-[#888880]">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Encrypted profile stored on verified Fabricate ledger.</span>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={loading}
                className="w-full sm:w-auto"
              >
                <span>{loading ? 'Registering Facility...' : 'Save & Activate Facility'}</span>
                <ArrowRight size={14} />
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterFacility;
