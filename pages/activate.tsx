import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { IoIosMail } from 'react-icons/io'

const Activate: NextPage = () => {
  const router = useRouter()

  // Session re-routing

  const { data: session } = useSession()
  if (session?.user) {
    router.push('/')
  }

  return (
    <div className="w-full h-full grid grid-cols-2 items-center justify-center">
      {/* Left */}
      <div className="bg-black z-10 h-screen w-screen lg:w-[50vw] flex justify-center items-center">
        <div className="flex flex-col justify-center items-center text-center w-full max-w-[22rem] gap-2 relative">
          <IoIosMail className="text-5xl fill-blue-500" />
          <div className="absolute bg-white w-[2.4rem] h-[1.7rem] -z-10 top-[0.6rem] rounded-md  " />
          <p className="tracking-normal text-3xl font-bold mb-1">
            Check your inbox
          </p>
          <p className="tracking-normal">
            We sent you an activation link. Please be sure to check your spam
            folder too.
          </p>
        </div>
      </div>
      {/* Right */}
      <div className="bg-gradient-to-br from-cyan-500 to-purple-600 relative hidden lg:flex self-center items-center float-right w-[50vw] h-screen"></div>
    </div>
  )
}

export default Activate
