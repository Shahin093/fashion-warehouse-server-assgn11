const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId; const app = express();
const port = process.env.PORT || 5000;


//Middleware
app.use(cors());
app.use(express.json());

// user name  : fasion-1    fasion-inventory
// pass : yvZAomT8eX9FNVrN   Helc5DfWJkIK8Reu



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
        // data load single service


        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await fashionCollection.findOne(query);
            res.send(service);

        });

        // post
        app.post('/services', async (req, res) => {
            const newService = req.body;
            const result = await fashionCollection.insertOne(newService);
            res.send(result);
        });

        // update data 
        app.put('/service/:id', async (req, res) => {
            const id = JSON.parse(req.params.id);
            const updatedUser = req.body;
            const filter = req.ObjectId(id);
            const options = { upsert: true };
            const updateDoc = {
                quantity: updatedUser.quantity
            };
            console.log(updateDoc);
            const result = await fashionCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })



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