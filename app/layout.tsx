import type { Metadata } from 'next'
import { AppKitProvider } from '../components/AppKitProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'NEXORA Faucet',
  description: 'Claim free NEX tokens on Sepolia testnet',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppKitProvider>{children}</AppKitProvider>
      </body>
    </html>
  )
}
