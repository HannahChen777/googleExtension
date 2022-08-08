function fetchParticipantsByDOM(){
    var abscentsFromDom = document.querySelectorAll('.m3Uzve .AE8xFb .cxdMu .SKWIhd');
    console.log('-------abscentees-------');
    console.log(abscentees);
    var abscentees = [];
    abscentsFromDom.forEach(function(item){
        let isStatus = item.querySelector('.EY8ABd-OWXEXe-TAWMXe');
        //'isStatus == null' means yourself
        if(isStatus){
            let statusOfParticipant = isStatus.innerText;
            console.log(statusOfParticipant);
            if(statusOfParticipant == '沒有回覆' || '已接受' || '不確定'){
              let participant = item.querySelector('.zSX24d .jKwXVe .zWGUib').innerText;
              abscentees.push(participant);
            };
        };
    })
    console.log(abscentees);
    return abscentees;
}
fetchParticipantsByDOM();