import { useState, useEffect } from 'react'
import axios from 'axios'
import CarCard from '../components/CarCard'
import AddCarForm from '../components/AddCarForm'

interface Car {
  _id: string
  make: string
  model: string
  year: number
  color: string
  price: number
  mileage: number
  fuelType: string
  transmission: string
  description?: string
  imageUrl?: string
}

export default function Home() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/cars`)
      setCars(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching cars:', error)
      setLoading(false)
    }
  }

  const handleAddCar = async (carData: Omit<Car, '_id'>) => {
    try {
      const response = await axios.post(`${API_URL}/api/cars`, carData)
      setCars([response.data, ...cars])
      setShowAddForm(false)
    } catch (error) {
      console.error('Error adding car:', error)
      alert('Error adding car. Please try again.')
    }
  }

  const handleDeleteCar = async (id: string) => {
    if (!confirm('Are you sure you want to delete this car?')) return
    
    try {
      await axios.delete(`${API_URL}/api/cars/${id}`)
      setCars(cars.filter(car => car._id !== id))
    } catch (error) {
      console.error('Error deleting car:', error)
      alert('Error deleting car. Please try again.')
    }
  }

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <div>
            <h1>🚗 Premium Car Collection</h1>
            <p className="header-subtitle">Manage your vehicle inventory with ease</p>
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-number">{cars.length}</span>
              <span className="stat-label">Total Cars</span>
            </div>
          </div>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? '✕ Cancel' : '+ Add New Car'}
        </button>
      </header>

      {showAddForm && (
        <div className="add-form-container">
          <AddCarForm onSubmit={handleAddCar} />
        </div>
      )}

      {loading ? (
        <div className="loading">Loading cars...</div>
      ) : cars.length === 0 ? (
        <div className="empty-state">
          <p>No cars found. Add your first car!</p>
        </div>
      ) : (
        <div className="cars-grid">
          {cars.map(car => (
            <CarCard 
              key={car._id} 
              car={car} 
              onDelete={handleDeleteCar}
            />
          ))}
        </div>
      )}
    </div>
  )
}
