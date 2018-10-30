import { Subscription } from "rxjs";
import { timeKeeper } from "./GameEngine";

export interface IDrawable {
    getLocation: () => IDimensions;
    getSize: () => IDimensions;
    getFillStyle?: () => CanvasColor;
    getStrokeStyle?: () => CanvasColor;
}

export interface IDimensions {
    readonly x: number;
    readonly y: number;
}

export type CanvasColor = string | CanvasGradient | CanvasPattern;

export default class Render {
    readonly canvasContext: CanvasRenderingContext2D;
    readonly drawableList: Array<IDrawable>;

    private readonly timeSub: Subscription;

    constructor(readonly canvas: HTMLCanvasElement, readonly size: IDimensions) {
        this.canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
        this.drawableList = new Array();
        this.timeSub = timeKeeper.subscribe(() => this.draw());
    }

    public addDrawable(drawable: IDrawable) {
        this.drawableList.push(drawable);
    }

    public removeDrawable(drawable: IDrawable) {
        let index: number = this.drawableList.indexOf(drawable);
        if (index >= -1) {
            this.drawableList.splice(index, 1);
        }
    }

    public draw(): Promise<void> {
        let promise: Promise<void> = new Promise((resolve, reject) => {
            this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
            let blockSize: IDimensions = {
                x: this.canvas.width / this.size.x,
                y: this.canvas.height / this.size.y,
            };

            this.drawableList.forEach(drawable => {
                let location: IDimensions = drawable.getLocation();
                let size: IDimensions = drawable.getSize();

                this.canvasContext.beginPath();
                if (drawable.getFillStyle) {
                    this.canvasContext.fillStyle = drawable.getFillStyle();
                    this.canvasContext.fillRect(
                        location.x * blockSize.x, location.y * blockSize.y,
                        size.x * blockSize.x, size.y * blockSize.y);
                }
                if (drawable.getStrokeStyle) {
                    this.canvasContext.strokeStyle = drawable.getStrokeStyle();
                    this.canvasContext.strokeRect(
                        location.x * blockSize.x, location.y * blockSize.y,
                        size.x * blockSize.x, size.y * blockSize.y);
                }
                this.canvasContext.stroke();
                this.canvasContext.closePath();
            });
            resolve();
        });
        return promise;
    }

    /**
     * Making sure that we are no longer listening for time updates. Right now
     * this is useful for testing to make sure that we are cleanup as there
     * might be more than one renderer. This should not really be needed in actual
     * working code since there will only be one renderer that directly depends on the
     * GameEngine. If this does get used elsewhere, some refactoring should probably
     * be considered.
     * Some reference material:
     * * * https://medium.com/@benlesh/rxjs-dont-unsubscribe-6753ed4fda87
     */
    public clean(): void {
        this.timeSub.unsubscribe();
    }
}
