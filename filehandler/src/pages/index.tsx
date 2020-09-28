import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

/**
 * Basic index page to allow us to see if the server is running without having to craft any requests
 */
const Home = () => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello.</p>
      </section>
    </Layout>
  );
};
export default Home;
