const express=require('express')
const db=require('./config/database')
const bodyParser=require('body-parser')
const app=express()
const port=3000
const cors=require('cors')
const authRouter=require('./route/authRoute')
const roleRouter=require('./route/roleRoute')
const taskRouter=require('./route/taskRoute')
const userRouter=require('./route/userRoute')
const recurrenceRouter=require('./route/recurrenceRoute')

app.use(cors())
// app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get('/',(req,res)=>{
    res.status(200).json(
        {
            staus:'success',
        message:'hello'
    })
})

app.use('/api/auth', authRouter);
app.use('/api/role', roleRouter);
app.use('/api/task', taskRouter);
app.use('/api/user', userRouter);
app.use('/api/recurrence', recurrenceRouter);



// app.post('/siginup',register)
// app.get('/users', db.getUsers)
// app.get('/users/:id', db.getUserById)
// app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

