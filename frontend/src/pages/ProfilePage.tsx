import React, { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/auth'
import LogoutButton from '../components/LogoutButton'

interface UserDetails {
  name: string
  email: string
  phone: string
}

const ProfilePage: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    email: '',
    phone: '',
  })

  const [firebaseUser, setFirebaseUser] = useState<firebase.User | null>(null)

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setFirebaseUser(user)
      })
    return () => unregisterAuthObserver()
  }, [])

  useEffect(() => {
    const getUserDetails = async () => {
      let phone: string | null = ''
      try {
        if (firebaseUser) {
          phone = firebaseUser.phoneNumber

          // TODO use env var for URL base
          const response = await fetch(
            `http://localhost:3000/users/getUserDetails/${phone}`,
          )
          const data = await response.json()
          if (response.ok || response.status === 404) {
            const savedUserDetails = { ...data, phone }
            setUserDetails(savedUserDetails)
          } else {
            throw new Error('User not found')
          }
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }
    getUserDetails()
  }, [firebaseUser])

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
      // TODO use env var for URL base
      const response = await fetch(
        'http://localhost:3000/users/updateUserDetails',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDetails),
        },
      )
      if (response.ok) {
        // TODO add message to the user
        console.log('Response:', await response.text())
      }
    } catch (e) {
      // TODO add message to the user
      console.error('Error:', e)
    }
  }

  return (
    <div>
      <LogoutButton />
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
