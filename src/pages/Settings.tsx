import { useState } from 'react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Building2,
  BellRing,
  Key,
  Users,
  Check,
  Copy,
  Save,
  Shield,
} from 'lucide-react';

type SettingsTab = 'organization' | 'notifications' | 'api' | 'team';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('organization');
  const [saved, setSaved] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  // Form State
  const [companyName, setCompanyName] = useState('ShipNow Global Logistics Inc.');
  const [supportEmail, setSupportEmail] = useState('operations@shipnow-logistics.com');
  const [timezone, setTimezone] = useState('America/Chicago (Central)');
  const [unitSystem, setUnitSystem] = useState('Imperial (lbs, miles)');
  const [currency, setCurrency] = useState('USD ($)');

  // Notification toggles
  const [notifyWeather, setNotifyWeather] = useState(true);
  const [notifyCustoms, setNotifyCustoms] = useState(true);
  const [notifyDelays, setNotifyDelays] = useState(true);
  const [notifySms, setNotifySms] = useState(false);

  // API State
  const [apiKey] = useState('sk_live_shipnow_994827104928172049');
  const [webhookUrl, setWebhookUrl] = useState('https://api.shipnow.io/v1/telemetry/webhook');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 1500);
  };

  return (
    <DashboardLayout
      breadcrumb={['Dashboard', 'Settings']}
      pageTitle="Platform Settings"
      mobileTitle="Settings"
      headerAction={
        <Button
          onClick={handleSave}
          className="flex items-center gap-1.5 !px-4 !py-2.5 text-sm transition active:scale-95"
        >
          {saved ? (
            <>
              <Check size={16} />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <Save size={16} />
              <span className="hidden sm:inline">Save Preferences</span>
            </>
          )}
        </Button>
      }
    >
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex flex-nowrap items-stretch overflow-x-auto rounded-2xl bg-white p-1 shadow-xs border border-surface-border [scrollbar-width:none]">
          {[
            { id: 'organization', label: 'Company Profile', icon: Building2 },
            { id: 'notifications', label: 'Alert Preferences', icon: BellRing },
            { id: 'api', label: 'Telemetry & Webhooks', icon: Key },
            { id: 'team', label: 'Team & Security', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={`shrink-0 flex items-center gap-2 whitespace-nowrap px-4 py-2 text-xs font-semibold rounded-xl transition ${
                  isActive
                    ? 'bg-ink-900 text-white shadow-xs'
                    : 'text-ink-500 hover:text-ink-900'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Organization */}
        {activeTab === 'organization' && (
          <Card className="space-y-6">
            <div className="pb-4 border-b border-surface-border">
              <h3 className="text-base font-bold text-ink-900">Organization & Logistics Firm Profile</h3>
              <p className="text-xs text-ink-500 mt-0.5">
                Primary business identifiers and regional measurement parameters
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-ink-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-muted border border-surface-border text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-ink-700 mb-1">Operations Contact Email</label>
                  <input
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-muted border border-surface-border text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-ink-700 mb-1">Primary Timezone</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-muted border border-surface-border text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                  >
                    <option value="America/Chicago (Central)">America/Chicago (Central)</option>
                    <option value="America/New_York (Eastern)">America/New_York (Eastern)</option>
                    <option value="America/Los_Angeles (Pacific)">America/Los_Angeles (Pacific)</option>
                    <option value="UTC">UTC (Universal Time)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-ink-700 mb-1">Units of Measurement</label>
                  <select
                    value={unitSystem}
                    onChange={(e) => setUnitSystem(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-muted border border-surface-border text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                  >
                    <option value="Imperial (lbs, miles)">Imperial (lbs, miles)</option>
                    <option value="Metric (kg, km)">Metric (kg, km)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-ink-700 mb-1">Freight Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-muted border border-surface-border text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                  >
                    <option value="USD ($)">USD ($)</option>
                    <option value="EUR (€)">EUR (€)</option>
                    <option value="GBP (£)">GBP (£)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="submit" className="!px-5 !py-2 text-xs">
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Tab 2: Alert Preferences */}
        {activeTab === 'notifications' && (
          <Card className="space-y-6">
            <div className="pb-4 border-b border-surface-border">
              <h3 className="text-base font-bold text-ink-900">Automated Notification Rules</h3>
              <p className="text-xs text-ink-500 mt-0.5">
                Configure when dispatchers and drivers receive instant alerts
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <label className="flex items-center justify-between p-3.5 rounded-xl border border-surface-border bg-surface-muted/30 cursor-pointer hover:bg-surface-muted/60 transition">
                <div>
                  <p className="font-bold text-ink-900">Severe Weather & Highway Disruption Alerts</p>
                  <p className="text-[11px] text-ink-500 mt-0.5">
                    Notify active drivers and dispatchers when storms impact interstates
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifyWeather}
                  onChange={(e) => setNotifyWeather(e.target.checked)}
                  className="h-4 w-4 rounded border-surface-border text-brand-600 focus:ring-brand-500"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl border border-surface-border bg-surface-muted/30 cursor-pointer hover:bg-surface-muted/60 transition">
                <div>
                  <p className="font-bold text-ink-900">Customs Clearance Checkpoint Holds</p>
                  <p className="text-[11px] text-ink-500 mt-0.5">
                    Instant alerts when international freight packages require tariff review
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifyCustoms}
                  onChange={(e) => setNotifyCustoms(e.target.checked)}
                  className="h-4 w-4 rounded border-surface-border text-brand-600 focus:ring-brand-500"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl border border-surface-border bg-surface-muted/30 cursor-pointer hover:bg-surface-muted/60 transition">
                <div>
                  <p className="font-bold text-ink-900">ETA Schedule Variance Alerts (&gt;30 min delay)</p>
                  <p className="text-[11px] text-ink-500 mt-0.5">
                    Trigger automated customer re-scheduling if arrival slips past threshold
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifyDelays}
                  onChange={(e) => setNotifyDelays(e.target.checked)}
                  className="h-4 w-4 rounded border-surface-border text-brand-600 focus:ring-brand-500"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl border border-surface-border bg-surface-muted/30 cursor-pointer hover:bg-surface-muted/60 transition">
                <div>
                  <p className="font-bold text-ink-900">SMS Driver Cab Dispatch Alerts</p>
                  <p className="text-[11px] text-ink-500 mt-0.5">
                    Send urgent routing messages directly to commercial driver smartphones
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifySms}
                  onChange={(e) => setNotifySms(e.target.checked)}
                  className="h-4 w-4 rounded border-surface-border text-brand-600 focus:ring-brand-500"
                />
              </label>
            </div>
          </Card>
        )}

        {/* Tab 3: Telemetry & API */}
        {activeTab === 'api' && (
          <Card className="space-y-6">
            <div className="pb-4 border-b border-surface-border">
              <h3 className="text-base font-bold text-ink-900">Telemetry & Webhook Integrations</h3>
              <p className="text-xs text-ink-500 mt-0.5">
                Real-time API keys and webhook endpoints for GPS tracking sync
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-ink-700 mb-1">Production Live API Key</label>
                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    readOnly
                    value={apiKey}
                    className="flex-1 px-3 py-2 rounded-xl bg-surface-muted border border-surface-border text-ink-700 select-all"
                  />
                  <Button
                    variant="secondary"
                    className="!px-3 !py-2 text-xs flex items-center gap-1"
                    onClick={handleCopyKey}
                  >
                    {copiedKey ? (
                      <>
                        <Check size={14} className="text-emerald-600" />
                        <span className="text-emerald-600 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy Key</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-ink-700 mb-1">GPS Telemetry Inbound Webhook</label>
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-muted border border-surface-border text-ink-900 outline-none focus:border-brand-500 focus:bg-white"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-brand-50 border border-brand-200 text-brand-800 text-xs space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Shield size={14} />
                  <span>End-to-End Encrypted Telemetry</span>
                </p>
                <p className="text-[11px] text-brand-700 leading-relaxed">
                  All vehicle position updates over this webhook are verified with HMAC-SHA256 signatures before being published to the live tracking map.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Tab 4: Team & Roles */}
        {activeTab === 'team' && (
          <Card className="space-y-6">
            <div className="pb-4 border-b border-surface-border flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-ink-900">Dispatch Team & Roles</h3>
                <p className="text-xs text-ink-500 mt-0.5">
                  Authorized dispatchers and operations managers
                </p>
              </div>
            </div>

            <div className="divide-y divide-surface-border text-xs">
              {[
                { name: 'Marcus Vance', email: 'm.vance@shipnow.io', role: 'Chief Logistics Officer' },
                { name: 'Sarah Jenkins', email: 's.jenkins@shipnow.io', role: 'Head of Fleet Operations' },
                { name: 'David Ramirez', email: 'd.ramirez@shipnow.io', role: 'Regional Hub Dispatcher' },
                { name: 'Elena Rostova', email: 'e.rostova@shipnow.io', role: 'Fulfillment Supervisor' },
              ].map((member) => (
                <div key={member.email} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-ink-900">{member.name}</p>
                    <p className="text-[11px] text-ink-500">{member.email}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-surface-muted text-ink-700 border border-surface-border">
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
