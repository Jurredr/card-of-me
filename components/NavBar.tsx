import { Avatar, Button, Input } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { FiChevronDown, FiLogIn, FiUser } from 'react-icons/fi'

const NavBar: React.FC = () => {
  const { data: session } = useSession()

  return (
    <div
      className="fixed flex justify-evenly items-center bg-black bg-opacity-60 w-screen h-20 z-100"
      style={{ backdropFilter: 'saturate(180%) blur(10px)' }}
    >
      {/* Logo */}
      <Link href="/" passHref>
        <div className="flex gap-2 w-50 cursor-pointer hover:opacity-75 transition-all">
          <Image
            className="nextimg"
            src="/icon.svg"
            alt=""
            width={30}
            height={30}
            draggable={false}
          />
          <p className="text-white text-3xl">CardOf.Me</p>
        </div>
      </Link>

      {/* Search */}
      <Input bordered labelLeft="@" placeholder="Search..." />

      {/* Account */}
      <div className="flex justify-center items-center gap-3 w-50">
        {/* Signed in */}
        {session && (
          <>
            <div className="flex cursor-pointer">
              <FiUser />
              <FiChevronDown />
            </div>
            <Link href="/[user]" as="@jurre" passHref>
              <Avatar squared text="Jurre" className="cursor-pointer" />
            </Link>
          </>
        )}

        {/* Not signed in */}
        {!session && (
          <div className="flex justify-center items-center gap-6">
            <Link href="/sign-in" passHref>
              <div className="flex justify-center items-center gap-2 transition-all hover:gap-[0.35rem] hover:ml-[0.15rem] cursor-pointer">
                <FiLogIn />
                Login
              </div>
            </Link>
            <Link href="/sign-up" passHref>
              <Button color="gradient" auto>
                Create your card!
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavBar
