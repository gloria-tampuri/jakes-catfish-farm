import React from 'react'
import useSWR from 'swr'
import { BiArrowBack } from 'react-icons/bi'
import { useRouter } from 'next/router'
import classes from './BatchDetails.module.css'
import Summary from '../Summary/Summary'

const fetcher = (...args) => fetch(...args).then(res => res.json())


const BatchDetails = () => {
  const router = useRouter()
  const { batchId } = router.query

  const { data, error } = useSWR(`/api/batch/${batchId}`, fetcher, { refreshInterval: 1000 })
  

  const getToEdit = () => {
    router.push(`/batch/update/${batchId}`)
  }

  return (
    <div>
      <BiArrowBack className={classes.back} onClick={() => router.back()} />
      <h1 className={classes.header}>{data?.batchId} {data?.batchName}</h1>
      <div className={classes.actions}>
        <div className={classes.actionbtn} onClick={() => router.push(`/batch/sales/${batchId}`)}>Sales</div>
        <div className={classes.actionbtn} onClick={() => router.push(`/batch/expenditure/${batchId}`)}>Expenditure</div>
        <div className={classes.actionbtn} onClick={() => router.push(`/batch/mortality/${batchId}`)}>Mortality</div>
      </div>

      <div className={classes.edit}><p onClick={getToEdit}>Edit</p></div>
      <Summary batch={data}/>
    </div>
  )
}

export default BatchDetails