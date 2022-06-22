// // entry file for css

const { setTimeout } = require("core-js");

// import {func} from './scripts/anotherJSfile';


// func();

window.addEventListener('DOMContentLoaded', () =>{

    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');

    
    canvas.width = innerWidth - 50;
    canvas.height = innerHeight - 40;
    
    ctx.fillStyle = "#288BA8";
    ctx.fillRect(0,0, canvas.width, canvas.height);

    // const gravity = .2

    ctx.fillStyle = "black";
    ctx.fillRect(1, 1, 1023, 2);
    
    class Border {
        constructor(position){
            this.position
        }
        draw(){
            ctx.fillStyle = 'black'
            ctx.fillRect(0, 288, 1024, 2);
        }

    }

    const movableArea = new Border({
        x:288,
        y:2
    })
    
        
        class Background {
            constructor({position, imageSrc, scale = 1 }){
                this.position = position
                this.width = 50
                this.height = 100
                this.image = new Image()
                this.image.src = imageSrc
                this.scale = scale
        
            }
           
    
            draw(){
                ctx.drawImage(this.image, 
                    this.position.x, 
                    this.position.y,
                    this.image.width * this.scale, 
                    this.image.height * this.scale
                )
            }
    
            update(){
                this.draw()
            }
        }

    class Sprite {
        constructor({position, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 }  }){
            this.position = position
            this.width = 50
            this.height = 100
            this.image = new Image()
            this.image.src = imageSrc
            this.scale = scale
            this.framesMax = framesMax
            this.framesCurrent = 0
            this.framesElapsed = 0
            this.framesHold = 5
            this.offset = offset
    
        }
       

        draw(){
            ctx.drawImage(
                this.image, 
                this.framesCurrent * (this.image.width/ this.framesMax),
                0,
                this.image.width / this.framesMax, 
                this.image.height,
                this.position.x - this.offset.x, 
                this.position.y - this.offset.y,
                (this.image.width / this.framesMax) * this.scale, 
                this.image.height * this.scale
                )
        }

        animateFrames(){

            this.framesElapsed++
                if(this.framesElapsed % this.framesHold === 0) {
                    if(this.framesCurrent < this.framesMax - 1){
                        this.framesCurrent++
                    } else {
                        this.framesCurrent = 0
                    }
    
                }
        }
        

        update(){
            this.draw()
            this.animateFrames()

        }

    }
    
    
    


    //
    //
    //
    class Fighter extends Sprite {
        constructor({
            position, 
            velocity, 
            color = 'red',  
            imageSrc, 
            scale = 1, 
            framesMax = 1,
            offset = { x: 0, y: 0},
            sprites
            

        }){
            super({
                position,
                imageSrc,
                scale,
                framesMax,
                offset
            })
            this.velocity = velocity
            this.color = color
            this.width = 50
            this.height = 100
            this.lastKey
            this.framesCurrent = 0
            this.framesElapsed = 0
            this.framesHold = 7
            this.attackBox = {
                position: {
                    x: this.position.x,
                    y: this.position.y
                },
                offset: offset,
                width: 200,
                height: 70
                
            }
            this.isAttacking
            this.health = 100
            this.isDashing
            this.sprites = sprites

            for( const sprite in this.sprites){
                sprites[sprite].image = new Image()
                sprites[sprite].image.src = sprites[sprite].imageSrc
            }
            
            console.log(this.sprites)

        }
        
       

        // draw(){
        //     ctx.fillStyle = this.color
        //     ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        //     //attack box is drawn
            
        //     if(this.isAttacking) {
        //         ctx.fillStyle = "#B883E7"
        //         ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        //     } 
       

        // }
        
        
        update(){
            this.draw()
            this.animateFrames()
            this.attackBox.position.x = this.position.x - this.attackBox.offset.x
            this.attackBox.position.y = this.position.y
            // ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
            // if(this.position.y + this.height + this.velocity.y >= canvas.height){
            //     this.velocity.y = 0
            // }
        }

        attack(){
            this.switchSprite('attack1')
            this.isAttacking = true
            setTimeout(() =>{
                this.isAttacking = false 
            },3000)

        }
        shooting(){
            this.switchSprite('attack1')
            this.isShooting = true
            setTimeout(() =>{
                this.isAttacking = false 
            },3000)
        }

        dash(){
            this.isDashing = true 
        }

        switchSprite(sprite){
            if( this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax - 1) return
            switch (sprite) {
                case 'idle':
                    if(this.image !== this.sprites.idle.image){
                        this.image = this.sprites.idle.image
                        this.framesMax = this.sprites.idle.framesMax
                        this.framesCurrent = 0
                        
                    }
                break
                case 'run':
                    if(this.image !== this.sprites.run.image){
                        this.image = this.sprites.run.image
                        this.framesMax = this.sprites.run.framesMax
                        this.framesCurrent = 0

                    }
                break
                case 'attack1':
                    if(this.image !== this.sprites.attack1.image){
                        this.image = this.sprites.attack1.image
                        this.framesMax = this.sprites.attack1.framesMax
                        this.framesCurrent = 0

                    }
                break

            }
        }

        // dashAttack(){
        //     this.isAttacking = true
        //     setTimeout(() =>{
        //         this.isAttacking = false 
        //     },300)
        // }

        

        
    }


    class Projectile {
        constructor({position, velocity, color , offset}){
            this.position = position
            this.velocity = velocity
            this.color = '#939393'
            this.width = 70
            this.height = 20

        }
       

        draw(){
            ctx.fillStyle = this.color
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

            ctx.fillStyle = this.color
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        }
        
        update(){
            this.draw()
            this.position.x += 17
            this.position.y += this.velocity.y
        }



        
    }

    class MovingBackgrounds {
        constructor({position, velocity,imageSrc, scale = 1 }){
            this.position = position
            this.velocity = velocity
            this.width = 50
            this.height = 100
            this.image = new Image()
            this.image.src = imageSrc
            this.scale = scale

        }
       

        draw(){
            ctx.drawImage(this.image, 
                this.position.x, 
                this.position.y,
                this.image.width * this.scale, 
                this.image.height * this.scale 
            )

        }
        
        update(){
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
            if(this.position.x < -1000){
                this.position.x = 800
            }
        }



        
    }




  

    const boaBg = new Sprite({
        position: {
            x: 200,
            y: 260
        },
        imageSrc: './img/one_piece_sprites/boafinal.png',
        scale: 1.5,
        framesMax: 5.07

    
    })

    const background = new Background({
        position: {
            x: 0,
            y: 0
        },
        imageSrc: './img/game_background_1/layers/sky.png',
        scale: .325
    })
    const background2 = new Background({
        position: {
            x: 600,
            y: 0
        },
        imageSrc: './img/game_background_1/layers/sky.png',
        scale: .325
    })

    const background3 = new Background({
        position: {
            x: 900,
            y: 0
        },
        imageSrc: './img/game_background_1/layers/sky.png',
        scale: .325
    })
    const cloud1 = new Background({
        position: {
            x: 0,
            y: 0
        },
        imageSrc: './img/game_background_1/layers/clouds_1.png',
        scale: 1
    })
    const rock1 = new Background({
        position: {
            x: 0,
            y: -380
        },
        imageSrc: './img/game_background_1/layers/rocks_1.png',
        scale: 1
    })
    const cloud2 = new MovingBackgrounds({
        position: {
            x: 800,
            y: 0
        },
        velocity:{
            x: -.3,
            y: 0
        },
        imageSrc: './img/game_background_1/layers/clouds_2.png',
        scale: .5

    })

    const cloud3 = new MovingBackgrounds({
        position: {
            x: 700,
            y: 0
        },
        velocity:{
            x: -.9,
            y: 0
        },
        imageSrc: './img/game_background_1/layers/clouds_3.png',
        scale: .5

    })
    const cloud4 = new MovingBackgrounds({
        position: {
            x: 50,
            y: -120
        },
        velocity:{
            x: -.8,
            y: 0
        },
        imageSrc: './img/game_background_1/layers/clouds_3.png',
        scale: .6

    })

    const cloud5 = new MovingBackgrounds({
        position: {
            x: 50,
            y: -100
        },
        velocity:{
            x: -.9,
            y: 0
        },
        imageSrc: 'img/game_background_1/layers/clouds_4.png',
        scale: .6

    })
    const cloud6 = new MovingBackgrounds({
        position: {
            x: -150,
            y: 10
        },
        velocity:{
            x: -1.3,
            y: 0
        },
        imageSrc: 'img/game_background_1/layers/clouds_4.png',
        scale: .6

    })
    const cloud7 = new MovingBackgrounds({
        position: {
            x: 800,
            y: -200
        },
        velocity:{
            x: -1.5,
            // x: -.3,
            y: 0
        },
        imageSrc: './img/game_background_1/layers/clouds_2.png',
        // scale: .5,
        scale: .9

    })

    




    
    
    const player = new Fighter({
        position: {
            x: 50,
            y: 330
        },
        velocity: {
            x: 0,
            y: 10
        },
        offset: {
            x: 0,
            y: 0
        },
        framesMax: 4,
        scale: 1.5,
        offset: {
            x: 0,
            y: 0
        },
        sprites: {
            idle: {
                imageSrc: './img/one_piece_sprites/ussop_idle.png',
                // scale:2,
                framesMax: 4
            },
            run: {
                imageSrc: './img/one_piece_sprites/ussop_run.png',
                framesMax: 8,
            },
            attack1: {
                imageSrc: './img/one_piece_sprites/ussop_attack.png',
                framesMax: 6
            }

        }
        // scale: 2.5,
     
        
    })
    const shoot = new Projectile({
        position: {
            x: player.position.x,
            y: player.position.y
        },
        velocity: {
            x: 0,
            y: 0
        },
        offset: {
            x: 0,
            y: 0
        }
    })

    const shoots = []

    // player.draw();
    
    const enemy = new Fighter({
        position: {
            x: 924,
            y: 330
        },
        velocity: {
            x: 0,
            y: 10
        },
        color: 'green',
        offset: {
            x: 30,
            y: 0

        },
        framesMax: 4,
        scale: 1.5,
        offset: {
            x: 0,
            y: 0
        },
        sprites: {
            idle: {
                imageSrc: './img/one_piece_sprites/luffy-flipped (5) (1).png',
                // scale:2,
                framesMax: 6,
            },
            run: {
                imageSrc: './img/one_piece_sprites/luffy_flipped_run.png',
                framesMax: 8,
            },
            attack1: {
                imageSrc: './img/one_piece_sprites/luffy_flipped_attack1.png',
                framesMax: 5
            }

        }
        
    })

    enemy.draw();
    
    console.log(player);

    const keys ={
        a: {
            pressed: false
        },
        d: {
            pressed: false 
        },
        w: {
            pressed: false
        },
        s: {
            pressed: false 
        },
        f: {
            pressed: false
        },
        g: {
            pressed: false
        },
        h: {
            pressed: false
        },
        ArrowUp: {
            pressed: false
        },
        ArrowDown: {
            pressed: false 
        },
        ArrowRight: {
            pressed: false
        },
        ArrowLeft: {
            pressed: false 
        }
    }

    let lastKey

    function rectangularCollision({rectangle1, rectangle2}){
        return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && 
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
        )
    }

    function projectileCollision({rectangle1, rectangle2}){
        return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y && 
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height
        )
    }

    function determineWinner({player, enemy, timerId}){
        clearTimeout(timerId)
        document.querySelector('#displayText').style.display = "flex"
        if(player.health === enemy.health){
            document.querySelector('#displayText').innerHTML = 'TIE GAME'
            console.log('tie')
        } else if(player.health > enemy.health){
            document.querySelector('#displayText').innerHTML = "Player 1 Wins!"
        } else if(enemy.health > player.health){
            document.querySelector('#displayText').innerHTML = "Player 2 Wins!"
        } 

    }

    let timer = 60
    let timerId
    function decreaseTimer(){
        
        if(timer > 0 ) {
            timerId = setTimeout(decreaseTimer, 1000)
            timer--
            document.querySelector('#timer').innerHTML = timer
        }

        if(timer === 0){
            determineWinner({player, enemy, timerId })
        }
    }
    decreaseTimer()
    
    function animate(){
        window.requestAnimationFrame(animate)
        ctx.fillStyle ='#C4E3E7'
        ctx.fillRect(0,0, canvas.width, canvas.height)
        ctx.fillStyle = "#5D8C92";
        ctx.fillRect(0, 350, canvas.width, 325);
        rock1.update();
        ctx.fillStyle = "#916C18";
        ctx.fillRect(0, 370, canvas.width, 20);
        ctx.fillStyle = "#694A04";
        ctx.fillRect(0, 370, canvas.width, 2);
        ctx.fillStyle = "#F8D586";
        ctx.fillRect(0, 380, canvas.width, .4);
        ctx.fillStyle = "#694A04" ;
        ctx.fillRect(0, 390, canvas.width, 2);
        ctx.fillStyle = "#916C18";
        ctx.fillRect(0, 620, canvas.width, 30);
        ctx.fillStyle = "#694A04";
        ctx.fillRect(0, 620, canvas.width, 2);
        ctx.fillStyle = "#F8D586";
        ctx.fillRect(0, 635, canvas.width, .6);
        
        ctx.fillStyle = "#694A04";
        ctx.fillRect(0, 650, canvas.width, 2);
        
        
        background.update();
        background2.update();
        background3.update();
        cloud5.update();
        cloud2.update();
        cloud4.update();
        cloud7.update();
        cloud1.update();
        // shoot.update()
        cloud3.update();
        cloud6.update();

        boaBg.update();


        player.update();
        enemy.update();
        
        player.velocity.x = 0
        player.velocity.y = 0

        enemy.velocity.x = 0
        enemy.velocity.y = 0


        // if(!keys.h.pressed){
        //     shoot.position.y = player.position.y
        //     shoot.position.x = player.position.x
        //     shoot.velocity.x = 0
        
        // }
        
        
        
        if(keys.h.pressed){
            shoots.forEach((shoot) =>{
                shoot.update()
                if(
                    projectileCollision({
                        rectangle1: shoot,
                        rectangle2: enemy 
                    })){
                    enemy.health -= .25
                    document.querySelector('#enemyHealth').style.width = enemy.health + '%'
                   
                }
            })
            // 
            // setTimeout(() => {
            // shoot.velocity.x = 17;
        
            // keys.h.pressed = false
                
            // }, 800);
        }
        // if(shoot.position.x > canvas.width){
        //     shoot.position.x = player.position.x
        //     shoot.velocity.x = 0;
        // }
        // player.switchSprite('idle')
        // player.image = player.sprites.idle.image
        if(keys.d.pressed && lastKey === 'd'){
            player.velocity.x = 5
            player.switchSprite('run')
        } else if (keys.a.pressed && lastKey === 'a'){
            player.velocity.x = -5
            player.switchSprite('run')
        } else if (keys.s.pressed && lastKey === 's'){
            player.velocity.y = 13
            player.switchSprite('run')
        } else if (keys.w.pressed && lastKey === 'w'){
            player.velocity.y = -13
            player.switchSprite('run')
        } else {
            player.switchSprite('idle')
        }



        if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight"){
            enemy.velocity.x = 5
            enemy.switchSprite('run')
        } else if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft"){
            enemy.velocity.x = -5
            enemy.switchSprite('run')
        } else if (keys.ArrowDown.pressed && enemy.lastKey === "ArrowDown"){
            enemy.velocity.y = 13
            enemy.switchSprite('run')
        } else if (keys.ArrowUp.pressed && enemy.lastKey === "ArrowUp"){
            enemy.velocity.y = -13
            enemy.switchSprite('run')
        } else {
            enemy.switchSprite('idle')
        }

        

        if(
            rectangularCollision({
                rectangle1: player,
                rectangle2: enemy 
            }) && player.isAttacking){
            player.isAttacking = false
            enemy.health -= 10
            document.querySelector('#enemyHealth').style.width = enemy.health + '%'
           
        }
      

        if(
            rectangularCollision({
                rectangle1: enemy,
                rectangle2: player 
            }) && enemy.isAttacking){
            enemy.isAttacking = false
            player.health -= 4
            document.querySelector('#playerHealth').style.width = player.health + '%'
           
        }

        if( enemy.health <= 0 || player.health <= 0){
            determineWinner({player, enemy, timerId})
        }
    }


    animate()
    movableArea.draw();
    let keysPressed = {}
    window.addEventListener('keydown', (event) =>{


        if ( event.key == 'f') {
            player.position.x = enemy.position.x + 200;
            player.position.y = enemy.position.y + 50;
        } 
        if (event.key == ','){
            enemy.position.x = player.position.x - 200;
            enemy.position.y = player.position.y + 50
        }
        if (keysPressed['a'] && event.key == 'f') {
            player.velocity.x = -40;
        }
        switch( event.key){
            case 'd':
                keys.d.pressed = true
                lastKey = 'd'
            break
        }

        switch( event.key){
            case 'a':
                keys.a.pressed = true
                lastKey = 'a'
            break
        }

        switch( event.key){
            case 's':
                keys.s.pressed = true
                lastKey = 's'
            break
        }

        switch( event.key){
            case 'w':
                keys.w.pressed = true
                lastKey = 'w'
            break
        }
        switch( event.key){
            case 'f':
                player.position.x = enemy.position.x + 200;
                player.position.y = enemy.position.y + 50;
            break
        }
        switch( event.key){
            case 'g':
                player.attack()
            break
        }
        switch( event.key){
            case 'h':
                keys.h.pressed = true
                shoots.push( new Projectile({
                    position: {
                        x: player.position.x,
                        y: player.position.y + 80
                    },
                    velocity: {
                        x: 0,
                        y: 0
                    },
                    offset: {
                        x: 0,
                        y: 0
                    }
                }))
            break 
        }

        switch( event.key){
            case 'ArrowRight':
                keys.ArrowRight.pressed = true
                enemy.lastKey = 'ArrowRight'
            break
        }

        switch( event.key){
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                enemy.lastKey = 'ArrowLeft'
            break
        }

        switch( event.key){
            case 'ArrowDown':
                keys.ArrowDown.pressed = true
                enemy.lastKey = 'ArrowDown'
            break
        }

        switch( event.key){
            case 'ArrowUp':
                keys.ArrowUp.pressed = true
                enemy.lastKey = 'ArrowUp'
            break
        }
        switch( event.key){
            case '.':
                enemy.attack()
            break
        }

        console.log(event.key)
    })


    window.addEventListener('keyup', (event) =>{
        switch( event.key){
            case 'd':
                keys.d.pressed = false
            break
        }
        switch( event.key){
            case 'a':
                keys.a.pressed = false
            break
        }
        switch( event.key){
            case 's':
                keys.s.pressed = false
            break
        }
        switch( event.key){
            case 'w':
                keys.w.pressed = false
            break
        }
      

        switch( event.key){
            case 'ArrowRight':
                keys.ArrowRight.pressed = false
            break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = false
            break
            case 'ArrowDown':
                keys.ArrowDown.pressed = false
            break
            case 'ArrowUp':
                keys.ArrowUp.pressed = false
            break
        }

        console.log(event.key)
    })
})




