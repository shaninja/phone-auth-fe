import React from 'react'

interface UserDetailsFormProps {
  userDetails: {
    name: string
    email: string
    phone: string
  }
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const UserDetailsForm: React.FC<UserDetailsFormProps> = ({
  userDetails,
  handleChange,
  handleSubmit,
}) => {
  return (
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
  )
}

export default UserDetailsForm
