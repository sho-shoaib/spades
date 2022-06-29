import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaDollarSign } from "react-icons/fa";

const Navbar = () => {
  let navigate = useNavigate();
  const userName = sessionStorage.username;
  const userEmail = sessionStorage.useremail;
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/user/getbalance/${userEmail}`)
      .then((res) => {
        setBalance(res.data.balance);
      });
  }, []);

  return (
    <div className='h-16 w-full sticky top-0 bg-slate-900 flex items-center justify-between px-10  border-b-2 border-slate-700'>
      <h1
        className='font-semibold text-2xl cursor-pointer'
        onClick={() => navigate("/")}
      >
        SPADES
      </h1>
      {userEmail || userName ? (
        <div className='flex gap-8'>
          <div className='bg-slate-600 rounded-full pr-3.5 flex items-center gap-2 pl-0.5 py-0.5'>
            <div className='rounded-full p-2 bg-slate-500'>
              <FaDollarSign />
            </div>
            <p className='text-xl font-semibold inline -translate-y-0.5'>
              {balance}
            </p>
          </div>
          <div className='bg-slate-600 rounded-full pr-3.5 flex items-center gap-2 pl-0.5 py-0.5'>
            <div className='rounded-full p-2 bg-slate-500'>
              <FaUser />
            </div>
            <p className='text-xl font-semibold inline -translate-y-0.5'>
              {userName}
            </p>
          </div>
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
