// const { MongoClient, ServerApiVersion } = require("mongodb");
const { DB_PASSWORD } = require("./serverConfig");
const mongoose = require("mongoose");
const DB_URI = `mongodb+srv://swapnil:${DB_PASSWORD}@stackoverflow.v2h7agk.mongodb.net/?retryWrites=true&w=majority`;

// const client = new MongoClient(DB_URI, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// const dbConnect = async () => {
//   try {
//     await client.connect();
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     await client.close();
//   }
// };

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Export the Mongoose instance for use in other parts of your application
module.exports = mongoose;

// module.exports = dbConnect;
