import React, { useEffect, useState } from 'react';
import useSpotify from "./useSpotify";
import { useRecoilValue, useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";

function useSongInfo() {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);

  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        try {

          const trackInfo = await fetch(
            `https://api.spotify.com/v1/tracks/${currentTrackId}`,
            {
              headers: {
                Authorization: `Bearer ${spotifyApi.getAccessToken()}`
              }
            }
          )
          const result = await trackInfo.json();
          setSongInfo(result);
        } catch (error) {
          console.error('Failed to fetch track. ', e)
        }
      }
    }

    fetchSongInfo();
  })

  return songInfo;
}

export default useSongInfo