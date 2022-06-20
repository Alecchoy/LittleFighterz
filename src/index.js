// // entry file for css

const { setTimeout } = require("core-js");

// import {func} from './scripts/anotherJSfile';


// func();

window.addEventListener('DOMContentLoaded', () =>{

    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');

    
    canvas.width = innerWidth - 50
    canvas.height = innerHeight - 40
    
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

    



    
    class Sprite {
        constructor({position, velocity, color = 'red', offset}){
            this.position = position
            this.velocity = velocity
            this.color = color
            this.width = 50
            this.height = 100
            this.lastKey

            this.attackBox = {
                position: {
                    x: this.position.x,
                    y: this.position.y
                },
                offset: offset,
                width: 100,
                height: 40
                
            }
            this.isAttacking
            this.health = 100

         

            // this.shootBox = {
            //     position: {
            //         x: this.position.x,
            //         y: this.position.y
            //     },
            //     velocity: 50,
            //     offset: offset,
            //     width: 100,
            //     height: 40
            // }
            // this.isShooting
        }
       

        draw(){
            ctx.fillStyle = this.color
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
            //attack box is drawn
            
        
            // if(this.isShooting){
            //     ctx.fillStyle = "#B883E7"
            //         ctx.fillRect(this.shootBox.position.x + this.shootBox.velocity, this.shootBox.position.y, this.shootBox.width, this.shootBox.height)
            // }


        }

        
        
        update(){
            this.draw()

            // this.shootBox.position.x = this.position.x - this.shootBox.offset.x
            // this.shootBox.position.y = this.position.y
            // this.position.x += this.velocity.x
            // else this.velocity.y += gravity
        }

    }


    //
    //
    //
    class Fighter {
        constructor({position, velocity, color = 'red', offset}){
            this.position = position
            this.velocity = velocity
            this.color = color
            this.width = 50
            this.height = 100
            this.lastKey

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

        }
       

        draw(){
            ctx.fillStyle = this.color
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
            //attack box is drawn
            
            if(this.isAttacking) {
                ctx.fillStyle = "#B883E7"
                ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
            } 
       

        }
        
        update(){
            this.draw()
            this.attackBox.position.x = this.position.x - this.attackBox.offset.x
            this.attackBox.position.y = this.position.y

            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
            if(this.position.y + this.height + this.velocity.y >= canvas.height){
                this.velocity.y = 0
            }
        }

        attack(){
            this.isAttacking = true
            setTimeout(() =>{
                this.isAttacking = false 
            },300)
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
            this.color = '#0060FF'
            this.width = 100
            this.height = 30

        }
       

        draw(){
            ctx.fillStyle = this.color
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        }
        
        update(){
            this.draw()
            this.position.x += 17
            this.position.y += this.velocity.y
        }



        
    }



  

    
    
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
        }
        
        
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

    player.draw();
    
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

 
        // shoot.update()
        player.update()
        enemy.update()

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
                    enemy.health -= 2
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
        
        
        if(keys.d.pressed && lastKey === 'd'){
            player.velocity.x = 10
        } else if (keys.a.pressed && lastKey === 'a'){
            player.velocity.x = -10
        } else if (keys.s.pressed && lastKey === 's'){
            player.velocity.y = 13
        } else if (keys.w.pressed && lastKey === 'w'){
            player.velocity.y = -13
        }

        if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight"){
            enemy.velocity.x = 10
        } else if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft"){
            enemy.velocity.x = -10
        } else if (keys.ArrowDown.pressed && enemy.lastKey === "ArrowDown"){
            enemy.velocity.y = 13
        } else if (keys.ArrowUp.pressed && enemy.lastKey === "ArrowUp"){
            enemy.velocity.y = -13
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
            player.health -= 10
            document.querySelector('#playerHealth').style.width = player.health + '%'
           
        }

        if( enemy.health <= 0 || player.health <= 0){
            determineWinner({player, enemy, timerId})
        }
    }


    animate()
    movableArea.draw();

    window.addEventListener('keydown', (event) =>{
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
                player.velocity.y = -20
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




