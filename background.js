console.log('from background');

//when clicking the 'start' button >> judge the url is googlemeet
async function getUrlTab(){
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions) || '';  //tab is an array
    if(!tab || !tab.url)
        return;
    let isGoogleMeet = await isUrlGoogleMeet(tab.url);
    if(!isGoogleMeet)
        return;
    return tab;
}

async function fetchParticipantObject(urlTab){
    if(!urlTab)
    return;
    let result = await chrome.scripting.executeScript({
        target: {tabId: urlTab.id},
        files: [ 'fetchParticipant.js']
    })
    console.log(result);
    return result;
}

async function isUrlGoogleMeet(url){
    if(!url)
        return;
    let isUrlGoogleMeet = await url.startsWith('https://meet.google.com/');
    console.log({isUrlGoogleMeet: isUrlGoogleMeet});
    return isUrlGoogleMeet;
}

chrome.runtime.onConnect.addListener(function(port){
    if(port.name == 'foregroundRequest'){
        console.log('received successfully from port \'foregroundRequest\'');
        port.onMessage.addListener(async function(msg, sender, sendResponse){
            if(msg.password == 'getAbscentees'){
                console.log('password is correct');
                let tab = await getUrlTab();
                if(!tab){
                    port.postMessage({ status: 'urlNotGoogleMeet'});
                }
                else{
                    let abscenteesArray = await fetchParticipantObject(tab);
                    console.log(abscenteesArray);
                    port.postMessage(
                        { 
                            status: 'urlIsGoogleMeet',
                            data: abscenteesArray
                        }
                    );
                }
            } 
        })
    }
});


//document.querySelector('.m3Uzve .AE8xFb .cxdMu .SKWIhd .EY8ABd-OWXEXe-TAWMXe').innerText;