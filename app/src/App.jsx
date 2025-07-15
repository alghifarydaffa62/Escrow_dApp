import './App.css'
import Home from './pages/home'
import { Routes, Route } from 'react-router-dom'
import EscrowDetail from './pages/EscrowDetail'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/escrow/:address' element={<EscrowDetail/>}/>
    </Routes>
  )

}

export default App