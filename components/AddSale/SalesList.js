import React,{useContext, useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import classes from './SalesList.module.css'
import { format } from 'date-fns'
import { ThemeContext } from '../../context/theme'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const SalesList = () => {
  const router = useRouter()
  const theme = useContext(ThemeContext)
  const[totalAmount, setTotalAmount] =useState(0)

  const { data, error } = useSWR(`/api/batch/${router.query.batchId}`, fetcher,{refreshInterval: 1000})


  useEffect(() =>{
    const allAmounts = data?.sales?.map(sale => +sale.amount).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
    setTotalAmount(allAmounts)
  },[data])
  

  return (
    <div className={classes.SalesList}>
       <div className={classes.saleshead}>
         <h2>Total Sales</h2> 
         <h2 className={classes.totalSales}>{totalAmount && totalAmount.toFixed(2)}</h2>
         </div>

         <div className={classes.List}>
       
<table className={theme.theme ==='light' ? classes.salesection1 : classes.salesection}>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Cust Name</th>
                    <th>Kg</th>
                    <th>No. Fishes</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
            {data && data.sales.map((sale,index)=> <tr  key={index}>
                 <td>{format( new Date(sale.date), 'dd/MM/yy')}</td>
                 <td>{sale.customerName}</td>
                 <td>{sale.weight}</td>
                 <td>{sale.numberOfFishes}</td>
                 <td>{sale.amount}</td>
             </tr>
               )}
            </tbody>
        </table>


         </div>
    </div>
  
  )
}

export default SalesList