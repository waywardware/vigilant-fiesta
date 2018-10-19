import { IDrawable, IDimensions, CanvasColor } from "../engine/Render";
import { Colors } from "../utils/Constants";
import { IEdible, ISpeed, IDiet } from "./EntityInterfaces";

export default class Plant implements IDrawable, IEdible {

    public getLocation = (): IDimensions => this.location;
    public getSize = (): IDimensions => this.size;
    public getFillStyle = (): CanvasColor => Colors.green;

    constructor(readonly name: string, readonly species: string,
                private location: IDimensions, private size: IDimensions) { }
}
