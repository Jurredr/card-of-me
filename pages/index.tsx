import type { NextPage } from 'next'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="flex">
      <Image
        className="nextimg"
        src="/icon.svg"
        alt=""
        width={30}
        height={30}
      />
      <p className=" text-red-400">CardOf.Me</p>
    </div>
  )
}

export default Home
