/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Header() {
  return (
    <header className="p-4">
      <nav className="mx-auto flex items-center justify-between max-w-screen-xl">
        <div className="text-2xl text-white">Logo</div>
        <div>
          <a
            href="#"
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
          >
            Home
          </a>
          <a
            href="#"
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
          >
            About
          </a>
          <a
            href="#"
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
          >
            Services
          </a>
          <a
            href="#"
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
          >
            Contact
          </a>
        </div>
        <div>
          <a
            href="#"
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
          >
            Login
          </a>
          <a
            href="#"
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
          >
            Sign Up
          </a>
        </div>
      </nav>
    </header>
  );
}
