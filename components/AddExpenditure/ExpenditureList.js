import React,{useContext, useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import classes from './ExpenditureList.module.css'
import { format } from 'date-fns'
import { ThemeContext } from '../../context/theme'

const fetcher = (...args) => fetch(...args).then(res => res.json())


const ExpenditureList = () => {

  const theme = useContext(ThemeContext)

  const router = useRouter()

  const[totalAmount, setTotalAmount] =useState(0)

  const { data, error } = useSWR(`/api/batch/${router.query.batchId}`, fetcher,{refreshInterval: 1000})


  useEffect(() =>{
    const allAmounts = data?.expenditure?.map(expenditure => +expenditure.amount).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
    setTotalAmount(allAmounts)
  },[data])

  return (
    <div className={classes.ExpenditureList}>
    <div className={classes.Expenditurehead}>
      <h2>Total Expenditure</h2> 
      <h2 className={classes.totalExpenditure}>{totalAmount && totalAmount.toFixed(2)}</h2>
      </div>

      <div className={classes.List}>

        <table className={theme.theme ==='light'?classes.expendituresection1 :classes.expendituresection}>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Expenditure Type</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
            {data && data.expenditure.map((expenditure,index)=> <tr  key={index}>
                 <td>{format( new Date(expenditure.date), 'dd/MM/yy')}</td>
                 <td>{expenditure.expenditureType}</td>
                 <td>{expenditure.amount}</td>

             </tr>
               )}
            </tbody>
        </table>
         
    </div>
    </div>
  )
}

export default ExpenditureList