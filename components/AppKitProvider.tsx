'use client'

import { createAppKit } from '@reown/appkit/react'
import { sepolia } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { wagmiAdapter, projectId, networks } from '../lib/wagmi'

const queryClient = new QueryClient()

const metadata = {
  name: 'NEXORA Faucet',
  description: 'Claim free NEX tokens on Sepolia testnet',
  url: 'https://nexora.io',
  icons: ['https://nexora.io/logo.png'],
}

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  defaultNetwork: sepolia,
  metadata,
  features: {
    analytics: false,
    email: false,
    socials: false,
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#b5ff2d',
    '--w3m-border-radius-master': '4px',
    '--w3m-font-family': 'monospace',
  },
})

export function AppKitProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
