var values = [[], []];
var results = [];
var errors = -1;
var score = 0;
var input = 0;
var click_time = [];
var time = 0;
const timestep = 10;
var error = 0;
var words = ["world", "about", "again", "heart", "pizza", "water", "happy", "sixty"];
var recall = false;
var reverseword = false;
var init_click = true;
setInterval(update_time, timestep);
var memword = words[Math.floor(Math.random() * 7)];
var reverse = memword.split("").reverse().join("");


const timer = ms => new Promise(res => setTimeout(res, ms));

const displayAlert = async (alertText, alertTime, init=false) => {
    const promptIns = document.getElementById("promptIns");
    const formCard = document.getElementById("formCard");
    const alertCard = document.getElementById("alertCard");
    const initPrompt = document.getElementById("initPrompt");

    // toggle init text logic
    if(init){
        initPrompt.classList.remove("hidden");
        initPrompt.classList.add("block");
    }else{
        if(initPrompt.classList.contains("block")){
            initPrompt.classList.remove("block");
        }

        if(!initPrompt.classList.contains("hidden")){
            initPrompt.classList.add("hidden");
        }
    }

    const hidden_z = "z-0";
    const active_z = "z-10";
    
    console.log("test: " + alertText)
    promptIns.innerHTML = alertText;

    // display alert boxW
    formCard.classList.remove(active_z);
    formCard.classList.add(hidden_z);

    alertCard.classList.remove(hidden_z);
    alertCard.classList.add(active_z);

    // use as setTimout is non blocking
     
     await timer(alertTime);

    // wait for n times
    formCard.classList.remove(hidden_z);
    formCard.classList.add(active_z);

    alertCard.classList.remove(active_z);
    alertCard.classList.add(hidden_z);

}
displayAlert("Your word is: " + memword, 4000, true);

for (j = 0; j < 2; j++) {
    for (i = 0; i < 10; i++) {
        values[j][i] = Math.floor(Math.random() * 30 + 1);

    }
}
for (i = 0; i < 9; i++) {
    results[i] = (values[0][i] - values[1][i]);
    // document.write(results[i] + " ");
}
function buttonClick() {
    var anim = "fade-animation";

    // change styling after started
    if(init_click){
        $('#myInput').removeAttr("placeholder");
        $('#myBtn').text("SUBMIT");
        init_click = false;
    }

    // reapply anim styling if previously animated
    if($('#calc').hasClass(anim)){
        var el     = $('#calc'),  
        newone = el.clone(true);   
        el.before(newone);  
        $("." + el.attr("class") + ":last").remove();
    }

    $('#calc').addClass("fade-animation");

    click_time.push(time)
    if (score < 10) {
        input = parseInt(document.getElementById('myInput').value)
        document.getElementById('myInput').value = "";
        $('#calc').text(values[0][score] + "-" + values[1][score]);
        

        if (results[score - 1] != input) {
            errors += 1;
        }
    }
    if (score == 10) {
        document.getElementById('calc').innerHTML = "Please spell the word";
    }
    if (score == 11) {
        input = (document.getElementById('myInput').value)
        document.getElementById('myInput').value = "";
        if (input === memword) {
            recall = true;
        }
        else {
            end()
        }

        document.getElementById('calc').innerHTML = "Please now type the word backwards";
    }
    if (score == 12) {
        input = (document.getElementById('myInput').value)
        document.getElementById('myInput').value = "";
        if (input === reverse) {
            reverseword = true;
        }
        end()
    }
    score += 1;
}

function update_time() {
    time += timestep;
}
const end = async() => {
    var t = 0;
    var alertText = '';

    var alertTime = 3000;
    t = (click_time[10] - click_time[0]
    );

    alertText = "You made: " + errors + " errors and it took you " + t / 1000 + " seconds.\n";

    if (reverseword){
        alertText += "You sucesfully recalled the word and reversed it";
        console.log("in reverseword: " + alertText);
        
    }
    if (!recall){
        alertText += "You didnt manage to recall the word";
        console.log("in idiot: " + alertText);
    }
    if (recall && !reverseword){
        alertText += "You managed to recall the word but couldnt reverse it";
        console.log("in non reverseword: " + alertText);
    }

    displayAlert(alertText, alertTime);
    await timer(alertTime);
    
    location.reload();
}
