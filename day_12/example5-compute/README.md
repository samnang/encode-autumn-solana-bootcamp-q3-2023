# Example 5: BFP Instruction Computation

## Install node dependencies

```bash
❯ npm install

```

## Start local node

```bash
❯ npm run local-node

```

## Build Solana program

```bash
❯ npm run build

```

## Deploy Solana program

```bash
❯ npm run deploy

```

## Run client to interact with Solana program

```bash
❯ npm run client

```

## Output from invoking the program

<details>
  <summary>See output logs when it run successfully</summary>

```bash
❯ solana logs
Streaming transaction logs. Confirmed commitment
Transaction executed in slot 2555:
  Signature: 3gbZmd7ezDew8MX8VehfWtupc34a3VvGqVUtbnKwqn3VNHKswLGHSc5hQCPS5irwgmZZaAL5TJWLtqj3bkkVVFL7
  Status: Ok
  Log Messages:
    Program 9UK8btLixuxDMNYDo5Jio1M7xxHohuAnixKJusq69phA invoke [1]
    Program log: [entrypoint] compute example entrypoint
    Program log: [entrypoint] will find 10-prime
    Program log: 1 th prime number is 2
    Program log: 2 th prime number is 3
    Program log: 3 th prime number is 5
    Program log: 4 th prime number is 7
    Program log: 5 th prime number is 11
    Program log: 6 th prime number is 13
    Program log: 7 th prime number is 17
    Program log: 8 th prime number is 19
    Program log: 9 th prime number is 23
    Program log: 10 th prime number is 29
    Program log: 10 th prime number is 29
    Program 9UK8btLixuxDMNYDo5Jio1M7xxHohuAnixKJusq69phA consumed 18210 of 200000 compute units
    Program 9UK8btLixuxDMNYDo5Jio1M7xxHohuAnixKJusq69phA success

```

</details>

<details>
  <summary>See output logs when it run out of computation</summary>

```bash
❯ npm run client

> client
> ts-node client/main.ts

Let's try to fail the program!

local system client config location:  /Users/user/.config/solana/cli/config.yml

local system client config location:  /Users/user/.config/solana/cli/config.yml
Connection to cluster established: http://127.0.0.1:8899 { 'feature-set': 3949673676, 'solana-core': '1.16.12' }
Enough funds for transaction fees
Choose n-th prime up to 90 (I'm serious!)
> 90
SendTransactionError: failed to send transaction: Transaction simulation failed: Error processing Instruction 0: Program failed to complete
    at Connection._callee89$ (/Users/user/Playground/solana/encode-autumn-solana-bootcamp-q3-2023/day_12/example5-compute/node_modules/@solana/web3.js/src/connection.ts:5922:13)
    at tryCatch (/Users/user/Playground/solana/encode-autumn-solana-bootcamp-q3-2023/day_12/example5-compute/node_modules/@babel/runtime/helpers/regeneratorRuntime.js:45:16)
    at Generator.<anonymous> (/Users/user/Playground/solana/encode-autumn-solana-bootcamp-q3-2023/day_12/example5-compute/node_modules/@babel/runtime/helpers/regeneratorRuntime.js:133:17)
    at Generator.next (/Users/user/Playground/solana/encode-autumn-solana-bootcamp-q3-2023/day_12/example5-compute/node_modules/@babel/runtime/helpers/regeneratorRuntime.js:74:21)
    at asyncGeneratorStep (/Users/user/Playground/solana/encode-autumn-solana-bootcamp-q3-2023/day_12/example5-compute/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:24)
    at _next (/Users/user/Playground/solana/encode-autumn-solana-bootcamp-q3-2023/day_12/example5-compute/node_modules/@babel/runtime/helpers/asyncToGenerator.js:22:9)
    at processTicksAndRejections (node:internal/process/task_queues:95:5) {
  logs: [
    'Program 9UK8btLixuxDMNYDo5Jio1M7xxHohuAnixKJusq69phA invoke [1]',
    'Program log: [entrypoint] compute example entrypoint',
    'Program log: [entrypoint] will find 90-prime',
    'Program log: 1 th prime number is 2',
    'Program log: 2 th prime number is 3',
    'Program log: 3 th prime number is 5',
    'Program log: 4 th prime number is 7',
    'Program log: 5 th prime number is 11',
    'Program log: 6 th prime number is 13',
    'Program log: 7 th prime number is 17',
    'Program log: 8 th prime number is 19',
    'Program log: 9 th prime number is 23',
    'Program log: 10 th prime number is 29',
    'Program log: 11 th prime number is 31',
    'Program log: 12 th prime number is 37',
    'Program log: 13 th prime number is 41',
    'Program log: 14 th prime number is 43',
    'Program log: 15 th prime number is 47',
    'Program log: 16 th prime number is 53',
    'Program log: 17 th prime number is 59',
    'Program log: 18 th prime number is 61',
    'Program log: 19 th prime number is 67',
    'Program log: 20 th prime number is 71',
    'Program log: 21 th prime number is 73',
    'Program log: 22 th prime number is 79',
    'Program log: 23 th prime number is 83',
    'Program log: 24 th prime number is 89',
    'Program log: 25 th prime number is 97',
    'Program log: 26 th prime number is 101',
    'Program log: 27 th prime number is 103',
    'Program log: 28 th prime number is 107',
    'Program log: 29 th prime number is 109',
    'Program log: 30 th prime number is 113',
    'Program log: 31 th prime number is 127',
    'Program log: 32 th prime number is 131',
    'Program log: 33 th prime number is 137',
    'Program log: 34 th prime number is 139',
    'Program log: 35 th prime number is 149',
    'Program log: 36 th prime number is 151',
    'Program log: 37 th prime number is 157',
    'Program log: 38 th prime number is 163',
    'Program log: 39 th prime number is 167',
    'Program log: 40 th prime number is 173',
    'Program log: 41 th prime number is 179',
    'Program log: 42 th prime number is 181',
    'Program log: 43 th prime number is 191',
    'Program log: 44 th prime number is 193',
    'Program log: 45 th prime number is 197',
    'Program log: 46 th prime number is 199',
    'Program log: 47 th prime number is 211',
    'Program log: 48 th prime number is 223',
    'Program log: 49 th prime number is 227',
    'Program log: 50 th prime number is 229',
    'Program log: 51 th prime number is 233',
    'Program log: 52 th prime number is 239',
    'Program log: 53 th prime number is 241',
    'Program log: 54 th prime number is 251',
    'Program log: 55 th prime number is 257',
    'Program log: 56 th prime number is 263',
    'Program log: 57 th prime number is 269',
    'Program log: 58 th prime number is 271',
    'Program log: 59 th prime number is 277',
    'Program log: 60 th prime number is 281',
    'Program log: 61 th prime number is 283',
    'Program log: 62 th prime number is 293',
    'Program 9UK8btLixuxDMNYDo5Jio1M7xxHohuAnixKJusq69phA consumed 200000 of 200000 compute units',
    'Program 9UK8btLixuxDMNYDo5Jio1M7xxHohuAnixKJusq69phA failed: exceeded CUs meter at BPF instruction #2913'
  ]
}

```

</details>
