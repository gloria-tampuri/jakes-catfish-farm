import React from 'react'
import classes from './Summary.module.css'

const Summary = () => {
  return (
    <div>
        <ul className={classes.sumarryList}>
            <li>Batch Number: <span></span></li>
            <li>Batch Name: <span></span></li>
            <li>Start Date: <span></span></li>
            <li>Start Fingerlings Number: <span></span></li>
            <li>Total Sales: <span></span></li>
            <li>Number of Fishes Sold: <span></span></li>
            <li>Remaining Fishes: <span></span></li>
            <li>Mortality: <span></span></li>
            <li>Total Expenditure: <span></span></li>
        </ul>
    </div>
  )
}

export default Summary