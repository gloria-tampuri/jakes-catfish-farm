import React from 'react'
import Link from 'next/link'
import classes from './AddBatch.module.css'
import Button from '../UI/Button'
import {AiOutlinePlus} from 'react-icons/ai'

const AddBatch = () => {
  return (
  <div className={classes.AddBatch}>
    <Link href='/batch/add' className={classes.addBatchLink}><AiOutlinePlus className={classes.plus}/> <h2>ADD BATCH</h2>
  </Link>
  </div>
  )
}

export default AddBatch