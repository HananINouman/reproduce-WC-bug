import { useAccount, useConfig } from "wagmi";
import { signCall } from "../utils";


const SignTX = () => {
    const config = useConfig();
    const { address: connectedAddress } = useAccount();


    const handleAccept = async () => {
        try {
            await signCall(connectedAddress, config);

        } catch (e) {
            console.log(e, "postTermsAndConditionsAcceptance eeeee")
        }
    };

    if (!connectedAddress) return null

    return <button
        type="submit"
        onClick={handleAccept}
    >
        <>I Accept</>
    </button>
};

export default SignTX;
