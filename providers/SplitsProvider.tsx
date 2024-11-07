import { mainnet, sepolia, holesky, gnosis } from "viem/chains";
import { SplitsClientConfig, SplitsProvider } from "@0xsplits/splits-sdk-react";
import { ReactNode } from "react";
import { SPLITS_API_KEY , NETWORK} from "../constants/index";
import { usePublicClient } from "wagmi";

export const chains = {
  [NETWORK.MAINNET]: mainnet,
  [NETWORK.SEPOLIA]: sepolia,
  [NETWORK.HOLESKY]: holesky,
  [NETWORK.GNOSIS]: gnosis,
};


export const Provider = (props: { children: ReactNode }) => {
  const publicClient = usePublicClient();
  
  const splitsConfig: SplitsClientConfig = {
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
    publicClient,
    apiConfig: {
      apiKey: SPLITS_API_KEY,
    },
  };
  return (
    <SplitsProvider config={splitsConfig}>{props.children}</SplitsProvider>
  );
}
