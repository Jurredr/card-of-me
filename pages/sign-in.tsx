import { Button, StyledLink } from '@nextui-org/react'
import { motion } from 'framer-motion'
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

const variants = {
  hidden: { opacity: 0, x: 200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 }
}

const SignIn: NextPage = () => {
  const router = useRouter()

  // Session re-routing

  const { data: session } = useSession()
  if (session?.user) {
    router.push('/')
  }

  // Input handling

  const [emailValid, setEmailValid] = useState(false)
  const [emailValue, setEmailValue] = useState<string | null>(null)

  // Submit handling

  const [submittedClicked, setSubmittedClicked] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)

  const emailLogin = async () => {
    setSubmittedClicked(true)
    if (!emailValid || !emailValue) return
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
    <motion.div
      variants={variants} // Pass the variant object into Framer Motion
      initial="hidden" // Set the initial state to variants.hidden
      animate="enter" // Animated state to variants.enter
      exit="exit" // Exit state (used later) to variants.exit
      transition={{ type: 'linear' }} // Set the transition to linear
      className="w-full h-full grid grid-cols-2 items-center justify-center"
    >
      {/* Left */}
      <div className="bg-black z-10 h-screen w-screen lg:w-[50vw] flex justify-center items-center">
        {/* Back button */}
        <Link href="/" scroll={false} passHref>
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
          <div className="mt-2">
            <p className="tracking-normal">
              Don&apos;t have an account?{' '}
              <Link href="/sign-up" scroll={false} passHref>
                <StyledLink underline>Sign up for free</StyledLink>
              </Link>
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-5 w-full flex flex-col gap-4 justify-center items-center">
            {/* OAuth */}
            <OAuthButtons />

            {/* Or */}
            <DividerText text="or" />

            {/* Email */}
            <EmailField
              id="sign-in-email-field"
              validCallback={(valid) => setEmailValid(valid)}
              valueCallback={(value) => setEmailValue(value)}
              submitted={submittedClicked}
              unsubmit={() => setSubmittedClicked(false)}
              takenCheck={false}
            />

            {/* Submit */}
            <LoadBasedButton
              text="Sign in"
              loading={submitLoading}
              onClick={() => emailLogin()}
            />
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="bg-gradient-to-br from-cyan-500 to-purple-600 relative hidden lg:flex self-center items-center float-right w-[50vw] h-screen"></div>
    </motion.div>
  )
}

export default SignIn
