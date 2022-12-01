import React,{useCallback, useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import classes from './MortalityList.module.css'
import { format } from 'date-fns'

const fetcher = (...args) => fetch(...args).then(res => res.json())


const MortalityList = () => {
  const router = useRouter()

  const[totalNumber, setTotalNumber] =useState(0)

  const { data, error } = useSWR(`/api/batch/${router.query.batchId}`, fetcher,{refreshInterval: 1000})


  useEffect(() =>{
    const allNumber = data?.mortality?.map(mortality => +mortality.number).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
    setTotalNumber(allNumber)
  },[data])

  return (
    <div className={classes.MortalityList}>
    <div className={classes.Mortalityhead}>
      <h2>Total Mortality</h2> 
      <h2 className={classes.totalExpenditure}>{totalNumber && totalNumber}</h2>
      </div>

      <div className={classes.List}>
      <table className={classes.mortalitysection}>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Number</th>
                </tr>
            </thead>
            <tbody>
            {data && data.mortality.map((mortality,index)=> <tr  key={index}>
            <td>{mortality.date}</td>
                 <td>{mortality.number}</td>

             </tr>
               )}
            </tbody>
        </table>

         
    </div>
    </div>
  )
}

export default MortalityList