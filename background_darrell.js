console.log('from background');
function test456(test){
    // doing thing to test
    // int to str
}

//when click the button 'start' on UI of extension > getCurrentTab
async function getUrl(){
    let queryOptions = { active: true, lastFocusedWindow: true };

    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions) || ''; // promise || ''
    console.log("tab execute js")
    console.log(tab);
    console.log(typeof(tab));
    if(tab){
        let result13 = chrome.scripting.executeScript({
            target: {tabId : tab.id},
            files: ["fetchParticipant.js"]
        }).then(function(test){
            testR = "123";
            console.log({test17: test});
            console.log({testR: testR});
        })
        console.log({result13: result13})
        let currentUrl = await tab.url;
        console.log(currentUrl);
        return currentUrl;
    }
    else{
        console.log('can\'t fetch url');
    }
}

async function isUrlGoogleMeet(){
    let currentUrl = await getUrl();
    let urlJudgeResult = await urlJudge(currentUrl);
    return urlJudgeResult;
}

function urlJudge(url){
    return url.startsWith('https://meet.google.com/');
}


chrome.runtime.onConnect.addListener(function(port){
    if(port.name == 'foregroundRequest'){
        console.log('received successfully from port \'foregroundRequest\'');
        port.onMessage.addListener(async function(msg){
            if(msg.password == 'getUrl'){
                console.log('authenticated');
                let url = await isUrlGoogleMeet();
                console.log(`isUrlGoogleMeet: ${url}`);
                if(url){
                    console.log('valid url');
                    port.postMessage({ status: 'urlIsGoogleMeet'});
                }
                else if(url == undefined){
                    port.postMessage({ status: 'urlNotGoogleMeet'});
                    console.log('這裡不4google meet耶');
                }
            } 
        })
    }
});

//document.querySelector('.m3Uzve .AE8xFb .cxdMu .SKWIhd .EY8ABd-OWXEXe-TAWMXe').innerText;