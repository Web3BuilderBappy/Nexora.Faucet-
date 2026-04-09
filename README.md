```
# NEXORA Faucet

A clean, minimal faucet interface for claiming free **NEX tokens** on Ethereum Sepolia testnet. Built with Next.js 14 and Reown AppKit for seamless multi-wallet support.

## Live Demo

🔗 [nexorafaucet.vercel.app](https://nexorafaucet.vercel.app)

## Overview

| Property | Value |
|----------|-------|
| Network | Ethereum Sepolia (Chain ID: 11155111) |
| Token | NEX · ERC-20 |
| Contract | `0xfd9c3Af45d565b2b5B672A90A70a97075833Bb63` |
| Amount per Claim | 1,000 NEX |

## Tech Stack

- **Framework** — Next.js 14 (App Router)
- **Wallet** — Reown AppKit + Wagmi v2
- **Chain** — Viem · Ethereum Sepolia
- **Styling** — CSS Modules · Space Mono · Bebas Neue

## Project Structure

nexora-faucet/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.module.css
│   └── page.tsx
├── components/
│   └── AppKitProvider.tsx
├── lib/
│   └── wagmi.ts
├── next.config.js
├── package.json
└── tsconfig.json

## Getting Started

git clone https://github.com/Web3BuilderBappy/Nexora.Faucet-.git
cd Nexora.Faucet-
npm install
npm run dev

## How It Works

1. Connect wallet via Reown AppKit
2. App auto-switches to Sepolia
3. Click **Claim 1,000 NEX**
4. Confirm in wallet
5. Etherscan link shown on success

## Smart Contract

function claimTokens() external;
function faucetBalance() external view;

View on Etherscan: https://sepolia.etherscan.io/address/0xfd9c3Af45d565b2b5B672A90A70a97075833Bb63

## License

MIT © NEXORA https://github.com/Web3BuilderBappy
```
