const { MongoClient } = require("mongodb");

async function main() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    // Connect the client
    await client.connect();

    // Insert document without using a transaction
    const coll = client.db('test').collection('foo');
    await coll.insertOne({ abc: 4});
    
    console.log('Document inserted successfully');
    
  } catch (error) {
    console.error('Error during operation:', error);
  } finally {
    // Close the client connection
    await client.close();
  }
}

main().then(() => console.log('done'));
