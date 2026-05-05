import { useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import type { GetServerSideProps } from 'next'
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

interface HomeProps {
  initialCars: Car[]
  siteUrl: string
}

export default function Home({ initialCars, siteUrl }: HomeProps) {
  const [cars, setCars] = useState<Car[]>(initialCars)
  const [loading, setLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://cars-back-one.vercel.app'

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
    <>
      <Head>
        <title>Premium Car Collection | Buy and Manage Cars</title>
        <meta
          name="description"
          content="Browse premium vehicles with pricing and mileage details. Add, manage, and organize your car inventory in one place."
        />
        <meta
          name="keywords"
          content="cars, premium cars, car inventory, used cars, buy cars, vehicle management"
        />
        <meta property="og:title" content="Premium Car Collection | Buy and Manage Cars" />
        <meta
          property="og:description"
          content="Browse premium vehicles with pricing and mileage details and manage your inventory quickly."
        />
        <meta property="og:url" content={siteUrl} />
      </Head>

      <main className="container">
        <header className="header">
          <div className="header-content">
            <div>
              <h1>Premium Car Collection</h1>
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
            {showAddForm ? 'Cancel' : '+ Add New Car'}
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
          <section className="cars-grid" aria-label="Available cars">
            {cars.map(car => (
              <CarCard
                key={car._id}
                car={car}
                onDelete={handleDeleteCar}
              />
            ))}
          </section>
        )}
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ req }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://cars-back-one.vercel.app'
  const forwardedProto = req.headers['x-forwarded-proto']
  const protocol = Array.isArray(forwardedProto) ? forwardedProto[0] : (forwardedProto || 'http')
  const host = req.headers.host || 'localhost:3000'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`

  try {
    const response = await axios.get<Car[]>(`${apiUrl}/api/cars`)
    return {
      props: {
        initialCars: response.data,
        siteUrl,
      },
    }
  } catch (error) {
    console.error('Error fetching cars on server:', error)
    return {
      props: {
        initialCars: [],
        siteUrl,
      },
    }
  }
}
