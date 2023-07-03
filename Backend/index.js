const main = require('./db');
const UserSchema = require('./models/User');
const NoteSchema = require('./models/Note')

main();

var cors = require('cors')
const express = require('express')
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/Auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})