import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProfileManagement from '../src/pages/profile'

describe('Profile Management', () => {
  it('renders title and full form', () => {
    render(<ProfileManagement />)

    const title = screen.getByRole('heading', {
      name: /Open Fuel/i,
    })
    const fullName = screen.getByText(/Full Name/i)
    const address1 = screen.getAllByText(/Address/i)[0]
    const address2 = screen.getAllByText(/Address/i)[1]
    const city = screen.getByText(/City/i)
    const state = screen.getByText("State")
    const zipcode = screen.getByText(/Zipcode/i)

    expect(title).toBeInTheDocument()
    expect(fullName).toBeInTheDocument()
    expect(address1).toBeInTheDocument()
    expect(address2).toBeInTheDocument()
    expect(city).toBeInTheDocument()
    expect(state).toBeInTheDocument()
    expect(zipcode).toBeInTheDocument()
  })

})