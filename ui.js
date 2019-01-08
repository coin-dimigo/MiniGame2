var a1,a2,a3;
function updateUI(score){
    let str ="";
    let m = 6;
    //a1.innerHTML=`${ (gapTime/60>=10?"":"0")}${Math.floor(gapTime/60)}`;
    for( let gtn=score>0?score:1; gtn>0; gtn=Math.floor(gtn/10)) m--;
    for( ; m>0; m--) str += "0"
    a1.innerHTML = str+score;
}

function updateUI2(score){
    let str ="";
    let m = 6;
    //a1.innerHTML=`${ (gapTime/60>=10?"":"0")}${Math.floor(gapTime/60)}`;
    for( let gtn=score>0?score:1; gtn>0; gtn=Math.floor(gtn/10)) m--;
    for( ; m>0; m--) str += "0"
    a2.innerHTML = str+score;
}

function addScore1( n ){
    score1 += n;
    updateUI(score1);
}

function addScore2( n ){
    score2 += n;
    updateUI2(score2);
}

function initUI(){
    a1 = document.getElementById("score1");
    a2 = document.getElementById("score2");
    score1 = score2 = 0;
}