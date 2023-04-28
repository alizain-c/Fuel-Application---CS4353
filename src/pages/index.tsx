import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>OpenFuel</title>
        <meta name="description" content="The best way to get Fuel!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-neutral-800 to-neutral-900">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Open<span className="text-amber-600">Fuel</span>
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="login"
            >
              <h3 className="text-2xl font-bold">Log-in →</h3>
              <div className="text-lg">
                Sign-in to your existing account to manage your profile, get a
                fuel quote, or view your quote history!
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="register"
            >
              <h3 className="text-2xl font-bold">Register →</h3>
              <div className="text-lg">
                Sign-up for an account for yourself or your business at
                OpenFuel, all free of cost! :)
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* <footer className="py-4 px-8 text-center">
        <p>&copy; 2023 OpenFuel. All rights reserved.</p>
      </footer> */}
    </>
  );
};

export default Home;
