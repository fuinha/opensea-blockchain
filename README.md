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


