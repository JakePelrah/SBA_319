import dotenv from 'dotenv'
import { MongoClient, ObjectId } from "mongodb";

dotenv.config()
const client = new MongoClient(process.env.URL)



let conn;
try {
    conn = await client.connect()
} catch (e) {
    console.log(e)
}

let db = conn.db('worcester')


export async function getDogs(skip = 0, limit = 100) {
    const collection = db.collection('dogs')
    const results = await collection.find({}).skip(skip).limit(limit).toArray()
    return results
}


export async function insertDog(record) {
    const collection = db.collection('dogs')
    const results = await collection.insertOne(record)
    return results
}

export async function  deleteDog(id) {
    const collection = db.collection('dogs')
    const results = await collection.deleteOne(id)
    return results
}

export async function updateDog(id, updates) {
    const collection = db.collection('dogs')
    const results = await collection.updateOne({_id:ObjectId.createFromHexString(id)}, {$set:updates})
}

// address_point
//get, post, patch, delete
// find, insertOne, updateOne, deleteOne

//buildings
// get, post, patch, delete

//dogs
// get, post, patch, delete

//parcels
// get, post, patch, delete