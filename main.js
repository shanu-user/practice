// console.warn("Hello World");
const {app,BrowserWindow}=require('electron');
const windowStateKeeper=require('electron-window-state');

setTimeout(()=>{
    console.warn(app.isReady());
},450);
function createWindow()
{
    let mainWindowState=windowStateKeeper({
        defaultWidth: 800,
        defaultHeight: 500
    });
    var win=new BrowserWindow({
        x:mainWindowState.x,
        y:mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        height: 600,
        title: "My First Electron App",
        webPreferences:{
            nodeIntegration: true
        }
    })
    let child=new BrowserWindow({
        parent: win,
        width: 800,
        height: 400,
        title: "Child Window"
    })
    child.loadFile("index.html");
    child.show();
    win.loadFile("index.html");
    let wc=win.webContents;
    wc.on('dom-ready',()=>{
        console.warn("app dom is ready");
    })
    wc.on('did-finish-load',()=>{
        console.warn("did-finish-load");
    })
    mainWindowState.manage(win);
}
console.warn("main process");
// app.whenReady().then(createWindow);
app.on('browser-window-focus',()=>{
    console.warn("you are on app");
});
app.on('browser-window-blur',()=>{
    console.warn("you are unfocus app");
});
app.on('before-quit',()=>{
    console.warn("call before app quit");
})
app.on('ready',()=>{
    createWindow();
    console.log(app.isReady());
    console.warn("app is ready you can write some code here");
})