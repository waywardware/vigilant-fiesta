import { IDrawable, IDimensions } from "./engine/Render";

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

    getLocation(): IDimensions {
        return this.location;
    }

    getSize(): IDimensions {
        return this.size;
    }
}
