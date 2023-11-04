import Layout from "../components/Layout";
import { FileProvider } from "../context/FileContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <FileProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </FileProvider>
  );
}
