import React, {useState} from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import classes from './AddMortality.module.css'
import { BiArrowBack } from 'react-icons/bi'

const fetcher = (...args) => fetch(...args).then(res => res.json())


const AddMortalityForm = () => {
    const router = useRouter()

    const[date,setDate] =useState('')
    const[number, setNumber] =useState(0)

    const { data, error } = useSWR(`/api/batch/${router.query.batchId}`, fetcher,{refreshInterval: 1000})


    const onSubmitMortalityForm=async(e)=>{
        e.preventDefault()

        setDate('')
        setNumber('')

        const data={
            mortality:{
                date,
                number
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

        <div className={classes.AddMortalityForm}>
            <div className={classes.arrowName}> <BiArrowBack className={classes.back} onClick={()=>router.back()}/> <h2> {data && data.batchName}</h2> <h1></h1>
         </div>

            <h2>Add Mortality</h2>

            <form className={classes.MortalityForm} onSubmit={onSubmitMortalityForm}>
                <input type='date' value={date} onChange={(e)=>{setDate(e.target.value)}} />
                <input type='number' placeholder='Number' value={number} onChange={(e)=>{setNumber(e.target.value)}}/>
                <div className={classes.addMortality}> <button>Add Expenditure</button> </div>
            </form>
        </div>

    )
}

export default AddMortalityForm