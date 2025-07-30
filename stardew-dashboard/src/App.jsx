import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import ViewPlayers from './pages/ViewPlayers'
import CreatePlayer from './pages/CreatePlayer'
import EditPlayer from './pages/EditPlayer'
import PlayerDetail from './pages/PlayerDetail'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar">
          <div className="nav-header">
            <h1>🌟 Stardew Valley Team Builder 🌟</h1>
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link">Dashboard</Link>
            <Link to="/create" className="nav-link">Add Farmer</Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<ViewPlayers />} />
            <Route path="/create" element={<CreatePlayer />} />
            <Route path="/edit/:id" element={<EditPlayer />} />
            <Route path="/player/:id" element={<PlayerDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App