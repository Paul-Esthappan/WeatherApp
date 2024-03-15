const express = require('express');
const app = express();
const dotenv = require("dotenv").config();
const cors = require('cors')
require('../server/connections')


app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./routers/auth'))
app.use('/api/update', require('./routers/locations'))



const port = process.env.PORT || 5100

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})