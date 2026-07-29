import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { LoginPage } from '@/pages/Login'
import { DashboardPage } from '@/pages/Dashboard'
import { PlaceholderPage } from '@/pages/Placeholder'
import { ShipmentsPage } from '@/pages/Shipments'

function LoginRoute() {
  const navigate = useNavigate()
  return <LoginPage onLoginSuccess={() => navigate('/dashboard')} />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRoute />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/analytics" element={<PlaceholderPage title="Analytics" />} />
        <Route path="/calendar" element={<PlaceholderPage title="Calendar" />} />
        <Route path="/shipments" element={<ShipmentsPage />} />
        <Route path="/tracking" element={<PlaceholderPage title="Tracking" />} />
        <Route path="/warehouse" element={<PlaceholderPage title="Warehouse" />} />
        <Route path="/fleets" element={<PlaceholderPage title="Fleets" />} />
        <Route path="/drivers" element={<PlaceholderPage title="Drivers" />} />
        <Route path="/invoices" element={<PlaceholderPage title="Invoices & Billing" />} />
        <Route path="/messages" element={<PlaceholderPage title="Messages" />} />
        <Route path="/notifications" element={<PlaceholderPage title="Notifications" />} />
        <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
