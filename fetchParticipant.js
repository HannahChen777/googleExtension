

function fetchParticipantsByDOM(){
    let knownStatus = [
        "Declined",
        "No response",
        "Accepted",
        "沒有回覆",
        "已接受",
        "不確定"
    ];

    var abscentsFromDom = document.querySelectorAll('.m3Uzve .AE8xFb .cxdMu .SKWIhd');
    console.log({abscentsFromDom: abscentsFromDom})
    console.log('-------abscentees-------');
    var abscentees = [];
    abscentsFromDom.forEach(function(item){
        let imgDom = item.querySelector("div.BEaVse img");
        if(!imgDom) return;
        let statusOfParticipant = imgDom.getAttribute("aria-label");
        if(knownStatus.indexOf(statusOfParticipant)){
            let participant = item.querySelector('.zSX24d .jKwXVe .zWGUib').innerText;
            console.log(participant);
            abscentees.push(participant);
        }
    })
    console.log(abscentees);
    return abscentees;
}
fetchParticipantsByDOM();