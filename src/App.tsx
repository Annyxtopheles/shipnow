import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { LoginPage } from '@/pages/Login'
import { DashboardPage } from '@/pages/Dashboard'
import { ShipmentsPage } from '@/pages/Shipments'
import { InvoicesPage } from '@/pages/Invoices'
import { WarehousePage } from '@/pages/Warehouse'
import { TrackingPage } from '@/pages/Tracking'
import { AnalyticsPage } from '@/pages/Analytics'
import { FleetsPage } from '@/pages/Fleets'
import { DriversPage } from '@/pages/Drivers'
import { CalendarPage } from '@/pages/Calendar'
import { MessagesPage } from '@/pages/Messages'
import { NotificationsPage } from '@/pages/Notifications'
import { SettingsPage } from '@/pages/Settings'
import { ShipmentProvider } from '@/context/ShipmentContext'

function LoginRoute() {
  const navigate = useNavigate()
  return <LoginPage onLoginSuccess={() => navigate('/dashboard')} />
}

function App() {
  return (
    <ShipmentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginRoute />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/shipments" element={<ShipmentsPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/warehouse" element={<WarehousePage />} />
          <Route path="/fleets" element={<FleetsPage />} />
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </ShipmentProvider>
  )
}

export default App

