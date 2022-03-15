import React, { useEffect, useState } from 'react'
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify.js'
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists()
        .then((playlists) => {
          setPlaylists(playlists.body.items)
        })
        .catch((error) => console.error('Error with fetch in Sidebar: ', error))
    }
  }, [session, spotifyApi])

  return (
    <div
      className="h-screen min-w-[30ch] overflow-y-scroll border-r border-gray-900 
    p-5  text-gray-500 scrollbar-hide
    text-sm lg:text-sm sm:max-w-[12rem] hidden md:inline-flex lg:max-w-[15rem]
    "
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
            <p key={playlist.id} onClick={() => setPlaylistId(playlist.id)} className="cursor-pointer min-w-[30ch] hover:text-white">
              {playlist.name.length > 27 ? playlist.name.slice(0, 29) + "..." : playlist.name}
            </p>
          ))
          : null}
      </div>
    </div>
  )
}

export default Sidebar
