/* eslint-disable @typescript-eslint/no-unused-expressions */

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { useEffect } from "react";


const CustomConnectButton = () => {
    const { address: connectedAddress, chain } = useAccount();
    const { disconnect } = useDisconnect();

    useEffect(() => {
        if (connectedAddress && !chain) {
            disconnect();
        }
    }, [connectedAddress, chain, disconnect]);


    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
            }) => {
                return (
                    <div
                    >
                        <button
                            color={mounted && account && chain ? "secondary" : "primary"}
                            onClick={() => {
                                console.log(mounted, "mounted", account, "account", chain, "chain")

                                mounted && account && chain
                                    ? chain.unsupported
                                        ? openChainModal()
                                        : openAccountModal()
                                    : openConnectModal()
                            }}
                        >
                            {mounted && account && chain ? (

                                `${account?.address}`
                            ) : "connect wallet"}
                        </button>
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};

export default CustomConnectButton;
