import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: '0bhxpnnh',
  dataset: 'production',
  apiVersion: '2021-10-21',
  token: process.env.NEXT_PUBLIC_SANITY_CLIENT_TOKEN,
  useCdn: false,
})
