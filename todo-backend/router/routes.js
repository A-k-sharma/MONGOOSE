module.exports = (app) =>{
// const router = require('express').Router();
    const Todo = require('../models/todo_schema');

    const bodyparser = require("body-parser");
    app.use(bodyparser.urlencoded({extended : false}));
    app.use(bodyparser.json());

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "*");
        res.header("Access-Control-Allow-Headers", "*");
        next();
    });

    app.get('/', (req,res) => {
        Todo.find({}).then((results)=>{
            console.log(results);
            res.send(JSON.stringify(results));
        })
    });

    app.post('/todos', (req,res)=>{
        console.log("inside add method", req.body.desc);

        let newtodo = new Todo({description : req.body.desc});

        newtodo.save().then((result)=> {
            res.redirect('/');

        }).catch((err)=>{
            console.log("error in saving data",err);

        })
    });
    app.delete('/todos/:id', (req,res)=>{
        console.log("inside delete method", req.params.id);

        Todo.findOneAndDelete({_id : req.params.id} , (err,result)=>{
            if(err)
            {
                console.log("deletion failed");
            }
            console.log("response running?");

            res.send(JSON.stringify({
                isSuccess: true,
                message:"Deleted Successfuly"
            }));
        });

    });

}