import { Button, Checkbox, StyledLink } from '@nextui-org/react'
import { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FiChevronLeft } from 'react-icons/fi'
import EmailField from '../components/auth/EmailField'
import NameField from '../components/auth/NameField'
import OAuthButtons from '../components/auth/OAuthButtons'
import UsernameField from '../components/auth/UsernameField'
import DividerText from '../components/DividerText'
import LoadBasedButton from '../components/LoadBasedButton'
import { createUser } from '../src/userfetcher'

const SignUp: NextPage = () => {
  const router = useRouter()
  const { email } = router.query

  // Session re-routing

  const { data: session } = useSession()
  if (session?.user) {
    router.push('/')
  }

  // Input value handling

  const [usernameValue, setUsernameValue] = useState<string | null>(null)
  const [emailValue, setEmailValue] = useState<string | null>(null)
  const [firstNameValue, setFirstNameValue] = useState<string | null>(null)
  const [lastNameValue, setLastNameValue] = useState<string | null>(null)

  // Input validity handling

  const [usernameValid, setUsernameValid] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [firstNameValid, setFirstNameValid] = useState(false)
  const [lastNameValid, setLastNameValid] = useState(false)
  const [termsChecked, setTermsChecked] = useState(false)

  // Submit handling

  const [submittedClicked, setSubmittedClicked] = useState({
    username: false,
    email: false,
    firstName: false,
    lastName: false,
    terms: false
  })
  const [submitLoading, setSubmitLoading] = useState(false)

  const emailSignUp = () => {
    setSubmittedClicked({
      username: true,
      firstName: true,
      lastName: true,
      email: true,
      terms: true
    })
    if (!usernameValid) return
    if (!emailValid) return
    if (!firstNameValid) return
    if (!lastNameValid) return
    if (!termsChecked) return
    if (!usernameValue || !emailValue || !firstNameValue || !lastNameValue)
      return
    setSubmitLoading(true)

    // Create the user
    createUser({
      id: '',
      username: usernameValue.toLowerCase(),
      email: emailValue,
      name: {
        firstName: firstNameValue,
        lastName: lastNameValue
      },
      image: null,
      card: []
    })
    signIn('email', { email: emailValue })
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

        {/* Register */}
        <div className="flex flex-col justify-center items-center w-full max-w-[22rem]">
          <Image
            className="nextimg"
            src="/icon.svg"
            alt=""
            width={30}
            height={30}
            draggable={false}
          />
          <p className="text-3xl font-semibold mt-2">Create Account</p>
          <p className="mt-2">
            <p className="tracking-normal">
              Already have an account?{' '}
              <Link href="/sign-in" passHref>
                <StyledLink underline>Sign in</StyledLink>
              </Link>
            </p>
          </p>

          {/* Buttons */}
          <div className="mt-5 w-full flex flex-col gap-4 justify-center items-center">
            {/* OAuth */}
            <OAuthButtons textPrefix="Sign up with " />

            {/* Or */}
            <DividerText text="or" />

            {/* Username */}
            <UsernameField
              validCallback={setUsernameValid}
              valueCallback={setUsernameValue}
              submitted={submittedClicked.username}
              unsubmit={() =>
                setSubmittedClicked({
                  ...submittedClicked,
                  username: false
                })
              }
            />

            {/* Email */}
            <EmailField
              initialValue={email ? String(email) : ''}
              validCallback={setEmailValid}
              valueCallback={setEmailValue}
              submitted={submittedClicked.email}
              unsubmit={() =>
                setSubmittedClicked({
                  ...submittedClicked,
                  email: false
                })
              }
            />

            {/* Full name */}
            <div className="flex gap-3">
              <div>
                <NameField
                  placeholder="First name"
                  validCallback={setFirstNameValid}
                  valueCallback={setFirstNameValue}
                  submitted={submittedClicked.firstName}
                  unsubmit={() =>
                    setSubmittedClicked({
                      ...submittedClicked,
                      firstName: false
                    })
                  }
                />
              </div>
              <div>
                <NameField
                  placeholder="Last name"
                  validCallback={setLastNameValid}
                  valueCallback={setLastNameValue}
                  submitted={submittedClicked.lastName}
                  unsubmit={() =>
                    setSubmittedClicked({
                      ...submittedClicked,
                      lastName: false
                    })
                  }
                />
              </div>
            </div>

            {/* TOS / privacy */}
            <Checkbox
              className={`my-2${
                !termsChecked && submittedClicked.terms ? ' checkbox-error' : ''
              }`}
              labelColor={
                !termsChecked && submittedClicked.terms ? 'error' : 'default'
              }
              onChange={(e) => {
                setTermsChecked(e.target.checked)
                if (submittedClicked.terms) {
                  setSubmittedClicked({
                    ...submittedClicked,
                    terms: false
                  })
                }
              }}
            >
              <p className="font-normal tracking-normal text-xs whitespace-nowrap">
                I agree to the{' '}
                <Link href="/tos" passHref>
                  <StyledLink underline>Terms of Service</StyledLink>
                </Link>{' '}
                and{' '}
                <Link href="/privacy-statement" passHref>
                  <StyledLink underline>Privacy Statement</StyledLink>
                </Link>
              </p>
            </Checkbox>

            {/* Submit */}
            <LoadBasedButton
              text="Sign up with email"
              loading={submitLoading}
              onClick={emailSignUp}
            />
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="bg-gradient-to-br from-cyan-500 to-purple-600 relative hidden lg:flex self-center items-center float-right w-[50vw] h-screen"></div>
    </div>
  )
}

export default SignUp
