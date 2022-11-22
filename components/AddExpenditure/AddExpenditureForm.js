import React from 'react'
import classes from './AddExpenditureForm.module.css'


const AddExpenditureForm = () => {
  return (
    <div>  <div className={classes.AddExpenditureForm}>
    <h2>Add Expenditure</h2>

    <form className={classes.ExpenditureForm}>
        <input type='text' placeholder='Expenditure Name'/>
        <input type='date'/>
        <input type='number' placeholder='Amount'/>
       <div className={classes.addExpenditure}> <button>Add Expenditure</button> </div>
    </form>
</div></div>
  )
}

export default AddExpenditureForm