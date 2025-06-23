import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import CreditForm from './pages/CreditForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/form" element={<CreditForm />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App