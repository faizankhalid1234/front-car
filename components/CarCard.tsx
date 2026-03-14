import { useState } from 'react'
import axios from 'axios'
import { getRandomCarImage, getRandomCarImageFromList } from '../utils/carImages'

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

interface CarCardProps {
  car: Car
  onDelete: (id: string) => void
}

export default function CarCard({ car, onDelete }: CarCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedCar, setEditedCar] = useState(car)
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
  
  // Get image URL - use car's image or generate random one from reliable source
  const [carImageUrl, setCarImageUrl] = useState(
    car.imageUrl || getRandomCarImageFromList(car.make, car.model)
  )

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${API_URL}/api/cars/${car._id}`, editedCar)
      setIsEditing(false)
      window.location.reload()
    } catch (error) {
      console.error('Error updating car:', error)
      alert('Error updating car. Please try again.')
    }
  }

  if (isEditing) {
    return (
      <div className="car-card editing">
        <div className="form-group">
          <label>Make:</label>
          <input
            type="text"
            value={editedCar.make}
            onChange={(e) => setEditedCar({ ...editedCar, make: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Model:</label>
          <input
            type="text"
            value={editedCar.model}
            onChange={(e) => setEditedCar({ ...editedCar, model: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Year:</label>
          <input
            type="number"
            value={editedCar.year}
            onChange={(e) => setEditedCar({ ...editedCar, year: parseInt(e.target.value) })}
          />
        </div>
        <div className="form-group">
          <label>Color:</label>
          <input
            type="text"
            value={editedCar.color}
            onChange={(e) => setEditedCar({ ...editedCar, color: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            value={editedCar.price}
            onChange={(e) => setEditedCar({ ...editedCar, price: parseFloat(e.target.value) })}
          />
        </div>
        <div className="form-group">
          <label>Mileage:</label>
          <input
            type="number"
            value={editedCar.mileage}
            onChange={(e) => setEditedCar({ ...editedCar, mileage: parseInt(e.target.value) })}
          />
        </div>
        <div className="form-group">
          <label>Fuel Type:</label>
          <select
            value={editedCar.fuelType}
            onChange={(e) => setEditedCar({ ...editedCar, fuelType: e.target.value })}
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div className="form-group">
          <label>Transmission:</label>
          <select
            value={editedCar.transmission}
            onChange={(e) => setEditedCar({ ...editedCar, transmission: e.target.value })}
          >
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={editedCar.description || ''}
            onChange={(e) => setEditedCar({ ...editedCar, description: e.target.value })}
          />
        </div>
        <div className="card-actions">
          <button className="btn btn-success" onClick={handleUpdate}>Save</button>
          <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div className="car-card">
      <div className="car-image">
        <img 
          src={carImageUrl} 
          alt={`${car.make} ${car.model}`}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            // Fallback to another random image if current one fails
            const newUrl = getRandomCarImageFromList(car.make, car.model)
            setCarImageUrl(newUrl)
            const target = e.target as HTMLImageElement
            if (target) {
              target.src = newUrl
            }
          }}
          loading="lazy"
        />
      </div>
      <div className="car-info">
        <h2>{car.make} {car.model}</h2>
        <div className="car-details">
          <p><strong>Year:</strong> {car.year}</p>
          <p><strong>Color:</strong> {car.color}</p>
          <p><strong>Price:</strong> ₹{car.price.toLocaleString()}</p>
          <p><strong>Mileage:</strong> {car.mileage.toLocaleString()} km</p>
          <p><strong>Fuel Type:</strong> {car.fuelType}</p>
          <p><strong>Transmission:</strong> {car.transmission}</p>
          {car.description && <p><strong>Description:</strong> {car.description}</p>}
        </div>
        <div className="card-actions">
          <button className="btn btn-edit" onClick={() => setIsEditing(true)}>Edit</button>
          <button className="btn btn-danger" onClick={() => onDelete(car._id)}>Delete</button>
        </div>
      </div>
    </div>
  )
}
