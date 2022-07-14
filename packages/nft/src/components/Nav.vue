<template>
  <div class="navbar-wrap nav-mobile">
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-brand :href="`/`">
        <svg
          height="20"
          viewBox="0 0 76 20"
          width="76"
          xmlns="http://www.w3.org/2000/svg"
          fill="black"
        >
          <path
            d="m38.0449 4.17778v11.66662c0 .0889-.0666.1778-.1777.1778h-1.2223c-.5555 0-1.0888-.2889-1.4-.7555l-5.5111-8.51114.1778 4.24444v4.8667c0 .0889-.0667.1777-.1778.1777h-1.6c-.0889 0-.1777-.0666-.1777-.1777v-11.68892c0-.08889.0666-.17778.1777-.17778h1.2c.5556 0 1.0889.28889 1.4.75556l5.5111 8.48884-.1777-4.2444v-4.82222c0-.08889.0666-.17778.1777-.17778h1.6c.1334 0 .2.06667.2.17778z"
          ></path>
          <path
            d="m54.444 16h-1.6889c-.1111 0-.2-.1111-.1555-.2222l4.4889-11.62224c.0444-.08889.1333-.15556.2222-.15556h2.1333c.1111 0 .2.06667.2223.15556l4.5111 11.62224c.0444.1111-.0445.2222-.1556.2222h-1.6889c-.0666 0-.1333-.0444-.1555-.1111l-3.6223-9.55557c-.0444-.13333-.2666-.13333-.3111 0l-3.6222 9.55557c-.0444.0667-.1111.1111-.1778.1111z"
          ></path>
          <path
            d="m75.9557 15.7333-3.3778-4.3111c1.9111-.3555 3.0222-1.64442 3.0222-3.6222 0-2.26667-1.4667-3.8-4.0889-3.8h-4.7111c-.1333 0-.2444.11111-.2444.24444 0 .88889.7111 1.6 1.6 1.6h3.1777c1.5778 0 2.3334.8 2.3334 1.97778s-.7334 1.97778-2.3334 1.97778h-4.4889c-.1333 0-.2444.11111-.2444.2444v5.7778c0 .0889.0667.1778.1778.1778h1.6c.0889 0 .1778-.0667.1778-.1778v-4.2889h1.8444l2.9333 3.8223c.3111.4222.8.6444 1.3334.6444h1.2222c.0889 0 .1555-.1556.0667-.2667z"
          ></path>
          <path
            d="m49.3776 4h-7.4444c-.1334 0-.2223.08889-.2223.22222 0 .88889.7334 1.62222 1.6223 1.62222h6.0444c.0889 0 .1778-.06666.1778-.17777v-1.51111c-.0222-.08889-.0889-.15556-.1778-.15556zm0 10.1556h-5.5555c-.0889 0-.1778-.0667-.1778-.1778v-3c0-.0889.0666-.1778.1778-.1778h5.1333c.0889 0 .1778-.0667.1778-.1778v-1.51109c0-.08889-.0667-.17778-.1778-.17778h-7c-.1333 0-.2445.11111-.2445.24445v6.55552c0 .1334.1112.2445.2445.2445h7.4222c.0889 0 .1778-.0667.1778-.1778v-1.5111c-.0222-.0667-.0889-.1333-.1778-.1333z"
          ></path>
          <path
            d="m16.0444 1.02222-4.1777 6.2c-.2889.42222.2666.93334.6666.57778l4.1111-3.57778c.1112-.08889.2667-.02222.2667.13334v11.17774c0 .1556-.2.2223-.2889.1111l-12.44442-14.888844c-.4-.488889-.97778-.755556-1.62222-.755556h-.44445c-1.155554 0-2.11111.955556-2.11111 2.13333v15.73337c0 1.1777.955556 2.1333 2.13333 2.1333.73334 0 1.42223-.3778 1.82223-1.0222l4.17777-6.2c.28889-.4222-.26666-.9334-.66666-.5778l-4.11111 3.5556c-.11112.0888-.26667.0222-.26667-.1334v-11.15553c0-.15556.2-.22223.28889-.11111l12.44442 14.88884c.4.4889 1 .7556 1.6222.7556h.4445c1.1778 0 2.1333-.9556 2.1333-2.1333v-15.73337c-.0222-1.177774-.9778-2.13333-2.1555-2.13333-.7334 0-1.4223.377778-1.8223 1.02222z"
          ></path>
        </svg>
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="w-nav multi-network" right>
          <b-card-img
            class="mr-1"
            style="width: 22px"
            :src="require('../assets/images/nologo.svg')"
            alt="Image"
          ></b-card-img>
          <span class="network-name">{{ networkName }}</span>
        </b-nav-item>
        <b-nav-item
          class="w-nav native-balance"
          right
          v-if="!isConnect && account"
        >
          {{ balance.total/10**24 }} {{ symbol }}
        </b-nav-item>

        <b-nav-item href="https://wallet.testnet.near.org/?tab=collectibles" target="_blank" class="w-nav address" right v-if="!isConnect && account">
          <jazzicon :address="account" :diameter="20" class="w-icon" />
          {{account}}
        </b-nav-item>
      

        <b-button
          v-if="isConnect"
          size="sm"
          class="w-button btn-wallet-connect"
          @click="connect()"
          right
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V17C20 17.2652 19.8946 17.5196 19.7071 17.7071C19.5196 17.8946 19.2652 18 19 18H1C0.734784 18 0.48043 17.8946 0.292893 17.7071C0.105357 17.5196 0 17.2652 0 17V6ZM1 0H16V4H0V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0ZM13 11V13H16V11H13Z"
              fill="#fff"
            />
          </svg>
          Sign In With NEAR
        </b-button>
         <b-button
          v-if="!isConnect"
          size="sm"
          class="w-button btn-wallet-connect2"
          @click="signOut()"
          right
        >
          
          Sign Out
        </b-button>
      </b-navbar-nav>
      <!-- </b-collapse> -->
    </b-navbar>
    <b-toast id="invalid-network" variant="danger" solid no-auto-hide>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img
            blank
            blank-color="#ff5555"
            class="mr-2"
            width="12"
            height="12"
          ></b-img>
          <strong class="mr-auto">Invalid network</strong>
        </div>
      </template>
      Required to switch Metamask to
      <span style="cursor: pointer" @click="connect()"><b>sas</b></span>
    </b-toast>
    <b-toast id="required-metamask" variant="warning" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <strong class="mr-auto">Metamask</strong>
        </div>
      </template>
      You have to install
      <b-link href="https://metamask.io/" target="_blank"
        ><b>Metamask Extension</b></b-link
      >
    </b-toast>
  </div>
</template>
<script>
import * as nearAPI from "near-api-js";
export default {
  data: () => ({
    account: "",
    networkName: "NEAR Testnet",
    symbol: "NEAR",
    balance: 0,
    isConnect: true,
    wallet: "",
  }),
  created: async function () {
    const { connect, keyStores, WalletConnection } = nearAPI;
    const config = {
      networkId: "testnet",
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
    };
    const near = await connect(config);
    this.wallet = new WalletConnection(near);
    if (this.wallet.isSignedIn()) {
      this.isConnect = false;
      const account = await near.account(this.wallet.getAccountId());
this.balance=await account.getAccountBalance();
      this.account=this.wallet.getAccountId();
      // this.balance=this.wallet.
    }
  },
  methods: {
    async connect() {
      this.wallet.requestSignIn(
        process.env.VUE_APP_CONTRACT
      );
    },
    async signOut() {
      await this.wallet.signOut();
      window.location.href="/";
    },
  },
};
</script>
<style lang="scss">
.dropdown.nav-more {
  padding-left: 3px;
  padding-right: 3px;
  .nav-link {
    width: 36px;
    overflow: hidden;
  }
  .dropdown-menu {
    min-width: 200px;
    padding: 0;
    border-radius: 8px;
    box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
      rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
    border: 1px solid rgb(255, 255, 255);
    .dropdown-item {
      padding: 10px 16px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
.multi-network {
  .chain-logo {
    max-width: 22px;
    margin-right: 3px;
  }
  .dropdown-menu {
    padding: 0;
    border-radius: 8px;
    box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
      rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
    border: 1px solid rgb(255, 255, 255);
    width: 214px;
    overflow: hidden;
  }
  .active {
    .dropdown-item {
      background-color: #e9ecef;
      position: relative;
      &::after {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 5px;
        //                    background-color: #0fbc85;
        display: inline-block;
        position: absolute;
        right: 8px;
        top: 15px;
      }
    }
  }
  .dropdown-item {
    padding: 8px;
  }
}
.w-button,
.w-nav {
  background-color: #fff;
  color: #212529;
  border-color: white;
  border-radius: 8px;
  margin-left: 15px;
  &:hover {
    background-color: #f6f6f6;
    color: inherit;
  }
}
.w-button.btn-wallet-connect {
  background: #0f0f0f;
  padding-top: 10px;
  padding-bottom: 10px;
  border: none;
  border-radius: 8px;
  color: #fff;
  &:hover {
    background-color: #161515;
  }
  &:focus {
    box-shadow: none;
    background-color: #0e0d0d;
  }
}
.w-button.btn-wallet-connect2 {
  background: #a11a1a;
  padding-top: 10px;
  padding-bottom: 10px;
  border: none;
  border-radius: 8px;
  color: #fff;
  &:hover {
    background-color: #d41313;
  }
  &:focus {
    box-shadow: none;
    background-color: #df0c0c;
  }
}
.w-nav {
  &.address {
    .nav-link {
      display: flex;
      align-items: center;
    }
    .w-icon {
      display: flex;
      margin-right: 5px;
    }
  }
  em {
    color: #091e42 !important;
  }
  a {
    color: #091e42 !important;
    &:focus-visible {
      border: none;
      outline: none;
    }
  }
}
#dropdown-chains {
  color: #091e42 !important;
}
@media (max-width: 991px) {
  .nav-mobile {
    .navbar-nav {
      flex-direction: row;
      .dropdown-menu {
        position: absolute;
      }
      .nav-link {
        padding-left: 8px;
        padding-right: 8px;
      }
    }
    .network-name {
      display: none;
    }
  }
}
@media (max-width: 580px) {
  .nav-mobile {
    .navbar-nav {
      .native-balance {
        display: none;
      }
    }
  }
  .multi-network {
    .dropdown-menu {
      &.dropdown-menu-right {
        left: 0;
        right: auto;
      }
    }
  }
}
</style>
