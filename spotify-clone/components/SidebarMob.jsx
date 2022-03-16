import React, { useEffect, useState } from 'react'
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify.js'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'

function SidebarMobile({ showMenu, handleMenu }) {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [playlists, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
  const [showBg, setShowbg] = useState(false)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getUserPlaylists()
        .then((playlists) => {
          setPlaylists(playlists.body.items)
        })
        .catch((error) => console.error('Error with fetch in Sidebar: ', error))
    }
  }, [session, spotifyApi])

  useEffect(() => {
    if (!showMenu) {
      setTimeout(() => {
        setShowbg(showMenu)
        console.log('SHOWMENU', showMenu)
      }, 500)
    } else {
      setShowbg(showMenu)
    }
  }, [showMenu])

  return (
    <div
      onClick={handleMenu}
      className={`absolute left-[-40px] h-screen w-[calc(100vw+40px)] overflow-hidden  ${
        showBg || 'hidden'
      }`}
    >
      <div
        className={`h-screen w-[calc(100vw+40px)] overflow-hidden bg-[rgba(0,0,0,0.3)] duration-500`}
      >
        <div
          className={`h-screen w-[30vw] min-w-[30ch] transform overflow-y-scroll border-r 
   border-gray-900 bg-black p-5 pb-36 text-sm  text-gray-500 
   duration-700 ease-in-out scrollbar-hide sm:max-w-[12rem] md:inline-flex lg:max-w-[15rem] lg:text-sm ${
     showMenu ? 'translate-x-[40px] ' : 'translate-x-[-100%]'
   }  
  
   `}
        >
          <div className="space-y-4">
            <button className="flex items-center space-x-2 hover:text-white">
              <HomeIcon className="h-5 w-5" />
              <p>Home</p>
            </button>

            <button className="flex items-center space-x-2 hover:text-white">
              <SearchIcon className="h-5 w-5" />
              <p>Search</p>
            </button>

            <button className="flex items-center space-x-2 hover:text-white">
              <LibraryIcon className="h-5 w-5" />
              <p>Your Library</p>
            </button>

            <hr className="border-t-[0.1px] border-gray-900" />

            <button className="flex items-center space-x-2 hover:text-white">
              <PlusCircleIcon className="h-5 w-5" />
              <p>Create Playlist</p>
            </button>

            <button className="flex items-center space-x-2 hover:text-white">
              <HeartIcon className="h-5 w-5" />
              <p>Your Library</p>
            </button>

            <button className="flex items-center space-x-2 hover:text-white">
              <RssIcon className="h-5 w-5" />
              <p>Your episodes</p>
            </button>
            <hr className="border-t-[0.1px] border-gray-900" />

            {/* Playlists... */}

            {playlists.length
              ? playlists.map((playlist) => (
                  <p
                    key={playlist.id}
                    onClick={() => setPlaylistId(playlist.id)}
                    className="min-w-[30ch] cursor-pointer hover:text-white"
                  >
                    {playlist.name.length > 27
                      ? playlist.name.slice(0, 29) + '...'
                      : playlist.name}
                  </p>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SidebarMobile
