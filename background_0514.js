console.log("from background");

var getTab = async function getTab(){
    var getCurrentTabId = await chrome.tabs.onActivated.addListener(tab => console.log(tab));
    console.log(`getCurrentTabId is ${getCurrentTabId}`);
    var currentTabInfo = await getCurrentTab();
    return currentTabInfo;
};

getTab().then(data => console.log(`current url is ${data.url}`));


async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    // console.log(typeof(tab));  //object
    // console.log(tab.url);
    console.log(`current tab is ${JSON.stringify(tab)}`);
    // console.log(tab);  // {...} JSON

    // let tab = await chrome.tabs.query(queryOptions);
    // console.log(typeof(tab));  //object
    // console.log(tab[0].url);
    // console.log(tab);  //[{...}]
    return tab;
    //here's a promise
};



//to execute foreground script
//chorme.scripting.executeScript(tab you want to inject foreground, object(file path), callback function(optional));
var executeForeground = async function executeScript() {
    //let currentTab = await getTab();
    chrome.scripting.executeScript(
        {
            target: {tabId: currentTab.id},
            files: ['./foreground.js']
        }, 
        () => console.log('foreground.js has been injected')
    );
};

//executeForeground();

//chrome.storage.local.set()
//chrome.storage.local.get()



  





