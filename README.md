# OpenSea Blockchain | Thirdweb, Metamask & Sanity.io

![banner](banner.png)

> In this project I created my own NFT Tokens using the `Thirdweb SDK`, and with send authentication done through `Metamask`, thus making the application dependent on a blockchain network to be accessed. GROQ (Graph-Relational Object Queries) was also used to retrieve data from `Sanity Studio` and display it in the Web 3.0 application. The project is taught on the <strong>Clever Programmer</strong> channel.
<br />

:arrow_right: Blockchain Network <br />
:arrow_right: Thirdweb | Build web3 apps <br />
:arrow_right: Metamask | A crypto wallet & gateway to blockchain apps <br />
<br />

## Blockchain Network 

Blockchain technology is nothing more than a public ledger that `records a virtual currency transaction` (the most popular of which is Bitcoin), so that this record is `reliable` and `immutable`.

The technology `stores the information of a group of transactions in blocks`, marking each block with a timestamp. Every time period (10 minutes on the blockchain), a new block of transactions is formed, which links to the previous block.

`Blocks are dependent on each other` and form a chain of blocks (hence the name: Blockchain). This makes the technology perfect for recording information that needs to be `trusted`, such as in the case of a transaction of bitcoin and other cryptocurrencies.

The blockchain network is made up of miners who verify and record transactions on the block.

To make this possible, miners lend computing power to the network. As an incentive to continue collaborating and make the network sustainable and more secure, they receive a reward in digital currencies.

*<i>foxbit.com.br/o-que-e-blockchain</i>

### Smart Contracts on Blockchain 

A smart contract is a `self-executing computer protocol` created with the popularization of cryptocurrencies and made to facilitate and reinforce the negotiation or performance of a contract, providing reliability in online transactions. With the main objective of allowing unknown people to do business with each other, over the internet `without the need for the intermediary of a central authority`.

In order to be considered a smart contract, the transaction must involve more than a simple transfer of virtual currency between two people (like a payment transfer, for example), it must involve two or more parties (like every contract), and the implementation of the contract should not require direct human involvement from the moment it is signed. Instead of being written on paper in legal language, they are implemented in a `programming language and run on a computer`. In this protocol, strict rules and consequences are defined, in the same way as a legal document, stating the obligations, benefits and penalties of those involved. Furthermore, unlike a traditional contract, a smart contract is able to obtain information, process it and take the appropriate actions provided for in accordance with the contract rules.

*<i>en.wikipedia.org/wiki/Smart_contract</i>

<br />

## Thirdweb | Build web3 apps

Smart contracts you control. Powerful `SDKs (Software Development Kit)` and intuitive tools for developers. Ship on-chain faster.

### You can install this SDK with either npm: 

- `npm install @thirdweb-dev/react @thirdweb-dev/sdk ethers`

### Configure the thirdweb Provider

In order to use the hooks offered by the React SDK, you need to first setup a `ThirdwebProvider` for your app which lets you optionally configure your app. You can use this configuration to control what networks you want users to connect to, what types of wallets can connect to your app, and the settings for the Typescript SDK.

At the top level of your application, add a ThirdwebProvider as follows:

```jsx
// pages/_app.jsx

import '../styles/global.css'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  )
}

export default MyApp
```

Now you'll be able to use all the hooks provided by the React SDK!

### Let Users Connect Wallets

Next, we'll add a button to our app which will let users connect their wallets. For now, we'll make it so that users with `MetaMask` wallets can connect.

```jsx
// pages/index.jsx

import { useAddress, useMetamask } from '@thirdweb-dev/react'

// ...
export default function Home() {
	const connectMetaMask = useMetamask()
	const address = useAddress()
	
	return (
	// ...
	{!address ? (
          <div className={style.walletConnectWrapper}>
            <div className={style.container}>
              <button
                onClick={connectMetaMask}
                href="#_"
                className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg cursor-pointer group"
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#2081e2] rounded-full group-hover:w-56 group-hover:h-56"></span>
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                <span className="relative">Connect Wallet</span>
              </button>
              <div className={style.details}>
                You need Metamask to be <br /> able to run this app.
              </div>
            </div>
          </div>
        ) : (
          <>
            <Header />
            <Hero />
          </>
        )}
  // ...
}

```

Here, we use the `useMetamask` hook to handle metamask connection. When a user clicks the button, we'll call the connectMetaMask, which will prompt users to connect their metamask wallet.

### Thirdweb Dashboard

Here, you'll find all of the `information` you need to interact with and `manage your contract`, including:

<li><strong>Explorer</strong>: call any function on your contract, and view the results.</li>
<li><strong>Events</strong>: a live-updating feed of all events emitted by your contract.</li>

As well as tabs for each extension that your contract implements:

<li><strong>NFTs</strong>: since you implemented the ERC721 Standard.</li>
<li><strong>Permissions</strong>: since you implemented the Permissions feature.</li>
<li><strong>Settings</strong>: since you implemented the Contract Metadata and Royalty features.</li>

With the Thirdweb service we can `create contracts` and `deploy them`, so we will have access to the dashboard.

### Reading data from your contracts

The quickest way to get started is to use the SDK as read only (no transactions). This will allow you to `query data` from any contract with no additional setup.

```jsx
// /pages/collections/[collectionId].jsx

import React, { useState, useEffect, useMemo } from 'react'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { useAddress } from '@thirdweb-dev/react'

const Collection = () => {
  const address = useAddress()
  const router = useRouter()
  const { collectionId } = router.query
  const [collection, setCollection] = useState([])
  const [nfts, setNfts] = useState([])
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  
  // ...
   useMemo(() => {
    setLoading(true)
    ;(async () => {
      const sdk = new ThirdwebSDK('rinkeby') 
      const collection = sdk.getNFTCollection('<CONTRACT_ADDRESS>')
      const marketplace = sdk.getMarketplace('<CONTRACT_ADDRESS>')

      // listing -> be available for purchase
      const listings = await marketplace.getActiveListings()
      const nfts = await collection.getAll()
      setListings(listings)
      setNfts(nfts)
      setLoading(false)
    })()
  }, [])
// ...
}

export default Collection
```

### Executing transactions on your contracts by frontend

In order to execute transactions on your contract, the SDK needs to know which wallet is executing those transactions. This can be done two ways:

- Using your own private key (typically used in the `backend` or scripts)
- By connecting to a user wallet (typically used in the `frontend`)

```js
func (*MarketplaceEncoder) BuyoutListing
```
Get the `transaction data` for the `buyout listing transaction`. This method will throw an error if the listing requires payment in ERC20 tokens and the ERC20 tokens haven't yet been approved by the spender.

```js
func (encoder *MarketplaceEncoder) BuyoutListing(ctx context.Context, signerAddress string, listingId int, quantityDesired int, receiver string) (*types.Transaction, error)
```

<li><strong>signerAddress</strong>: the address intended to sign the transaction</li>

<li><strong>listingId</strong>: the ID of the listing to buyout</li>

<li><strong>quantityDesired</strong>: the quantity of the listed tokens to purchase</li>

<li><strong>receiver</strong>: the address to receive the purchased tokens</li>

<li><strong>returns</strong>: the transaction data for this purchase</li> <br />

```jsx
// components/nft/Purchase.jsx

const buyItem = async (
	listingId = selectedMarketNft.id,
	quantityDesired = 1,
	module = marketplaceContract
) => {
	if (!address) return
	// Error: This action requires a connected wallet to sign a transaction. Pass a valid signer to the SDK. -> Resolved
	// If the application does not receive the wallet address, the action is not performed, later on, block the page view if this happens
	console.log(address)
	await module.buyoutListing(listingId, quantityDesired)
	confirmPurchase()
}
```

#### Example

First we check if the NFT is available for purchase (listed) in `pages/nfts/[nftId].jsx` and if so we enable the purchase functionality:

```jsx
// pages/nfts/[nftId].jsx

useEffect(() => {
  const sdk = new ThirdwebSDK('rinkeby')
  const marketPlaceModule = sdk.getMarketplace('<CONTRACT_ADDRESS>')
  ;(async () => {
    // Get all NFT in marketplace (listings)
    const listings = await marketPlaceModule.getActiveListings()
    setListings(listings)
  })()
}, [])
```

And pass it via props to the Purchase component and `check if there are any NFTs listed` and enable the button or not:

```jsx
// components/nft/Purchase.jsx

const Purchase = ({ isListed, selectedNft, listings }) => {
  const [selectedMarketNft, setSelectedMarketNft] = useState()
  const [enableButton, setEnableButton] = useState()
  const address = useAddress()
  const marketplaceContract = useMarketplace('<CONTRACT_ADDRESS>')

  useEffect(() => {
    if (!listings || isListed === 'false') return
    ;(async () => {
      setSelectedMarketNft(
        listings.find(
          (marketNft) =>
            marketNft.asset?.id.toNumber() === selectedNft.id.toNumber()
        )
      )
    })()
  }, [selectedNft, isListed, listings])

  useEffect(() => {
    if (!selectedMarketNft || !selectedNft) return
    setEnableButton(true)
  }, [address, selectedMarketNft, selectedNft])
// ...
}
```

If the button is enabled, we can buy the item by calling the `buyItem` function created earlier through `buyoutListing` to perform the transaction:

```jsx
// components/nft/Purchase.jsx

{isListed === 'true' ? (
  <>
    <button
      onClick={() => {
        enableButton ? buyItem(selectedMarketNft.id, 1) : null
      }}
      className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
    >
      <IoMdWallet className={style.buttonIcon} />
      <div className={style.buttonText}>Buy Now</div>
    </button>
    <div
      className={`${style.button} border border-[#151c22]  bg-[#363840] hover:bg-[#4c505c]`}
    >
      <HiTag className={style.buttonIcon} />
      <div className={style.buttonText}>Make Offer</div>
    </div>
  </>
) : (
  <div className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}>
    <IoMdWallet className={style.buttonIcon} />
    <div className={style.buttonText}>List Item</div>
  </div>
)}
```

*<i>portal.thirdweb.com</i>

<br />

## Metamask | A crypto wallet & gateway to blockchain apps 

MetaMask is a software cryptocurrency wallet used to interact with the Ethereum blockchain. It allows users to access their Ethereum wallet via a browser extension or mobile app, which can then be used to interact with `decentralized applications`.

ETH is the second largest cryptocurrency on the market today, after Bitcoin. However, the biggest difference from it is that its goal is to go beyond cryptocurrency financial transfers.

In other words, `Ethereum encourages the use of Blockchain technology` to store other relevant information, such as contracts, votes, records, images, among others.

In this way, MetaMask emerges as one of the main digital wallets to store tokens, but we emphasize that it is not the only one, only having greater popularity.

For investors, the biggest advantage that MetaMask presents is financial control in the cryptocurrency world. This control is essential to prevent the investor from having financial losses.

<li><strong>Buy, store, send and swap tokens</strong>: Available as a browser extension and as a mobile app, MetaMask equips you with a key vault, secure login, token wallet, and token exchange-everything you need to manage your digital assets.</li>

<li><strong>Explore blockchain apps</strong>: MetaMask provides the simplest yet most secure way to connect to blockchain-based applications. You are always in control when interacting on the new decentralized web.</li>
 
<li><strong>Own your data</strong>: MetaMask generates passwords and keys on your device, so only you have access to your accounts and data. You always choose what to share and what to keep private.</li> <br />

*<i>blog.b2bstack.com.br/o-que-e-metamask</i> <br />
*<i>metamask.io</i> <br />
*<i>en.wikipedia.org/wiki/MetaMask</i>
