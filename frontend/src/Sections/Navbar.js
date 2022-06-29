import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  const userName = sessionStorage.username;
  const userEmail = sessionStorage.useremail;

  return (
    <div className='h-16 w-full sticky top-0 bg-slate-900 flex items-center justify-between px-10  border-b-2 border-slate-700'>
      <h1
        className='font-semibold text-2xl cursor-pointer'
        onClick={() => navigate("/")}
      >
        SPADES
      </h1>
      {userEmail || userName ? (
        <div className='flex gap-10'>
          <p className='text-xl font-semibold inline'>{userName}</p>
        </div>
      ) : (
        <div className='flex gap-10'>
          <div>
            <p
              className='text-xl font-semibold mb-4 underline underline-offset-1 cursor-pointer inline'
              onClick={() => navigate("/login")}
            >
              Login
            </p>
          </div>
          <div>
            <p
              className='text-xl font-semibold mb-4 underline underline-offset-1 cursor-pointer inline'
              onClick={() => navigate("/signup")}
            >
              Signup
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
