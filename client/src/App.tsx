import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import ProtectedRoutes from './ProtectedRoutes'
import Home from './pages/Home'
import Register from './pages/Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route for login */}
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Protected route */}
        <Route element={<ProtectedRoutes />}>
          {/* Add all protected routes inside here */}
          <Route path="/" element={<Home/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
