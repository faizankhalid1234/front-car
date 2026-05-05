import { useState } from 'react'
import { getRandomCarImage, getRandomCarImageFromList } from '../utils/carImages'

interface CarData {
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

interface AddCarFormProps {
  onSubmit: (carData: CarData) => void
}

export default function AddCarForm({ onSubmit }: AddCarFormProps) {
  const [formData, setFormData] = useState<CarData>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    price: 0,
    mileage: 0,
    fuelType: 'Petrol',
    transmission: 'Manual',
    description: '',
    imageUrl: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.make || !formData.model || !formData.color) {
      alert('Please fill in all required fields')
      return
    }
    
    // Auto-generate random image if not provided
    const carDataWithImage = {
      ...formData,
      imageUrl: formData.imageUrl || getRandomCarImageFromList(formData.make, formData.model)
    }
    
    onSubmit(carDataWithImage)
    setFormData({
      make: '',
      model: '',
      year: new Date().getFullYear(),
      color: '',
      price: 0,
      mileage: 0,
      fuelType: 'Petrol',
      transmission: 'Manual',
      description: '',
      imageUrl: ''
    })
  }

  return (
    <form className="add-car-form" onSubmit={handleSubmit}>
      <h2>Add New Car</h2>
      <div className="form-row">
        <div className="form-group">
          <label>Make *</label>
          <input
            type="text"
            value={formData.make}
            onChange={(e) => setFormData({ ...formData, make: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Model *</label>
          <input
            type="text"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Year *</label>
          <input
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
            required
            min="1900"
            max={new Date().getFullYear() + 1}
          />
        </div>
        <div className="form-group">
          <label>Color *</label>
          <input
            type="text"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Price (₹) *</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            required
            min="0"
          />
        </div>
        <div className="form-group">
          <label>Mileage (km) *</label>
          <input
            type="number"
            value={formData.mileage}
            onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) })}
            required
            min="0"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Fuel Type *</label>
          <select
            value={formData.fuelType}
            onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
            required
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div className="form-group">
          <label>Transmission *</label>
          <select
            value={formData.transmission}
            onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
            required
          >
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>
      <div className="form-group">
        <label>Image URL (Optional - Random image will be generated if left empty)</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="url"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            placeholder="Leave empty for random car image"
            style={{ flex: 1 }}
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setFormData({ ...formData, imageUrl: getRandomCarImageFromList(formData.make, formData.model) })}
            style={{ whiteSpace: 'nowrap' }}
          >
            🎲 Random
          </button>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Add Car</button>
    </form>
  )
}
