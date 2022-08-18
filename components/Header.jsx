import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import openseaLogo from '../assets/opensea.png'
import { AiOutlineSearch } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineAccountBalanceWallet } from 'react-icons/md'

const style = {
  wrapper: `bg-[#04111d] w-screen px-[.4rem] md:px-[1.2rem] py-[0.8rem] flex`,
  logoContainer: `flex items-center cursor-pointer`,
  openseaLogo: `bg-gradient-to-t from-pink-500 to-blue-600 rounded-full bg-clip w-30 h-30`,
  logoText: `hidden md:block ml-[0.8rem] text-white font-semibold text-2xl`,
  searchBar: `hidden md:flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 focus:outline-none ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
  headerItems: `flex items-center justify-end w-full md:w-auto`,
  headerItem: `text-white px-2 md:px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
  headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
}

const Header = () => {
  return (
    <nav className={style.wrapper}>
      <Link href="/">
        <div className={style.logoContainer}>
          <Image
            className={style.openseaLogo}
            src={openseaLogo}
            alt="opensea/logo"
            width={40}
            height={40}
          />
          <div className={style.logoText}>Opensea</div>
        </div>
      </Link>
      <div className={style.searchBar}>
        <div className={style.searchIcon}>
          <AiOutlineSearch />
        </div>
        <input
          className={style.searchInput}
          placeholder="Search items, collections, and accounts"
        />
      </div>
      <div className={style.headerItems}>
        <Link href="/collections/0xa08b847d5dC8833700C28200475Ac3c64cb0DFaE">
          <div className={style.headerItem}>Collections</div>
        </Link>
        <div className={`${style.headerItem} hidden md:block`}>Stats</div>
        <div className={`${style.headerItem} hidden md:block`}>Resources</div>
        <div className={`${style.headerItem} hidden md:block`}>Create</div>
        <div className={style.headerIcon}>
          <CgProfile />
        </div>
        <div className={style.headerIcon}>
          <MdOutlineAccountBalanceWallet />
        </div>
      </div>
    </nav>
  )
}

export default Header
