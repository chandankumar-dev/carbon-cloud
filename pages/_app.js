import Layout from "../components/Layout";
import { FileProvider } from "../context/FileContext";
import { MapProvider } from "../context/MapContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <FileProvider>
      <MapProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MapProvider>
    </FileProvider>
  );
}
