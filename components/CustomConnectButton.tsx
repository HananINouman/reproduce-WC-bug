/* eslint-disable @typescript-eslint/no-unused-expressions */

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { useEffect } from "react";


const CustomConnectButton = () => {
    const { address: connectedAddress, chain } = useAccount();
    const { disconnect } = useDisconnect();

    // If connected wallet but wrong network disconnect
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
                        style={{ width: "inherit" }}
                        {...(!mounted && {
                            "aria-hidden": true,
                            style: {
                                opacity: 0,
                                pointerEvents: "none",
                                userSelect: "none",
                            },
                        })}
                    >
                        <button
                            id="connectButton"
                            data-test-id="connect-web3-wallet"
                            color={mounted && account && chain ? "secondary" : "primary"}
                            onClick={() => {
                                console.log(mounted, "mounted", account, "account", chain, "chain")

                                mounted && account && chain
                                    ? chain.unsupported
                                        ? openChainModal()
                                        : openAccountModal()
                                    : openConnectModal()
                            }}
                            data-state={!account?.address && "open"}
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
