import { Button, Input, Loading, StyledLink, useInput } from '@nextui-org/react'
import { GetServerSidePropsContext, NextPage } from 'next'
import {
  ClientSafeProvider,
  getProviders,
  getSession,
  signIn
} from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { BsGoogle } from 'react-icons/bs'
import { FiChevronLeft } from 'react-icons/fi'

interface Props {
  providers: ClientSafeProvider
}

const SignIn: NextPage<Props> = (props) => {
  const router = useRouter()
  const [isEmailValid, setEmailValid] = useState(false)
  const [loading, setLoading] = useState(false)

  const { value, bindings } = useInput('')
  const helper = useMemo(() => {
    if (!value)
      return {
        color: '',
        text: ''
      }
    const isValid: RegExpMatchArray | null = String(value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    setEmailValid(isValid !== null ? (isValid ? true : false) : false)
    return {
      color: isValid ? '' : 'error',
      text: isValid ? '' : 'Please enter a valid email address'
    }
  }, [value])

  const emailLoginClicked = () => {
    if (!isEmailValid) return
    setLoading(true)
    setTimeout(() => {
      router.push(`/sign-up?email=${value}`)
    }, 1000)
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
            {Object.values(props.providers).map((provider) => (
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-blue-400"
                key={provider.name}
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              >
                <div className="flex items-center justify-center gap-2 w-full">
                  <BsGoogle />
                  Continue with {provider.name}
                </div>
              </Button>
            ))}

            {/* Or */}
            <div className="flex justify-center items-center w-full gap-4">
              <hr className="w-full opacity-50" />
              <p className="tracking-normal text-sm">or</p>
              <hr className="w-full opacity-50" />
            </div>

            {/* Email */}
            <Input
              {...bindings}
              // @ts-ignore
              status={helper.color}
              // @ts-ignore
              color={helper.color}
              // @ts-ignore
              helperColor={helper.color}
              helperText={helper.text}
              width="100%"
              placeholder="Email"
              type="email"
            />
            {!isEmailValid && value && <div></div>}
            {!loading && (
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-blue-400"
                onClick={emailLoginClicked}
              >
                Sign in
              </Button>
            )}
            {loading && (
              <Button
                clickable={false}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-400"
              >
                <Loading color="white" size="sm" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="bg-gradient-to-br from-cyan-500 to-purple-600 relative hidden lg:flex self-center items-center float-right w-[50vw] h-screen"></div>
    </div>
  )
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const session = await getSession({ req })
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const providers = await getProviders()
  return {
    props: { providers }
  }
}

export default SignIn
