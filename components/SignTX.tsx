import { useAccount, useConfig } from "wagmi";
import { signCall } from "../utils";
import { useState } from "react";


const SignTX = () => {
    const [signature, setSignature] = useState("")
    const config = useConfig();
    const { address: connectedAddress } = useAccount();


    const handleAccept = async () => {
        try {
            const returnenedSignature = await signCall(connectedAddress, config);
            console.log(returnenedSignature, "returnenedSignature")
            setSignature(returnenedSignature)

        } catch (e) {
            console.log(e, " eeeee")
        }
    };

    if (!connectedAddress) return null

    return <><button
        type="submit"
        onClick={handleAccept}
    >
        <>I Accept</>
    </button>
        {signature}
    </>
};

export default SignTX;
