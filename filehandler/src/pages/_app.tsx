import "../styles/global.css";
import "office-ui-fabric-core/dist/css/fabric.min.css";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
