"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { createConfig, useEnsAvatar, useEnsName, WagmiProvider } from "wagmi";
import merge from "lodash.merge";
import { http } from "@wagmi/core";
import { holesky, mainnet, sepolia, gnosis } from "wagmi/chains";
import { Provider as SplitsProvider } from "./SplitsProvider";
import { normalize } from "viem/ens";

import "@rainbow-me/rainbowkit/styles.css";
import "../styles/Home.module.css";

import {
  RainbowKitProvider,
  darkTheme,
  AvatarComponent,
  type Theme,
  // getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  injectedWallet,
  coinbaseWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { Address } from "viem";

const CustomAvatar: AvatarComponent = ({ address, size }) => {
  const { data: ENSName } = useEnsName({
    address: address as Address,
  });
  const { data: ENSAvatar } = useEnsAvatar({
    name: normalize(ENSName),
  });

  return ENSAvatar ? (
    <img
      alt="avatar"
      src={ENSAvatar}
      width={size}
      height={size}
      style={{ borderRadius: 999 }}
    />
  ) : (
    <img
      src="/assets/profile-icon.svg"
      alt="profile"
      width={size}
      height={size}
    />
  );
};

const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID);
const PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string;

const getPlatformNetwork = () => {
  if (chainId === 17000) {
    return holesky;
  } else if (chainId === 100) {
    return gnosis;
  } else if (chainId === 11155111) {
    return sepolia;
  }
  return mainnet;
};

// const { connectors } = getDefaultWallets({ appName:"DV Launchpadp", projectId:PROJECT_ID });

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        metaMaskWallet,
        walletConnectWallet, //Disabled for now
        injectedWallet,
        coinbaseWallet,
      ],
    },
  ],
  {
    appName: "DV Launchpadp",
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

const customTheme: Theme = merge(
  darkTheme({
    accentColor: "#2FE4AB",
    accentColorForeground: "#091011",
    borderRadius: "medium",
    fontStack: "system",
    overlayBlur: "small",
  }),
  {
    colors: {
      actionButtonBorder: "transparent",
      modalBackground: "#111F22",
      modalBorder: "transparent",
      closeButtonBackground: "#182D32",
      modalText: "#E1E9EB",
      modalTextSecondary: "#97B2B8",
      closeButton: "#97B2B8",
      profileForeground: "#111F22",
      profileAction: "#182D32",
      profileActionHover: "#243D42",
    },
  } as Theme,
);

export default function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          theme={customTheme}
          avatar={CustomAvatar}
        >
          <SplitsProvider>{props.children}</SplitsProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
