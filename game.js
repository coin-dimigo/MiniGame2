function game(){
    cc.game.onStart = function(){
        //load resources
        var speedX1, speedX2, speedY1, speedY2;
        var size, p1, p2;

        cc.LoaderScene.preload(["p1.png", "p2.png"], function () {
            var makeBlock ;
            var map__;
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

                    map__ = new Array(Math.ceil(size.width/BLOCK_WIDTH));
                    for( let i=0; i<map__.length; i++){
                        map__[i] = new Array(Math.ceil(size.height/BLOCK_HEIGHT));
                        map__.fill(0);
                    }
                    

                    makeBlock1 = (XX,YY)=>{
                        if( map__[XX][YY] == 2 )addScore2(-1);
                        if( map__[XX][YY] != 1 ) addScore1(1);
                        map__[XX][YY]=1;
                        let block = cc.LayerColor.create(cc.color(255,0,0), BLOCK_WIDTH, BLOCK_HEIGHT);
                        block.ignoreAnchorPointForPosition(false);
                        block.setPosition(XX*BLOCK_WIDTH,YY*BLOCK_HEIGHT);
                        this.addChild(block,1);
                    }

                    makeBlock2 = (XX,YY)=>{
                        if( map__[XX][YY] == 1 )addScore1(-1);
                        if( map__[XX][YY] != 2 ) addScore2(1);
                        map__[XX][YY]=2;
                        let block = cc.LayerColor.create(cc.color(0,255,0), BLOCK_WIDTH, BLOCK_HEIGHT);
                        block.ignoreAnchorPointForPosition(false);
                        block.setPosition(XX*BLOCK_WIDTH,YY*BLOCK_HEIGHT);
                        this.addChild(block,1);
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

                        let spriteX = p1.getPosition().x + speedX1 * SPEED;
                        let spriteY = p1.getPosition().y + speedY1 * SPEED;
                        let XX = Math.round( (spriteX) / BLOCK_WIDTH);
                        let YY = Math.round( (spriteY) / BLOCK_HEIGHT);
                        let XX1 = Math.floor( spriteX/BLOCK_WIDTH) ;
                        let XX2 = Math.ceil(spriteX/BLOCK_WIDTH);
                        let YY1 = Math.floor( spriteY/BLOCK_HEIGHT);
                        let YY2 = Math.ceil(spriteY/BLOCK_HEIGHT);

                        for( let i=XX1; i<=XX2; i++){
                            for( let j=YY1; j<=YY2; j++){
                                makeBlock1(i,j);
                            }
                        }

                        
                    }
                    if( speedX2 || speedY2 ){
                        this.moveP2();

                        let spriteX = p2.getPosition().x + speedX1 * SPEED;
                        let spriteY = p2.getPosition().y + speedY1 * SPEED;
                        let XX = Math.round( (spriteX) / BLOCK_WIDTH);
                        let YY = Math.round( (spriteY) / BLOCK_HEIGHT);
                        let XX1 = Math.floor( spriteX/BLOCK_WIDTH) ;
                        let XX2 = Math.ceil(spriteX/BLOCK_WIDTH);
                        let YY1 = Math.floor( spriteY/BLOCK_HEIGHT);
                        let YY2 = Math.ceil(spriteY/BLOCK_HEIGHT);

                        for( let i=XX1; i<=XX2; i++){
                            for( let j=YY1; j<=YY2; j++){
                                makeBlock2(i,j);
                            }
                        }
                    }

                },
                moveP1: function(){
                    
                    sprite_action = cc.MoveBy.create(0.1, cc.p(speedX1 * SPEED, speedY1 * SPEED));
                    p1.runAction(sprite_action);

                },
                moveP2: function(){
                    sprite_action = cc.MoveBy.create(0.1, cc.p(speedX2 * SPEED, speedY2 * SPEED));
                    p2.runAction(sprite_action);
                }

            });


            cc.director.runScene(new MyScene());
        }, this);
    };
    cc.game.run("gameCanvas");
}