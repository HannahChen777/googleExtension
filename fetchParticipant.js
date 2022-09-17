//you + participants
//document.querySelector('.m3Uzve .AE8xFb .cxdMu .SKWIhd');

//participant
//document.querySelector('.m3Uzve .AE8xFb .cxdMu .SKWIhd .EY8ABd-OWXEXe-TAWMXe');

function clickBtnOfParticipants(){
    console.log('clickBtnOfParticipants');

    //judge if btn of showing all participants is existed
    let btns = document.getElementsByClassName('VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ JsuyRc boDUxc') || '';
    if(!btns){
        alert('can\'t find button of showParticipants');
        return false;
    }

    let isBox = document.querySelector('.WUFI9b');  // to get the whole box of btnParticipants

    // to judge if the box of showing all participants is turned on  //true: closed; false: opened
    if(isBox == null || isBox.classList.contains('qdulke')){ 
        btns[1].click();
        return true;
    }
}

function fetchParticipantsByDOM(){
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
            abscentees.push(participant);
        };
    })
    console.log(abscentees);
    return abscentees;
}

async function main(){
    //need to revise next time
    let isBtn = await clickBtnOfParticipants();
    let abscentees = fetchParticipantsByDOM();
    return abscentees;
}

main();