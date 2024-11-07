"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { createConfig,  WagmiProvider } from "wagmi";
import { http } from "@wagmi/core";
import { holesky, mainnet, sepolia, gnosis } from "wagmi/chains";
import "@rainbow-me/rainbowkit/styles.css"

import {
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  injectedWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { Provider } from "./SplitsProvider";


const PROJECT_ID ="aa7717ec16cf822339e860a0630bbf58"
;

const getPlatformNetwork = () => {
  // if (chainId === 17000) {
  //   return holesky;
  // } 
  return mainnet;
};


const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        metaMaskWallet,
       walletConnectWallet, 
        injectedWallet,
      ],
    },
  ],
  {
    appName: "bug with wallet connect",
    projectId: PROJECT_ID,
  },
);

const config = createConfig({
  chains: [getPlatformNetwork()],
  connectors: [...connectors],
  ssr: false,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [holesky.id]: http(),
    [gnosis.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}


export default function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
        >
       <Provider> {props.children}</Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
