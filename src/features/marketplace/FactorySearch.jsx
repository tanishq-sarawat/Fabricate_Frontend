import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Award, ExternalLink, Store, Plus, RefreshCw } from 'lucide-react';
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

  // Register Manufacturer profile modal state
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [factoryname, setFactoryname] = useState('');
  const [location, setLocation] = useState('');
  const [moq, setMoq] = useState('');
  const [processes, setProcesses] = useState('CNC Milling, Laser Cutting');
  const [certifications, setCertifications] = useState('ISO9001');
  const [regLoading, setRegLoading] = useState(false);
  const [regMessage, setRegMessage] = useState('');

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

  const handleRegisterProfile = async (e) => {
    e.preventDefault();
    setRegLoading(true);
    setRegMessage('');
    try {
      const profileData = {
        factoryname,
        location,
        moq: parseInt(moq, 10) || 100,
        capabilitiesData: {
          certifications: certifications.split(',').map((s) => s.trim()).filter(Boolean),
          processes: processes.split(',').map((s) => s.trim()).filter(Boolean),
        },
      };

      await registerManufacturer(profileData);
      setRegMessage('Factory profile registered successfully!');
      setIsRegModalOpen(false);
      fetchFactories();
    } catch (err) {
      setRegMessage(err.response?.data?.message || err.message || 'Failed to register factory profile');
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-extrabold text-slate-900 font-sans">Marketplace & Suppliers</h1>
          <p className="text-slate-600 text-sm">Discover and audit verified manufacturing suppliers across global hubs.</p>
        </div>
        
        {isManufacturer && (
          <Button variant="primary" size="md" onClick={() => setIsRegModalOpen(true)} className="flex items-center gap-2">
            <Plus size={16} />
            <span>Register Factory Profile</span>
          </Button>
        )}
      </div>

      {/* Search Filters Form */}
      <form onSubmit={handleSearchSubmit} className="glass-panel p-5 rounded-2xl border border-slate-200 flex flex-col md:flex-row gap-4 items-end bg-white shadow-xs">
        <div className="flex-1 w-full">
          <label className="text-xs font-bold text-slate-600 tracking-wide uppercase mb-1.5 block">Location Filter</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="e.g. California, Shenzhen..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full glass-input pl-10 pr-4 py-2 text-sm"
            />
          </div>
        </div>

        <div className="w-full md:w-40">
          <label className="text-xs font-bold text-slate-600 tracking-wide uppercase mb-1.5 block">Max MOQ</label>
          <input
            type="number"
            placeholder="e.g. 500"
            value={maxMoq}
            onChange={(e) => setMaxMoq(e.target.value)}
            className="w-full glass-input px-3.5 py-2 text-sm"
          />
        </div>

        <div className="w-full md:w-48">
          <label className="text-xs font-bold text-slate-600 tracking-wide uppercase mb-1.5 block">Certifications</label>
          <input
            type="text"
            placeholder="e.g. ISO9001"
            value={certFilter}
            onChange={(e) => setCertFilter(e.target.value)}
            className="w-full glass-input px-3.5 py-2 text-sm"
          />
        </div>

        <Button type="submit" variant="primary" size="md" disabled={loading} className="w-full md:w-auto flex items-center justify-center gap-2">
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          <span>Search</span>
        </Button>
      </form>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Grid of Manufacturers */}
      {loading ? (
        <div className="py-12 flex justify-center items-center text-slate-500 text-sm">
          <RefreshCw size={24} className="animate-spin text-amber-500 mr-3" /> Loading marketplace data...
        </div>
      ) : factories.length === 0 ? (
        <div className="glass-card p-12 text-center text-slate-500 space-y-3 bg-white">
          <Store size={40} className="mx-auto text-slate-400 mb-2" />
          <p className="font-bold text-base text-slate-800">No factory profiles found matching search criteria.</p>
          <p className="text-xs text-slate-500">Try clearing filters or register a new manufacturer profile.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {factories.map((factory) => {
            const certs = factory.capabilitiesData?.certifications || [];
            const proc = factory.capabilitiesData?.processes || [];

            return (
              <div key={factory.id || factory.factoryname} className="glass-card overflow-hidden flex flex-col justify-between group bg-white border border-slate-200">
                <div className="h-36 bg-slate-100 relative flex items-center justify-center border-b border-slate-200">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 group-hover:border-amber-500/40 transition-all duration-300 flex items-center justify-center text-slate-700 shadow-xs">
                    <Store size={26} className="group-hover:text-amber-600 transition-colors" />
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 border border-slate-200 rounded-lg px-2.5 py-1 flex items-center gap-1.5 shadow-xs">
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                    <span className="text-[11px] font-bold text-slate-900">4.8</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{factory.factoryname}</h3>
                    
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                      <MapPin size={14} className="text-slate-400" />
                      <span>{factory.location}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-700 font-bold">MOQ: {factory.moq}</span>
                    </div>

                    {/* Processes */}
                    {proc.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {proc.map((p) => (
                          <span key={p} className="px-2.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-[10px] font-bold text-amber-800">
                            {p}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Certifications */}
                    {certs.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {certs.map((c) => (
                          <span key={c} className="flex items-center gap-1 text-[9px] text-slate-600 font-bold uppercase tracking-wider">
                            <Award size={10} className="text-amber-500" />
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex gap-2">
                    <Button variant="primary" size="sm" className="flex-1">
                      Contact Factory
                    </Button>
                    <Button variant="secondary" size="sm" className="p-2 border border-slate-200">
                      <ExternalLink size={14} className="text-slate-500" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Manufacturer Profile Registration Modal */}
      <Modal
        isOpen={isRegModalOpen}
        onClose={() => setIsRegModalOpen(false)}
        title="Register Factory Profile"
      >
        <form onSubmit={handleRegisterProfile} className="space-y-4">
          <Input
            label="Factory Name"
            placeholder="Apex Precision Tech"
            value={factoryname}
            onChange={(e) => setFactoryname(e.target.value)}
            required
            id="factoryname"
          />

          <Input
            label="Location"
            placeholder="California, USA"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            id="location"
          />

          <Input
            label="Minimum Order Quantity (MOQ)"
            type="number"
            placeholder="100"
            value={moq}
            onChange={(e) => setMoq(e.target.value)}
            required
            id="moq"
          />

          <Input
            label="Capabilities / Processes (Comma-separated)"
            placeholder="CNC Milling, Laser Cutting, 3D Printing"
            value={processes}
            onChange={(e) => setProcesses(e.target.value)}
            id="processes"
          />

          <Input
            label="Certifications (Comma-separated)"
            placeholder="ISO9001, AS9100D"
            value={certifications}
            onChange={(e) => setCertifications(e.target.value)}
            id="certifications"
          />

          {regMessage && (
            <div className="text-xs text-amber-800 font-semibold p-2.5 bg-amber-50 rounded-lg border border-amber-200">
              {regMessage}
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" size="md" onClick={() => setIsRegModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" disabled={regLoading}>
              {regLoading ? 'Registering...' : 'Save Profile'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FactorySearch;
