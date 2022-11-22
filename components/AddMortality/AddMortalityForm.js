import React from 'react'
import classes from './AddMortality.module.css'

const AddMortalityForm = () => {
    return (
             <div className={classes.AddMortalityForm}>
            <h2>Add Mortality</h2>

            <form className={classes.MortalityForm}>
                <input type='date' />
                <input type='number' placeholder='Number' />
                <div className={classes.addMortality}> <button>Add Expenditure</button> </div>
            </form>
        </div>
        
    )
}

export default AddMortalityForm