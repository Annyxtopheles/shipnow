import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { CommercialDriver, LicenseClass, DriverStatus } from '@/data/drivers';

interface AddDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDriver: (driver: CommercialDriver) => void;
}

export function AddDriverModal({ isOpen, onClose, onAddDriver }: AddDriverModalProps) {
  const [name, setName] = useState('');
  const [licenseClass, setLicenseClass] = useState<LicenseClass>('Class A CDL');
  const [assignedHub, setAssignedHub] = useState('LAX-01');
  const [assignedVehicleId, setAssignedVehicleId] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [experienceYears, setExperienceYears] = useState(5);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const newDriver: CommercialDriver = {
      id: `DRV-${Math.floor(100 + Math.random() * 900)}`,
      name,
      licenseClass,
      status: 'On Duty' as DriverStatus,
      experienceYears: Number(experienceYears),
      accidentFreeMiles: 50000,
      safetyRating: 5.0,
      assignedVehicleId: assignedVehicleId.trim() || undefined,
      assignedHub,
      phone,
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@shipnow-logistics.com`,
      hosRemainingHours: 11.0,
    };

    setSuccess(true);
    setTimeout(() => {
      onAddDriver(newDriver);
      setSuccess(false);
      setName('');
      setPhone('');
      setEmail('');
      setAssignedVehicleId('');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-ink-900/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div>
            <h2 className="text-base font-bold text-ink-900">Onboard Commercial Driver</h2>
            <p className="text-xs text-ink-500">Add an operator to the certified logistics personnel roster</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-ink-500 hover:bg-surface-muted hover:text-ink-900"
          >
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Check size={24} />
            </div>
            <p className="mt-3 font-bold text-ink-900">Driver Onboarded!</p>
            <p className="text-xs text-ink-500 mt-1">Personnel profile initialized and ELD logs active.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
            <div>
              <label className="mb-1 block font-semibold text-ink-700">Full Legal Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Jordan Hayes"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block font-semibold text-ink-700">License Certification</label>
                <select
                  value={licenseClass}
                  onChange={(e) => setLicenseClass(e.target.value as LicenseClass)}
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                >
                  <option value="Class A CDL">Class A CDL</option>
                  <option value="Class B CDL">Class B CDL</option>
                  <option value="HazMat Certified CDL">HazMat Certified CDL</option>
                  <option value="Commercial Pilot 767">Commercial Pilot 767</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-ink-700">Home Hub Base</label>
                <select
                  value={assignedHub}
                  onChange={(e) => setAssignedHub(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                >
                  <option value="LAX-01">LAX-01 (Los Angeles)</option>
                  <option value="ORD-02">ORD-02 (Chicago)</option>
                  <option value="DFW-03">DFW-03 (Dallas)</option>
                  <option value="JFK-04">JFK-04 (New York)</option>
                  <option value="ATL-05">ATL-05 (Atlanta)</option>
                  <option value="SEA-06">SEA-06 (Seattle)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block font-semibold text-ink-700">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-ink-700">Years Commercial Experience</label>
                <input
                  type="number"
                  min={1}
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(parseInt(e.target.value, 10) || 1)}
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block font-semibold text-ink-700">Assigned Vehicle Unit ID</label>
                <input
                  type="text"
                  placeholder="e.g. FLEET-TRK-112"
                  value={assignedVehicleId}
                  onChange={(e) => setAssignedVehicleId(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-ink-700">Company Email</label>
                <input
                  type="email"
                  placeholder="Optional email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-3 border-t border-surface-border pt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-surface-border px-4 py-2 font-semibold text-ink-700 hover:bg-surface-muted text-xs"
              >
                Cancel
              </button>
              <Button type="submit" className="!px-5 !py-2 text-xs">
                Confirm & Onboard Driver
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
