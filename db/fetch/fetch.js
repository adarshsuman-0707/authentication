const  MongoClient  = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'blog';

// Connect to the server
MongoClient.connect(url, function(err, client) {
  if (err) throw err;
  
  const db = client.db(dbName);
  
  // Fetch data from a collection
  const collection = db.collection('users');
  
  collection.find({}).toArray(function(err, result) {
    if (err) throw err;
    
    console.log(result);
    
    // Close the connection
    client.close();
  });
});