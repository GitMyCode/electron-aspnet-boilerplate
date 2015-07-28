var app = require('app');
var BrowserWindow = require('browser-window');
var path = require('path');
var readLine = require("readline");

//require('crash-reporter').start();
var Menu = require('menu');
var MenuItem = require('menu-item');

var child_process = null;
/*window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  menu.popup(remote.getCurrentWindow());
}, false);*/

// loads module and registers app specific cleanup callback...
var cleanup = require('./cleanup').Cleanup(myCleanup);
//var cleanup = require('./cleanup').Cleanup(); // will call noOp

// defines app specific callback...
function myCleanup() {
  var cp = require('child_process');
    cp.exec('taskkill /PID ' + child_process.pid + ' /T /F', function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
  console.log('App specific cleanup code...');
};

var mainWindow = null;

app.on('error', function (err) { console.error(err) })
app.on('window-all-closed', function () {
  app.quit();
});

app.on('ready', function () {

   child_process = require('child_process').exec(path.resolve(__dirname + '/HelloMvc/bin/output/"web.cmd"')).on('error', function (err) { throw err });

  //__dirname + '\\HelloMvc\\bin\\output\\web.cmd'
 
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
 

  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  //  mainWindow.loadUrl('http://localhost:5001');
 // mainWindow.openDevTools();

  mainWindow.on('closed', function () {
    
    mainWindow = null;
  });
});