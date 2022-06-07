import * as PIXI from 'pixi.js';
import { Button } from "./button";
import { ButtonContainer } from './buttonContainer';

export class CircleButton extends Button{
    private graphic : PIXI.Graphics;

    constructor(title : string, container : ButtonContainer){
        super(title, container);

        this.graphic = new PIXI.Graphics();
        this.graphic.lineStyle(0);
        this.graphic.beginFill(0xFFFFFF, 1);
        this.graphic.drawCircle(this.buttonRadius, this.buttonRadius, this.buttonRadius);
        this.graphic.endFill();
        this.reset();
        this.container.addButton(this.graphic);
    }

    public setXY(x: number, y: number) {
        super.setXY(x, y, this.graphic);
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