import { Button, Input, StyledLink } from '@nextui-org/react'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { BsGoogle } from 'react-icons/bs'
import { FiChevronLeft } from 'react-icons/fi'

const SignIn: NextPage = () => {
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
              <StyledLink href="/sign-up" underline>
                Sign up for free
              </StyledLink>
            </p>
          </p>

          {/* Buttons */}
          <div className="mt-5 w-full flex flex-col gap-3 justify-center items-center">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-400">
              <div className="flex items-center justify-center gap-2 w-full">
                <BsGoogle />
                Continue with Google
              </div>
            </Button>
            <p className="tracking-normal">or</p>
            <Input width="100%" placeholder="Email" type="email" />
            <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-400">
              Sign in
            </Button>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="bg-gradient-to-br from-cyan-500 to-purple-600 relative hidden lg:flex self-center items-center float-right w-[50vw] h-screen"></div>
    </div>
  )
}

export default SignIn
