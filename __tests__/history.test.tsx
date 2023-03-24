import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import History from '../src/pages/history'

describe('History', () => {
  it('renders title and table headers', () => {
    render(<History />)

    const title = screen.getByRole('heading', {
      name: /Open Fuel/i,
    })
    const gallons = screen.getByText(/Gallons/i)
    const address = screen.getByText(/Address/i)
    const date = screen.getByText(/Date/i)
    const price = screen.getByText(/Price/i)
    const total = screen.getByText(/Total/i)

    expect(title).toBeInTheDocument()
    expect(gallons).toBeInTheDocument()
    expect(address).toBeInTheDocument()
    expect(date).toBeInTheDocument()
    expect(price).toBeInTheDocument()
    expect(total).toBeInTheDocument()
    
  })

})