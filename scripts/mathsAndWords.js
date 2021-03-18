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

alert("Your word is: " + memword);

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
        document.getElementById('calc').innerHTML = "Please spell the new word";
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
function end() {
    var t = 0;
    t = (click_time[10] - click_time[0]
    );

    alert("You made: " + errors + " errors and it took you " + t / 1000 + " seconds");
    if (reverseword){
        alert("You sucesfully recalled the word and reversed it");
    }
    if (!recall){
        alert("You didnt manage to recall the word")
    }
    if (recall && !reverseword){
        alert("You managed to recall the word but couldnt reverse it")
    }

}
// Get the input field
var input = document.getElementById("myInput");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("myBtn").click();
    }
});