import React from "react";

const Earning_card = ({ title, revenue, icon }) => {
  return (
    <>
      <div class="bg-white shadow-3 border-round-lg p-2 flex flex-1 align-items-start  justify-content-between gap-8">
        <div>
          <h2 class="text-gray-800 font-semibold">{title}</h2>
          <p class="text-3xl font-bold m-0 text-gray-900">{revenue}</p>
          <div class="flex items-center space-x-2 m-0">
            {/* <div class="bg-red-100 text-red-500 align-self-center w-2rem h-2rem border-round-3xl flex justify-content-center align-items-center">
                <i
                  class="pi pi-chart-line
"
                ></i>
              </div> */}
            <div>
              {/* <p class="text-green-500 text-sm">{percentage}%</p> */}
              <p class="text-gray-500 text-sm">since account created</p>
            </div>
          </div>
        </div>
        <div class="bg-cyan-500 text-white w-3rem h-3rem border-round-3xl flex justify-content-center  align-items-center">
          <i class={icon}></i>
        </div>
      </div>
    </>
  );
};

export default Earning_card;
