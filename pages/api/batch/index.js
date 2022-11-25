// Import the clientPromise()
import clientPromise from "../../../library/mongodb";

// Instance of the connected database
const connectedDatabase = async () =>{
    const client = await clientPromise;
    const MONGODB_DB = process.env.MONGODB_DB
    const db = client.db(MONGODB_DB)
    const batchCollection = db.collection('batches')
    return batchCollection;
}


export default async function(req,res){
if(req.method === "POST"){
  const batchCollection = await connectedDatabase()
  const newData = {...req.body}
  const result = await batchCollection.insertOne(newData)
  res.status(201).json({message:"Posted new batch"})
}
else if(req.method === "GET"){
    const batchCollection = await connectedDatabase()
    const result =  await batchCollection.find({}).toArray();
    // const batches =
    res.status(200).json(result)
}
}