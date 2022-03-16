import React from 'react'
import { useRecoilState } from 'recoil'
import useSpotify from '../hooks/useSpotify'
import { millisToMinutesAndSeconds } from '../lib/time.js'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'

function Song({ order, track }) {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)

  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  const playSong = () => {
    if (!!track.track?.album) {
      setCurrentTrackId(track.track.id)
      setIsPlaying(true)
      spotifyApi.play({
        uris: [track.track.uri],
      })
    } else {
      setCurrentTrackId(track.id)
      setIsPlaying(true)
      spotifyApi.play({
        uris: [track.uri],
      })
    }
  }

  return (
    <div
      className="grid cursor-pointer grid-cols-2 rounded-lg py-4 px-5 text-gray-500 hover:bg-gray-900"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4 ">
        <p>{order}</p>
        <img
          className="h-10 w-10"
          src={
            !!track.track?.album
              ? track.track.album.images[0].url
              : track.album.images[0].url
          }
          alt=""
        />
        <div>
          <p className="w-36 truncate text-white lg:w-64">
            {!!track.track?.album ? track.track.name : track.name}
          </p>
          <p className="w-40">
            {!!track.track?.album
              ? track.track.artists[0].name
              : track.artists[0].name}
          </p>
        </div>
      </div>

      <div className="ml-auto flex items-center justify-between md:ml-0">
        <p className="hidden md:inline">
          {!!track.track?.album ? track.track.album.name : track.album.name}
        </p>
        <p>
          {millisToMinutesAndSeconds(
            !!track.track?.album ? track.track.duration_ms : track.duration_ms
          )}
        </p>
      </div>
    </div>
  )
}

export default Song
