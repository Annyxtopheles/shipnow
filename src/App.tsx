import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { LoginPage } from '@/pages/Login'
import { DashboardPage } from '@/pages/Dashboard'
import { PlaceholderPage } from '@/pages/Placeholder'
import { ShipmentsPage } from '@/pages/Shipments'
import { InvoicesPage } from '@/pages/Invoices'
import { WarehousePage } from '@/pages/Warehouse'
import { TrackingPage } from '@/pages/Tracking'
import { AnalyticsPage } from '@/pages/Analytics'
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
          <Route path="/calendar" element={<PlaceholderPage title="Calendar" />} />
          <Route path="/shipments" element={<ShipmentsPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/warehouse" element={<WarehousePage />} />
          <Route path="/fleets" element={<PlaceholderPage title="Fleets" />} />
          <Route path="/drivers" element={<PlaceholderPage title="Drivers" />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/messages" element={<PlaceholderPage title="Messages" />} />
          <Route path="/notifications" element={<PlaceholderPage title="Notifications" />} />
          <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
        </Routes>
      </BrowserRouter>
    </ShipmentProvider>
  )
}

export default App

