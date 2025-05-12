const { app, BrowserWindow } = require('electron');
const path = require('path');

// Create a window
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Allows renderer process to access Node.js
    },
  });

  // Load the HTML file
  mainWindow.loadFile('index.html');

  // When the window is closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// When Electron is ready
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit app when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
