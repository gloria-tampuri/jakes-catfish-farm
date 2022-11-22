import React from 'react'
import BatchDetails from '../../components/BatchDetails/BatchDetails'
import Header from '../../components/Header/Header'
import { useRouter } from 'next/router'

const BatchPage = () => {
  const router =useRouter()
  const {batchId}=router.query;
  console.log(batchId);
  console.log(router);
  return (
    <div>
      <Header/>
      <BatchDetails/>
    </div>
  )
}

export default BatchPage