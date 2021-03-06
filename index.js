var app = require('app');
var BrowserWindow = require('browser-window');
var path = require('path');
var readLine = require("readline");

var Menu = require('menu');
var MenuItem = require('menu-item');

var child_process = null;
// loads module and registers app specific cleanup callback...
//var cleanup = require('./cleanup').Cleanup(myCleanup);

// defines app specific callback...
function myCleanup() {
  console.log("IN CLEANUP");
  var cp = require('child_process');
    cp.exec('taskkill /PID ' + child_process.pid + ' /T /F', function (error, stdout, stderr) {
      console.log("-----TASKKILL-----")
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
  console.log('App specific cleanup code...');
};

function testCleanup(){
   console.log("IN TEST CLEANUP");
   var cp = require('child_process');
    cp.exec('taskkill /PID ' + child_process.pid + ' /T /F', function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
}

var mainWindow = null;

app.on('error', function (err) { console.error(err) })
app.on('window-all-closed', function () {
   console.log(" window-all-closed");
  app.quit();
});

app.on('ready', function () {
  
   child_process = require('child_process').exec(path.resolve(__dirname + '/HelloMvc/bin/output/"web.cmd"')).on('error', function (err) { throw err });
 
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
 

  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  //  mainWindow.loadUrl('http://localhost:5001');
 // mainWindow.openDevTools();

  mainWindow.on('closed', function () {
    console.log(" closed");
    
    //myCleanup();
    mainWindow = null;
  });
});

var killedSockets = false;
app.on('before-quit', function(event){
    
  
    if(!killedSockets){
       event.preventDefault();
    }
    // CLEAR open IPC sockets to geth
    var cp = require('child_process');

    cp.exec('taskkill /PID ' + child_process.pid + ' /T /F', function (error, stdout, stderr) {
       console.log("-----TASKKILL-----")
      killedSockets = true;
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
    
    
    // delay quit, so the sockets can close
    setTimeout(function(){
        app.quit();
    }, 500);
});