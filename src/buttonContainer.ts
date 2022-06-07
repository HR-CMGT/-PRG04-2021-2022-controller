import * as PIXI from 'pixi.js'
import { Game } from "./game";
import { Button } from "./button";
import { CircleButton } from "./circleButton";
import { ArrowButton } from './arrowButton';

export class ButtonContainer extends PIXI.Container{
    private game : Game;
    private buttons : Button[] = [];
    private buttonSequence : Button[] = [];

    private hasButtonActive = false;
    private lastActiveButton = '';
    private lastClickedButton = '';

    constructor(game: Game){
        super();
        this.game = game;
        this.createButtons();
    }

    public getGame(): Game{
        return this.game;
    }

    private createButtons(){
        // create 4 arrows for joystick
        let up = new ArrowButton('Up', this);
        up.setXY(100, 10);
        this.buttons.push(up);
        let down = new ArrowButton('Down', this);
        down.setXY(100, 210);
        down.setAngle(180);
        this.buttons.push(down);
        let left = new ArrowButton('Left', this);
        left.setXY(0, 110);
        left.setAngle(270);
        this.buttons.push(left);
        let right = new ArrowButton('Right', this);
        right.setXY(200, 110);
        right.setAngle(90);
        this.buttons.push(right);

        // create 6 buttons
        let button01 = new CircleButton('joystick0button0', this);
        button01.setXY(300, 0);
        this.buttons.push(button01);
        let button02 = new CircleButton('joystick0button3', this);
        button02.setXY(300, 120);
        this.buttons.push(button02);
        let button03 = new CircleButton('joystick0button1', this);
        button03.setXY(410, 0);
        this.buttons.push(button03);
        let button04 = new CircleButton('joystick0button4', this);
        button04.setXY(410, 120);
        this.buttons.push(button04);
        let button05 = new CircleButton('joystick0button2', this);
        button05.setXY(520, 0);
        this.buttons.push(button05);
        let button06 = new CircleButton('joystick0button5', this);
        button06.setXY(520, 120);
        this.buttons.push(button06);
    }

    public addButton(item: PIXI.Container){
        this.addChild(item);
    }

    public buttonPressed(event: string){
        // ignore if button was just pressed
        if(this.lastClickedButton == event){
            return;
        }

        for(let button of this.buttons){
            if(button.getTitle() !== event){
                continue;
            }
            if(button.getIsActive()){
                // good job!
                this.hasButtonActive = false;
                this.lastActiveButton = event;
                this.game.updateScore(1);
            }else if(this.lastActiveButton != event){
                // oops!
                this.game.updateScore(-1);
            }
        }

        this.lastClickedButton = event;
    }

    public update(){
        if(!this.hasButtonActive){
            let lastButton = this.buttonSequence[this.buttonSequence.length - 1]? this.buttonSequence[this.buttonSequence.length - 1] : null;
            let randomButton = null;
            do{
                console.log(lastButton);
                for(let button of this.buttons){
                    button.reset();
                }
    
                randomButton = this.buttons[Math.floor(Math.random() * this.buttons.length)];
                randomButton.setActive();

                if(randomButton == lastButton){
                    randomButton = null;
                }
            }while(randomButton == null);
            
            this.hasButtonActive = true;
            this.buttonSequence.push(randomButton);

            console.log(this.buttonSequence);
            return;
        }
    }
}