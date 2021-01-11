filename = process.argv[2];

async function getFileData(filename){
    const fs = require('fs').promises;
        return await fs.readFile("./" + filename, 'utf8', function(err, data) {
            if (err) throw err;
        });
};

getFileData("sampledata.tsv")
    .then(function (data){
        data = data.replace(/(\n)/gm, "\\n");
        data = data.replace(/\"/gm, "\\\"");
        data = "{ \"data\": { \"data\": \"" + data.replace(/(\t)/gm, "\\t") + "\" } }";
    
        console.log(data);
})

