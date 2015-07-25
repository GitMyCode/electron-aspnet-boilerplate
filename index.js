var app = require('app');
var BrowserWindow = require('browser-window');
var path = require('path');
var readLine = require("readline");
//require('crash-reporter').start();

var child_process = null;
var mainWindow = null;

app.on('error', function (err) { console.error(err) })
app.on('window-all-closed', function () {
  app.quit();
});

app.on('ready', function () {

  var child_process = require('child_process').exec(path.resolve(__dirname +'/HelloMvc/bin/output/"web.cmd"')).on('error', function (err) { throw err });


  //__dirname + '\\HelloMvc\\bin\\output\\web.cmd'
 
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  mainWindow.loadUrl('file://' + __dirname + '/index.html');
//  mainWindow.loadUrl('http://localhost:5001');

  // mainWindow.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;

    child_process.kill('SIGINT');
  });
});