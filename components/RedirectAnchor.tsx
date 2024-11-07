//import Link from "next/link" can solve the refresh
import { useAccount } from "wagmi";

const RedirectAnchor = () => {
    const { address: connectedAddress } = useAccount();

    if (!connectedAddress) return null

    return (
        <a
            href="/xyz"
        >
            Go TO XYZ    </a>)
};

export default RedirectAnchor;
