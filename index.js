var express = require('express')
var app = express()
var multer = require('multer');
var path = require('path')

var DB = require('./Database/database');

app.post('/upload', function (req,res) {

  upload(req, res, (err) => {
  
  var user_id = req.body.user_id
  var file
	  
    if(err){
      res.render('index', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('index', {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.render('index', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });

}) // upload

// Functions Multer

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// UPLOADS 

// Definition of Multer options
// We use define storage options, filefilter function et mode single
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb)
  }
}).single('myImage')

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  // Return value	
  if(mimetype && extname) {return cb(null,true) } else {cb('Error: Images Only!')}
}



app.get('/innerjoin', function(req,res) {

	//Debug
    var location = "fr"
    
	DB.CreatePool(location).then(currPool => {
	DB.ConnectToDB(currPool).then(currCon => {
		
		var sql = `SELECT events_${location}.*, users_${location}.first_name, users_${location}.organizer_id, users_${location}.organizer_rating FROM events_${location} INNER JOIN users_${location} ON users_${location}.organizer_id = events_${location}.organizer_id`
		
		DB.GoQuery(currCon,sql).then(resultPost => {
		
		//var packetStr = JSON.stringify(resultPost)
		//var packetStr = JSON.parse(packetStr)
		//console.log(resultPost)
		res.status(200).send(resultPost)

		}) //GoQuery Select
	currCon.release()
	}) // GetConnection

	}) // CreatePool

}) // Appget

app.listen(3002, function (res,req) {
console.log("TESTER LAUNCH")
})
