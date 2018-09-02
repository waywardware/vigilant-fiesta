import { IDrawable, IDimensions } from "./engine/Render";
import { Colors } from "./utils/Constants";

export class Animal implements IDrawable {
    private location: IDimensions;
    private size: IDimensions = {x: 1, y: 1};

    constructor(location: IDimensions, size: IDimensions) {
        this.location = location;
        this.size = size;
    }

    public move(location: IDimensions) {
        this.location = location;
    }

    public getLocation(): IDimensions {
        return this.location;
    }

    public getSize(): IDimensions {
        return this.size;
    }

    public getFillStyle(): string | CanvasGradient | CanvasPattern {
        return Colors.green;
    }
}
