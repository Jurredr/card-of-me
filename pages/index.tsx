import type { NextPage } from 'next'
import NavBar from '../components/NavBar'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col h-[200vh]">
      <NavBar />
    </div>
  )
}

export default Home
