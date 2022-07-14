import { PostedMessage, messages,deposit,pfp } from './model';
import { context,u128,ContractPromiseBatch,ContractPromise,logging,MapEntry,storage } from "near-sdk-as";

// --- contract code goes below

// The maximum number of latest messages the contract returns.
const MESSAGE_LIMIT = 10;

/**
 * Adds a new message under the name of the sender's account id.\
 * NOTE: This is a change method. Which means it will modify the state.\
 * But right now we don't distinguish them with annotations yet.
 */
export function addMessage(text: string,date:string): void {
  // Creating a new message and populating fields with our data
  const message = new PostedMessage(text,date,context.attachedDeposit);
  if(!deposit.contains(context.sender)){
    deposit.set(context.sender,context.attachedDeposit)
  }else{
    const howMuch=<u128>deposit.get(context.sender);
    const total=u128.add(howMuch,context.attachedDeposit);
    deposit.set(context.sender,total);
  }
  // Adding the message to end of the persistent collection
  messages.push(message);
}
export function getYourMoneyBack():void{
  assert(deposit.contains(context.sender), "There is no deposit with this ID");
  assert(<u128>deposit.get(context.sender) > u128.fromString('0'), "Your deposit is zero");
  ContractPromiseBatch.create(context.sender).transfer(<u128>deposit.get(context.sender));
  deposit.set(context.sender,u128.fromString("0"))
}
/**
 * Returns an array of last N messages.\
 * NOTE: This is a view method. Which means it should NOT modify the state.
 */
export function getMessages(): PostedMessage[] {
  const numMessages = min(MESSAGE_LIMIT, messages.length);
  const startIndex = messages.length - numMessages;
  const result = new Array<PostedMessage>(numMessages);
  for(let i = 0; i < numMessages; i++) {
    result[i] = messages[i + startIndex];
    result[i].image=<string>pfp.get(messages[i + startIndex].sender,"");
  }
  return result;
}
export function getAllDeposit(): MapEntry<string, u128>[] {
  return deposit.entries();
}
export function getDeposit(account_id:string): u128 {
  return <u128>deposit.get(account_id);
}
export function getPFP(account_id:string): string {
  return <string>pfp.get(account_id);
}
export function setPFP(token_id:string):void{
  let nftArgs = new NFTArgs(token_id);
  let promise = ContractPromise.create(
    "hello_is.testnet", // contract account name
    "nft_token", // contract method name
    nftArgs, // serialized contract method arguments encoded as Uint8Array
    20e12
  );
  logging.log(context.prepaidGas)
  
  let callbackPromise = promise.then(context.contractName, "_setPFP", new Uint8Array(0), 20e12);
  callbackPromise.returnAsResult();
  logging.log(context.usedGas)
}
export function _setPFP():bool{
  let results = ContractPromise.getResults();
  let addItemResult = results[0];
  // Verifying the remote contract call succeeded.
  if (addItemResult.status === 1) {
    // Decoding data from the bytes buffer into the local object.
    let word = decode<Token>(addItemResult.buffer);
    logging.log(context.sender)
    logging.log(word.metadata.media)
    pfp.set(context.sender,word.metadata.media)
    return true;
  }
  return false;
}
@nearBindgen
class NFTArgs {
  constructor(public token_id: string) {}
}

@nearBindgen
class Token {
  id: string;
  owner_id: string;
  metadata: TokenMetadata;
  constructor(token_id: string, metadata: TokenMetadata, receiver_id: string) {
    this.id = token_id;
    this.metadata = metadata;
    this.owner_id = receiver_id;
  }
}

@nearBindgen
export class TokenMetadata {
  title: string; // ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"
  description: string; // free-form description
  media: string; // URL to associated media, preferably to decentralized, content-addressed storage
  media_hash: string; // Base64-encoded sha256 hash of content referenced by the `media` field. Required if `media` is included.
  copies: string; // number of copies of this set of metadata in existence when token was minted.
  issued_at: string; // When token was issued or minted, Unix epoch in milliseconds
  expires_at: string; // When token expires, Unix epoch in milliseconds
  starts_at: string; // When token starts being valid, Unix epoch in milliseconds
  updated_at: string; // When token was last updated, Unix epoch in milliseconds
  extra: string; // anything extra the NFT wants to store on-chain. Can be stringified JSON.
  reference: string; // URL to an off-chain JSON file with more info.
  reference_hash: string; // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
}

@nearBindgen
class Web4Request {
    accountId: string | null;
    path: string;
    params: Map<string, string>;
    query: Map<string, Array<string>>;
    preloads: Map<string, Web4Response>;
}

@nearBindgen
class Web4Response {
    contentType: string;
    status: u32;
    body: Uint8Array;
    bodyUrl: string;
    preloadUrls: string[] = [];
}

function assertOwner(): void {
  // NOTE: Can change this check to alow different owners
  assert(context.sender == context.contractName);
}
const WEB4_STATIC_URL_KEY = 'web4';

// Updates current static content URL in smart contract storage
export function web4_setStaticUrl(url: string): void {
    assertOwner();

    storage.set(WEB4_STATIC_URL_KEY, url);
}

function bodyUrl(url: string): Web4Response {
  return { bodyUrl: url };
}

function status(status: u32): Web4Response {
  return { status };
}
export function web4_get(request: Web4Request): Web4Response {

  if (request.path == "/") {
      return bodyUrl(`${storage.getString(WEB4_STATIC_URL_KEY)!}`);
  }
  if (request.path.includes("js") || request.path.includes("img")) {
      return bodyUrl(`${storage.getString(WEB4_STATIC_URL_KEY)!}${request.path}`);
  }
  // By default return 404 Not Found
  return status(404);
}