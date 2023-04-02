import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navigation = () => {
  const { data: session, status } = useSession();

  return (
    <header className="flex items-center justify-between bg-neutral-900 py-4 px-8">
      <Link href="/">
        <div className="text-2xl font-bold text-white">
          Open<span className="text-amber-600">Fuel</span>
        </div>
      </Link>
      <nav>
        <ul className="flex space-x-7">
          {status === "authenticated" ? (
            <>
              <li>
                <span className="border-r-2 pr-7 font-bold text-amber-500">
                  {session?.user?.name ?? "Name"}
                </span>
              </li>
              <li>
                <p
                  className="font-bold text-amber-500 transition duration-300 hover:cursor-pointer hover:text-white"
                  onClick={() => signOut()}
                >
                  Sign <span className="text-white">Out</span>
                </p>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">
                  <p className="font-bold text-amber-500 transition duration-300 hover:text-white">
                    Log <span className="text-white">In</span>
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/register">
                  <p className="font-bold text-amber-500 transition duration-300 hover:text-white">
                    Sign <span className="text-white">Up</span>
                  </p>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
