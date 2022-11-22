import React from 'react'
import classes from './AddSaleForm.module.css'
import {BiArrowBack} from 'react-icons/bi'

const AddSaleForm = () => {
    return (
        <div className={classes.AddSaleForm}>
            <h2>Add New Sale</h2>

            <form className={classes.SaleForm}>
                <input type='text' placeholder='customer Name'/>
                <input type='date'/>
                <input type='number' placeholder='Amount'/>
                <input type='number' placeholder='kg'/>
                <input type='number' placeholder='Number of fishes'/>
               <div className={classes.addSale}> <button>Add Sale</button> </div>
            </form>
        </div>
    )
}

export default AddSaleForm