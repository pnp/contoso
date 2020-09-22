import Head from "next/head";
// import Link from "next/link";
import styles from "./layout.module.css";
// import utilStyles from "../styles/utils.module.css";

export const siteTitle = "CONTSO File Handler Sample";

export interface ILayoutProps {
  children: React.ReactNode;
  home?: boolean;
}

export default function Layout(props: ILayoutProps) {

  const { children } = props;

  return (
    <div className={styles.container}>
      <Head>
        <link rel="SHORTCUT ICON" href="/favicon.ico" type="image/x-icon" />
        <meta name="description" content="Enhanced file experience for Microsoft365" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <header className={styles.header}></header>
      <main>{children}</main>
    </div>
  );
}
