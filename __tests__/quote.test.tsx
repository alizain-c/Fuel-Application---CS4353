import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Quote from '../src/pages/quote'

describe('Quote', () => {
  it('renders title and full form', () => {
    render(<Quote />)

    const title = screen.getByRole('heading', {
      name: /Open Fuel/i,
    })
    const gallons = screen.getByText(/gallons requested/i)
    const address = screen.getByText(/delivery address/i)
    const date = screen.getByText(/delivery date/i)
    const price = screen.getByText(/suggested price/i)
    const total = screen.getByText(/total amount/i)

    expect(title).toBeInTheDocument()
    expect(gallons).toBeInTheDocument()
    expect(address).toBeInTheDocument()
    expect(date).toBeInTheDocument()
    expect(price).toBeInTheDocument()
    expect(total).toBeInTheDocument()
  })

})