import React from 'react'
import classes from './SalesList.module.css'

const SalesList = () => {
  return (
    <div className={classes.SalesList}>
       <div className={classes.saleshead}>
         <h2>Total Sales</h2> 
         <h2 className={classes.totalSales}>56000</h2>
         </div>

         <div className={classes.List}>
            <div className={classes.salesection}>
                <p>1/2/2020</p>
                <p>Precious</p>
                <p>30kg</p>
                <p>100</p>
                <p>1000</p>
            </div>

            <div className={classes.salesection}>
                <p>1/2/2020</p>
                <p>Precious</p>
                <p>30kg</p>
                <p>100</p>
                <p>1000</p>
            </div>

            <div className={classes.salesection}>
                <p>1/2/2020</p>
                <p>Precious</p>
                <p>30kg</p>
                <p>20</p>
                <p>600</p>
            </div>

            <div className={classes.salesection}>
                <p>1/2/2020</p>
                <p>Precious</p>
                <p>30kg</p>
                <p>50</p>
                <p>2000</p>
            </div>

            <div className={classes.salesection}>
                <p>1/2/2020</p>
                <p>Precious</p>
                <p>30kg</p>
                <p>50</p>
                <p>2000</p>
            </div> 

            

         </div>
    </div>
  
  )
}

export default SalesList