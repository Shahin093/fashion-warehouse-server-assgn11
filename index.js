const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;



//Middleware
app.use(cors());
app.use(express.json());

// user name  : fasion-1    fasion-inventory
// pass : yvZAomT8eX9FNVrN   Helc5DfWJkIK8Reu


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://fasion-inventory:Helc5DfWJkIK8Reu@cluster-fasion.4ijhi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        client.connect();
        const fashionCollection = client.db("fasionService").collection("service");
        // api data load
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = fashionCollection.find(query);
            const fasion = await cursor.toArray();
            res.send(fasion);
        });

    } finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})