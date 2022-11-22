import React from 'react'
import AddBatch from '../../components/ADD-BATCH/AddBatch'
import BatchDetails from '../../components/BatchDetails/BatchDetails'
import BatchesList from '../../components/BatchesList/BatchesList'
import Header from '../../components/Header/Header'


const BatchesPage = () => {
  return (
    <div>
      <Header/>
      <AddBatch/>
      <BatchesList/>
     </div>
  )
}

export default BatchesPage