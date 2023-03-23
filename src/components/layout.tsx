import Head from "next/head";
import type { childrenProps } from "../../types/types";
import Navigation from "./navigation";

const Layout = ({ children, title }: childrenProps) => {
  return (
    <>
      <Head>
        {title ? <title>{title} | OpenFuel</title> : <title>OpenFuel</title>}
        <meta name="description" content="OpenFuel" />
      </Head>
      <Navigation />
      <main>{children}</main>
    </>
  );
};

export default Layout;
