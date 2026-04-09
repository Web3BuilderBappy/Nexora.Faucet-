'use client'

import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { useState } from 'react'
import styles from './page.module.css'

const CONTRACT = '0xfd9c3Af45d565b2b5B672A90A70a97075833Bb63' as const
const SEPOLIA_EXPLORER = 'https://sepolia.etherscan.io'

const ABI = [
  {
    inputs: [],
    name: 'claimTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'faucetBalance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

function shortAddr(addr: string) {
  return addr.slice(0, 6) + '...' + addr.slice(-4)
}

function formatBalance(val: bigint | undefined) {
  if (!val) return '—'
  const num = Number(val) / 1e18
  if (num >= 1e12) return (num / 1e12).toFixed(0) + 'T'
  if (num >= 1e9) return (num / 1e9).toFixed(0) + 'B'
  if (num >= 1e6) return (num / 1e6).toFixed(0) + 'M'
  return num.toLocaleString('en', { maximumFractionDigits: 0 })
}

export default function FaucetPage() {
  const { open } = useAppKit()
  const { address, isConnected } = useAppKitAccount()
  const [txHash, setTxHash] = useState<string | null>(null)
  const [claimError, setClaimError] = useState<string | null>(null)

  const { data: balance } = useReadContract({
    address: CONTRACT,
    abi: ABI,
    functionName: 'faucetBalance',
    query: { refetchInterval: 10000 },
  })

  const {
    writeContract,
    isPending: isSigning,
    reset,
  } = useWriteContract({
    mutation: {
      onSuccess: (hash) => {
        setTxHash(hash)
        setClaimError(null)
      },
      onError: (err) => {
        const msg = err.message || ''
        if (msg.includes('User rejected')) setClaimError('Rejected in wallet.')
        else if (msg.includes('Faucet is empty')) setClaimError('Faucet is empty.')
        else setClaimError('Transaction failed.')
      },
    },
  })

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash as `0x${string}` | undefined,
  })

  const handleClaim = () => {
    setClaimError(null)
    setTxHash(null)
    reset()
    writeContract({
      address: CONTRACT,
      abi: ABI,
      functionName: 'claimTokens',
    })
  }

  const isBusy = isSigning || isConfirming

  return (
    <main className={styles.main}>
      {/* NAV */}
      <nav className={styles.nav}>
        <div className={styles.logo}>
          {/* Inline SVG logo matching the uploaded image */}
          <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
            <rect x="10" y="10" width="80" height="14" fill="#b5ff2d"/>
            <rect x="10" y="34" width="80" height="14" fill="#b5ff2d"/>
            <rect x="10" y="58" width="80" height="14" fill="#b5ff2d"/>
            <rect x="10" y="10" width="14" height="62" fill="#b5ff2d"/>
          </svg>
          <span>NEXORA</span>
        </div>
        <div className={styles.netTag}>SEPOLIA TESTNET</div>
      </nav>

      {/* CONTENT */}
      <div className={styles.content}>

        {/* TITLE */}
        <div className={styles.titleBlock}>
          <p className={styles.tagline}>FREE TESTNET TOKENS</p>
          <h1 className={styles.title}>NEX FAUCET</h1>
          <p className={styles.sub}>Claim 1,000 NEX tokens to your wallet on Ethereum Sepolia</p>
        </div>

        {/* STAT BOXES */}
        <div className={styles.statsRow}>
          <div className={styles.statBox}>
            <div className={styles.statVal}>{formatBalance(balance)}</div>
            <div className={styles.statLabel}>FAUCET BALANCE</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statVal}>1,000</div>
            <div className={styles.statLabel}>PER CLAIM (NEX)</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statVal}>ERC-20</div>
            <div className={styles.statLabel}>TOKEN STANDARD</div>
          </div>
        </div>

        {/* MAIN CARD */}
        <div className={styles.card}>
          <div className={styles.cardLabel}>CLAIM TOKENS</div>

          {/* Wallet */}
          {!isConnected ? (
            <button className={styles.btnPrimary} onClick={() => open()}>
              CONNECT WALLET
            </button>
          ) : (
            <div className={styles.walletRow}>
              <div className={styles.walletAddr}>{shortAddr(address!)}</div>
              <button className={styles.btnGhost} onClick={() => open()}>
                CHANGE
              </button>
            </div>
          )}

          {/* Claim */}
          {isConnected && (
            <button
              className={styles.btnClaim}
              onClick={handleClaim}
              disabled={isBusy || isSuccess}
            >
              {isSigning && 'CONFIRM IN WALLET...'}
              {isConfirming && 'CONFIRMING...'}
              {isSuccess && '✓ CLAIMED'}
              {!isBusy && !isSuccess && 'CLAIM 1,000 NEX'}
            </button>
          )}

          {/* Status messages */}
          {claimError && (
            <div className={styles.errorBox}>{claimError}</div>
          )}

          {isSuccess && txHash && (
            <div className={styles.successBox}>
              <span>1,000 NEX sent to your wallet</span>
              <a
                className={styles.explorerLink}
                href={`${SEPOLIA_EXPLORER}/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                VIEW ON ETHERSCAN ↗
              </a>
            </div>
          )}

          {txHash && isConfirming && (
            <div className={styles.pendingBox}>
              <span className={styles.dot} />
              TX: {shortAddr(txHash)}
              <a
                className={styles.explorerLink}
                href={`${SEPOLIA_EXPLORER}/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                TRACK ↗
              </a>
            </div>
          )}
        </div>

        {/* INFO BOXES */}
        <div className={styles.infoRow}>
          <div className={styles.infoBox}>
            <div className={styles.infoLabel}>NETWORK</div>
            <div className={styles.infoVal}>Ethereum Sepolia</div>
          </div>
          <div className={styles.infoBox}>
            <div className={styles.infoLabel}>CONTRACT</div>
            <a
              className={styles.infoVal}
              href={`${SEPOLIA_EXPLORER}/address/${CONTRACT}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#b5ff2d', textDecoration: 'none', fontSize: '0.65rem' }}
            >
              {shortAddr(CONTRACT)} ↗
            </a>
          </div>
          <div className={styles.infoBox}>
            <div className={styles.infoLabel}>CHAIN ID</div>
            <div className={styles.infoVal}>11155111</div>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className={styles.footer}>
        NEXORA (NEX) · Sepolia Testnet · For testing purposes only
      </footer>
    </main>
  )
}
