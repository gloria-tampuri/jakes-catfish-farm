import React,{useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import classes from './AdddBatchForm.module.css'
import Button from '../UI/Button'
import {BiArrowBack} from 'react-icons/bi'
import useBatch from '../../Hooks/useBatch'

const Update = () => {
    const router = useRouter()
  const {batch,isLoading, isError} = useBatch(router?.query?.batchId)

  const[batchName, setBatchName] = useState('')
  const[batchId,setBatchId]=useState(0)
  const[startDate, setStartDate]= useState('')
  const[numberOfFishes, setNumberOfFishes]=useState(0)
  const[endDate, setEndDate]=useState('')

  useEffect(()=>{

    if(batch){
      setBatchName(batch?.batchName)
      setBatchId(batch?.batchId)
      setStartDate(batch?.startDate)
      setNumberOfFishes(batch?.numberOfFishes)
      setEndDate( batch?.endDate)
    }
    
  }, [batch])

  const handlerFormSubmit=async(e)=>{
    e.preventDefault()
    const updateData={
    batchName:batchName,
    batchId:batchId,
    startDate:startDate,
    numberOfFishes:startDate,
    endDate:endDate
    }
  
   

    const response = await fetch(`/api/batch/${router.query.batchId}`,{
      method: "PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body: (JSON.stringify(updateData))
     })

    
  }

  return (
    <div>
        
        <BiArrowBack className={classes.back} onClick={() => router.back()}/>
      <h1 className={classes.addHeader}>Update Batch</h1>
      <form className={classes.addForm} onSubmit={handlerFormSubmit}>
        <label htmlFor='batchnumber'> Batch ID</label>
        <input type='text' placeholder='Enter Batch Number' id='batchnumber' value={batchId} onChange={(e)=>setBatchId(+e.target.value)}  required/>

        <label htmlFor='batchname'> Batch Name</label>
        <input type='text' placeholder='Enter Batch Name' id='batchname' required value={batchName} onChange={(e)=>setBatchName(e.target.value)}   />

        <label htmlFor='fishnumber'> Number of Start Fishes </label>
        <input type='number' placeholder='Enter Number of Start Fishes' id='fishnumber' required value={numberOfFishes} onChange={(e)=>setNumberOfFishes(+e.target.value)}  />

        <label htmlFor='startdate'>Start Date</label>
        <input type='date' placeholder='Select Start Date' id='startdate' required value={startDate} onChange={(e)=>setStartDate(e.target.value)}  />

        <label htmlFor='Enddate'>End Date</label>
        <input type='date' placeholder='Select Start Date' id='startdate' value={endDate} onChange={(e)=>setEndDate(e.target.value)}  />
     <div className={classes.addbutton}> <Button onClick={() => router.back()} > UPDATE </Button></div>

      </form>
    </div>
  )
} 

export default Update