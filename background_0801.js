console.log('from background');

//when click the button on the popup.html > getCurrentTab

async function getUrl(){
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions) || '';  //tab is an array
    if(!tab){
        console.log('can\'t fetch url');
        return;
    }
    console.log(tab);
    let currentUrl = await tab.url;
    console.log(currentUrl);
    return currentUrl;
}

async function isUrlGoogleMeet(){
    let currentUrl = await getUrl();
    if(currentUrl){
        let isUrlGoogleMeet = await currentUrl.startsWith('https://meet.google.com/');
        console.log(isUrlGoogleMeet);
        return isUrlGoogleMeet;
    }
    return;
}


chrome.runtime.onConnect.addListener(function(port){
    if(port.name == 'foregroundRequest'){
        console.log('received successfully from port \'foregroundRequest\'');
        port.onMessage.addListener(async function(msg, sender, sendResponse){
            if(msg.password == 'getUrl'){
                console.log('password is correct');
                let url = await isUrlGoogleMeet();
                if(url){
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