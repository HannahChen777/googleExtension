console.log('from background');



//when click the button on the popup.html > getCurrentTab



async function getCurrentUrl(){
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);  //tab is an array
    console.log(tab);
    let url = await tab.url;
    console.log(url);
    return url;
}



chrome.runtime.onMessage.addListener(
    async function(request, sender, sendResponse) {
        if (request.greeting === "hello"){
            console.log('click~');
            var tab = await getCurrentTab();
            console.log(tab);
            // if(url.startsWith('https://meet.google.com/')){
            //     console.log('valid url');
            // } else {
            //     console.log('這裡不是google meet耶');
            // }
            sendResponse({farewell: "goodbye"});
            return true;  //async
        }
        
    }
);