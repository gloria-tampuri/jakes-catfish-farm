import React from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import classes from './Batches.module.css'

const fetcher = (...args) => fetch(...args).then(res => res.json())


const BatchesList = () => {
  const { data, error } = useSWR('/api/batch', fetcher,{refreshInterval: 1000})

  return (
    <div className={classes.batchesList}>

      {data && data.map((batch)=>  <Link href={`/batch/${batch._id}`} className={classes.batch} key={batch._id}>
            <h3>{batch.batchId}</h3>
            <h3>{batch.batchName}</h3>
        </Link>)}

       
    </div>
  )
}

export default BatchesList