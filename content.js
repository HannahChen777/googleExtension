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
      let abscenteesArray = msg.data[0].result;

      createCheckBoxOfAbscentees();

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

function createCheckBoxOfAbscentees(){
  var contentInDOM = document.getElementsByClassName('content'); //HTMLCollection
  
  let checkbox1 = document.createElement('input');
  checkbox1.type = 'checkbox';
  checkbox1.id = 'abscentee1';

  let label1 = document.createElement('label');
  label1.htmlFor = 'abscentee1';

  let abscentee1 = document.createTextNode('Bello');
  label1.appendChild(abscentee1);
  console.log(label1);

  contentInDOM[0].appendChild(checkbox1);
  contentInDOM[0].appendChild(label1);


  console.log(contentInDOM[0]);

  // for(let i = 0; i < abscenteesArray.length; i++){
  //   var checkbox,[i] = document.createElement('input');

  // }
  // var checkboxInDOM = document.createElement('input');
  // checkboxInDOM.type = 'checkbox';



}

// var checkbox1 = document.createElement('input');
// checkbox1.type = 'checkbox';
// checkbox1.name = 'checkbox1';
// checkbox1.id = 'abscentee1';

// var label1 = document.createElement('label');
// label1.htmlFor = 'abscentee1';

// var checkbox2 = document.createElement('input');
// checkbox2.type = 'checkbox';
// checkbox2.name = 'checkbox2';
// checkbox2.id = 'abscentee2';

// var label2 = document.createElement('label');
// label2.htmlFor = 'abscentee2';
