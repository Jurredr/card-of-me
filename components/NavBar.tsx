import { Avatar, Button, Input, Loading } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiChevronDown, FiLogIn, FiUser } from 'react-icons/fi'

const variants = {
  hidden: { opacity: 0, x: 0, y: -100 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 1, x: 0, y: 0 }
}

const NavBar: React.FC = () => {
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <AnimatePresence
      initial={true}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <motion.div
        variants={variants} // Pass the variant object into Framer Motion
        initial="hidden" // Set the initial state to variants.hidden
        animate="enter" // Animated state to variants.enter
        exit="exit" // Exit state (used later) to variants.exit
        transition={{ type: 'linear' }} // Set the transition to linear
        className="fixed flex justify-evenly items-center bg-black bg-opacity-60 w-screen h-20 z-100"
        style={{ backdropFilter: 'saturate(180%) blur(10px)' }}
      >
        {/* Logo */}
        <Link href="/" passHref scroll={false}>
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
          id="navbar-search-main"
          aria-label="Search"
          bordered
          labelLeft="@"
          placeholder="Search..."
          clearable
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              // @ts-ignore
              router.push(`/@${event.target.value.toLowerCase()}`)
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
              <Link
                href="/[user]"
                as={`@${session.user.username}`}
                scroll={false}
                passHref
              >
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
              <Link href="/sign-in" scroll={false} passHref>
                <div className="flex justify-center items-center gap-2 transition-all hover:gap-[0.35rem] hover:ml-[0.15rem] cursor-pointer whitespace-nowrap">
                  <FiLogIn />
                  <p className="tracking-normal">Sign in</p>
                </div>
              </Link>
              <Link href="/sign-up" scroll={false} passHref>
                <Button color="gradient" auto>
                  Create your card!
                </Button>
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default NavBar
