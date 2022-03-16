import React, { useState } from 'react'
import { MenuIcon } from '@heroicons/react/solid'
import Sidebar from './SidebarMob'

function BurgerMenu() {
  const [showMenu, setShowMenu] = useState(false)

  const handleMenu = () => setShowMenu(!showMenu)

  return (
    <div className="md:hidden">
      <div hidden={showMenu} className="absolute top-2 left-4">
        <button onClick={handleMenu} className="top-0 h-10 w-10 text-white ">
          <MenuIcon className="text-white" />
        </button>
      </div>

      <Sidebar showMenu={showMenu} handleMenu={handleMenu} />
    </div>
  )
}

export default BurgerMenu
