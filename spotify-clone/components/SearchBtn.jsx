import React, { useState } from 'react'
import { SearchIcon } from '@heroicons/react/solid'
import { useRecoilState } from 'recoil'
import { showSearchState } from '../atoms/searchAtom'

function SearchBtn() {
  const [showSearch, setShowSearch] = useRecoilState(showSearchState)
  const handleShowSearch = () => setShowSearch(true)

  return (
    <button
      onClick={handleShowSearch}
      className="flex items-center space-x-2 hover:text-white"
    >
      <SearchIcon className="h-5 w-5" />
      <p>Search</p>
    </button>
  )
}

export default SearchBtn
