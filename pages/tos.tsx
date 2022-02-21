import { NextPage } from 'next'
import NavBar from '../components/NavBar'

const tos: NextPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <h1 className="text-center mt-50 text-3xl">Terms of Service</h1>
    </div>
  )
}

export default tos
