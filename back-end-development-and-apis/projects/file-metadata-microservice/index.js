var express = require('express');
var cors = require('cors');
require('dotenv').config();
const multer  = require('multer');
const upload = multer().single("upfile");


var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// this is endpoint that reads the file metadata
app.post('/api/fileanalyse', (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // a multer error occurred when uploading
      res.send(`There was a Multer error with uploading the file: ${err}`)
    } else if (err) {
      // An unknown error occurred when uploading
      res.send(`There was an error with uploading the file: ${err}`)
    }
    // proceed with reading the file if there aren't any errors
    const uploadedFile = req.file;
    // the "uploadedFile" variable should look like this:
    // {
    //   fieldname: 'upfile',
    //   originalname: 'ethics-summer-2024.docx',
    //   encoding: '7bit',
    //   mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    //   destination: 'uploads/',
    //   filename: '46426f6782d68eb175a286c4c141e7d9',
    //   path: 'uploads/46426f6782d68eb175a286c4c141e7d9',
    //   size: 34839
    // }
    const name = uploadedFile.originalname;
    const type = uploadedFile.mimetype;
    const size = uploadedFile.size;
    res.json({
      name: name,
      type: type,
      size: size
    })
  })
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
