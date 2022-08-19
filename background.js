console.log('from background');

//when click the button on the popup.html > getCurrentTab

async function getAbscentees(){
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions) || '';  //tab is an array
    console.log({tab: tab});
    console.log({url: tab.url});
    if(tab && tab.url){
        let isUrl = await isUrlGoogleMeet(tab.url);
        console.log('tab found');
        if(isUrl){
            console.log('url valid');
            let result = await chrome.scripting.executeScript({ //promise
                target: {tabId: tab.id},
                files: [ 'fetchParticipant.js']
            })
            return result;
        } else {
            console.log('Here\'s not google meet');
            return;
        }
    } else {
        console.log('Can\'t fetch tab');
        return;
    }
}

async function isUrlGoogleMeet(url){
    if(url){
        let isUrlGoogleMeet = await url.startsWith('https://meet.google.com/');
        console.log({isUrlGoogleMeet: isUrlGoogleMeet});
        return isUrlGoogleMeet;
    }
    return;
}


chrome.runtime.onConnect.addListener(function(port){
    if(port.name == 'foregroundRequest'){
        console.log('received successfully from port \'foregroundRequest\'');
        port.onMessage.addListener(async function(msg, sender, sendResponse){
            if(msg.password == 'getAbscentees'){
                console.log('password is correct');
                let abscenteesArray = await getAbscentees();
                console.log(abscenteesArray);
                if(abscenteesArray){
                    console.log('valid url');
                    port.postMessage({ status: 'urlIsGoogleMeet'});
                }
                else {
                    port.postMessage({ status: 'urlNotGoogleMeet'});
                }
            } 
        })
    }
});


//document.querySelector('.m3Uzve .AE8xFb .cxdMu .SKWIhd .EY8ABd-OWXEXe-TAWMXe').innerText;