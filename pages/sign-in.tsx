import { Button, StyledLink } from '@nextui-org/react'
import { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FiChevronLeft } from 'react-icons/fi'
import EmailField from '../components/auth/EmailField'
import OAuthButtons from '../components/auth/OAuthButtons'
import DividerText from '../components/DividerText'
import LoadBasedButton from '../components/LoadBasedButton'
import { getUserByEmail } from '../src/userfetcher'

const SignIn: NextPage = () => {
  const router = useRouter()

  // Session re-routing

  const { data: session } = useSession()
  if (session?.user) {
    router.push('/')
  }

  // Input handling

  const [emailValid, setEmailValid] = useState(false)
  const [emailValue, setEmailValue] = useState('')

  // Submit handling

  const [submittedClicked, setSubmittedClicked] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)

  const emailLogin = async () => {
    setSubmittedClicked(true)
    if (!emailValid) return
    setSubmitLoading(true)
    const user = await getUserByEmail(emailValue)
    console.log(user)

    // Exists = Sign them in
    if (user) {
      signIn('email', { email: emailValue })
    }

    // Send to sign up with email as preset
    else {
      router.push(`/sign-up?email=${emailValue}`)
    }
  }

  return (
    <div className="w-full h-full grid grid-cols-2 items-center justify-center">
      {/* Left */}
      <div className="bg-black z-10 h-screen w-screen lg:w-[50vw] flex justify-center items-center">
        {/* Back button */}
        <Link href="/" passHref>
          <Button
            className="absolute top-5 left-5 py-2 px-4 rounded-full bg-dark-300"
            auto
          >
            <div className="flex justify-center items-center gap-1">
              <FiChevronLeft size={20} />
              Back Home
            </div>
          </Button>
        </Link>

        {/* Login */}
        <div className="flex flex-col justify-center items-center w-full max-w-[22rem]">
          <Image
            className="nextimg"
            src="/icon.svg"
            alt=""
            width={30}
            height={30}
            draggable={false}
          />
          <p className="text-3xl font-semibold mt-2">Welcome to CardOf.Me</p>
          <p className="mt-2">
            <p className="tracking-normal">
              Don&apos;t have an account?{' '}
              <Link href="/sign-up" passHref>
                <StyledLink underline>Sign up for free</StyledLink>
              </Link>
            </p>
          </p>

          {/* Buttons */}
          <div className="mt-5 w-full flex flex-col gap-4 justify-center items-center">
            {/* OAuth */}
            <OAuthButtons />

            {/* Or */}
            <DividerText text="or" />

            {/* Email */}
            <EmailField
              validCallback={setEmailValid}
              valueCallback={setEmailValue}
              submitted={submittedClicked}
            />

            {/* Submit */}
            <LoadBasedButton
              text="Sign in"
              loading={submitLoading}
              onClick={emailLogin}
            />
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="bg-gradient-to-br from-cyan-500 to-purple-600 relative hidden lg:flex self-center items-center float-right w-[50vw] h-screen"></div>
    </div>
  )
}

export default SignIn
