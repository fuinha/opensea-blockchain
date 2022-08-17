import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Collection = () => {
  const router = useRouter()
  // console.log(router.query.collectionId)

  return (
    <div>
      <Link href="/">
        <h1>{router.query.collectionId}</h1>
      </Link>
    </div>
  )
}

export default Collection
