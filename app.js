var scores, roundScore, activePlayer, isPlaying, oldTurns, maxScore;

reset();


document.querySelector('.btn-roll').addEventListener('click', function() {
    if (isPlaying) {
        var dice = Math.ceil(Math.random()*6);
        var dice2 = Math.ceil(Math.random()*6);

        var diceDOM = document.querySelectorAll('.dice');

        diceDOM[0].style.display = 'block';
        diceDOM[1].style.display = 'block';
        diceDOM[0].src = 'img/dice-'+dice+'.png';
        diceDOM[1].src = 'img/dice-'+dice2+'.png';
        //diceDOM.setAttribute('src', 'img/dice-'+dice+'.png');
        console.log(dice + '-' + dice2);

        if ((dice==6 || dice2==6) && (oldTurns[0]==6 || oldTurns[1]==6)) {
            scores[activePlayer]=0;
            document.querySelector('#score-'+activePlayer).textContent = 0;
            switchPlayer();
        } else if (dice > 1 && dice2 > 1) {
            roundScore += (dice+dice2);
            document.querySelector('#current-' + activePlayer).textContent=roundScore;
            oldTurns[0]=dice;
            oldTurns[1]=dice2;
        } else {
            switchPlayer();
        }
    }/* else {
        reset();
    }*/
    
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (isPlaying) {
        scores[activePlayer]+=roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('#maxScore');
        if(input.value) {
            maxScore = input.value;
        } else {
            maxScore = 100;
            input.value = 100;
        }
        

        if (scores[activePlayer]>=maxScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!!';
            document.querySelector('.dice').style.display = 'none';
    
            var activeDOM = document.querySelector('.player-' + activePlayer + '-panel');
            activeDOM.classList.remove('active');
            activeDOM.classList.add('winner');
            isPlaying=false;  
        } else {
            switchPlayer();
        }
    } /*else {
        reset();
    }*/
});

document.querySelector('.btn-new').addEventListener('click', reset);

function switchPlayer() {
    roundScore=0;
    oldTurn=0;
    activePlayer^=1;
    document.querySelector('#current-0').textContent=0
    document.querySelector('#current-1').textContent=0
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    var diceDOM = document.querySelectorAll('.dice');
    diceDOM[0].style.display = 'none';
    diceDOM[1].style.display = 'none';
}

function reset() {
    scores = [0, 0];
    oldTurns = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    isPlaying=true;

    //document.querySelector('.dice').style.display = 'none';

    document.querySelector('#current-0').textContent=0
    document.querySelector('#current-1').textContent=0
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    
}
