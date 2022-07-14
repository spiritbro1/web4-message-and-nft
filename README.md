# to mint an nft

go to https://hello_is.testnet.page

# to send a message 

go to https://poldi.testnet.page

# demo

https://www.youtube.com/watch?v=p-tUoSJZSP8

# How to deploy
This is a monorepo that contains 3 apps

- `backend` for uploading to filebase and get the IPFS CID, also to resize image
- `nft` for nft minter on near blockchain
- `message` guest book in near blockchain

install all package using this command:

```bash
$ yarn
```

deploy the backend using this command:

```bash
$ yarn backend:deploy
```

first you need to have an account in filebase go here https://filebase.com, and get their access keys, thn go to https://vercel.com and open your deployed backend and fill add environment variable like this:

![image](https://user-images.githubusercontent.com/62529025/178881884-ae33176c-caec-45ae-a9ed-54c923446ccd.png)

After that deploy again using command:


```bash
$ yarn backend:deploy
```

Then go to `packages/nft` folder create .env that consist of this variable:

```
VUE_APP_API_URL=# your backend url on vercel before
VUE_APP_CONTRACT=# your deployed nft minter contract
```

Then build the contract using this command:

```bash
$ yarn nft:build:contract
```

Then deploy it using this command:

```bash
$ yarn nft:deploy:contract --accountId <your account id>
```

And then install `ipfs deploy` using this command:

```bash
$ npm install -g ipfs-deploy
```

Then build this vue app using this command:

```bash
$ yarn nft:build
```

Deploy it to ipfs using this command:

```bash
$ yarn nft:deploy
```
open the ipfs link like this https://ipfs.infura.io/ipfs/QmQaG7TbFMhogKDkBvtJK17ci8sK9hZv9ZjkrB2VB6Ru75 then you will get something like this https://bafybeibbgp2et6wx5nmizbdhgfyy4kbd3wxoqjq3f5kbzddinsiw4d3tqa.ipfs.infura-ipfs.io/ copy paste only the `bafybeibbgp2et6wx5nmizbdhgfyy4kbd3wxoqjq3f5kbzddinsiw4d3tqa` after that run this command to set our static url :

```
$ near call <your account id> web4_setStaticUrl '{"url": "ipfs://<change this to the CID that you copy earlier>"}' --depositYocto 1 --accountId=<your account id>
```

For the `message` folder you need to first create .env that consist of this variable:

```
VUE_APP_API_URL=# your backend url
VUE_APP_CONTRACT=# the message contract
VUE_APP_NFT_CONTRACT=# your nft minter contract
```

after that change this line https://github.com/spiritbro1/web4-message-and-nft/blob/main/packages/message/assembly/main.ts#L59 `hello_is.testnet` to you nft minter deployed contract for the rest of command its pretty much the same you just need to change `nft` to `message` for example `yarn message:build:contract` and so on, then you can open your app on <account id>.page
