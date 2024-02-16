import express from 'express'




const app = express()

app.get('/', (req, res) => res.send({"info": "Welcome"}))

app.listen(4001) 