const express = require('express');
const app = express();
const connectDB = require('./config/mongodb');
//connecting to mongo
connectDB();

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('API running');
})

app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));


app.listen(PORT, () => { console.log(`server is listening ${PORT}`);  }) 