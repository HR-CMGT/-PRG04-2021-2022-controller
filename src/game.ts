import * as PIXI from 'pixi.js'
import backgroundImage from "./images/backgroundEmpty.png"
import arrowImage from "./images/arrowUp.png"
import { Arcade } from './arcade/arcade'
import { DebugPanel } from './arcade/debugpanel';
import { ButtonContainer } from './buttonContainer';

export class Game{
    private pixi : PIXI.Application;
    public loader : PIXI.Loader;
    private arcade : Arcade;
    private joystickListener : EventListener;
    private buttonContainer : ButtonContainer;
    private scoreBox : PIXI.Text;

    private score = 0;

    constructor(){
        this.arcade = new Arcade(this, false, false);

        this.pixi = new PIXI.Application({ 
            width: window.innerWidth,
            height: window.innerHeight
        });
        document.body.appendChild(this.pixi.view);

        this.loader = new PIXI.Loader();
        this.loader
            .add('backgroundTexture', backgroundImage)
            .add('arrowTexture', arrowImage);
        this.loader.load(()=>this.loadCompleted());
    }

    private loadCompleted() {
        let background = new PIXI.Sprite(this.loader.resources["backgroundTexture"].texture!);
        background.width = window.innerWidth;
        background.height = window.innerHeight;
        this.pixi.stage.addChild(background);

        this.makeTextboxes();

        this.buttonContainer = new ButtonContainer(this);
        this.buttonContainer.y = 100;

        this.buttonContainer.x = (window.innerWidth / 2) - this.buttonContainer.width / 2
        this.pixi.stage.addChild(this.buttonContainer);

        this.joystickListener = (e: Event) => this.joyStickFound(e as CustomEvent);
        document.addEventListener("joystickcreated",  this.joystickListener);
    }

    private joyStickFound(e:CustomEvent) {
        let joystick = this.arcade.Joysticks[e.detail];

        // new DebugPanel(joystick, 6);
        
        for (const buttonEvent of joystick.ButtonEvents) {
            document.addEventListener(buttonEvent, () => this.buttonPressed(buttonEvent));
        }

        // start pixi
        this.pixi.ticker.add((delta) => this.update(delta));
    }

    private makeTextboxes(){
        let titleBox = new PIXI.Text(this.score.toString(), new PIXI.TextStyle({
            fontFamily: "\"Arial Black\", Gadget, sans-serif",
            fontSize: 30
        }));
        titleBox.text = "Simple Simon Says Arcade";
        titleBox.x = window.innerWidth / 2;
        titleBox.y = 20;
        titleBox.anchor.set(0.5, 0);
        this.pixi.stage.addChild(titleBox);

        this.scoreBox = new PIXI.Text(this.score.toString(), new PIXI.TextStyle({
            fontFamily: "\"Arial Black\", Gadget, sans-serif",
            fontSize: 22
        }));
        this.scoreBox.x = window.innerWidth / 2;
        this.scoreBox.y = 70;
        this.scoreBox.anchor.set(0.5, 0);
        this.pixi.stage.addChild(this.scoreBox);
    }

    public updateScore(addon: number){
        this.score += addon;
        this.scoreBox.text = this.score.toString();
    }

    private buttonPressed(event:string){
        console.log(event);
        this.buttonContainer.buttonPressed(event);
    }

    update(delta: number) {
        for (let joystick of this.arcade.Joysticks) {
            joystick.update();

            switch(true){
                case joystick.Up: this.buttonPressed('Up'); break;
                case joystick.Right: this.buttonPressed('Right'); break;
                case joystick.Down: this.buttonPressed('Down'); break;
                case joystick.Left: this.buttonPressed('Left'); break;
            }
        }

        this.buttonContainer.update();
    }

    public disconnect() {
        document.removeEventListener("joystickcreated", this.joystickListener)
    }
}

new Game();