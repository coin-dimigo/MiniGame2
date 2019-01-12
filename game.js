function game(){
    cc.game.onStart = function(){
        //load resources
        var speedX1, speedX2, speedY1, speedY2;
        var size, p1, p2;

        cc.LoaderScene.preload(["p1.png", "p2.png"], function () {
            var map__;
            var MyScene = cc.Scene.extend({
                onEnter:function () {

                    this._super();
                    size = cc.director.getWinSize();
                    p1 = cc.Sprite.create("p1.png");
                    p1.setPosition(size.width / 2, size.height / 2);
                    p1.setScale(0.6);
                    this.addChild(p1, 4);

                    var label = cc.LabelTTF.create("P1", "Arial", 40);
                    label.setPosition(75, 140);
                    label.setColor( cc.color(0,0,255))
                    p1.addChild(label, 1);

                    p2 = cc.Sprite.create("p2.png");
                    p2.setPosition(size.width / 2, size.height / 2);
                    p2.setScale(0.6);
                    this.addChild(p2, 4);

                    var label2 = cc.LabelTTF.create("P2", "Arial", 40);
                    label2.setPosition(75, 140);
                    label2.setColor( cc.color(255,0,0))
                    p2.addChild(label2, 1);

                    let lenA = Math.ceil(size.width/BLOCK_WIDTH)+10;
                    let lenB = Math.ceil(size.height/BLOCK_HEIGHT)+10;
                    map__ = new Array(lenA);
                    map_layer = new Array(lenA);
                    for( let i=0; i<lenA; i++){
                        map_layer[i] = new Array(lenB);
                        map__[i] = new Array(lenB);
                        for( let j=0; j<lenB; j++) map__[i][j]=0;
                    }

                

                    makeBlock = (XX,YY, color)=>{
                        let block = cc.LayerColor.create(cc.color(color.R,color.G,color.B), BLOCK_WIDTH, BLOCK_HEIGHT);
                        block.ignoreAnchorPointForPosition(false);
                        block.setPosition(XX*BLOCK_WIDTH,YY*BLOCK_HEIGHT);
                        this.addChild(block);
                        return block;
                    }    

                    makeBlock1 = (XX,YY)=>{
                        if(XX<0 || YY<0) return;

                        let block;
                        block = cc.LayerColor.create(color1, BLOCK_WIDTH, BLOCK_HEIGHT);
                        block.ignoreAnchorPointForPosition(false);
                        block.setPosition(XX*BLOCK_WIDTH,YY*BLOCK_HEIGHT);
                        this.addChild(block);
                        switch( map__[XX][YY ]){
                            case 2: 
                                addScore2(-1);
                                if(map_layer[XX][YY])
                                    map_layer[XX][YY].removeFromParent();
                                
                            case 0:
                                addScore1(1);
                                break;
                        }
                        map__[XX][YY] = 1;
                        map_layer[XX][YY] = block;
                    }

                    makeBlock2 = (XX,YY)=>{
                        if(XX<0 || YY<0) return;
                        
                        let block;
                        block = cc.LayerColor.create(color2, BLOCK_WIDTH, BLOCK_HEIGHT);
                        block.ignoreAnchorPointForPosition(false);
                        block.setPosition(XX*BLOCK_WIDTH,YY*BLOCK_HEIGHT);
                        this.addChild(block);
                                
                        switch( map__[XX][YY ]){
                            case 1: 
                                addScore1(-1);
                                if(map_layer[XX][YY])
                                    map_layer[XX][YY].removeFromParent();        
                            case 0:
                                addScore2(1);                                
                                break;
                        }
                        map__[XX][YY] = 2;
                        map_layer[XX][YY] = block;
                    }

                    this.scheduleUpdate();
                },
                update:function(){
                    if( isPlaying == false){
                        if( keyboards.W || keyboards.A || keyboards.S || keyboards.D || keyboards.left || keyboards.up || keyboards.right || keyboards.down){
                            isPlaying = true;
                            this.initF();
                        }
                    }
                    if( isPlaying ){
                        if (keyboards.D) speedX1 = 1;
                        else if (keyboards.A) speedX1 = -1;
                        else speedX1 = 0;

                        if (keyboards.W) speedY1 = 1;
                        else if (keyboards.S) speedY1 = -1;
                        else speedY1 = 0;

                        if (keyboards.right) speedX2 = 1;
                        else if (keyboards.left) speedX2 = -1;
                        else speedX2 = 0;

                        if (keyboards.up) speedY2 = 1;
                        else if (keyboards.down) speedY2 = -1;
                        else speedY2 = 0;

                    

                        if( speedX1 || speedY1 ){
                            this.moveP1();

                            let spriteX = p1.getPosition().x ;
                            let spriteY = p1.getPosition().y ;
                            let XX = Math.round( (spriteX) / BLOCK_WIDTH);
                            let YY = Math.round( (spriteY) / BLOCK_HEIGHT);
                            if( map__[XX][YY]!=1)
                                makeBlock1(XX,YY);

                            
                        }
                        if( speedX2 || speedY2 ){
                            this.moveP2();

                            let spriteX = p2.getPosition().x ;
                            let spriteY = p2.getPosition().y ;
                            let XX = Math.round( (spriteX) / BLOCK_WIDTH);
                            let YY = Math.round( (spriteY) / BLOCK_HEIGHT);
                            if( map__[XX][YY]!=2)
                                makeBlock2(XX,YY);
                            
                        }
                    }
                },

                initF: function(){
                    
                    isPlaying=true;

                    let lenA = Math.ceil(size.width/BLOCK_WIDTH)+10;
                    let lenB = Math.ceil(size.height/BLOCK_HEIGHT)+10;

                    for( let i=0; i<lenA; i++){
                        for( let j=0; j<lenB; j++){
                            if( map_layer[i][j] )
                                map_layer[i][j].removeFromParent();
                        }
                    }

                    map__ = new Array(lenA);
                    map_layer = new Array(lenA);
                    for( let i=0; i<lenA; i++){
                        map_layer[i] = new Array(lenB);
                        map__[i] = new Array(lenB);
                        for( let j=0; j<lenB; j++) map__[i][j]=0;
                    }
                    p1.setPosition(size.width/2, size.height/2);
                    p2.setPosition(size.width/2, size.height/2);
                    addScore1(-score1);
                    addScore2(-score2);
                    lastTime_ = new Date();

                    initUI();

                    setTimeout(()=>{//end
                        isPlaying=false;
                        clearInterval(timeCheck);
                        alert("FINISH");
                        if( score1 > score2 ) alert("player 1 win")
                        else if( score2 > score1 ) alert("player 2 win")
                        else alert("draw")
                    }, 100000);

                    
                },

                moveP1: function(){
                    let spriteX = p1.getPosition().x + speedX1 * SPEED;
                    let spriteY = p1.getPosition().y + speedY1 * SPEED;
                    
                    if( spriteX<20 || spriteX>size.width-40 || spriteY<20 || spriteY>size.height-20){
                        let centerX = size.width/2;
                        let centerY = size.height/2;
                        let XX = (spriteX-centerX)*0.978 + centerX;
                        let YY = (spriteY-centerY)*0.978 + centerY;
                        let sprite_action = cc.MoveTo.create(0.1, cc.p( XX, YY));  
                        p1.runAction(sprite_action) ;
                    }
                    else{
                        sprite_action = cc.MoveBy.create(0.1, cc.p(speedX1 * SPEED, speedY1 * SPEED));
                        p1.runAction(sprite_action);
                    }
                },
                moveP2: function(){
                    let spriteX = p2.getPosition().x + speedX2 * SPEED;
                    let spriteY = p2.getPosition().y + speedY2 * SPEED;
                    
                    if( spriteX<20 || spriteX>size.width-40 || spriteY<20 || spriteY>size.height-20){
                        let centerX = size.width/2;
                        let centerY = size.height/2;
                        let XX = (spriteX-centerX)*0.978 + centerX;
                        let YY = (spriteY-centerY)*0.978 + centerY;
                        let sprite_action = cc.MoveTo.create(0.1, cc.p( XX, YY));  
                        p2.runAction(sprite_action) ;
                    }
                    else{
                        let sprite_action = cc.MoveBy.create(0.1, cc.p(speedX2 * SPEED, speedY2 * SPEED));
                        p2.runAction(sprite_action);
                    }
                }

            });


            cc.director.runScene(new MyScene());
        }, this);
    };
    cc.game.run("gameCanvas");
}