console.log('from background');

//when click the button on the popup.html > getCurrentTab

async function getUrl(){
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions) || '';  //tab is an array
    console.log(tab);
    if(tab){
        let currentUrl = await tab.url;
        console.log(currentUrl);
        return currentUrl;
    }
    else{
        console.log('can\'t fetch url');
    }
}

async function getCurrentUrl(){
    let currentUrl = await getUrl();
    let isValidUrl = await urlParse(currentUrl);
    return isValidUrl;
}

function urlParse(url){
    return url.startsWith('https://meet.google.com/');
}


chrome.runtime.onConnect.addListener(function(port){
    if(port.name == 'foregroundRequest'){
        console.log('received successfully from port \'foregroundRequest\'');
        port.onMessage.addListener(async function(msg){
            if(msg.password == 'getUrl'){
                console.log('authenticated');
                let isValidUrl = await getCurrentUrl();
                console.log(`isValidUrl: ${isValidUrl}`);
                if(isValidUrl){
                    console.log('valid url');
                    port.postMessage({ status: 'success'});
                }
                else if(isValidUrl == undefined){
                    port.postMessage({ status: 'failed'});
                    console.log('這裡不4google meet耶');
                }
            } 
        })
    }
});


//document.querySelector('.m3Uzve .AE8xFb .cxdMu .SKWIhd .EY8ABd-OWXEXe-TAWMXe').innerText;