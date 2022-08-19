# One Piece Little Fighters


<img src="https://github.com/Alecchoy/LittleFighterz/blob/main/src/images/onepiece.gif"/>

### One Piece Little Fighterz is a 2D fighter game where players can move on a canvas plane in order to attack, and dodge their opponent inspired by a modern epic named One Piece.



## How it works

Different characters will different ranges of abilities such as sword extenstions or projectile objects. I will be using a lot of object collision in this project. The rendering will be creating using sprites. The goal of the the player is to traverse across the maps to defeat different enemies. You will spawn from the left side and try to go to the right side in order to finish the stage before moving on to the next stage.

## In One Piece Little fighter, users will be able to:

- Access a start-up page with instructions on how to play the game, start the game, and select a character.
- Control a player to fight other players using abilities and basic attacks that will damage the enemy when the enemies hit box comes in contact with the players attack animations.
- Will be placed on a top down view plane which allows the user to move up, down, left, and right on the plane and also jump in place.
- Players will have individual sprite animations that fit the character and its abilities. 


## Technologies, Libaries, APIs

- Canvas API to render most of my video layers and sprites.
- Webpack and babel to bundle and transpile the vanilla javscript.
- Event listeners to track user input and translate them into actions for the charadter.
- One Piece sprite library in order to get animations for each character.


## Wireframe 
- https://wireframe.cc/x7o8kb
- https://wireframe.cc/MSbXpF


## Implementation Timeline

- Day1: Thursday
    - research on fighting game movement and abilities
- Day2: Friday
    - create a version of the game mechanics using rectangles
    - pick sprites and research how to implelement them
- Day3: Saturday
    - Add sprites on for at least two characters
    - Add sprites for background
- Day4: Sunday
    - Create health bar and login Display
- Day5: Monday
    - Add sound effects and music 
- Day6: Tuesday
    - Make enemies controlled and create many in order to challenge the user
- Day7: Wednesday
    - Debugging and Cleanup
- Day8: Thursday


## Future Bonus Features
- Add in 5-6 additional characters to choose from
- Add different types of Attack
- Create AI to fight back
- Clear mobs of enemies

## Example Code

One of the core functionalities is making sure the when players are attacking each their, an overlap of two rectangles should not increase the damage since more parts of the rectangle are covering the enemy body. To counteract that, I made sure to write code that only registered the first time it over laps to count as damage.

```jsx
    function rectangularCollision({rectangle1, rectangle2}){
        return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && 
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
        )
    }
    function 
```


Another core functionality was making sure that sprites were cropped so that it would render smoothly and have these sprites animate throughout the entire gameplay. Through this project I understand how to crop sprites by frames and desigate frame sizes.


```jsx
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
            // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
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
````




