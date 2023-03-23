import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Login from '../src/pages/login'
// import userEvent from '@testing-library/user-event'
// use to test what you can type 

describe('Login', () => {
  it('renders title, email address, and password', () => {
    render(<Login />)

    const title = screen.getByRole('heading', {
      name: /Open Fuel/i,
    })
    const email = screen.getByText(/Email Address/i)
    const password = screen.getByText(/Password/i)

    expect(title).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(password).toBeInTheDocument()
  })

})