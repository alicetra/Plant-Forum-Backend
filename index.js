import app from './app.js'
import { connectToDatabase } from './db.js'

const port = process.env.PORT || 4001
// putting the connect to database function in index so everytime we type nodemon it automatically runs it and we dont have to import it in the routes
connectToDatabase()

app.listen(port)