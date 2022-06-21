import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  let navigate = useNavigate();

  return (
    <div className='h-screen bg-slate-900' style={{ width: "300px" }}>
      <div className='px-5 py-10 flex flex-col gap-10'>
        <div>
          <p
            className='text-3xl font-semibold mb-4 underline underline-offset-1 cursor-pointer inline'
            onClick={() => navigate("/")}
          >
            Home
          </p>
        </div>
        <div>
          <h1 className='text-3xl font-semibold mb-3'>Games:</h1>
          <div className='flex flex-col gap-4'>
            <div>
              <p
                className='text-xl underline underline-offset-1 cursor-pointer inline'
                onClick={() => navigate("/crash")}
              >
                Crash
              </p>
            </div>
            <div>
              <p
                className='text-xl underline underline-offset-1 cursor-pointer inline'
                onClick={() => navigate("/coinflip")}
              >
                CoinFlip
              </p>
            </div>
            <div>
              <p
                className='text-xl underline underline-offset-1 cursor-pointer inline'
                onClick={() => navigate("/mines")}
              >
                Mines
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
