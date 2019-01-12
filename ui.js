var a1,a2,a3;
function updateUI(score){
    let str ="";
    let m = 3;
    //a1.innerHTML=`${ (gapTime/60>=10?"":"0")}${Math.floor(gapTime/60)}`;
    for( let gtn=score>0?score:1; gtn>0; gtn=Math.floor(gtn/10)) m--;
    for( ; m>0; m--) str += "0"
    a1.innerHTML = str+score;
}

function updateUI2(score){
    let str ="";
    let m = 3;
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

function timeCheck(){
    let currentTime = new Date();
    let gapTime = Math.floor( 100-(currentTime.getTime() - lastTime_.getTime()) / 1000);
    a3.innerHTML = gapTime;
}

function initUI(){
    color_ = {
        R: Math.floor(Math.random()*255),
        G: 30,
        B: Math.floor(Math.random()*255)
    }

    color1= cc.color(color_.R,color_.G,color_.B);
    color2 = cc.color(255-color_.R, 255-color_.G, 255-color_.B);

    console.log("UI inited")
    lastTime_ = new Date();
    a1.style = `background-color: #${ color_.R.toString(16)}${ color_.G.toString(16)}${ color_.B.toString(16)}`
    a2.style = `background-color: #${ (255-color_.R).toString(16)}${ (255-color_.G).toString(16)}${ (255-color_.B).toString(16)}`
    score1 = score2 = 0;
    setInterval(timeCheck, 500);
}
