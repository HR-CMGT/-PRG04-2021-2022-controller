import * as PIXI from 'pixi.js';
import { ButtonContainer } from './buttonContainer';
import { Game } from "./game";

export class Button {
    // settings
    protected buttonWidth = 100;
    protected buttonHeight = this.buttonWidth;
    protected buttonRadius: number;

    protected inactiveColor = 0x000000;
    protected activeColor = 0xDE3249;

    // globals
    protected title : string;
    protected container : ButtonContainer;
    protected isActive = false;

    constructor(title : string, container : ButtonContainer){
        this.title = title;
        this.container = container;

        this.buttonRadius = this.buttonWidth / 2;
    }

    public getTitle(){ return this.title; }
    public getIsActive(){ return this.isActive; }

    public setXY(x:number, y: number, graphic: PIXI.Container){
        graphic.x = x + this.buttonRadius;
        graphic.y = y + this.buttonRadius;
    }

    public reset(){
        this.isActive = false;
    }
    public setActive(){
        this.isActive = true;
    }
}