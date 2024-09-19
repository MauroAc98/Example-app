
import './App.css'
import Header from './components/header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'

function App() {

  return (
    <div>
      <Header logo="TDI" />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
