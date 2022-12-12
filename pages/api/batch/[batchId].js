import clientPromise from "../../../library/mongodb";
import { ObjectId } from "mongodb";

// Instance of the connected database
const connectedDatabase = async () =>{
    const client = await clientPromise;
    const MONGODB_DB = process.env.MONGODB_DB
    const db = client.db(MONGODB_DB)
    const batchCollection = db.collection('batches')
    return batchCollection;
}


export default async function(req,res){
  const {batchId}=req.query;
 

   if(req.method==='GET'){
    const batchCollection = await connectedDatabase()
   const foundBatch = await batchCollection.findOne({_id: ObjectId(batchId)})

   res.status(200).json(foundBatch)

   }else if(req.method === 'PATCH'){
   
    const batchCollection = await connectedDatabase()
    const updatedBatch = await batchCollection.findOneAndUpdate(
        {_id:  ObjectId(batchId)},
        {$push : {...req.body}
    })

    res.status(200).json({
        status: 200,
        message: "Batch updated successfully"
    })
   

   }else if (req.method==='DELETE'){
    const batchCollection = await connectedDatabase()
    const foundBatch = await batchCollection.deleteOne({batchId: batchId})
    
   res.status(200).json({
    status: 200,
    message:'batch deleted'
   })
 

   }
}  