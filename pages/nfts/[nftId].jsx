import React, { useEffect, useMemo, useState } from 'react'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { useRouter } from 'next/router'

import Header from '../../components/Header'
import NFTImage from '../../components/nft/NFTImage'
import GeneralDetails from '../../components/nft/GeneralDetails'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
}

const Nft = () => {
  const [selectedNft, setSelectedNft] = useState(null)
  const [listings, setListings] = useState([])
  const router = useRouter()
  
  useEffect(() => {
    if (!router.query.nftId) return 
    const sdk = new ThirdwebSDK('rinkeby')
    const nftModule = sdk.getNFTCollection(
      '0xa08b847d5dC8833700C28200475Ac3c64cb0DFaE'
    )
    // Get only one NFT in the collection according to the route
    ;(async () => {
      const selectedNftItem = await nftModule.getTokenMetadata(router.query.nftId)
      setSelectedNft(selectedNftItem)
    })()
  }, [router.query.nftId])

  useEffect(() => {
    const sdk = new ThirdwebSDK('rinkeby')
    const marketPlaceModule = sdk.getMarketplace(
      '0x7600aB00c4524E11da066650Dd053040D0880EB0'
    )
    ;(async () => {
      // Get all NFT in marketplace (listings)
      const listings = await marketPlaceModule.getActiveListings()
      setListings(listings)
    })()
  }, [])

  // useEffect(() => {
  //   ;(async () => {
  //     const sdk = new ThirdwebSDK('rinkeby')
  //     const collection = sdk.getNFTCollection(
  //       '0xa08b847d5dC8833700C28200475Ac3c64cb0DFaE'
  //     )
  //     const marketplace = sdk.getMarketplace(
  //       '0x7600aB00c4524E11da066650Dd053040D0880EB0'
  //     )

  //     const nft = await collection.get(router.query.nftId)
  //     const listings = await marketplace.getActiveListings()
  //     setSelectedNft(nft)
  //     setListings(listings)
  //   })()
  // }, [router.query.nftId])

  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={selectedNft} />
            </div>
            <div className={style.detailsContainer}>
              <GeneralDetails selectedNft={selectedNft} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nft
