import CustomConnectButton from "../components/CustomConnectButton";
import RedirectAnchor from "../components/RedirectAnchor";


export default function Home() {
  return (
    <div style={{  display:"flex", flexDirection:"column", gap:"5px"}}>
      < CustomConnectButton />
      <RedirectAnchor />
    </div>
  );
}
