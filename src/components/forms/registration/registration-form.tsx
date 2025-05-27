"use Client"

import Link from "next/link";
import React from 'react'

import { Button } from '@/components/ui/button'
import ROUTES from '@/constants/routes'



const RegistrationForm = () => {
  return (
    <div className="w-full rounded-lg bg-dark-100 p-8 md:w-3/4 md:max-w-lg ">
    <h1 className="h1-bold">Get Started</h1>
    <div className="paragraph-regular">
      <span>Already have an account?</span>
      <Button
        asChild
        variant={"ghost"}
        className="bg-transparent p-2 text-primary-500 underline hover:bg-transparent hover:text-primary-500"
      >
        <Link href={ROUTES.SIGN_IN}>Login</Link>
      </Button>

    </div>

    </div>
  )
}

export default RegistrationForm