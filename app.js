var rollCall = function(){
    var standUpRoll = function(){
        Array.prototype.diff = function(arr2) { return this.filter(x => !arr2.includes(x)); }
        var shouldBeHere = [
            "Alfonso ho",
            "Anna Liu",
            "Bagel Kam",
            "Bonnie Chen",
            "Cadence Sun",
            "Catherine Jhang",
            "Cindy Chen",
            "Clara Hsieh",
            "Darrell Wang",
            "Ellen Lin",
            "Gina Chou",
            "Hazel Wang",
            "Howard Hung",
            "Jia Ruei (Gary) Chang",
            "Kyle Huang",
            "Luo-Hsuan (Michelle) Ho",
            "Reeki Hsu",
            "Rita Huang",
            "Sara Chen",
            "Veronica Chen",
            "Vina Chen",
            "Wayne Tsai",
            "Yang Lin",
            "Ellie Wang",
            "Jimmy Chiu",
            "Hannah Chen",
            "Yolanda Pai",
            "Hua Liu",
            "Jerry Chen"
        ]
        var listItems = document.querySelectorAll("div[role='listitem']") || false;
        if(listItems.length == 0){
            console.log("%cPlease open your list on the right side"  , "font-size:1.25rem;color:yellow;background-color:black")
            return false;
        }
        
        var partNames = [];
        var spanSelector = "span.zWGUib";

        var checkListSpan = listItems[0].querySelector(spanSelector);
        if(checkListSpan){
            listItems.forEach(function(listItem){
                var partName = listItem.querySelector(spanSelector).innerText;
                partNames.push(partName)
            });
        }else{
            console.log("%c 找達瑞或 SE 幫你修", "font-size:1.25rem;color:red;background-color:yellow")
            console.log("spanSelector is not working. Please change");
        }

        var uniqueItems = [...new Set(partNames.sort())]

        var ourMissingPeople = shouldBeHere.diff(uniqueItems) || [];
        var whyAreYouHere = uniqueItems.diff(shouldBeHere) || [];
        if(ourMissingPeople.length > 0){
            console.log("Here is our missing people");
            ourMissingPeople.forEach(function(person){
                console.log("%c" + person , "font-size:1.25rem;color:white;background-color:black")
            })
            console.log("-".repeat(100));
            console.log("%cMissing " + ourMissingPeople.length + " people", "font-size:1.25rem;color:white;background-color:black")
        }else{
            console.log("Everyone is here");
        }
        if(whyAreYouHere.length > 0){
            console.log("Here is new to us");
            whyAreYouHere.forEach(function(person){
                console.log("%c" + person , "font-size:1.25rem;color:red;background-color:yellow")
            })
        }
    }
    
    var startRoll = function(){
      var intervalId = window.setInterval(function(){
        console.clear();
        standUpRoll();
      }, 3000);
      window.tw_ematic_roll_id = intervalId;
    }
    
    var endRoll = function(){
      if( window.tw_ematic_roll_id){
        window.clearInterval( window.tw_ematic_roll_id);
      }
    }
    
    window.點名 = standUpRoll;
    window.開始點名 = startRoll;
    window.結束點名 = endRoll;
}