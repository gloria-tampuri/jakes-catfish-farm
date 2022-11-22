import React from 'react'
import classes from './MortalityList.module.css'

const MortalityList = () => {
  return (
    <div className={classes.MortalityList}>
    <div className={classes.Mortalityhead}>
      <h2>Total Mortality</h2> 
      <h2 className={classes.totalMortality}>57</h2>
      </div>

      <div className={classes.List}>
         <div className={classes.Mortalitysection}>
             <p>1/2/2020</p>
             <p>4</p> 
         </div>

         <div className={classes.Mortalitysection}>
             <p>1/2/2020</p>
             <p>4</p> 
         </div>

         <div className={classes.Mortalitysection}>
             <p>1/2/2020</p>
             <p>6</p>
            
         </div>

         
    </div>
    </div>
  )
}

export default MortalityList