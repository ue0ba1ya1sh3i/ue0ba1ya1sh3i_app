//import
const { app, Menu, BrowserWindow } = require('electron');
const path = require("path");

//setPageURL
let pageURL = "https://ue0ba1ya1sh3i.web.app/";

//settingWindow
function createWindow () {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        icon: path.join(__dirname, 'icon.png'),
        center: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('index.html');
  
    //send deta from node to html
    win.webContents.on('did-finish-load', () => {
        win.webContents.send('pageURL', pageURL);
    });
};

//menuBer
let menuBer = [
    {
        label: 'operation',
        submenu: [
            {
                label: 'exit',
                click: () => {
                    app.quit();
                }
            }
        ]
    },

    {
      label: '編集',
      submenu: [
        {
            label: '元に戻す',
            role: 'undo'
        },

        {
            label: 'やり直し',
            role: 'redo'
        }
      ]
    }
];

//startApp
app.whenReady().then(() => {
    //mennuBer
    const menu = Menu.buildFromTemplate(menuBer);
    Menu.setApplicationMenu(menu);

    //start
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

//closeApp
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});