/* eslint-disable @next/next/no-img-element */
import React from 'react'

const style = {
  wrapper: `relative`,
  container: `before:content-[''] -z-10 before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('/hero.png')] before:bg-cover before:bg-center before:opacity-40 before:blur-[1px]`,
  contentWrapper: `relative flex flex-wrap items-center justify-center h-screen md:h-[calc(100vh-67px)] text-center md:text-start`,
  copyContainer: `md:w-1/2 md:px-4 md:px-0`,
  title: 'relative text-white text-5xl md:text-[46px] font-semibold md:leading-normal tracking-wide',
  description: `text-[#b2b8bd] z-10 container-[400px] text-2xl mt-[0.8rem] mb-[2.5rem]`,
  ctaContainer: `flex flex-col space-y-4 md:space-y-0 md:flex-row text-center justify-center md:justify-start items-center`,
  accentedButton: `relative text-lg font-semibold px-12 py-4 bg-[#2181e2] rounded-lg md:mr-5 text-white hover:bg-[#42a0ff] cursor-pointer`,
  button: `relative text-lg font-semibold px-12 py-4 bg-[#363840] rounded-lg md:mr-5 text-[#e4e8ea] hover:bg-[#4c505c] cursor-pointer`,
  cardContainer: `hidden lg:block rounded-[3rem] max-w-[450px]`,
  infoContainer: `h-20 bg-[#313338] p-4 rounded-b-lg flex items-center text-white`,
  author: `flex flex-col justify-center ml-4`,
  infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,
}

const Hero = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.contentWrapper}>
          <div className={style.copyContainer}>
            <div className={style.title}>
              Discover, collect, and sell extraordinary NFTs
            </div>
            <div className={style.description}>
              OpenSea is the world&apos;s first and largest NFT marketplace
            </div>
            <div className={style.ctaContainer}>
              <button className={style.accentedButton}>Explore</button>
              <button className={style.button}>Create</button>
            </div>
          </div>
          <a
            href="https://opensea.io/assets/solana/CUzAAymzXZq8rooU9YEx8cYj1uv9DSCEDxrXtM5WDNCN"
            target="_blank"
            rel="noreferrer"
          >
            <div className={style.cardContainer}>
              <img
                className="rounded-t-lg"
                src="/unnamed.png"
                alt="img/cardContainer"
              />
              <div className={style.infoContainer}>
                <img
                  className="h-[2.25rem] rounded-full"
                  src="https://github.com/stardusteight-d4c.png"
                  alt="img/infoContainer"
                />
                <div className={style.author}>
                  <div className={style.name}>Primate #4943</div>
                  <span className="text-[#1868b7]">ThePrimates</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Hero
