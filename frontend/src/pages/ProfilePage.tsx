import React, { useState } from 'react'

interface UserDetails {
  name: string
  email: string
}

const ProfilePage: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    email: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO for production we should use a validation library (for example Joi)
    // but for our purposes, html form validation is enough
    event.preventDefault()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={userDetails.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />

        <input
          type="email"
          name="email"
          value={userDetails.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default ProfilePage
