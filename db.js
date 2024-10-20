import dotenv from 'dotenv'
import { MongoClient, ObjectId } from "mongodb";
dotenv.config()

const client = new MongoClient(process.env.MONGO_CONNECTION_URL)

let conn;
try {
    conn = await client.connect()
} catch (e) {
    console.log(e)
}

let db = conn.db('sba319')

////////////////////////////////////// Validation //////////////////////////////////////
await db.createCollection("users", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            title: "User Validation",
            required: ["userId", "first", "last", "created"],
            properties: {
                userId: {
                    bsonType: "int",
                    description: "userId",
                },
                first: {
                    bsonType: "string",
                    description: "User first name",
                },
                last: {
                    bsonType: "string",
                    description: "User last name",
                },
                created: {
                    bsonType: "date",
                    description: "User creation date"
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
            required: ["accountId", "userId", "accountType", "balance", "created"],
            properties: {
                accountId: {
                    bsonType: "int",
                    description: "accountId",
                },
                userId: {
                    bsonType: "int",
                    description: "userId",
                },
                accountType: {
                    enum: ["CHECKING", "SAVINGS", "CREDIT"],
                    description: "Type of the account",
                },
                balance: {
                    bsonType: "decimal",
                    description: "Current balance of the account",
                },
                created: {
                    bsonType: "date",
                    description: "Account creation date"
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
            required: ["accountId", "transactionId", "amount", "category", "type", "created"],
            properties: {
                accountId: {
                    bsonType: "int",
                    description: "accountId",
                },
                transactionId: {
                    bsonType: "string",
                    description: "transactionId",
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
                    description: "Transaction type",
                },
                created: {
                    bsonType: "date",
                    description: "Transaction creation date"
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

export async function getUser(userId) {
    userId = parseInt(userId)
    const collection = db.collection('users')
    const results = collection.findOne({ userId })
    return results
}

export async function getAccount(userId) {
    userId = parseInt(userId)
    const collection = db.collection('accounts')
    const results = await collection.find({ userId }).toArray()
    return results
}

export async function getTransactions(accountId) {
    accountId = parseInt(accountId)
    const collection = db.collection('transactions')
    const results = collection.find({ accountId }).toArray()
    return results
}

////////////////////////////////////// POST //////////////////////////////////////
export async function postTransaction(record) {
    const collection = db.collection('transactions')
    const results = collection.insertOne(record)
    return results
}

////////////////////////////////////// UPDATE //////////////////////////////////////
export async function updateTransaction(id, updates) {
    const collection = db.collection('transactions')
    const results = collection.updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: updates })
}

////////////////////////////////////// DELETE //////////////////////////////////////
export async function deleteTransaction(transactionId) {
    const collection = db.collection('transactions')
    const results = collection.deleteOne({ transactionId })
    return results
}



