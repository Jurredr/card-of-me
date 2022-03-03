import { Avatar, Button, Input, Loading } from '@nextui-org/react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiChevronDown, FiLogIn, FiUser } from 'react-icons/fi'

const NavBar: React.FC = () => {
  const router = useRouter()
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
      <Input
        bordered
        labelLeft="@"
        placeholder="Search..."
        clearable
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            // @ts-ignore
            router.push(`/@${event.target.value}`)
          }
        }}
      />

      {/* Account */}
      <div className="flex justify-center items-center gap-3 w-50">
        {/* Signed in */}
        {session && (
          <>
            <div className="flex cursor-pointer" onClick={() => signOut()}>
              <FiUser />
              <FiChevronDown />
            </div>
            <Link href="/[user]" as="@jurre" passHref>
              <Avatar
                squared
                text={session.user.username}
                className="cursor-pointer"
              />
            </Link>
          </>
        )}

        {/* Loading session */}
        {!session && session === undefined && (
          <div className="flex justify-center items-center gap-6">
            <Loading type="gradient" />
          </div>
        )}

        {/* Not signed in */}
        {!session && session !== undefined && (
          <div className="flex justify-center items-center gap-6">
            <Link href="/sign-in" passHref>
              <div className="flex justify-center items-center gap-2 transition-all hover:gap-[0.35rem] hover:ml-[0.15rem] cursor-pointer whitespace-nowrap">
                <FiLogIn />
                <p className="tracking-normal">Sign in</p>
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
