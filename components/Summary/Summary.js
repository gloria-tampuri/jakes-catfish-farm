import React,{useState, useEffect} from 'react'
import classes from './Summary.module.css'

const Summary = ({batch}) => {
  const[totalAmount, setTotalAmount] =useState(0)
  const[totalFishesSold,setTotalFishesSold]=useState(0)
  const[totalmortality,setTotalmortality] =useState(0)
  const[totalExpenditure, setTotalExpenditure] =useState(0)
  const[remainingFishes, setRemainingFishes] =useState(0)
  const[profit, setProfit] =useState(0)

  useEffect(() =>{
    const allAmounts =batch?.sales?.map(sale => +sale.amount).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
    const allFishes =batch?.sales?.map(sale => +sale.numberOfFishes).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
    const allMortality =batch?.mortality?.map(mortality => +mortality.number).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )

    const allExpenditure =batch?.expenditure?.map(expenditure => +expenditure.amount).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )

    setTotalAmount(allAmounts)
    setTotalFishesSold(allFishes)
      setTotalmortality(allMortality)
      setTotalExpenditure(allExpenditure)

  },[batch])

useEffect(()=>{
  const fishesLeft = batch?.numberOfFishes-totalFishesSold-totalmortality
  setRemainingFishes(fishesLeft)
},[batch,totalFishesSold,totalmortality])

useEffect(()=>{
  const profit =totalAmount-totalExpenditure
  setProfit( profit)
},[totalAmount,totalExpenditure])


  return (
    <div>
        <ul className={classes.sumarryList}>
            <li>Batch Number: <span>{batch?.batchId}</span></li>
            <li>Batch Name: <span>{batch?.batchName}</span></li>
            <li>Start Date: <span>{batch?.startDate}</span></li>
            <li>Start Fingerlings Number: <span>{batch?.numberOfFishes}</span></li>
            <li>Number of Fishes Sold: <span>{totalFishesSold}</span></li>
            <li>Total Sales: <span>{totalAmount}</span></li>
            <li>Total Expenditure: <span>{totalExpenditure}</span></li>
            <li>Mortality: <span>{totalmortality}</span></li>
            <li>Remaining Fishes: <span>{remainingFishes}</span></li>
        </ul>

<div className={classes.profit}> <h3>{profit >0 ?'Profit :' : 'Loss :'}</h3> <h3>{profit}</h3> </div>
       
    </div>
  )
}

export default Summary