const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const usersRouter = require("./routes/users.routes");
const recipesRouter = require('./routes/recipes.routes');


app.get('/', (req, res) => res.send('Hello world!'));
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/recipes", recipesRouter);


const port = process.env.PORT || 8082;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => console.log(`Server running on port ${port}`));
        console.log("Successfully connected to MongoDB.");
    })
    .catch((error) => {
        console.log(error);
    })