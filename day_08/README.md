# Homework 8

## Create a fungible token

```bash
❯ spl-token create-token
Creating token 31kf6MsGcYTkHJQsDEJfB8B4TaKW2uwjBBsuPFEFxxNg under program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA

Address:  31kf6MsGcYTkHJQsDEJfB8B4TaKW2uwjBBsuPFEFxxNg
Decimals:  9

Signature: 34sMwBtVUjH4wW8vbwmVhyS58jwaCDSrioCY3HtEvXbVywhNczspXtkC6FuFMnzUCrCjwMJipkZZ63ST3vawDr9v

```

### Create a token account

```bash
❯ spl-token create-account 31kf6MsGcYTkHJQsDEJfB8B4TaKW2uwjBBsuPFEFxxNg
Creating account HG9gBe8oFfLTGEH4iMn615ixYcQaybvKZ9iTCWjSo3EM

Signature: 3RroyMmywHA4VcTc6bhoGQ4t9CNFAJwTXiGXwyQnXvqV8AxyU3pjfjYxEUHa22QGAECcKYerW7E1gHJLXthTwByb


```

### Mint 10,000

```bash
❯ spl-token mint 31kf6MsGcYTkHJQsDEJfB8B4TaKW2uwjBBsuPFEFxxNg 10000 HG9gBe8oFfLTGEH4iMn615ixYcQaybvKZ9iTCWjSo3EM
Minting 10000 tokens
  Token: 31kf6MsGcYTkHJQsDEJfB8B4TaKW2uwjBBsuPFEFxxNg
  Recipient: HG9gBe8oFfLTGEH4iMn615ixYcQaybvKZ9iTCWjSo3EM

Signature: 3qzLkXicZ2Qis85EAd1rfvfAWAkNBTWwfBkbt6hE4Ep8FK9QJLvxVtMuYqsimNTmrQfFwXD7wNgPzUFcXBNuSw3p

```

### Verify max supply and account balance

```bash
❯ spl-token supply 31kf6MsGcYTkHJQsDEJfB8B4TaKW2uwjBBsuPFEFxxNg
10000

❯ spl-token balance --address HG9gBe8oFfLTGEH4iMn615ixYcQaybvKZ9iTCWjSo3EM
10000

```

### Transfer tokens to another account

```bash
❯ spl-token transfer -v 31kf6MsGcYTkHJQsDEJfB8B4TaKW2uwjBBsuPFEFxxNg 100 Ar9PdUY8nSKqeC2qFRtfcFCEG5P7yxgktxpGuMbR1uPD
Transfer 100 tokens
  Sender: HG9gBe8oFfLTGEH4iMn615ixYcQaybvKZ9iTCWjSo3EM
  Recipient: Ar9PdUY8nSKqeC2qFRtfcFCEG5P7yxgktxpGuMbR1uPD

Signature: 32CqXMRTb61k4kqgYini8ghAhqKrpr7RinRXLgaNxq6MxgN6g1Use8QxePUV6FRfu8ERgPMoKV6eW4eqtXWckBW8

```

### Transfer tokens to another account (unfunded and doesn't have associated token account)

```bash
❯ spl-token transfer -v --allow-unfunded-recipient --fund-recipient 31kf6MsGcYTkHJQsDEJfB8B4TaKW2uwjBBsuPFEFxxNg 100 jSYrBtiDcDWJJDYeTWBBUQJiPXNhJGRVvbmSeXxFBb9
Transfer 100 tokens
  Sender: HG9gBe8oFfLTGEH4iMn615ixYcQaybvKZ9iTCWjSo3EM
  Recipient: jSYrBtiDcDWJJDYeTWBBUQJiPXNhJGRVvbmSeXxFBb9
  Recipient associated token account: DtCqQU6Qirf6BQJnRVLV26iRzd5CfJiBgDRPWuxBvzcz
  Funding recipient: DtCqQU6Qirf6BQJnRVLV26iRzd5CfJiBgDRPWuxBvzcz

Signature: 47sd5ykcrtSnG4Vfm5HVNG5rR8YcaBfx1emAfsHshjdqaQTn31yVt4FbZ4YsBhuRYxVQn2WCBtw3dxzQLbj5LFtA

```

## Create an NFT

```bash
❯ spl-token create-token --decimals 0
Creating token 9q5dCEtWhXVfT1UZXKAGAaH1WiFa1AxDJkgqTwnk8beB under program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA

Address:  9q5dCEtWhXVfT1UZXKAGAaH1WiFa1AxDJkgqTwnk8beB
Decimals:  0

Signature: 2tNMPwpcPhso9KAzpjd4E31ex44vbdpXn44vuo3kzU9y3N7Zuxce5VoxLpHGxWfM73Rcy8hz4BT43JTLz6t1GiB4

```

### Create a token account

```bash
❯ spl-token create-account 9q5dCEtWhXVfT1UZXKAGAaH1WiFa1AxDJkgqTwnk8beB
Creating account 53rC8Fin6miLTZEaJr3RYZTDfEcuWyx73z3x1q9KWJFs

Signature: 3PgMyNyWhBD4FbN7EM8bB1HjVtHGcF39dbRPi7Tx3J9NYTD3dbAp4BhNkV8cZFPS2o1RJ7vyqMWU4Fgg1NyXYr1s

```

### Mint NFT

```bash
❯ spl-token mint 9q5dCEtWhXVfT1UZXKAGAaH1WiFa1AxDJkgqTwnk8beB 1 53rC8Fin6miLTZEaJr3RYZTDfEcuWyx73z3x1q9KWJFs
Minting 1 tokens
  Token: 9q5dCEtWhXVfT1UZXKAGAaH1WiFa1AxDJkgqTwnk8beB
  Recipient: 53rC8Fin6miLTZEaJr3RYZTDfEcuWyx73z3x1q9KWJFs

Signature: 6yaXkfBVo2eNuW2FxKB51DWVRt6XqoF61faBAn6fCeuWa2SVRC3hDX6EN152ceNvQip5tWPckMd1whiaaejiE2E

```

### Disable minting

```bash
❯ spl-token authorize 9q5dCEtWhXVfT1UZXKAGAaH1WiFa1AxDJkgqTwnk8beB mint --disable
Updating 9q5dCEtWhXVfT1UZXKAGAaH1WiFa1AxDJkgqTwnk8beB
  Current mint authority: 7cYJ6Ne9gc6kAk6ETsEsfbDaw1nADk9cxb1X4A69NaqD
  New mint authority: disabled

Signature: 4AFHLFfRk5guERURinmSPBhdBe3q4ocqbvpwxX4nUzW92Jt5z18UUHRZJ2VUMY6DviafM1SQr2ysysWk8nSWW7x7

```
