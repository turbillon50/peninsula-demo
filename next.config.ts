import type { NextConfig } from 'next'
const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol:'https', hostname:'d8j0ntlcm91z4.cloudfront.net' },
      { protocol:'https', hostname:'pravatar.cc' },
    ],
  },
}
export default config
