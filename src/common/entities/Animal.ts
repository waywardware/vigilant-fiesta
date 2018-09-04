import { IDrawable, IDimensions, CanvasColor } from "../engine/Render";
import { Colors } from "../utils/Constants";
import { IEdible, ISpeed, IDiet } from "./EntityInterfaces";

export default class Animal implements IDrawable, IEdible {

    public getLocation = (): IDimensions => this.location;
    public getSize = (): IDimensions => this.size;
    public getFillStyle = (): CanvasColor => Colors.green;

    constructor(readonly name: string, readonly species: string, readonly diet: IDiet, readonly speed: ISpeed,
                private location: IDimensions, private size: IDimensions) {}

    public canEat(target: IEdible): boolean {
        if (this === target) return false;
        for (const source of this.diet.foodSources) {
            if (target.species === source.species) {
                return true;
            }
        }
        return false;
    }
}
