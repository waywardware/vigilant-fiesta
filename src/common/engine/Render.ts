export interface IDrawable {
    getLocation: () => IDimensions;
    getSize: () => IDimensions;
}

export interface IDimensions {
    x: number;
    y: number;
}

export default class Render {
    readonly canvasContext: CanvasRenderingContext2D | null;
    readonly drawableList: Array<IDrawable>;

    constructor(readonly canvas: HTMLCanvasElement, readonly size: IDimensions) {
        this.canvasContext = canvas.getContext("2d");
        this.drawableList = new Array();
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
            this.drawableList.forEach(drawable => {
                let location: IDimensions = drawable.getLocation();
                let size: IDimensions = drawable.getSize();
            });
            resolve();
        });
        return promise;
    }
}
