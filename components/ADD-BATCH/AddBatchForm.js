import React,{useState, useContext} from 'react'
import { useRouter } from 'next/router'
import classes from './AdddBatchForm.module.css'
import Button from '../UI/Button'
import {BiArrowBack} from 'react-icons/bi'
import { setDate } from 'date-fns'
import { ThemeContext } from '../../context/theme'

const AddBatchForm = () => {
  const router = useRouter()
  const theme =useContext(ThemeContext)

  const[batchName, setBatchName] = useState('')
  const[batchId,SetBatchId]=useState(0)
  const[startDate, setStartDate]= useState('')
  const[numberofFishes, setNumberofFishes]=useState(0)
  const[endDate, setEndDate]=useState('')

  // Function to submit form data
  const handlerFormSubmit = async (e) => {
    e.preventDefault()

      setBatchName('')
      SetBatchId('')
      setStartDate('')
      setNumberofFishes('')
      setEndDate('')

   

    
    const data = {
      batchName:  batchName,
      batchId:batchId,
     startDate:startDate,
     endDate:endDate,
     numberOfFishes:numberofFishes,
     sales:[
      
     ],
     expenditure:[
      
     ],
     mortality:[
      
    ],

    }
    
     const response = await fetch("/api/batch",{
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: (JSON.stringify(data))
     })
     router.push('/')
    
  }

 


  return (
    <div >
      <BiArrowBack className={classes.back} onClick={() => router.back()}/>
      <h1 className={classes.addHeader}>Create New Batch</h1>
      <form className={classes.addForm} onSubmit={handlerFormSubmit}>
        <label htmlFor='batchnumber'> Batch ID</label>
        <input className={theme.theme==="light"? classes.addFormInput1 : classes.addFormInput} type='number' placeholder='Enter Batch Number' id='batchnumber' value={batchId} onChange={(e)=>SetBatchId(+e.target.value)}  required/>

        <label htmlFor='batchname'> Batch Name</label>
        <input  className={theme.theme==="light"? classes.addFormInput1 : classes.addFormInput} type='text' placeholder='Enter Batch Name' id='batchname' required value={batchName} onChange={(e)=>setBatchName(e.target.value)}   />

        <label htmlFor='fishnumber'> Number of Start Fishes </label>
        <input className={theme.theme==="light"? classes.addFormInput1 : classes.addFormInput} type='number' placeholder='Enter Number of Start Fishes' id='fishnumber' required value={numberofFishes} onChange={(e)=>setNumberofFishes(+e.target.value)}  />

        <label htmlFor='startdate'>Start Date</label>
        <input className={theme.theme==="light"? classes.addFormInput1 : classes.addFormInput} type='date' placeholder='Select Start Date' id='startdate' required value={startDate} onChange={(e)=>setStartDate(e.target.value)}  />

        <label htmlFor='Enddate'>End Date</label>
        <input className={theme.theme==="light"? classes.addFormInput1 : classes.addFormInput} type='date' placeholder='Select Start Date' id='startdate' value={endDate} onChange={(e)=>setEndDate(e.target.value)}  />
     <div className={classes.addbutton}> <button onClick={() => router.back()} > ADD BATCH </button></div>

      </form>
    </div>
  )
}

export default AddBatchForm