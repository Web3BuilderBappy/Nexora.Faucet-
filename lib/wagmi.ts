'use client'

import { cookieStorage, createStorage } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { sepolia } from '@reown/appkit/networks'

export const projectId = 'f970ed71418bfb01a5dac341dbb7f50c'

if (!projectId) throw new Error('Project ID is not defined')

export const networks = [sepolia]

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
  projectId,
  networks,
})

export const config = wagmiAdapter.wagmiConfig
