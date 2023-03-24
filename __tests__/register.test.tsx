import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Register from '../src/pages/register'

describe('Register', () => {
  it('renders title, email address, password, password confirmation', () => {
    render(<Register />)

    const title = screen.getByRole('heading', {
      name: /Open Fuel/i,
    })
    const email = screen.getByText(/Email Address/i)
    const password = screen.getAllByText(/Password/i)[0]
    const passwordConfirmation = screen.getByText(/Confirm Password/i)

    expect(title).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(password).toBeInTheDocument()
    expect(passwordConfirmation).toBeInTheDocument()
  })

})