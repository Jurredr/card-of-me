import { Button, Checkbox, Input, StyledLink } from '@nextui-org/react'
import { GetServerSidePropsContext, NextPage } from 'next'
import {
  ClientSafeProvider,
  getProviders,
  getSession,
  signIn
} from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { BsGoogle } from 'react-icons/bs'
import { FiChevronLeft } from 'react-icons/fi'

interface Props {
  providers: ClientSafeProvider
}

const SignUp: NextPage<Props> = (props) => {
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
              <Link href="/sign-up" passHref>
                <StyledLink underline>Sign in</StyledLink>
              </Link>
            </p>
          </p>

          {/* Buttons */}
          <div className="mt-5 w-full flex flex-col gap-3 justify-center items-center">
            {/* OAuth */}
            {Object.values(props.providers).map((provider) => (
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-blue-400"
                key={provider.name}
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              >
                <div className="flex items-center justify-center gap-2 w-full">
                  <BsGoogle />
                  Sign up with {provider.name}
                </div>
              </Button>
            ))}

            {/* Email */}
            <p className="tracking-normal">or</p>
            <Input
              labelLeft="@"
              width="100%"
              placeholder="Username"
              type="text"
            />
            <Input width="100%" placeholder="Email" type="email" />
            <div className="flex gap-3">
              <Input width="100%" placeholder="First name" type="text" />
              <Input width="100%" placeholder="Last name" type="text" />
            </div>

            <Checkbox className="my-2" checked={false}>
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
            <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-400">
              Sign up with email
            </Button>
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

export default SignUp
