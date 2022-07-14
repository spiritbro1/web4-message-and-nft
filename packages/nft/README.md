# Near Challenge 3

## Demo

https://user-images.githubusercontent.com/62529025/164838682-f174fcbb-96df-41f0-9be9-77c5803f72db.mp4

## Website

https://near-nft.vercel.app/

## How to develop

### Compile the wasm

```bash
yarn build:contract:debug
```

After you see something like this 

```
yarn run v1.22.15
$ asb --target debug
Done in 6.58s.
```

deploy into near testnet with this command :

```
near dev-deploy --wasmFile=./build/debug/contract.wasm
```

you will get something like this:

```
Starting deployment. Account id: dev-1650673472567-94467512871134, node: https://rpc.testnet.near.org, helper: https://helper.testnet.near.org, file: ./build/debug/contract.wasm
Transaction Id Dy69EgrkN1NFkaf2UhVHCjUwytEwtbL7seSkZ4Bo2srV
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/Dy69EgrkN1NFkaf2UhVHCjUwytEwtbL7seSkZ4Bo2srV
Done deploying to dev-1650673472567-94467512871134
```

Create `.env` file by issuing command `cp .env.example .env` then add variable to `VUE_APP_CONTRACT` like this:

```
VUE_APP_CONTRACT=dev-1650673472567-94467512871134
```

Now go to https://filebase.com/ sign up if you haven't sign up yet then create bucket, copy paste the name, key and secret and put it into `.env` respectively

### Deploy to vercel

In order to use `vercel dev` you need to deploy to vercel first it is needed to use the serverless api in `/api` directory run this command:

```
vercel .
```

After deployed you can then run:

```
vercel dev
```

To develop in local

