import MainRegister from '@/components/Auth/MainRegister'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const RegisterPage = async () => {
  const cookie = await cookies()
  const token  = cookie.get('token')?.value

  if ( token ) {
    return redirect('/')
  }
  return (
    <MainRegister />
  )
}

export default RegisterPage