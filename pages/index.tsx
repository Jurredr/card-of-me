import { Avatar, Button, Tooltip } from '@nextui-org/react'
import type { NextPage } from 'next'
import { FiHeart } from 'react-icons/fi'
import { BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs'
import NavBar from '../components/NavBar'

const Home: NextPage = () => {
  return (
    <div className="relative flex flex-col h-[200vh] w-screen bg-black">
      <NavBar />
      <div className="flex justify-center z-0 mt-40">
        <div className="bg-gradient-to-r from-green-300 to-purple-400 rounded-3xl flex flex-col items-center px-30 py-10">
          <Avatar squared text="Jurre" size="xl" />
          <div className="flex justify-center items-center gap-2 mt-4">
            <p className="text-5xl">@</p>
            <p className="text-6xl">Jurre</p>
          </div>
          <div className="flex gap-4 mt-3">
            <BsTwitter className="cursor-pointer" />
            <BsInstagram className="cursor-pointer" />
            <BsGithub className="cursor-pointer" />
          </div>
          <div className="flex gap-3 mt-10">
            <div className="bg-white px-6 py-4 rounded-3xl">
              <Tooltip content={'Like'}>
                <Button
                  auto
                  bordered
                  color="error"
                  icon={<FiHeart fill="currentColor" />}
                />
              </Tooltip>
              <p className="text-black text-center mt-1">100</p>
            </div>
            <div className="bg-white px-6 py-4 rounded-3xl">
              <Tooltip content={'Like'}>
                <Button
                  auto
                  bordered
                  color="error"
                  icon={<FiHeart fill="currentColor" />}
                />
              </Tooltip>
              <p className="text-black text-center mt-1">100</p>
            </div>
            <div className="bg-white px-6 py-4 rounded-3xl">
              <Tooltip content={'Like'}>
                <Button
                  auto
                  bordered
                  color="error"
                  icon={<FiHeart fill="currentColor" />}
                />
              </Tooltip>
              <p className="text-black text-center mt-1">100</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
