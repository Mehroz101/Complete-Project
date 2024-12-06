import React from 'react'

const Statistic_card = ({card_number,card_count,card_heading,card_icon}) => {
  return (
    <>
         <div className={`stat_card card_${card_number}`}>
            <div className="card_left ">
             <i className={card_icon}></i>
            </div>
            <div className="card_right">
              <h2 className="card_heading">{card_heading}</h2>
              <p className="card_number">{card_count}</p>
            </div>
          </div>
    </>
  )
}

export default Statistic_card