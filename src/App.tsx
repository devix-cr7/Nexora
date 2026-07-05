import { Routes, Route, Navigate } from 'react-router-dom'
import { FolderKanban, Users, FileText, Wallet, Calendar } from 'lucide-react'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ComingSoon from './pages/ComingSoon'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <span className="w-2 h-2 rounded-full bg-brass animate-pulse" />
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />
  return <Layout>{children}</Layout>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <ComingSoon title="المشاريع" icon={FolderKanban} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/clients"
        element={
          <ProtectedRoute>
            <ComingSoon title="العملاء" icon={Users} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/invoices"
        element={
          <ProtectedRoute>
            <ComingSoon title="الفواتير" icon={FileText} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/expenses"
        element={
          <ProtectedRoute>
            <ComingSoon title="المصاريف" icon={Wallet} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <ComingSoon title="المواعيد" icon={Calendar} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
