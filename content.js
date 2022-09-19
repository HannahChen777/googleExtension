console.log("from foreground");
console.log({foreground_pathname: location.host});

var btnStartClick = document.getElementById('btn_click_start');
var btnSlackClick = document.getElementById('btn_click_slack');

const portName = { name: "foregroundRequest" };
btnStartClick.addEventListener('click', function(){
  let portPassword = { password: 'getAbscentees' };
  connect(portName, portPassword);
});

btnSlackClick.addEventListener('click', function(){
  let portPassword = { password: 'sendMessageToSlack' };
  connect(portName, portPassword);
})

var connect = (portName, portPassword) => {
  var port = chrome.runtime.connect(portName);
  port.postMessage(portPassword);
  port.onMessage.addListener(async function(msg, sender, sendResponse) {
    console.log('receive message from backend');
    if(msg.status == 'urlIsGoogleMeet'){
      console.log('it works!');
      let abscenteesArray = await msg.data[0].result;

      createCheckBoxOfAbscentees(abscenteesArray);
      showBtnSlack();
    }
    else if(msg.status == 'urlNotGoogleMeet'){
      document.getElementById('data').innerText = '這裡不4 google meet耶';
    }
  })
}

function showBtnSlack(){
  let attributesOfBtnSlack = document.getElementById('btn_click_slack');
  attributesOfBtnSlack.style.display = 'inline-block';
  console.log('HiiiBtnSlack');
  console.log(attributesOfBtnSlack.style.display);
}

function createCheckBoxOfAbscentees(array){

  if(!array || array == [])
  return;
  
  var contentInDOM = document.getElementsByClassName('content'); //HTMLCollection
  
  let isForm = document.getElementById('form') || '';
  console.log({isForm: isForm});

  if(isForm){
    contentInDOM[0].removeChild(isForm);
    console.log({contentInDOM: contentInDOM[0]});
  }
  
  let form = document.createElement('form');
  form.id = 'form';

  for(var i = 0; i < array.length; i++){
    let checkbox = document.createElement('input');

    checkbox.type = 'checkbox';
    checkbox.id = 'abscentee' + [i];
    checkbox.checked = 'checked';

    let label = document.createElement('label');
    label.htmlFor = 'abscentee' + [i];

    let abscentee = document.createTextNode(array[i]);
    label.appendChild(abscentee);

    form.appendChild(checkbox);
    form.appendChild(label);
    form.appendChild(document.createElement('br'));

    contentInDOM[0].appendChild(form);
    console.log(contentInDOM[0]);
  }
}

