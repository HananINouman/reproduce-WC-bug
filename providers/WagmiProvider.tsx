"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { createConfig, WagmiProvider } from "wagmi";
import merge from "lodash.merge";
import { http } from "@wagmi/core";
import { holesky, mainnet } from "wagmi/chains";

import "@rainbow-me/rainbowkit/styles.css";

import {
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";


const PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string;

const getPlatformNetwork = () => {
 
  return mainnet;
};

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        metaMaskWallet,
        walletConnectWallet, 
      ],
    },
  ],
  {
    appName: "wallet connect on refresh",
    projectId: PROJECT_ID,
  },
);

const config = createConfig({
  chains: [getPlatformNetwork()],
  connectors: [...connectors],
  ssr: false,
  transports: {
    [mainnet.id]: http(),
    [holesky.id]: http(),
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
   {props.children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
