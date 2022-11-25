import React,{useState} from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import classes from './AddExpenditureForm.module.css'
import {BiArrowBack} from 'react-icons/bi'


const fetcher = (...args) => fetch(...args).then(res => res.json())

const AddExpenditureForm = () => {
const router=useRouter()
  const [expenditureType, setExpenditureType] = useState('')
  const [date, setDate]=useState('')
  const [amount,setAmount]=useState(0)

  const { data, error } = useSWR(`/api/batch/${router.query.batchId}`, fetcher,{refreshInterval: 1000})

 const onSubmitExpenditureForm=async(e)=>{
  e.preventDefault()
   
  setExpenditureType('')
  setDate('')
  setAmount('')
  
  const data = {
      expenditure:
        {
         expenditureType,
         date,
         amount
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
    <div>  <div className={classes.AddExpenditureForm}>
       <div className={classes.arrowName}> <BiArrowBack className={classes.back} onClick={()=>router.back()}/> <h2> {data && data.batchName}</h2> <h1></h1>
         </div>
    <h2>Add Expenditure</h2>

    <form className={classes.ExpenditureForm} onSubmit={onSubmitExpenditureForm}>
        <input type='text' placeholder='Expenditure Name' value={expenditureType} onChange={(e)=>{setExpenditureType(e.target.value)}}/>

        <input type='date'  value={date} onChange={(e)=>{setDate(e.target.value)}}/>

        <input type='number' placeholder='Amount'  value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
       <div className={classes.addExpenditure}> <button>Add Expenditure</button> </div>
    </form>
</div></div>
  )
}

export default AddExpenditureForm