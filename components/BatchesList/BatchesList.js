import React from 'react'
import Link from 'next/link'
import classes from './Batches.module.css'

const batches=[
    {batchId: '001', batchName:'Batch 1'},
    {batchId: '002', batchName:'Batch 2'},
    {batchId: '003', batchName:'Batch 3'},
    {batchId: '004', batchName:'Batch 4'},
    {batchId: '005', batchName:'Batch 5'}

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