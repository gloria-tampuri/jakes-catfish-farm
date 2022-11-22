import React from 'react'
import { useRouter } from 'next/router'
import classes from './AdddBatchForm.module.css'
import Button from '../UI/Button'
import {BiArrowBack} from 'react-icons/bi'

const Update = () => {
    const router = useRouter()
  return (
    <div>
        
        <BiArrowBack className={classes.back} onClick={() => router.back()}/>
      <h1 className={classes.addHeader}>Update Batch</h1>
      <form className={classes.addForm}>
        <label htmlFor='batchnumber'> Batch Number</label>
        <input type='text' placeholder='Enter Batch Number' id='batchnumber' required/>

        <label htmlFor='batchname'> Batch Name</label>
        <input type='text' placeholder='Enter Batch Name' id='batchname' required/>

        <label htmlFor='fishnumber'> Number of Start Fishes </label>
        <input type='number' placeholder='Enter Number of Start Fishes' id='fishnumber' required/>

        <label htmlFor='startdate'>Start Date</label>
        <input type='date' placeholder='Select Start Date' id='startdate' required/>

        <label htmlFor='Enddate'>End Date</label>
        <input type='date' placeholder='Select Start Date' id='startdate'/>
     <div className={classes.addbutton}> <Button onClick={() => router.back()} > UPDATE </Button></div>

      </form>
    </div>
  )
}

export default Update