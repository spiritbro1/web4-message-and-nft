import { PersistentUnorderedMap, context, MapEntry,storage,util } from "near-sdk-as";
import { Token, TokenMetadata } from "./spiritbro-token";

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

function bodyUrl(url: string): Web4Response {
  return { bodyUrl: url };
}

function status(status: u32): Web4Response {
  return { status };
}
class HtmlAttributes {
  id: string | null;
  name: string | null;
  class: string | null;
  style: string | null;

  toString(): string {
      let result = "";
      if (this.id) {
          result += "id=";
          result += this.id!;
      }
      if (this.name) {
          result += "name=";
          result += this.name!;
      }
      if (this.class) {
          result += "class=";
          result += this.class!;
      }
      if (this.style) {
          result += "style=";
          result += this.style!;
      }
      return result;
  }
}

class HtmlFormAttributes extends HtmlAttributes {
  action: string | null;
  method: string = "POST";

  toString(): string {
      let result = super.toString();
      if (this.action) {
          result += "action=";
          result += this.action!;
       
      }
      if (this.method) {
        result += "\"";
          result += "method=\"";
          result += this.method;
      }
      return result;
  }
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

@nearBindgen
class NFTContractMetadata {
  constructor(
    public spec: string = "nft-2.0.0", // required, which version of NEP-177 that this contract supports
    public name: string = "SPIRITBRO1 NFT", // required, ex. "Mochi Rising — Digital Edition" or "Metaverse 3"
    public symbol: string = "SPRT", // required, ex. "MOCHI"
    public icon: string = `data:image/jpeg;base64,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`, // Data URL
    public base_uri: string = "", // Centralized gateway known to have reliable access to decentralized storage assets referenced by `reference` or `media` URLs
    public reference: string = "", // URL to a JSON file with more info
    public reference_hash: string = "" // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
  ) {}
}

@nearBindgen
export class Contract {
  // nft testing

  //contract owner. Is this really needed?
  owner_id: string = context.contractName;

  //keeps track of all the token IDs for a given account
  tokens_per_owner: PersistentUnorderedMap<string, Array<string>> =
    new PersistentUnorderedMap<string, Array<string>>("tokens_pr_owner");

  //keeps track of the token struct for a given token ID
  tokens_by_id: PersistentUnorderedMap<string, Token> =
    new PersistentUnorderedMap<string, Token>("tokens_by_id");

  //keeps track of the token metadata for a given token ID
  token_metadata_by_id: PersistentUnorderedMap<string, TokenMetadata> =
    new PersistentUnorderedMap<string, TokenMetadata>("token_metadata_by_id");

  nft_total_supply(): number {
    return this.tokens_by_id.length;
  }

  nft_supply_for_owner(account_id: string): string {
    assert(this.tokens_per_owner.contains(account_id));
    return this.tokens_per_owner.getSome(account_id).length.toString();
  }

  nft_tokens_for_owner(
    account_id: string,
    from_index: u64 = 0,
    limit: i32 = 10
  ): Token[] {
    const tokenIds: string[] = this.tokens_per_owner.getSome(account_id);

    const tokens: Array<Token> = new Array<Token>();
    for (let i = 0; i < tokenIds.length; i++) {
      const token: Token = this.tokens_by_id.getSome(tokenIds[i]);
      tokens.push(token);
    }
    return tokens;
  }

  nft_metadata(): NFTContractMetadata {
    return new NFTContractMetadata();
  }

  nft_token(token_id: string): Token {
    return this.tokens_by_id.getSome(token_id);
  }

  nft_mint(
    token_id: string,
    metadata: TokenMetadata,
    receiver_id: string
  ): void {
    assert(
      !this.tokens_by_id.contains(token_id),
      "ID is already used, use another ID"
    );

    if (!this.tokens_per_owner.contains(receiver_id)) {
      this.tokens_per_owner.set(receiver_id, []);
    }
    let tokens: Array<string> = this.tokens_per_owner.getSome(receiver_id);
    const token = new Token(token_id, metadata, receiver_id);
    tokens.push(token_id);
    this.tokens_per_owner.set(receiver_id, tokens);
    this.tokens_by_id.set(token_id, token);
    this.token_metadata_by_id.set(token_id, token.metadata);
  }

  // can take two additional parameters (approval_id: number, memo: string)
  nft_transfer(receiver_id: string, token_id: string): void {
    assert(
      this.tokens_by_id.contains(token_id),
      "Token does not exist. Cannot transfer"
    );
    assert(
      context.sender == context.predecessor,
      "Cannot be called by other contracts"
    );
    const token: Token = this.tokens_by_id.getSome(token_id);
    assert(
      token && token.owner_id == context.sender,
      "Can only transfer own token"
    );

    // transfer ownership
    token.owner_id = receiver_id;
    this.tokens_by_id.set(token_id, token);

    // Remove id from existing owner
    const oldOwnerTokenIds: Array<string> = this.tokens_per_owner.getSome(
      context.sender
    );
    let indexToRemove = -1;
    for (let i = 0; i < oldOwnerTokenIds.length; i++) {
      if (oldOwnerTokenIds[i] == token_id) {
        indexToRemove = i;
        break;
      }
    }
    oldOwnerTokenIds.splice(indexToRemove, 1);
    this.tokens_per_owner.set(context.sender, oldOwnerTokenIds);

    // Add id to new owner
    let newOwnerTokenIds = new Array<string>();
    if (this.tokens_per_owner.contains(receiver_id)) {
      newOwnerTokenIds = this.tokens_per_owner.getSome(receiver_id);
    }
    newOwnerTokenIds.push(token_id);
    this.tokens_per_owner.set(receiver_id, newOwnerTokenIds);
  }

  getAllNFT(
    prev: i32,
    next: i32
  ): MapEntry<string, Token>[] {
    const data = this.tokens_by_id.entries(prev, next);

    return data;
      
  }
}

