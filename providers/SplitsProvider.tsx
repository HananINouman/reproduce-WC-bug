import { mainnet, sepolia, holesky, gnosis } from "viem/chains";
import { SplitsClientConfig, SplitsProvider } from "@0xsplits/splits-sdk-react";
import { ReactNode } from "react";
import { usePublicClient } from "wagmi";

const SPLITS_API_KEY="e8a790a8c1a6cd14c370c222"


export const Provider = (props: { children: ReactNode }) => {
  const publicClient = usePublicClient();
  
  const splitsConfig: SplitsClientConfig = {
    chainId:1,
    publicClient,
    apiConfig: {
      apiKey: SPLITS_API_KEY,
    },
  };
  return (
    <SplitsProvider config={splitsConfig}>{props.children}</SplitsProvider>
  );
}
