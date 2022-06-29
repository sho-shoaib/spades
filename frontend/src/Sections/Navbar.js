import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();

  return (
    <div className='h-16 w-full bg-white sticky top-0 bg-slate-900 flex items-center justify-between'>
      <h1 className='font-semibold text-2xl'>SPADES</h1>
      <div className='flex gap-5'>
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
            onClick={() => navigate("/login")}
          >
            Signup
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
