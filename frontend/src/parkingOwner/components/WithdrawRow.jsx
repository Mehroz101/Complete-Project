import React from "react";

const WithdrawRow = ({requests,index}) => {

  const reqTime = new Date(requests?.createdAt)
 const month = reqTime.getMonth()
 const year = reqTime.getFullYear()
 const date = reqTime.getDate()
  return (
    <>
      <tr>
        <td>
          <span className="id">{index}</span>
        </td>
        <td>
            <span>{date}/{month}/{year}</span>
        </td>
        <td className="account_name">
            <span>{requests.accountName}</span>
        </td>
        <td className="account_number">
            <span>{requests.accountNumber}</span>
        </td>
        <td>
            <span>{requests.accountType}</span>
        </td>
        <td>

          {/* pending complete canceled */}
            <span className={`status ${requests.status}`}>{requests.status}</span>
        </td>
        <td className="order_id">
            <span >{requests.requestID}</span>
        </td>
        <td>
            <span>Rs. {requests.withdrawAmount}</span>
        </td>
      </tr>
    </>
  );
};

export default WithdrawRow;
