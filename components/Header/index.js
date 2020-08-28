import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <React.Fragment>
      <div className="bg-gray-200 p-4 shadow-md">
        <div className="container mx-auto text-center">
          <Link href="/">
            <a>Palpitebox</a>
          </Link>
        </div>
      </div>
      <div className="bg-gray-300 p-4 text-center">
        <Link href="/sobre">
          <a className="px-2 hover:underline">Sobre</a>
        </Link>
        <Link href="/contato">
          <a className="px-2 hover:underline">Contato</a>
        </Link>
        <Link href="/pesquisa">
          <a className="px-2 hover:underline">Pesquisa</a>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Header;
