import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import useSpotify from '../hooks/useSpotify'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import useSongInfo from '../hooks/useSongInfo'
import { SwitchHorizontalIcon } from '@heroicons/react/outline'

import SpotifyPlayer from 'react-spotify-web-playback'

import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  VolumeUpIcon,
  VolumeOffIcon,
} from '@heroicons/react/solid'
import { debounce } from 'lodash'

function Player() {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)

  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(50)
  const [songImgUrl, setSongImgUrl] = useState('')
  const [trackUri, setTrackUri] = useState('')
  const [token, setToken] = useState('')

  const songInfo = useSongInfo()

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log('Now playing: ', data.body)
        setCurrentTrackId(data.body?.item?.id)
        setTrackUri(data.body?.item.uri)

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing)
        })
      })
    }
  }

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause()
        setIsPlaying(false)
      } else {
        spotifyApi.play()
        setIsPlaying(true)
      }
    })
  }

  useEffect(() => {
    if (songInfo) {
      if (songInfo.album?.images) {
        setSongImgUrl(songInfo?.album.images?.[0]?.url)
      }
    }

    if (spotifyApi.getAccessToken() && !currentTrackId) {
      // fetch song info
      fetchCurrentSong()
      setToken(spotifyApi.getAccessToken())
      // setVolume(50)
    }
  }, [currentTrackId, spotifyApi, session])

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi
        .setVolume(volume)
        .catch((err) => console.error('Failed to set volume. ', err))
    }, 500),
    []
  )

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume)
    }
  }, [volume])

  return (
    <div className=" fixed bottom-0 w-screen">
      {token ? (
        <div className="bg-black sm:inline">
          <SpotifyPlayer
            token={token}
            syncExternalDevice={true}
            persistDeviceSelection={true}
            initialVolume={volume}
            callback={(state) => !state.isPlaying && setIsPlaying(false)}
            play={isPlaying}
            uris={trackUri ? trackUri : []}
            playerPosition="bottom"
            styles={{
              activeColor: '#fff',
              bgColor: 'rgb(16 16 16)',
              color: '#b3b3b3',
              loaderColor: '#fff',
              sliderColor: '#1cb954',
              trackArtistColor: '#a5a5a5',
              trackNameColor: '#fff',
            }}
          />
        </div>
      ) : null}
    </div>
  )
}

export default Player
