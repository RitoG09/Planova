import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="p-4 shadow-sm flex justify-between items-center px-5 mx-24 border-yellow-600 border-b-8">
      <div className="flex gap-2 items-center">
        <img src="/logoipsum-282.svg" width={35} height={40} />
        <Link to={"/"}>
          <span className="text-3xl text-black font-bold">Planova</span>
        </Link>
      </div>
      <div>
        <Link to={"/signin"}>
          <Button className="bg-blue-950 hover:bg-yellow-700">Sign in</Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
