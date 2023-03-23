import Link from 'next/link';

const Navigation = () => {
    return(
    <header className="flex bg-neutral-900 items-center justify-between py-4 px-8">
        <Link href = "/">
        <div className="text-2xl text-white font-bold">Open<span className = "text-amber-600">Fuel</span></div>
        </Link>
        <nav>
          <ul className="flex space-x-7">
            <li>
              <Link href="/login">
                <p className="text-amber-500 font-bold hover:text-white transition duration-300">Log <span className = "text-white">In</span></p>
              </Link>
            </li>
            <li>
              <Link href="/register">
                <p className="text-amber-500 font-bold hover:text-white transition duration-300">Sign <span className = "text-white">Up</span></p>
              </Link>
            </li>
          </ul>
        </nav>
    </header>
    );
};

export default Navigation;