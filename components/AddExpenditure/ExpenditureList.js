import React from 'react'
import classes from './ExpenditureList.module.css'

const ExpenditureList = () => {
  return (
    <div className={classes.ExpenditureList}>
    <div className={classes.Expenditurehead}>
      <h2>Total Expenditure</h2> 
      <h2 className={classes.totalExpenditure}>56000</h2>
      </div>

      <div className={classes.List}>
         <div className={classes.Expendituresection}>
             <p>1/2/2020</p>
             <p>Transport</p>
             <p>300</p> 
         </div>

         <div className={classes.Expendituresection}>
             <p>1/2/2020</p>
             <p>Transport</p>
             <p>300</p> 
         </div>

         <div className={classes.Expendituresection}>
             <p>1/2/2020</p>
             <p>Transport</p>
             <p>300</p> 
         </div>

         
    </div>
    </div>
  )
}

export default ExpenditureList