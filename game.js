function game(){
    cc.game.onStart = function(){
        //load resources
        var speedX1, speedX2, speedY1, speedY2;
        var size, p1, p2;

        cc.LoaderScene.preload(["p1.png", "p2.png"], function () {
            var makeBlock ;
            var map__;
            var map_layer;
            var MyScene = cc.Scene.extend({
                onEnter:function () {

                    this._super();
                    size = cc.director.getWinSize();
                    p1 = cc.Sprite.create("p1.png");
                    p1.setPosition(size.width / 2, size.height / 2);
                    p1.setScale(0.3);
                    this.addChild(p1, 4);

                    var label = cc.LabelTTF.create("Player1", "Arial", 40);
                    label.setPosition(100, 140);
                    p1.addChild(label, 1);

                    p2 = cc.Sprite.create("p2.png");
                    p2.setPosition(size.width / 2, size.height / 2);
                    p2.setScale(0.3);
                    this.addChild(p2, 4);

                    var label2 = cc.LabelTTF.create("Player2", "Arial", 40);
                    label2.setPosition(100, 140);
                    p2.addChild(label2, 1);

                    var color1= cc.color(255,0,0);
                    var color2 = cc.color(0,255,0);

                    map__ = new Array(Math.ceil(size.width/BLOCK_WIDTH)+10);
                    map_layer = new Array(Math.ceil(size.width/BLOCK_WIDTH)+10);
                    map_layer.fill(new Array(Math.ceil(size.height/BLOCK_HEIGHT)+10));
                    for( let i=0; i<map__.length; i++){
                        map__[i] = new Array(Math.ceil(size.height/BLOCK_HEIGHT)+10);
                        map__[i].fill(0);
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
                        switch( map__[XX][YY ]){
                            case 2: 
                                map__[XX][YY] = 1;
                                addScore2(-1);
                                addScore1(1);
                                map_layer[XX][YY].removeFromParent();
                                block = cc.LayerColor.create(color1, BLOCK_WIDTH, BLOCK_HEIGHT);
                                block.ignoreAnchorPointForPosition(false);
                                block.setPosition(XX*BLOCK_WIDTH,YY*BLOCK_HEIGHT);
                                this.addChild(block);
                                map_layer[XX][YY] = block;
                                break;
                            case 0:
                                map__[XX][YY] = 1;
                                addScore1(1);
                                block = cc.LayerColor.create(color1, BLOCK_WIDTH, BLOCK_HEIGHT);
                                block.ignoreAnchorPointForPosition(false);
                                block.setPosition(XX*BLOCK_WIDTH,YY*BLOCK_HEIGHT);
                                this.addChild(block);
                                map_layer[XX][YY] = block;
                                break;
                            case 1:
                                if( !map_layer[XX][YY] ) {
                                    block = cc.LayerColor.create(color1, BLOCK_WIDTH, BLOCK_HEIGHT);
                                    block.ignoreAnchorPointForPosition(false);
                                    block.setPosition(XX*BLOCK_WIDTH,YY*BLOCK_HEIGHT);
                                    this.addChild(block);
                                    map_layer[XX][YY] = block;
                                }
                        }
                    }

                    makeBlock2 = (XX,YY)=>{
                        if(XX<0 || YY<0) return;
                        let block;
                        switch( map__[XX][YY ]){
                            case 1: 
                                map__[XX][YY] = 2;  
                                addScore1(-1);
                                addScore2(1);
                                map_layer[XX][YY].removeFromParent();
                                block = cc.LayerColor.create(color2, BLOCK_WIDTH, BLOCK_HEIGHT);
                                block.ignoreAnchorPointForPosition(false);
                                block.setPosition(XX*BLOCK_WIDTH,YY*BLOCK_HEIGHT);
                                this.addChild(block);
                                map_layer[XX][YY]=block;
                                break;
                            case 0:
                                map__[XX][YY] = 2;
                                addScore2(1);
                                block = cc.LayerColor.create(color2, BLOCK_WIDTH, BLOCK_HEIGHT);
                                block.ignoreAnchorPointForPosition(false);
                                block.setPosition(XX*BLOCK_WIDTH,YY*BLOCK_HEIGHT);
                                this.addChild(block);
                                map_layer[XX][YY]=block;
                                console.log("MAKE BLOCK 2")
                                break;
                            case 2:
                                if( !map_layer[XX][YY] ) {
                                    block = cc.LayerColor.create(color2, BLOCK_WIDTH, BLOCK_HEIGHT);
                                    block.ignoreAnchorPointForPosition(false);
                                    block.setPosition(XX*BLOCK_WIDTH,YY*BLOCK_HEIGHT);
                                    this.addChild(block);
                                    map_layer[XX][YY] = block;
                                }
                        }
                    }
                    
                    this.scheduleUpdate();
                },
                update:function(){
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
                        //if( map__[XX][YY]!=1)
                            makeBlock1(XX,YY);

                        
                    }
                    if( speedX2 || speedY2 ){
                        this.moveP2();

                        let spriteX = p2.getPosition().x ;
                        let spriteY = p2.getPosition().y ;
                        let XX = Math.round( (spriteX) / BLOCK_WIDTH);
                        let YY = Math.round( (spriteY) / BLOCK_HEIGHT);
                        //if( map__[XX][YY]!=2)
                            makeBlock2(XX,YY);
                        
                    }

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