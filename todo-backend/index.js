const express = require('express');
const port = 9000;
const app = express();
const mongoose = require("mongoose");
const router = require("./router/routes")

mongoose.connect('mongodb://localhost/todo', {useNewUrlParser  : true}).then(()=>{
    console.log("Database connected");
})
router(app);

app.listen(port, ()=>{
    console.log(`Server running at https://localost:${port}`);
})