import React, { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { BorderBeam } from "../ui/border-beam";

function Header() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      await newRequest.post("/auth/signout");
      localStorage.removeItem("currentUser");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 shadow-sm flex justify-between items-center px-5 mx-24 border-yellow-600 border-b-8">
      <div className="flex gap-2 items-center">
        <img src="/logoipsum-282.svg" width={35} height={40} />
        <Link to={"/"}>
          <span className="text-3xl text-black font-bold">Planova</span>
        </Link>
      </div>
      <div className="flex gap-3">
        {currentUser ? (
          <div className="flex gap-5 justify-center items-center text-lg">
            <span className="relative h-[50px] w-[150px] rounded-xl flex justify-center items-center">
              Welcome back, {currentUser.firstname}
              <BorderBeam />
            </span>
            <Link onClick={handleSignout}>
              <Button className="bg-blue-950 hover:bg-yellow-700">
                Sign out
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <Link to={"/signin"}>
              <Button className="bg-blue-950 hover:bg-yellow-700">
                Sign in
              </Button>
            </Link>
            <Link to={"/signup"}>
              <Button className="bg-blue-950 hover:bg-yellow-700">
                Sign up
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
