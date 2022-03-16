import { SearchIcon } from '@heroicons/react/outline'
import React, { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { showSearchState, songSearchResultsState } from '../atoms/searchAtom'
import { debounce } from 'lodash'
import useSpotify from '../hooks/useSpotify'
import Song from './Song'

function Search() {
  const spotifyApi = useSpotify()
  const [showSearch, setShowSearch] = useRecoilState(showSearchState)
  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useRecoilState(
    songSearchResultsState
  )

  const debouncedSearch = useCallback(
    debounce(
      (searchInput) =>
        spotifyApi.searchTracks(searchInput).then(
          function (data) {
            setSearchResults(data.body?.tracks?.items)
            console.log('Search by "Love"', data.body?.tracks)
          },
          function (err) {
            console.error(err)
          }
        ),
      600
    ),
    []
  )

  const handleInput = (e) => setSearchInput(e.target.value)

  useEffect(() => {
    if (searchInput.length > 1) {
      debouncedSearch(searchInput)
    }
  }, [searchInput])

  return (
    <div className="w-full flex-col items-center space-y-2 space-x-2 py-20 px-8 md:p-8">
      {showSearch ? (
        <div className=" flex items-center pl-4 pr-4">
          <SearchIcon className="absolute left-14 h-5 w-5 md:left-80 md:top-12" />
          <input
            onChange={handleInput}
            type="text"
            className="w-full rounded-full py-2 pl-8 pr-5 focus:outline-gray-500 md:ml-5 md:mb-6 md:max-w-[25vw] md:py-3 md:pl-10"
            placeholder="Search for songs, albums, artists"
          />
        </div>
      ) : null}

      {searchResults && searchResults.length
        ? searchResults.map((result, order) => (
            <Song key={order} order={order + 1} track={result} />
          ))
        : null}
    </div>
  )
}

export default Search
