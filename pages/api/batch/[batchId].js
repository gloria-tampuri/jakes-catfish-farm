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

   if(req.method==='GET'){
    const {batchId}=req.query;
    const batchCollection = await connectedDatabase()
   const foundBatch = await batchCollection.findOne({_id: ObjectId(batchId)})

   res.status(200).json(foundBatch)

   }else if(req.method === 'PATCH'){
    const {batchId}=req.query;
   const {action} = req.headers

    const batchCollection = await connectedDatabase()
   if(action === "sales"){
    const updatedSales = await batchCollection.updateOne(
        {_id:  ObjectId(batchId)},
        {$push : {sales: {...req.body}}
    })
   }else if(action === "mortality"){
    const updatedMortality = await batchCollection.updateOne(
        {_id:  ObjectId(batchId)},
        {$push : {mortality: {...req.body}}
    })
   }
   else if(action === "expenditure"){
    const updatedExpenditure = await batchCollection.updateOne(
        {_id:  ObjectId(batchId)},
        {$push : {expenditure: {...req.body}}
    })
   }
   
   else{
    const updatedBatch = await batchCollection.updateOne(
        {_id:  ObjectId(batchId)},
        {$set : {...req.body}
    })
   }

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