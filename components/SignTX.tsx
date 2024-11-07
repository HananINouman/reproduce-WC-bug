import { useAccount, useConfig } from "wagmi";
import { postTermsAndConditionsAcceptance } from "../utils";


const SignTX = () => {
    const config = useConfig();
    const { address: connectedAddress } = useAccount();


    const handleAccept = async () => {
        try {
            console.log("hereee")
            await postTermsAndConditionsAcceptance(connectedAddress, config);

        } catch (e) {
            console.log(e, "postTermsAndConditionsAcceptance eeeee")
        }
    };

    if (!connectedAddress) return null

    return <button
        color="primary"
        type="submit"
        onClick={handleAccept}
    >
        <>I Accept</>
    </button>
};

export default SignTX;
