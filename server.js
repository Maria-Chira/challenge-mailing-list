//load the 'express' module which makes writing web servers easy
const express = require ("express");
const app = express();


//load the mailingList JSON
const mailingList = require("./mailingList.json");

//  /lists route -  list names
app.get("/lists", (req, res) => {
    const nameList = [];
    mailingList.map(group => nameList.push(group.name));
    if (nameList.length == 0){
        res.status(200);
        res.send([]);
    }else{
        res.status(200);
        res.json(nameList);
    }
});

// /lists/:name - GET single list
// app.get("/lists/:name", (req, res) => {
//     const filterList = mailingList.filter(group => group.name == req.params.name);
//     console.log(filterList);
//     if (filterList.length > 0){
//         res.status(200);
//         res.json(filterList);
//     }else{
//         res.status(404).end();
//     }
// })

// /lists/:name - DELETE single list by name
app.delete("/lists/:name", (req, res) => {
    const filterList = mailingList.filter((group) => group.name != req.params.name);
    if (mailingList.length === filterList.length ){
        res.status(404).end();
    }else{
        res.status(200);
        res.json(filterList);
    }
})


//Start our server so that it listens for HTTP requests!
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});