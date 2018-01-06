var express = require('express');
var router = express.Router();
var fs = require("fs");

fileData = __dirname + "/../model/" + "todos.json";
fileFormat = __dirname + "/../model/" + "todo.json";
fileCount = __dirname + "/../model/" + "count.json";


/* GET list task. */
router.get('/', function(req, res, next) {

    fs.readFile( fileData, 'utf8', function (err, data) {
        console.log( data );
        res.setHeader('Content-Type', 'application/json');
        res.end( data );
    });
});

/* GET list task. */
router.get('/destroy/:id', function(req, res, next) {

    var id = req.params.id;

    var data = fs.readFileSync(fileData);
    data = JSON.parse( data );
    element = data["data"+id];

    console.log(element);
    console.log("data"+id);

    delete data["data"+id];


    fs.writeFile(fileData, JSON.stringify(data),  function(err) {
        if (err) {
            return console.error(err);
        }

        console.log("Data deleted successfully! ");

        res.setHeader('Content-Type', 'application/json');
        res.end( JSON.stringify(element) );

    });

});



router.post('/create', function (req, res) {

    var name = req.body.name;
    var dueDate = req.body.dueDate;
    var priority = req.body.priority;

    var datacount = fs.readFileSync(fileCount);
    datacount = JSON.parse( datacount );
    var count = datacount['count'] + 1;
    datacount['count'] = count;

    var datanewf = fs.readFileSync(fileFormat);
    datanewf = JSON.parse( datanewf );

    var createdAt = new Date();
    var dueDateAt = new Date(dueDate);
    console.log(dueDate);
    console.log(dueDateAt);

    datanewf["name"] = name;
    datanewf["dueDate"] = dueDateAt.getFullYear() +"/"+ (dueDateAt.getMonth()+1) +"/"+ dueDateAt.getDate();
    datanewf["priority"] = priority;
    datanewf["id"] = count;
    datanewf["createdAt"] = createdAt.toISOString();
    datanewf["updatedAt"] = createdAt.toISOString();


    var data = fs.readFileSync(fileData);
    data = JSON.parse( data );

    data["data"+count] = datanewf;

    fs.writeFile(fileData, JSON.stringify(data),  function(err) {
        if (err) {
            return console.error(err);
        }

        console.log("Data written successfully!");
    });

    fs.writeFile(fileCount, JSON.stringify(datacount),  function(err) {
        if (err) {
            return console.error(err);
        }

        console.log("Count updated!");
    });

    res.setHeader('Content-Type', 'application/json');
    res.end( JSON.stringify(datanewf) );

});

module.exports = router;
