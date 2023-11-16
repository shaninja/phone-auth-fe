import React, { useState } from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/auth'

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // TODO for production we should use better validation
    // but for our purposes, html form validation is enough
    event.preventDefault()
    
    try {
      const firebaseUser = firebase.auth().currentUser
      let phone;
      if (firebaseUser) {
        phone = firebaseUser.phoneNumber
      }
      const userDetailsWithPhone = {
        ...userDetails,
        phone,
      };

      const response = await fetch('http://localhost:3000/users/updateUserDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDetailsWithPhone)
      });
      if (response.ok) {
        console.log('Response:', await response.text());
      }
    } catch (e) {
      console.error('Error:', e);
    }
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
