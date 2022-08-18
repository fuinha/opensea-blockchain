import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { client } from '../../lib/sanityClient'
import { useAddress } from '@thirdweb-dev/react';

const style = {
  bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
  socialIconsContainer: `flex text-3xl mb-[-2rem]`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2`,
  divider: `border-r-2`,
  title: `text-5xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
}

const Collection = () => {
  const router = useRouter()
  const address = useAddress()
  const { collectionId } = router.query
  const [collection, setCollection] = useState({})
  const [nfts, setNfts] = useState([])
  const [listings, setListings] = useState([])

  const nftModule = useMemo(() => {
    if (!address) return

    const sdk = new ThirdwebSDK(
      address,
      `https://eth-rinkeby.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
    )
    return sdk.getNFTModule(collectionId)
  }, [address, collectionId])

  useEffect(() => {
    if (!nftModule) return
    ;(async () => {
      const nfts = await nftModule.getAll()
      setNfts(nfts)
    })()
    /** ⬆⬆ Create an anonymous function and call it immediately ⬆⬆
     *  IIFE (Immediately Invoked Functional Expressions)
     */
  }, [nftModule])

  const marketPlaceModule = useMemo(() => {
    if (!address) return

    const sdk = new ThirdwebSDK(
      address,
      'https://eth-rinkeby.alchemyapi.io/v2/tKEipmcZJ9om-FlOdCuVv0npFO5tnEgq'
    )

    return sdk.getMarketplaceModule(
      '0x6B51786C215e310713177b71aBcaa066e50C1029'
    )
  }, [address])

  // get all listings in the collection
  useEffect(() => {
    if (!marketPlaceModule) return
    ;(async () => {
      setListings(await marketPlaceModule.getAllListings())
    })()
  }, [marketPlaceModule])

  useEffect(() => {
    const fetchCollectionData = async (sanityClient = client) => {
      const query = `*[_type == "marketItems" && contractAddress == "${collectionId}" ] {
        "imageUrl": profileImage.asset->url,
        "bannerImageUrl": bannerImage.asset->url,
        volumeTraded,
        createdBy,
        contractAddress,
        "creator": createdBy->userName,
        title, 
        floorPrice,
        "allOwners": owners[]->, description
      }`

      const collectionData = await sanityClient.fetch(query)

      // the query returns one object inside of an array
      console.log(collectionData)
      setCollection(collectionData[0])
    }
    fetchCollectionData()
  }, [collectionId])

  return (
    <div>
      <Link href="/">
        <h1>{router.query.collectionId}</h1>
      </Link>
    </div>
  )
}

export default Collection
