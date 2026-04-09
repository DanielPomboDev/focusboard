import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Login from './pages/auth/Login'
import Register from "./pages/auth/Register"

function App() {
  return (
    <BrowserRouter>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1c2333',
            color: '#f0ede6',
            border: '1px solid #2a3347',
            fontFamily: 'DM Sans, sans-serif',
          },
          success: {
            iconTheme: { primary: '#34d399', secondary: '#1c2333' },
          },
          error: {
            iconTheme: { primary: '#f87171', secondary: '#1c2333' },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
