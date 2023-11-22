import React from 'react'
import styled from 'styled-components'

interface UserDetailsFormProps {
  userDetails: {
    name: string
    email: string
    phone: string
  }
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const StyledSubmitButton = styled.button`
  color: black;
`

const UserDetailsForm: React.FC<UserDetailsFormProps> = ({
  userDetails,
  handleChange,
  handleSubmit,
}) => {
  // TODO style the form
  /*  TODO show the current details (if exist) outside the form,
  and let the user know they are able to change them */
  return (
    <StyledForm onSubmit={handleSubmit}>
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

      <StyledSubmitButton type="submit">Save</StyledSubmitButton>
    </StyledForm>
  )
}

export default UserDetailsForm
