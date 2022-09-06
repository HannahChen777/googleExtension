//you + participants
//document.querySelector('.m3Uzve .AE8xFb .cxdMu .SKWIhd');

//participant
//document.querySelector('.m3Uzve .AE8xFb .cxdMu .SKWIhd .EY8ABd-OWXEXe-TAWMXe');

function clickBtnOfParticipants(){
    console.log('clickBtnOfParticipants');
    let isBox = document.querySelector('.WUFI9b');  // to get the whole box of btnParticipants
    
    if(!isBox.classList.contains('qdulke'));  // to judge if the box is opened  //true: closed; false:open
        return;
    //need to fix(null)

    let btns = document.getElementsByClassName('VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ JsuyRc boDUxc') || '';
    if(!btns)
        return;

    btns[1].click();
    return true;
    
}

function fetchParticipantsByDOM(){
    console.log('fetchParticipantsByDOM');
    let knownStatus = [
        "No response",
        "Accepted",
        "沒有回覆",
        "已接受",
        "不確定"
        //lack of "not sure"
    ];

    var abscentsFromDom = document.querySelectorAll('.m3Uzve .AE8xFb .cxdMu .SKWIhd');
    console.log('-------abscentees-------');
    var abscentees = [];

    abscentsFromDom.forEach(function(item){
        let isStatus = item.querySelector('.EY8ABd-OWXEXe-TAWMXe');
        if(!isStatus) //if('isStatus == null') means yourself
            return;
        let statusOfParticipant = isStatus.innerText;
        if(knownStatus.includes(statusOfParticipant)){
            console.log(statusOfParticipant);
            let participant = item.querySelector('.zSX24d .jKwXVe .zWGUib').innerText;
            console.log(participant);
            abscentees.push(participant);
        };
    })
    console.log(abscentees);
    return abscentees;
}

async function main(){
    let isBtn = await clickBtnOfParticipants();
    fetchParticipantsByDOM();
}

clickBtnOfParticipants()
fetchParticipantsByDOM();