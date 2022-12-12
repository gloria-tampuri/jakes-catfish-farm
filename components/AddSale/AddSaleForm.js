import React,{useState, useContext} from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import classes from './AddSaleForm.module.css'
import {BiArrowBack} from 'react-icons/bi'
import { ThemeContext } from '../../context/theme'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const fetcher = (...args) => fetch(...args).then(res => res.json())


const AddSaleForm = () => {
  const notify = () => toast.success("New Sale Added",{
    position:'top-center',autoClose: 3000,
  });
  const theme =useContext(ThemeContext)
    const router = useRouter()
    const [customerName, setCustomerName]=useState('')
    const [date, setDate] = useState('')
    const[amount, setAmount]=useState('')
    const[weight,setWeight]=useState('')
    const[numberOfFishes, setNumberOfFishes]= useState('')

    const { data, error } = useSWR(`/api/batch/${router.query.batchId}`, fetcher,{refreshInterval: 1000})
 
    const onSubmitForm=async(e)=>{
        e.preventDefault()

       setCustomerName('')
       setDate('')
       setAmount('')
       setWeight('')
       setNumberOfFishes('')

        const data = {
            sales:
              {
                customerName,
                date,
                amount,
                weight,
                numberOfFishes
              }
            
            
          }
    
        

        const response = await fetch(`/api/batch/${router.query.batchId}`,{
            method: "PATCH",
            headers:{
              "Content-Type":"application/json"
            },
            body: (JSON.stringify(data))
           })
      
          
    }

    return (
        <div className={classes.AddSaleForm}>
         <div className={classes.arrowName}> <BiArrowBack className={classes.back} onClick={()=>router.back()}/> <h2> {data && data.batchName}</h2> <h1></h1>
         </div>
            <h2>Add New Sale</h2>

            <form className={theme.theme==='light' ?classes.SaleForm1 : classes.SaleForm} onSubmit={onSubmitForm}>
                <input className={theme.theme === 'light'? classes.SaleFormInput1 : classes.SaleFormInput} type='text' placeholder='customer Name' value={customerName} onChange={(e)=>{setCustomerName(e.target.value)}}/>
                <input className={theme.theme === 'light'? classes.SaleFormInput1 : classes.SaleFormInput} type='date'  value={date} onChange={(e)=>{setDate(e.target.value)}}/>
                <input className={theme.theme === 'light'? classes.SaleFormInput1 : classes.SaleFormInput} type='number' placeholder='Amount' value={amount} onChange={(e)=>{setAmount(+e.target.value)}}/>
                <input className={theme.theme === 'light'? classes.SaleFormInput1 : classes.SaleFormInput} type='number' placeholder='kg' value={weight} onChange={(e)=>{setWeight(+e.target.value)}}/>
                <input className={theme.theme === 'light'? classes.SaleFormInput1 : classes.SaleFormInput} type='number' placeholder='Number of fishes'
                value={numberOfFishes} onChange={(e)=>{setNumberOfFishes(+e.target.value)}}/>

               <div className={classes.addSale}> <button type='submit' onClick={notify}>Add Sale</button> </div>
               <ToastContainer />
            </form>
        </div>
    )
}

export default AddSaleForm