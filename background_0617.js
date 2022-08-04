console.log('from background');



//when click the button on the popup.html > getCurrentTab



async function getCurrentTab(){
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    console.log(tab);
    return tab;
}

getCurrentTab();

