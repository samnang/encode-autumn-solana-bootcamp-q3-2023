# Homework 3

## Installing Solana Command Line Tools

```sh
❯ solana --version
solana-cli 1.16.11 (src:33474a7e; feat:3949673676, client:SolanaLabs)
```

## Create a keypair

```sh
❯ mkdir demo-wallets
❯ solana-keygen new --outfile demo-wallets/my-keypair.json
Generating a new keypair

For added security, enter a BIP39 passphrase

NOTE! This passphrase improves security of the recovery seed phrase NOT the
keypair file itself, which is stored as insecure plain text

BIP39 Passphrase (empty for none):

Wrote new keypair to demo-wallets/my-keypair.json
==========================================================================
pubkey: CMNHLpRzDxqLY6Sos5YduLniyvS2tQKygwMyrxPjQezL
==========================================================================
Save this seed phrase and your BIP39 passphrase to recover your new keypair:
edit dutch remove song offer outer repair neither minute wedding main urge
==========================================================================
```

### Display wallet address

```sh
❯ solana-keygen pubkey demo-wallets/my-keypair.json
CMNHLpRzDxqLY6Sos5YduLniyvS2tQKygwMyrxPjQezL
```

### Verify your address

```sh
❯ solana-keygen verify CMNHLpRzDxqLY6Sos5YduLniyvS2tQKygwMyrxPjQezL demo-wallets/my-keypair.json
Verification for public key: CMNHLpRzDxqLY6Sos5YduLniyvS2tQKygwMyrxPjQezL: Success
```

## Connectto the dev network

```sh
❯ solana config set --url https://api.devnet.solana.com/
Config File: /Users/user/.config/solana/cli/config.yml
RPC URL: https://api.devnet.solana.com/
WebSocket URL: wss://api.devnet.solana.com/ (computed)
Keypair Path: /Users/user/.config/solana/devnet1.json
Commitment: confirmed

```

### Check the configuration

```sh
❯ solana config get
Config File: /Users/user/.config/solana/cli/config.yml
RPC URL: https://api.devnet.solana.com/
WebSocket URL: wss://api.devnet.solana.com/ (computed)
Keypair Path: /Users/user/.config/solana/devnet1.json
Commitment: confirmed

```

### Airdrop 1 SOL for the account on devnet

```sh
❯ solana airdrop 1 CMNHLpRzDxqLY6Sos5YduLniyvS2tQKygwMyrxPjQezL --url https://api.devnet.solana.com
Requesting airdrop of 1 SOL

Signature: 52yGVsiq4cuLztVA6ZH2L9YLJFSry9rpEycDYRYFZ16fsSLB9PTYtdUyWoTvyPys9yMSf144XQUyHxgGwk7C51rQ

1 SOL

❯ solana balance CMNHLpRzDxqLY6Sos5YduLniyvS2tQKygwMyrxPjQezL --url https://api.devnet.solana.com
1 SOL
```

## Install Hot wallets

![Phantom Wallet](./phantom_wallet.png)

### Try interacting with Apps on the Dev network

![Zeta Markets](./zeta_markets.png)
