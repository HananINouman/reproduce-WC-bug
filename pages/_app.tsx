"use client";
import CustomConnectButton from "@components/CustomConnectButton";
import { useHasMounted } from "../hooks";
import WagmiProvider from "../providers/WagmiProvider";
import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const hasMounted = useHasMounted();


  if (!hasMounted) {
    return null;
  }
  return <WagmiProvider>
    < CustomConnectButton />

    <Component {...pageProps} />
  </WagmiProvider>;
}
