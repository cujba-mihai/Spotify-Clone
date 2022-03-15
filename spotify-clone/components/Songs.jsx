import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { playlistState } from '../atoms/playlistAtom'
import Song from './Song'
function Songs() {
  const playlist = useRecoilValue(playlistState)
  const [tracks, setTracks] = useState(null)
  useEffect(() => {
    if (playlist.tracks) {
      setTracks(playlist.tracks.items)
    }
    console.log(tracks)
  }, [playlist])
  return (
    <div className="flex flex-col space-y-1 px-8 pb-28 ">
      {tracks
        ? tracks.map((track, index) => (
            <Song key={index} order={index + 1} track={track} />
          ))
        : null}
    </div>
  )
}

export default Songs
