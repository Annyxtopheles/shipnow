import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { FleetVehicle, FleetVehicleType, FleetStatus } from '@/data/fleets';

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVehicle: (vehicle: FleetVehicle) => void;
}

export function AddVehicleModal({ isOpen, onClose, onAddVehicle }: AddVehicleModalProps) {
  const [name, setName] = useState('');
  const [vin, setVin] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [type, setType] = useState<FleetVehicleType>('Heavy Semi-Truck');
  const [assignedHub, setAssignedHub] = useState('LAX-01');
  const [assignedDriver, setAssignedDriver] = useState('');
  const [maxPayloadLbs, setMaxPayloadLbs] = useState(45000);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !licensePlate) return;

    const newVehicle: FleetVehicle = {
      id: `FLEET-${Math.floor(100 + Math.random() * 900)}`,
      vin: vin || `1FDNE${Math.floor(100000000 + Math.random() * 900000000)}`,
      name,
      type,
      licensePlate,
      status: 'Available' as FleetStatus,
      fuelPercent: 100,
      odometerMiles: 1200,
      lastServiceDate: 'Today',
      assignedDriver: assignedDriver.trim() || undefined,
      assignedHub,
      maxPayloadLbs: Number(maxPayloadLbs),
    };

    setSuccess(true);
    setTimeout(() => {
      onAddVehicle(newVehicle);
      setSuccess(false);
      setName('');
      setVin('');
      setLicensePlate('');
      setAssignedDriver('');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-ink-900/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div>
            <h2 className="text-base font-bold text-ink-900">Onboard Fleet Vehicle</h2>
            <p className="text-xs text-ink-500">Register a new transport asset to the fleet directory</p>
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
            <p className="mt-3 font-bold text-ink-900">Vehicle Registered!</p>
            <p className="text-xs text-ink-500 mt-1">Vehicle has been added and assigned to {assignedHub}.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
            <div>
              <label className="mb-1 block font-semibold text-ink-700">Make & Model Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Freightliner Cascadia 126"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block font-semibold text-ink-700">License Plate</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CA-4921-TX"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-ink-700">Vehicle Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as FleetVehicleType)}
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                >
                  <option value="Heavy Semi-Truck">Heavy Semi-Truck</option>
                  <option value="Refrigerated Van">Refrigerated Van</option>
                  <option value="Express Cargo Van">Express Cargo Van</option>
                  <option value="Flatbed Heavy Haul">Flatbed Heavy Haul</option>
                  <option value="Air Freighter 767">Air Freighter 767</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block font-semibold text-ink-700">Assigned Hub</label>
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

              <div>
                <label className="mb-1 block font-semibold text-ink-700">Max Payload (lbs)</label>
                <input
                  type="number"
                  value={maxPayloadLbs}
                  onChange={(e) => setMaxPayloadLbs(parseInt(e.target.value, 10) || 45000)}
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block font-semibold text-ink-700">Assigned Commercial Driver</label>
                <input
                  type="text"
                  placeholder="Optional driver name"
                  value={assignedDriver}
                  onChange={(e) => setAssignedDriver(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-ink-700">VIN (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. 1FT8W3BT..."
                  value={vin}
                  onChange={(e) => setVin(e.target.value)}
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
                Confirm & Add Vehicle
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
