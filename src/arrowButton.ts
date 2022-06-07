import * as PIXI from 'pixi.js'
import { Button } from "./button";
import { ButtonContainer } from './buttonContainer';

export class ArrowButton extends Button{
    private graphic : PIXI.Sprite;

    constructor(title : string, container : ButtonContainer){
        super(title, container);

        this.graphic = new PIXI.Sprite(this.container.getGame().loader.resources["arrowTexture"].texture!);
        this.graphic.width = this.buttonWidth;
        this.graphic.height = this.buttonHeight;

        this.graphic.anchor.set(0.5);
        this.graphic.x = this.buttonRadius;
        this.graphic.y = this.buttonRadius;

        this.reset();
        this.container.addButton(this.graphic);
    }

    public setXY(x: number, y: number) {
        super.setXY(x, y, this.graphic);
    }
    public setAngle(degrees: number){
        if(degrees >= 0 && degrees <= 360){
            this.graphic.angle = degrees;
        }
    }

    public reset() {
        super.reset();
        this.graphic.tint = this.inactiveColor;
    }
    public setActive() {
        super.setActive();
        this.graphic.tint = this.activeColor;
    }
}