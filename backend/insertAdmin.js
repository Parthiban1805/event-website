const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

async function insertUsers() {
  const dbName = 'adminDB';
  const uri = `mongodb+srv://parthis1805:Parthiban1805@registeration.j2v4mdr.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=registeration`;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection("signup");

    const users = [
      { email: "parthi.s1805@gmail.com", password: "password1" },
      { email: "prabhat24lpunss@gmail.com", password: "Lovelynss@24" },
    ];

    const saltRounds = 10;
    const userPromises = users.map(async user => {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      return { email: user.email, password: hashedPassword };
    });

    const hashedUsers = await Promise.all(userPromises);

    const result = await collection.insertMany(hashedUsers);
    console.log(`${result.insertedCount} users inserted`);
  } catch (error) {
    console.error('Error inserting users into MongoDB:', error);
  } finally {
    await client.close();
  }
}

insertUsers();
