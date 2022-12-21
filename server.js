const express = require('express'),
    dbOperation = require('./dbfiles/dbOperation'),
    cors = require('cors');

const API_PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.post('/api', async (req, res) => {
    console.log('called');
    const result = await dbOperation.getUsers(req.body.email);
    res.send(result.recordset);
});

app.post('/add', async (req, res) => {
    const result = await dbOperation.addUser(req.body);
    console.log('called');
    res.send(result);
});

app.put('/saveOTP', async (req, res) => {
    const result = await dbOperation.updateOTP(req.body);
    const saved = await dbOperation.getUsers(req.body.email);
    console.log('called');
    res.send(saved.recordset);
});

app.listen(API_PORT, () => console.log(`listening on port ${API_PORT}`));


