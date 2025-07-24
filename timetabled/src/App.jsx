import './App.css'
import Calendar from './components/Calendar'

const App = () => {
  return (
    <div className="App">
      <h1>Itinerary for 7 Days in Boston 🌆</h1>
      <h2>Welcome to Boston, thflinh! Check out this calendar to get to know
        the city and see all the sights during your stay.
      </h2>
      <Calendar />
    </div>
  )
}

export default App