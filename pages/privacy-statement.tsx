import { NextPage } from 'next'
import NavBar from '../components/NavBar'

const privacyStatement: NextPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <h1 className="text-center mt-50 text-3xl">Privacy Statement</h1>
    </div>
  )
}

export default privacyStatement
