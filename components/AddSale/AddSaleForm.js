import React,{useState} from 'react'
import { useRouter } from 'next/router'
import classes from './AddSaleForm.module.css'
import {BiArrowBack} from 'react-icons/bi'

const AddSaleForm = () => {

    const router = useRouter()
    const [customerName, setCustomerName]=useState('')
    const [date, setDate] = useState('')
    const[amount, setAmount]=useState(0)
    const[weight,setWeight]=useState(0)
    const[numberOfFishes, setNumberOfFishes]= useState(0)
 
    const onSubmitForm=async(e)=>{
        e.preventDefault()

        const data={
            customerName,
            date,
            amount,
            weight,
            numberOfFishes
        }
        console.log(data);

        const response = await fetch(`/api/batch/${router.query.batchId}`,{
            method: "PATCH",
            headers:{
              "Content-Type":"application/json"
            },
            body: (JSON.stringify(data))
           })
      
           console.log(response);
    }

    return (
        <div className={classes.AddSaleForm}>
            <h2>Add New Sale</h2>

            <form className={classes.SaleForm} onSubmit={onSubmitForm}>
                <input type='text' placeholder='customer Name' value={customerName} onChange={(e)=>{setCustomerName(e.target.value)}}/>
                <input type='date'  value={date} onChange={(e)=>{setDate(e.target.value)}}/>
                <input type='number' placeholder='Amount' value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
                <input type='number' placeholder='kg' alue={weight} onChange={(e)=>{setWeight(e.target.value)}}/>
                <input type='number' placeholder='Number of fishes'
                alue={numberOfFishes} onChange={(e)=>{setNumberOfFishes(e.target.value)}}/>

               <div className={classes.addSale}> <button type='submit'>Add Sale</button> </div>
            </form>
        </div>
    )
}

export default AddSaleForm