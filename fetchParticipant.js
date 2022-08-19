//you + participants
//document.querySelector('.m3Uzve .AE8xFb .cxdMu .SKWIhd');

//participant
//document.querySelector('.m3Uzve .AE8xFb .cxdMu .SKWIhd .EY8ABd-OWXEXe-TAWMXe');

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
    console.log('-------abscentees-------');
    var abscentees = [];

    abscentsFromDom.forEach(function(item){
        let isStatus = item.querySelector('.EY8ABd-OWXEXe-TAWMXe');
        if(!isStatus) //if('isStatus == null') means yourself
            return;
        let statusOfParticipant = isStatus.innerText;
        if(knownStatus.indexOf(statusOfParticipant)){
            console.log(statusOfParticipant);
            let participant = item.querySelector('.zSX24d .jKwXVe .zWGUib').innerText;
            console.log(participant);
            abscentees.push(participant);
        };
    })
    console.log(abscentees);
    return abscentees;
}

fetchParticipantsByDOM();