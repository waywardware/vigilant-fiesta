import { CanvasColor, IDimensions, IDrawable } from "../engine/Render";
import { Colors } from "../utils/Constants";
import { IEdible } from "./EntityInterfaces";

export default class Plant implements IDrawable, IEdible {

    constructor(readonly name: string, readonly species: string,
                private location: IDimensions, private size: IDimensions) { }

    public getLocation = (): IDimensions => this.location;
    public getSize = (): IDimensions => this.size;
    public getFillStyle = (): CanvasColor => Colors.green;
}
