import { Avatar, Input } from '@nextui-org/react'
import Image from 'next/image'
import { FiChevronDown, FiUser } from 'react-icons/fi'

const NavBar: React.FC = () => {
  return (
    <div
      className="fixed flex justify-evenly items-center bg-black bg-opacity-50 w-screen h-20 z-10"
      style={{ backdropFilter: 'saturate(180%) blur(10px)' }}
    >
      <div className="flex gap-2">
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
      <Input bordered labelLeft="@" placeholder="" />
      <div className="flex justify-center items-center gap-3">
        <div className="flex cursor-pointer">
          <FiUser />
          <FiChevronDown />
        </div>
        <Avatar squared text="Jurre" />
      </div>
    </div>
  )
}

export default NavBar
