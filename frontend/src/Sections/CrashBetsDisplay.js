import React from "react";
import { useSelector } from "react-redux";

const CrashBetsDisplay = () => {
  const { betsArr } = useSelector((state) => state.crash);

  return (
    <div className=''>
      <table class='table-fixed w-full'>
        <tbody>
          <tr className='child:px-2'>
            <td>Player</td>
            <td>Cash Out</td>
            <td>Amount</td>
            <td className='text-right'>Profit</td>
          </tr>
        </tbody>
      </table>
      <table class='table-fixed w-full'>
        <tbody>
          {betsArr !== undefined &&
            betsArr.map(({ userName, betAmt, crashOutAt, profit }, i) => {
              return (
                <tr className='child:px-2' key={i}>
                  <td className='font-semibold text-lg'>{userName}</td>
                  <td>{crashOutAt === null ? "betting" : crashOutAt}</td>
                  <td className='font-semibold text-lg'>{betAmt}</td>
                  <td className='font-semibold text-right'>
                    {profit === null ? "betting" : profit}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default CrashBetsDisplay;
