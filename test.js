function fetchParticipantsByDOM(){
    var abscentsFromDom = document.querySelectorAll('.m3Uzve .AE8xFb .cxdMu .SKWIhd');
    console.log('-------abscentees-------');
    var abscentees = [];
    abscentsFromDom.forEach(function(item){
        let isStatus = item.querySelector('.EY8ABd-OWXEXe-TAWMXe');
        if(isStatus){  //if('isStatus == null') means yourself
            let statusOfParticipant = isStatus.innerText;
            if(statusOfParticipant == '沒有回覆' || statusOfParticipant == '已接受' || statusOfParticipant == '不確定'){
                console.log(statusOfParticipant);
                let participant = item.querySelector('.zSX24d .jKwXVe .zWGUib').innerText;
                console.log(participant);
                abscentees.push(participant);
            };
        };
    })
    console.log(abscentees);
    return abscentees;
}
fetchParticipantsByDOM();