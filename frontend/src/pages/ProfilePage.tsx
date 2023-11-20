import React, { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/auth'
import LogoutButton from '../components/LogoutButton'
import UserDetailsForm from '../components/UserDetailsForm'

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
            const savedUserDetails: UserDetails = {
              name: data?.name || '',
              email: data?.email || '',
              phone: phone || '',
            }
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
    <>
      {/* TODO add a loader until we get the firebase user */}
      <LogoutButton />
      <UserDetailsForm
        userDetails={userDetails}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </>
  )
}

export default ProfilePage
