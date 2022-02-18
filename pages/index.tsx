import { Button } from '@nextui-org/react'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="">
      <Button>Default</Button>
      <Button disabled>Default</Button>
    </div>
  )
}

export default Home
