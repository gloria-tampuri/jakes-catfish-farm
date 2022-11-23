import React from 'react'
import Link from 'next/link'
import classes from './Batches.module.css'

const batches=[
    {batchId: '1', batchName:'Batch 1'},
    {batchId: '2', batchName:'Batch 2'},
    {batchId: '3', batchName:'Batch 3'},
    {batchId: '4', batchName:'Batch 4'},
    {batchId: '5', batchName:'Batch 5'}

]

const BatchesList = () => {
  return (
    <div className={classes.batchesList}>

      {batches.map((batch)=>  <Link href={`/batch/${batch.batchId}`} className={classes.batch} key={batch.batchId}>
            <h3>{batch.batchId}</h3>
            <h3>{batch.batchName}</h3>
        </Link>)}

       
    </div>
  )
}

export default BatchesList