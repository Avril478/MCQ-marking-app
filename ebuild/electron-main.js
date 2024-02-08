const { app, BrowserWindow } = require("electron");
const path = require("path");
const express = require("express");
const cors = require("cors");
const localServerApp = express();
const PORT = 8088;
const startLocalServer = (done) => {
  console.log("startServer() called");
  localServerApp.use(express.json({ limit: "100mb" }));
  localServerApp.use(cors());
  localServerApp.use(express.static(path.join(__dirname, "webapp")));
  localServerApp.get("*", (req, res) => {
    return res.sendFile(path.join(__dirname, "webapp/index.html"));
  });
  localServerApp.listen(PORT, async () => {
    console.log("Server Started on PORT ", PORT);
    done();
  });
};

function createWindow() {
  console.log("createWindow() called");
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 1200,
    // webPreferences: {
    //   preload: path.join(__dirname, "preload.js"),
    // },
  });

  // and load the index.html of the app.
  mainWindow.loadURL("http://localhost:" + PORT + "/");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  startLocalServer(createWindow);
  // createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
