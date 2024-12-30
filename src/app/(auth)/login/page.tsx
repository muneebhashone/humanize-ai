import React from 'react'
import MainLogin from "@/components/Auth/MainLogin"
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


const LoginPage = async () => {
  const cookie = await cookies()
  const token  = cookie.get('token')?.value

  if ( token ) {
    return redirect('/')
  }
  return (
    <MainLogin />
  )
}

export default LoginPage