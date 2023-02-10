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
   if(batch!==null || batch!==undefined){
    const allAmounts =batch?.sales?.map(sale => +sale.amount).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
    console.log("Amounts: ", allAmounts);
    const allFishes =batch?.sales?.map(sale => +sale.numberOfFishes).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
    console.log("numberOfFishes: ", allFishes );

    const allMortality =batch?.mortality?.map(mortality => +mortality.number).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
    console.log("mortality: ",allMortality);

    const allExpenditure =batch?.expenditure?.map(expenditure => +expenditure.amount).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
    console.log("Expenditure: ",allExpenditure);

    setTotalAmount(allAmounts)
    setTotalFishesSold(allFishes)
      setTotalmortality(allMortality)
      setTotalExpenditure(allExpenditure)

   }
   else{return}
  },[batch])

useEffect(()=>{
  const fishesLeft = batch?.numberOfFishes - totalFishesSold - totalmortality
  fishesLeft > 0 ? setRemainingFishes(fishesLeft) : setRemainingFishes(0)
},[batch,totalFishesSold,totalmortality])

useEffect(()=>{
  const profit =totalAmount - totalExpenditure
  profit > 0 ? setProfit( profit) : setProfit(profit)
  
},[totalAmount,totalExpenditure])


  return (
    <div>
        <ul className={classes.sumarryList}>
            <li>Batch Number: <span>{batch?.batchId}</span></li>
            <li>Batch Name: <span>{batch?.batchName}</span></li>
            <li>Start Date: <span>{batch?.startDate}</span></li>
            <li>End Date: <span>{batch?.endDate}</span></li>
            <li>Start Fingerlings Number: <span>{batch?.numberOfFishes}</span></li>
            <li>Number of Fishes Sold: <span>{totalFishesSold}</span></li>
            <li>Total Sales: <span>{totalAmount}</span></li>
            <li>Total Expenditure: <span>{totalExpenditure}</span></li>
            <li>Mortality: <span>{totalmortality}</span></li>
            <li>Remaining Fishes: <span>{remainingFishes}</span></li>
        </ul>

<div className={classes.profit}> <h3>{profit >0 ?'Profit :' : 'Loss :'}</h3> <h3>{profit.toString()}</h3> </div>
       
    </div>
  )
}

export default Summary