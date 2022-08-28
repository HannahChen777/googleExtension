console.log("from foreground");

var btnClick = document.getElementById('btn_click');

btnClick.addEventListener('click', function(){
  let portName = { name: "foregroundRequest" };
  let portPassword = { password: 'getAbscentees' };
  connect(portName, portPassword);
});

var connect = (portName, portPassword) => {
  var port = chrome.runtime.connect(portName);
  port.postMessage(portPassword);
  port.onMessage.addListener(async function(msg, sender, sendResponse) {
    console.log('receive message from backend');
    if(msg.status == 'urlIsGoogleMeet'){
      console.log('it works!');
      let abscenteesArray = await msg.data[0].result;

      createCheckBoxOfAbscentees(abscenteesArray);

      //let testHtml = document.all[0].outerHTML;
      //console.log({testHtml: testHtml});
      // let data = await fetchParticipantsByDOM();
      // console.log('you got me');
      // console.log(data);
      //document.getElementById('data').innerText = ;
    }
    else if(msg.status == 'urlNotGoogleMeet'){
      document.getElementById('data').innerText = '這裡不4 google meet耶';
    }
  })
}

function createCheckBoxOfAbscentees(array){

  var contentInDOM = document.getElementsByClassName('content'); //HTMLCollection
  
  for(var i = 0; i < array.length; i++){
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'abscentee' + [i];
    checkbox.checked = 'checked';

    let label = document.createElement('label');
    label.htmlFor = 'abscentee' + [i];

    let abscentee = document.createTextNode(array[i]);
    label.appendChild(abscentee);

    contentInDOM[0].appendChild(checkbox);
    contentInDOM[0].appendChild(label);
    contentInDOM[0].appendChild(document.createElement('br'));
    console.log(contentInDOM[0]);
  }
}

