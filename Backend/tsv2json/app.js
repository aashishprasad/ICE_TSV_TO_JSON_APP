const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let filename  = "";
let call_num = 0;

app.use(express.json());

let parserTools = require('./tsv2json.js');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });

app.get('/api/parser/result', (req,res) => {
    
   filename = req.query.filename;

    // call getFileData
    
    let tsvData =  getFileData(filename);
    
    tsvData.then(function(fileData) {
        res.send(fileData);
     })

});

app.get('/api/parser/result/previous', (req,res) => {
    
    filename = req.query.filename;
 
    // call tsv2json Business Rules
    let a = run(filename);
    a.then(function(result) {
        res.send(result);
     })
 
 });

app.post('/api/parser', (req,res) => {

    
    //let tsvData = req.body;
    let tsvData = req.body.data.data;
    const fs = require('fs');
    
    call_num = call_num + 1;
    filename = "data" + call_num + ".txt";
    

    fs.writeFile("./tmp/" + filename, tsvData, function(err) {
        if(err) {
            return console.log(err);
        }
    }); 

    // call tsv2json Business Rules
    let a = run(filename);
    a.then(function(result) {
        res.send(result);
     })

});

async function getFileData(filename){
    const fs = require('fs').promises;
        return await fs.readFile("./tmp/" + filename, 'utf8', function(err, data) {
            if (err) throw err;
        });
}

async function run(filename)  {
    const json_result = await parserTools.parseAsFile("./tmp/" + filename);
    return({json_result, error_result: "Error: ", url_result: "http://localhost:4200/result/" + filename});
}

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listining to ${port}`));
