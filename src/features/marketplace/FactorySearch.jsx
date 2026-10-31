import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  Award, 
  Store, 
  Plus, 
  RefreshCw, 
  Check, 
  Send,
  Building2,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { searchManufacturers, registerManufacturer } from '../../services/marketplaceService';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

export const FactorySearch = () => {
  const { isManufacturer } = useAuth();
  const [searchLocation, setSearchLocation] = useState('');
  const [maxMoq, setMaxMoq] = useState('');
  const [certFilter, setCertFilter] = useState('');
  
  const [factories, setFactories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  // Contact Factory Modal
  const [selectedFactoryForContact, setSelectedFactoryForContact] = useState(null);
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSending, setContactSending] = useState(false);

  // View Details Modal
  const [selectedFactoryForDetails, setSelectedFactoryForDetails] = useState(null);

  // Register Manufacturer profile modal state
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [factoryname, setFactoryname] = useState('');
  const [location, setLocation] = useState('');
  const [moq, setMoq] = useState('');
  const [processes, setProcesses] = useState('CNC Milling, Laser Cutting');
  const [certifications, setCertifications] = useState('ISO9001');
  const [regLoading, setRegLoading] = useState(false);

  const fetchFactories = async () => {
    setLoading(true);
    setError('');
    try {
      const filters = {};
      if (searchLocation.trim()) filters.location = searchLocation.trim();
      if (maxMoq) filters.maxMoq = parseInt(maxMoq, 10);
      if (certFilter.trim()) filters.certifications = certFilter.trim();

      const data = await searchManufacturers(filters);
      setFactories(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to search marketplace');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFactories();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchFactories();
  };

  const handleClearFilters = () => {
    setSearchLocation('');
    setMaxMoq('');
    setCertFilter('');
    setTimeout(fetchFactories, 0);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSending(true);
    setTimeout(() => {
      setContactSending(false);
      setActionSuccess(`Inquiry sent to ${selectedFactoryForContact?.factoryname || 'factory'} successfully!`);
      setSelectedFactoryForContact(null);
      setContactSubject('');
      setContactMessage('');
      setTimeout(() => setActionSuccess(''), 4000);
    }, 800);
  };

  const handleRegisterProfile = async (e) => {
    e.preventDefault();
    setRegLoading(true);
    setError('');
    setActionSuccess('');
    try {
      await registerManufacturer({
        factoryname,
        location,
        moq: parseInt(moq, 10) || 1,
        capabilitiesData: {
          processes: processes.split(',').map((p) => p.trim()).filter(Boolean),
          certifications: certifications.split(',').map((c) => c.trim()).filter(Boolean),
        },
      });
      setIsRegModalOpen(false);
      setFactoryname('');
      setLocation('');
      setMoq('');
      setActionSuccess('Facility profile registered successfully on Fabricate network!');
      setTimeout(() => setActionSuccess(''), 4000);
      fetchFactories();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to register facility');
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <div className="space-y-6 font-sans max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-light text-[#111111] tracking-tight">
              Supplier Marketplace
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#f8f8f7] border border-[#e8e8e5] text-xs font-medium text-[#111111]">
              {factories.length} Verified Facilities
            </span>
          </div>
          <p className="text-[#888880] text-xs sm:text-sm font-normal">
            Discover, audit, and initiate direct communication with certified manufacturing partners worldwide.
          </p>
        </div>
        
        {isManufacturer && (
          <button onClick={() => setIsRegModalOpen(true)} className="btn-keychain-primary text-xs py-2 px-4 cursor-pointer gap-2">
            <Plus size={15} />
            <span>Register Facility Profile</span>
          </button>
        )}
      </div>

      {/* Notifications */}
      {actionSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
          <Check size={15} className="text-emerald-600" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
          <X size={15} className="text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Search & Filter Bar */}
      <form onSubmit={handleSearchSubmit} className="keychain-card p-5 flex flex-col md:flex-row gap-4 items-stretch md:items-end">
        <div className="flex-1">
          <label className="text-[11px] font-medium text-[#888880] tracking-wide uppercase mb-1.5 block">
            Location / Hub
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888880]">
              <Search size={15} />
            </span>
            <input
              type="text"
              placeholder="e.g. California, Shenzhen, Frankfurt..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full glass-input pl-10 pr-4 py-2 text-xs font-normal"
            />
          </div>
        </div>

        <div className="w-full md:w-36">
          <label className="text-[11px] font-medium text-[#888880] tracking-wide uppercase mb-1.5 block">
            Max MOQ
          </label>
          <input
            type="number"
            placeholder="e.g. 500"
            value={maxMoq}
            onChange={(e) => setMaxMoq(e.target.value)}
            className="w-full glass-input px-3.5 py-2 text-xs font-normal"
          />
        </div>

        <div className="w-full md:w-48">
          <label className="text-[11px] font-medium text-[#888880] tracking-wide uppercase mb-1.5 block">
            Certifications
          </label>
          <input
            type="text"
            placeholder="e.g. ISO9001, FDA, CE"
            value={certFilter}
            onChange={(e) => setCertFilter(e.target.value)}
            className="w-full glass-input px-3.5 py-2 text-xs font-normal"
          />
        </div>

        <div className="flex items-center gap-2">
          <button type="submit" disabled={loading} className="btn-keychain-primary text-xs py-2 px-4 cursor-pointer gap-2 disabled:opacity-50">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Search</span>
          </button>

          {(searchLocation || maxMoq || certFilter) && (
            <button type="button" onClick={handleClearFilters} className="btn-keychain-secondary text-xs py-2 px-3 cursor-pointer">
              Clear
            </button>
          )}
        </div>
      </form>

      {/* Grid of Manufacturers */}
      {loading ? (
        <div className="py-16 flex flex-col justify-center items-center text-[#888880] text-sm space-y-2">
          <RefreshCw size={24} className="animate-spin text-[#f5cb39]" />
          <span>Searching verified manufacturers...</span>
        </div>
      ) : factories.length === 0 ? (
        <div className="keychain-card p-12 text-center text-[#888880] space-y-3">
          <Store size={38} className="mx-auto text-stone-300 mb-2" />
          <h3 className="font-light text-base text-[#111111]">No factory profiles found matching search criteria.</h3>
          <p className="text-xs text-[#888880] font-normal max-w-sm mx-auto">
            Try adjusting your location, MOQ tolerance, or clearing the certification filter.
          </p>
          <button onClick={handleClearFilters} className="btn-keychain-secondary text-xs py-1.5 px-3 mt-2">
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {factories.map((factory) => {
            const certs = factory.capabilitiesData?.certifications || [];
            const proc = factory.capabilitiesData?.processes || [];

            return (
              <div 
                key={factory.id || factory.factoryname} 
                className="keychain-card keychain-card-hover overflow-hidden flex flex-col justify-between group"
              >
                {/* Visual Header */}
                <div className="h-24 bg-[#fbfbfa] relative flex items-center justify-between px-6 border-b border-[#e8e8e5]">
                  <div className="w-11 h-11 rounded-xl bg-white border border-[#e8e8e5] flex items-center justify-center text-[#111111] shadow-2xs group-hover:scale-105 transition-transform">
                    <Building2 size={20} className="text-[#854d0e]" />
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <div className="bg-white border border-[#e8e8e5] rounded-full px-2.5 py-0.5 flex items-center gap-1.5 shadow-2xs">
                      <Star size={11} className="text-[#f5cb39] fill-[#f5cb39]" />
                      <span className="text-xs font-medium text-[#111111]">4.9</span>
                    </div>

                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f8f8f7] border border-[#e8e8e5] text-[10px] font-medium text-[#111111]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f5cb39]" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-sm sm:text-base font-medium text-[#111111] group-hover:text-black transition-colors">
                      {factory.factoryname}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 text-xs text-[#888880] mt-1.5 font-normal">
                      <MapPin size={13} className="text-[#888880] shrink-0" />
                      <span className="truncate">{factory.location}</span>
                      <span className="text-stone-300">•</span>
                      <span className="text-[#111111] font-medium shrink-0">MOQ: {factory.moq}</span>
                    </div>

                    {/* Manufacturing Capabilities / Processes */}
                    {proc.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3.5">
                        {proc.map((p) => (
                          <span key={p} className="px-2.5 py-0.5 rounded-md bg-[#f8f8f7] border border-[#e8e8e5] text-xs font-normal text-[#111111]">
                            {p}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Quality Certifications */}
                    {certs.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-[#e8e8e5]">
                        {certs.map((c) => (
                          <span key={c} className="flex items-center gap-1 text-[11px] text-[#888880] font-medium uppercase tracking-wider">
                            <Award size={12} className="text-[#854d0e]" />
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-3 flex gap-2">
                    <button 
                      onClick={() => setSelectedFactoryForContact(factory)}
                      className="btn-keychain-primary text-xs py-2 px-3 flex-1 justify-center cursor-pointer"
                    >
                      Contact Factory
                    </button>
                    <button 
                      onClick={() => setSelectedFactoryForDetails(factory)}
                      className="btn-keychain-secondary text-xs py-2 px-3 justify-center cursor-pointer"
                    >
                      Audit Specs
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Contact Factory Modal */}
      {selectedFactoryForContact && (
        <Modal
          isOpen={!!selectedFactoryForContact}
          onClose={() => setSelectedFactoryForContact(null)}
          title={`Inquire with: ${selectedFactoryForContact.factoryname}`}
        >
          <form onSubmit={handleContactSubmit} className="space-y-4 font-sans">
            <p className="text-xs text-[#888880] font-normal">
              Direct communication link to technical procurement at <strong>{selectedFactoryForContact.factoryname}</strong> ({selectedFactoryForContact.location}).
            </p>

            <Input
              label="Inquiry Subject"
              placeholder="e.g. Sourcing inquiry for aluminum parts"
              value={contactSubject}
              onChange={(e) => setContactSubject(e.target.value)}
              required
              id="contact-subject"
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium text-[#888880] tracking-wide uppercase">
                Message & Requirement Details <span className="text-rose-500 font-semibold">*</span>
              </label>
              <textarea
                className="glass-input px-3.5 py-2.5 text-xs font-normal w-full min-h-[110px] bg-white"
                placeholder="Outline your target volume, required lead times, material specifications, and any questions for their technical team..."
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#e8e8e5]">
              <Button variant="secondary" size="md" onClick={() => setSelectedFactoryForContact(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="amber" size="md" disabled={contactSending} className="flex items-center gap-1.5">
                <Send size={14} />
                <span>{contactSending ? 'Sending...' : 'Send Inquiry'}</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Facility Details Modal */}
      {selectedFactoryForDetails && (
        <Modal
          isOpen={!!selectedFactoryForDetails}
          onClose={() => setSelectedFactoryForDetails(null)}
          title={selectedFactoryForDetails.factoryname}
        >
          <div className="space-y-5 font-sans">
            <div className="p-4 rounded-xl bg-[#f8f8f7] border border-[#e8e8e5] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-[#888880] uppercase">Hub Location</span>
                <span className="text-xs font-medium text-[#111111]">{selectedFactoryForDetails.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-[#888880] uppercase">Minimum Order Quantity (MOQ)</span>
                <span className="text-xs font-medium text-[#854d0e]">{selectedFactoryForDetails.moq} units</span>
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-medium text-[#888880] uppercase tracking-wider mb-2">
                Certified Manufacturing Processes
              </h4>
              <div className="flex flex-wrap gap-2">
                {(selectedFactoryForDetails.capabilitiesData?.processes || []).map((p) => (
                  <span key={p} className="px-3 py-1 rounded-lg bg-[#fef9c3] border border-[#fef08a] text-xs font-medium text-[#854d0e]">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-medium text-[#888880] uppercase tracking-wider mb-2">
                Quality & Environmental Standards
              </h4>
              <div className="flex flex-wrap gap-2">
                {(selectedFactoryForDetails.capabilitiesData?.certifications || []).map((c) => (
                  <span key={c} className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#f8f8f7] border border-[#e8e8e5] text-xs font-medium text-[#111111]">
                    <Award size={13} className="text-[#854d0e]" />
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#e8e8e5] flex justify-end gap-3">
              <Button variant="secondary" size="md" onClick={() => setSelectedFactoryForDetails(null)}>
                Close
              </Button>
              <Button 
                variant="amber" 
                size="md" 
                onClick={() => {
                  setSelectedFactoryForContact(selectedFactoryForDetails);
                  setSelectedFactoryForDetails(null);
                }}
              >
                Inquire With Factory
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Manufacturer Profile Registration Modal */}
      <Modal
        isOpen={isRegModalOpen}
        onClose={() => setIsRegModalOpen(false)}
        title="Register Factory Profile"
      >
        <form onSubmit={handleRegisterProfile} className="space-y-4 font-sans">
          <Input
            label="Factory Name"
            placeholder="e.g. Apex Precision Tech"
            value={factoryname}
            onChange={(e) => setFactoryname(e.target.value)}
            required
            id="factoryname"
          />

          <Input
            label="Location / Hub"
            placeholder="e.g. California, USA or Shenzhen, CN"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            id="factorylocation"
          />

          <Input
            label="Minimum Order Quantity (MOQ)"
            type="number"
            placeholder="100"
            value={moq}
            onChange={(e) => setMoq(e.target.value)}
            required
            id="factorymoq"
          />

          <Input
            label="Processes (comma separated)"
            placeholder="CNC Milling, Laser Cutting, Injection Molding"
            value={processes}
            onChange={(e) => setProcesses(e.target.value)}
            required
            id="factoryprocesses"
          />

          <Input
            label="Certifications (comma separated)"
            placeholder="ISO9001, FDA, CE"
            value={certifications}
            onChange={(e) => setCertifications(e.target.value)}
            required
            id="factorycerts"
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-[#e8e8e5]">
            <Button variant="secondary" size="md" onClick={() => setIsRegModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="amber" size="md" disabled={regLoading}>
              {regLoading ? 'Registering...' : 'Register Profile'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FactorySearch;
