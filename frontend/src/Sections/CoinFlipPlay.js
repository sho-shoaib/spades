import React from "react";

const CoinFlipPlay = ({ loading, displayData }) => {
  if (loading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <h1 className='text-4xl font-semibold'>Tossing..</h1>
      </div>
    );
  }

  return (
    <div className='flex justify-center items-center h-full'>
      {displayData && (
        <div className='flex flex-col items-center gap-10'>
          <p className='text-4xl font-semibold'>You {displayData.status}</p>
          <div className='flex child:text-2xl font-semibold gap-10'>
            <p>Your choice: {displayData.yourChoice}</p>
            <p>Outcome: {displayData.result}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinFlipPlay;
