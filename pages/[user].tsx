import { Avatar, Tooltip } from '@nextui-org/react'
import type { NextPage } from 'next'
import { FiEdit2 } from 'react-icons/fi'
import { BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs'
import NavBar from '../components/NavBar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  where
} from 'firebase/firestore'
import UserNotFound from '../components/UserNotFound'

const User: NextPage = () => {
  const router = useRouter()
  const { user } = router.query

  const [loading, setLoading] = useState<Boolean>(true)
  const [cardData, setCardData] = useState<QueryDocumentSnapshot[]>([])

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'cards'), where('username', '==', String(user))),
        (snapshot) => {
          setCardData(snapshot.docs)
          setLoading(false)
        }
      ),
    [user]
  )

  return (
    <div className="flex flex-col">
      <NavBar />

      {loading && (
        <p className="mt-50 flex justify-center items-center">Loading...</p>
      )}

      {!loading && (
        <>
          {/* User not found */}
          {cardData.length === 0 && <UserNotFound username={String(user)} />}

          {/* Valid card data */}
          {cardData.length > 0 && (
            <div className="flex flex-col items-center z-0 mt-40">
              <div className="bg-dark-50 w-1/2 h-72 rounded-3xl absolute -z-1 flex justify-end">
                <div className="px-6 py-4">
                  <Tooltip content={'Edit'}>
                    <FiEdit2 className="cursor-pointer" />
                  </Tooltip>
                </div>
              </div>
              <div className="relative flex flex-col items-center">
                <div className="mt-40 bg-gradient-to-r from-green-300 to-purple-400 rounded-3xl flex flex-col items-center px-30 py-10">
                  <Avatar squared text="Jurre" size="xl" />
                  <p className="text-6xl mt-4 whitespace-nowrap">
                    Jurre de Ruiter
                  </p>
                  <div className="flex justify-center items-center mt-2 text-dark-50 opacity-70 mb-2">
                    <p className="text-xl">@</p>
                    <p className="text-2xl">jurre</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 mt-4 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 rounded-2xl flex flex-col items-center px-12 py-5">
                  <div className="flex gap-6">
                    <Tooltip content={'Twitter'}>
                      <BsTwitter className="cursor-pointer" />
                    </Tooltip>
                    <Tooltip content={'Instagram'}>
                      <BsInstagram className="cursor-pointer" />
                    </Tooltip>
                    <Tooltip content={'GitHub'}>
                      <BsGithub className="cursor-pointer" />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default User
