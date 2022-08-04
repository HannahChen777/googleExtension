console.log("from foreground");

var btnClick = document.getElementById('btn_click');

btnClick.addEventListener('click', function(){
  let portName = { name: "foregroundRequest" };
  let portPassword = { password: 'getUrl' };
  connect(portName, portPassword);
});

var connect = (portName, portPassword) => {
  var port = chrome.runtime.connect(portName);
  port.postMessage(portPassword);
  port.onMessage.addListener(async function(msg) {
    console.log('receive message from backend');
    if(msg.status == 'urlIsGoogleMeet'){
      let data = await fetchParticipants();
      console.log('you got me');
      console.log(data);
      //document.getElementById('data').innerText = ;
    }
    else if(msg.status == 'urlNotGoogleMeet'){
      document.getElementById('data').innerText = '這裡不4 google meet耶';
    }
  })
}


//you + participants
//document.querySelector('.m3Uzve .AE8xFb .cxdMu .SKWIhd');

//participant
//document.querySelector('.m3Uzve .AE8xFb .cxdMu .SKWIhd .EY8ABd-OWXEXe-TAWMXe');

function fetchParticipants(){
  var abscentsFromDom = document.querySelectorAll('.m3Uzve .AE8xFb .cxdMu .SKWIhd');
  var abscentees = [];
  abscentsFromDom.forEach(function(item){
      let isStatus = item.querySelector('.EY8ABd-OWXEXe-TAWMXe');
      //'isStatus == null' means yourself
      if(isStatus){
          let statusOfParticipant = isStatus.innerText;
          console.log(statusOfParticipant);
          if(statusOfParticipant == '沒有回覆' || '已接受'){
            let participant = item.querySelector('.zSX24d .jKwXVe .zWGUib').innerText;
            abscentees.push(participant);
          }
      };
  })
  console.log(abscentees);
  return abscentees;
}


//url fetching problem

//backend connect with frontend
