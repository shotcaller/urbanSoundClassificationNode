const express = require('express')
const app = express()
const {spawn} = require('child_process');
const upload = require('express-fileupload')
const cors = require('cors')
const fse = require('fs-extra') 

app.use(cors())
app.use(upload())

app.get('/', (req, res) =>{
    //res.send('Hello World.....')

    res.sendFile(__dirname + '/index.html')

    // var dataToSend;

    // runPy(req, res, dataToSend)
    
})

 app.post('/', (req, res) => {
    fse.emptyDirSync('./uploads')

    if(req.files)
        var audio = req.files.audio
        var audioName = audio.name
        if (audioName==="blob"){
            audioName = audioName+'.wav'
        }
        console.log(audioName)
        audio.mv('./uploads/'+audioName, (err) => {
            if(err){
                res.send(err)
            }
            else{
                //fse.renameSync('./uploads/blob', './uploads/blob.wav')
                runPy(req,res,audioName)
                
            }     
        })
    // var dataToSend
    // runPy(req, res,dataToSend)

 })

app.listen(5000, ()=> console.log("Listening on 5000"))

////////////////////// Functions //////////////////////////////////////

function runPy (req, res,name) {

    var dataToSend
    const python = spawn('python', ['pyScript.py',name]);

    python.stdout.on('data', function (data) {
      //console.log('Pipe data from python script ...');
      dataToSend = data.toString()
      console.log(dataToSend)
     });
    
     python.on('close', async (code) => {
     console.log(`child process close all stdio with code ${code}`);
    
     res.send(dataToSend)

     });
}



