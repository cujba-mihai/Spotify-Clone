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
import SearchBtn from './SearchBtn'
import { showSearchState } from '../atoms/searchAtom'

function Sidebar() {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [playlists, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
  const [showSearch, setShowSearch] = useRecoilState(showSearchState)

  // const handleShowSearch = () => setShowSearch(true)
  const handleCloseSearch = () => setShowSearch(false)

  const handlePlaylistChange = (playlist) => {
    setPlaylistId(playlist.id)
    setShowSearch(false)
  }

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

  return (
    <div
      className="hidden h-screen min-w-[30ch] overflow-y-scroll border-r 
    border-gray-900  p-5 pb-36
    text-sm text-gray-500 scrollbar-hide sm:max-w-[12rem] md:inline-flex lg:max-w-[15rem] lg:text-sm
    "
    >
      <div className="space-y-4">
        <button
          onClick={handleCloseSearch}
          className="flex items-center space-x-2 hover:text-white"
        >
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>

        <SearchBtn />

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
                onClick={() => handlePlaylistChange(playlist)}
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
  )
}

export default Sidebar
