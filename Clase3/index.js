const fs = require("fs");


const path = "./horaYFecha.txt";
fs.writeFile(path, new Date().getHours().toString(), (err) =>{
    if(err){
        throw new Error(err);
    }
});

fs.readFile(path, "utf-8", (err, res) =>{
    if(err){
        throw new Error(err);
    }
    console.log(res);
})