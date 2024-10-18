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

let db = conn.db('sba319')

////////////////////////////////////// Validation //////////////////////////////////////
await db.createCollection("users", {
    // Pass the validator object
    validator: {
        // Use the $jsonSchema operator
        $jsonSchema: {
            bsonType: "object",
            title: "User Validation",
            // List required fields
            required: ["userId", "first", "last", "timestamp"],
            // Properties object contains document fields
            properties: {
                userId: {
                    bsonType: "string",
                    description: "userId is required, and must be a string",
                },
                first: {
                    bsonType: "string",
                    description: "User first name",
                },
                last: {
                    bsonType: "string",
                    description: "User last name",
                },
                timestamp: {
                    bsonType: "timestamp",
                    description: "Account creation timestamp"
                }
            },
        },
    },
});

await db.createCollection("accounts", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            title: "Account Validation",
            required: ["accountId", "userId", "accountType", "balance"],
            properties: {
                accountId: {
                    bsonType: "string",
                    description: "accountId is required and must be a string",
                },
                userId: {
                    bsonType: "string",
                    description: "userId is required, referencing the user",
                },
                accountType: {
                    enum: ["CHECKING", "SAVINGS", "CREDIT"],
                    description: "Type of the account",
                },
                balance: {
                    bsonType: "decimal",
                    description: "Current balance of the account",
                },
                createdAt: {
                    bsonType: "timestamp",
                    description: "Timestamp when the account was created"
                }
            },
        },
    },
});


await db.createCollection("transactions", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            title: "User Validation",
            required: ["userId", "amount", "category", "type", "timestamp"],
            properties: {
                userId: {
                    bsonType: "string",
                    description: "userId is required, and must be a string",
                },
                amount: {
                    bsonType: "decimal",
                    description: "Transaction amount",
                },
                category: {
                    bsonType: "string",
                    description: "Transaction category",
                },
                type: {
                    enum: [
                        "INCOME",
                        "EXPENSE",
                        "TRANSFER",
                    ],
                    description: "Transaction category",
                },
                timestamp: {
                    bsonType: "timestamp",
                    description: "transaction timestamp"
                }
            },
        },
    },
});


////////////////////////////////////// GET //////////////////////////////////////
export async function getUsers() {
    const collection = db.collection('users')
    const results = collection.find({}).toArray()
    return results
}
export async function getAccounts() {
    const collection = db.collection('accounts')
    const results = collection.find({}).toArray()
    return results
}
export async function getTransactions() {
    const collection = db.collection('transactions')
    const results = collection.find({}).toArray()
    return results
}

////////////////////////////////////// POST //////////////////////////////////////
export async function postUser(record) {
    const collection = db.collection('users')
    const results = collection.insertOne(record)
    return results
}
export async function postAccount(record) {
    const collection = db.collection('accounts')
    const results = collection.insertOne(record)
    return results
}
export async function postTransaction(record) {
    const collection = db.collection('transactions')
    const results = collection.insertOne(record)
    return results
}

////////////////////////////////////// DELETE //////////////////////////////////////
export async function deleteUser(id) {
    const collection = db.collection('users')
    const results = collection.deleteOne({ _id: ObjectId.createFromHexString(id) })
    return results
}
export async function deleteAccounts(id) {
    const collection = db.collection('accounts')
    const results =  collection.deleteOne({ _id: ObjectId.createFromHexString(id) })
    return results
}
export async function deleteTransaction(id) {
    const collection = db.collection('transactions')
    const results = collection.deleteOne({ _id: ObjectId.createFromHexString(id) })
    return results
}

////////////////////////////////////// UPDATE //////////////////////////////////////
export async function updateUser(id, updates) {
    const collection = db.collection('users')
    const results =collection.updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: updates })
}
export async function updateAccount(id, updates) {
    const collection = db.collection('accounts')
    const results = collection.updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: updates })
}
export async function updateTransaction(id, updates) {
    const collection = db.collection('transactions')
    const results = collection.updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: updates })
}


