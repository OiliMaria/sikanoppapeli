document.getElementById('addplayer').addEventListener('submit', addPlayer);
document.getElementById('start').addEventListener('submit', startGame);

const players = [];
const scores = [];
const dice = [0, 0];
let targetScore = 0;
let streak = 0;
let turn = 1;
let gameVictory = false;
let tuplat = 0;
let playing = false;

function addPlayer(event) {
    event.preventDefault()
    let x = 1;
    players.push(document.getElementById("add").value);
    scores.push(0);
    let text = "<ul>";
    players.forEach(spare);
    text += "</ul>";
    document.getElementById("board").innerHTML = text;

    function spare(value) {
        text += "<li id=" + x + ">" + value + "</li>";
        x += 1;
    }
}

function startGame(event) {
    event.preventDefault()
    if (document.getElementById("score").value < 100) {
        document.getElementById("controlAlert").innerHTML = "Pisteraja tulee olla vähintään 100";
    } else {
        document.getElementById("controlAlert").innerHTML = "";

        if (players.length >= 2) {
            let a = document.getElementById("control");
            let board = document.getElementById("peli");
            a.style.display = "none";
            board.style.display = "block";

            targetScore = document.getElementById("score").value;
            document.getElementById("vuoro").innerHTML = "Aloitetaan peli!" + "<br>" + players[turn - 1] + " aloittaa" +"<br>"
            playing = true;
        }else {
            document.getElementById("controlAlert").innerHTML = "Pelaajia pitää olla vähintään 2";
        }
    }
}

function endTurn(i) {

    if (i != 2) {
        scores[turn - 1] = scores[turn - 1] + streak;
        if (scores[turn - 1] >= targetScore && gameVictory == false) {
            document.getElementById("gameAlert").innerHTML = players[turn - 1] + " voitti pelin!";
            gameVictory = true;
            playing = false;

        }  
     }

     document.getElementById(turn).innerHTML = players[turn - 1] + ": " + scores[turn - 1];
     if (turn < players.length) {
        turn += 1;
     } else {
        turn = 1;
     }
     tuplat = 0;
     streak = 0;
     document.getElementById("vuoro").innerHTML = players[turn - 1] + " heittää noppaa"

    }

    function roll() {
        if (!playing) return;
        let i = 100;
        while (i != 102) {
            let d = Math.floor(Math.random()* 6) + 1;
            if (d === 1) {
                document.getElementById(i).src="dice_1.png"
                dice[i-100] = 1;
            } else if (d === 2) {
            document.getElementById(i).src="dice_2.png"
            dice[i-100] = 2;
         } else if (d === 3) {
            document.getElementById(i).src="dice_3.png"
            dice[i-100] = 3;
        } else if (d === 4) {
            document.getElementById(i).src="dice_4.png"
            dice[i-100] = 4;
        } else if (d === 5) {
            document.getElementById(i).src="dice_5.png"
            dice[i-100] = 5;
        } else { 
            document.getElementById(i).src="dice_6.png"
            dice[i-100] = 6;
        }
        i++;
    }

    if (dice[0] == 1 && dice[1] != 1) {
        document.getElementById("gameAlert").innerHTML = players[turn - 1] + " heitti ykkösen, vuoro vaihtuu";
        endTurn(2);
    } else if (dice[1] == 1 && dice[0] != 1) {
        document.getElementById("gameAlert").innerHTML = players[turn - 1] + " heitti ykkösen, vuoro vaihtuu";
        endTurn(2);
    } else if (2 == dice[0] + dice[1]) {
        streak += 25;
        tuplat++;
    } else {
        document.getElementById("gameAlert").innerHTML = "";
        streak += dice[0] + dice[1];
        if (dice[0] == dice[1]) {
            tuplat++;
            streak += streak;
        }
    }
        
    if (tuplat >= 3) {
        document.getElementById("gameAlert").innerHTML = players[turn - 1] + " heitti tuplat 3 kertaa, vuoro vaihtuu";
        endTurn(2);
    }

    document.getElementById(turn).innerHTML = players[turn - 1] + ": " + scores[turn - 1] + " (+" + streak + ")"
    ones = 0;
}
