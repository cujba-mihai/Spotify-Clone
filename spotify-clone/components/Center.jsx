import { ChevronDownIcon } from '@heroicons/react/outline'
import { SessionProvider, signOut, useSession } from 'next-auth/react'
import React, { createRef, useEffect, useState } from 'react'
import { shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistState, playlistIdState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'
import Songs from './Songs'

import BurgerMenu from './BurgerMenu'
import Search from './Search'
import { showSearchState } from '../atoms/searchAtom'

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-purple-500',
  'from-yellow-500',
  'from-pink-500',
  'from-orange-500',
]

function Center() {
  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const [color, setColor] = useState(null)
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  const playlistDescription = createRef()
  const [imgUrl, setImgUrl] = useState(null)
  const showSearch = useRecoilValue(showSearchState)

  useEffect(() => {
    const newColor = shuffle(colors).pop()
    setColor(newColor)
  }, [playlistId])

  const handleLogOut = () => {
    signOut({
      callbackUrl: '/login',
    })
  }

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body)
      })
      .catch((error) => console.log('Something went wrong!', error))
  }, [spotifyApi, playlistId])

  useEffect(() => {
    if (!showSearch) {
      playlistDescription.current.innerHTML = playlist?.description || ''
    }

    if (playlist.images?.[0]?.url) {
      console.log(playlist)
      setImgUrl(playlist.images[0].url)
    } else {
      setImgUrl('')
    }
  }, [showSearch, playlist])
  return (
    <SessionProvider session={session}>
      <div className="h-screen flex-grow overflow-y-scroll scrollbar-hide">
        <header className="absolute top-5 right-8">
          <div
            className="flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-2 text-white 
            opacity-90 hover:opacity-80"
            onClick={handleLogOut}
          >
            <img
              src={session?.user?.image || ''}
              alt="Profile picture"
              className="h-10 w-10 rounded-full"
            />
            <h2 className="hidden md:block">{session?.user?.name}</h2>
            <ChevronDownIcon className="h-5 w-5" />
          </div>
        </header>
        <BurgerMenu />

        {showSearch ? (
          <Search />
        ) : (
          <div>
            {' '}
            <section
              className={`b-to-black flex h-auto flex-col items-center space-y-7 space-x-7 bg-gradient-to-b pt-20 sm:flex-row sm:items-end sm:space-y-0 md:pt-10 ${color} p-8 text-white`}
            >
              {imgUrl ? (
                <img className="h-44 w-44 shadow-2xl" src={imgUrl} alt="" />
              ) : (
                <div className="flex h-44 w-44 bg-gray-800 shadow-2xl">
                  <svg
                    className="m-auto"
                    width="48px"
                    height="48px"
                    viewBox="0 0 80 81"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Playlist Icon</title>
                    <path
                      className="fill-gray-300"
                      d="M25.6 11.565v45.38c-2.643-3.27-6.68-5.37-11.2-5.37-7.94 0-14.4 6.46-14.4 14.4s6.46 14.4 14.4 14.4 14.4-6.46 14.4-14.4v-51.82l48-10.205V47.2c-2.642-3.27-6.678-5.37-11.2-5.37-7.94 0-14.4 6.46-14.4 14.4s6.46 14.4 14.4 14.4S80 64.17 80 56.23V0L25.6 11.565zm-11.2 65.61c-6.176 0-11.2-5.025-11.2-11.2 0-6.177 5.024-11.2 11.2-11.2 6.176 0 11.2 5.023 11.2 11.2 0 6.174-5.026 11.2-11.2 11.2zm51.2-9.745c-6.176 0-11.2-5.024-11.2-11.2 0-6.174 5.024-11.2 11.2-11.2 6.176 0 11.2 5.026 11.2 11.2 0 6.178-5.026 11.2-11.2 11.2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              )}

              <div>
                <p>PLAYLIST</p>
                <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
                  {playlist?.name}
                </h1>
                <h2
                  ref={playlistDescription}
                  className="playlistDescription min-h-10 my-2"
                ></h2>
              </div>
            </section>
            <Songs />
          </div>
        )}
      </div>
    </SessionProvider>
  )
}

export default Center
