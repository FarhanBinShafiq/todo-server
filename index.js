

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { ObjectId } = require('mongodb')
const app = express()
const port = 3000


//middlewarw
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }))

//schema
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
})

//scheme and model connection

const Task = mongoose.model('Task', TaskSchema)

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin:admin123@cluster0.lzm9qq0.mongodb.net/TaskCollection')
        console.log("Connected")

    } catch (error) {
        console.log('Not Connected')
        console.log(error)

    }


}

//Post Method-Add Task

app.post("/task", async (req, res) => {
    try {

        //get data from request body
        const title = req.body.title
        // save the data in schema
        const newTasks = new Task({
            title: title

        })

        const productData = await newTasks.save()

        res.send(productData)
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
})


//Get Method- Get All Task

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find()
        res.send(tasks)
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
})

///Get Method-Single Task

app.get('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    const task = await Task.findOne({ _id: new ObjectId(id) })
    res.send(task)
})

//Delete Method
app.delete('/tasks/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.deleteOne({ _id: new ObjectId(id) })
        res.send(task)
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
})



//PUT Metod-UPDATE Task 

app.put('/tasks/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findByIdAndUpdate({ _id: new ObjectId(id) },
            {
                $set: {
                    title: req.body.title
                }
            }, { new: true }
        )
       
        res.send(task)
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
})



//app.get---all user collection
app.get('/users', async (req, res) => {
    const query = {}
    const users = await usersCollection.find(query).toArray();
    res.send(users);
})


//User Colletion

app.post('/users', async (req, res) => {
    const user = req.body;
    const result = await usersCollection.insertOne(user);
    res.send(result);
})





app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`)
    await connectDb()
})