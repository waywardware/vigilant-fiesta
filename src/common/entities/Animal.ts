import { ITime, timeKeeper } from "../engine/GameEngine";
import { CanvasColor, IDimensions, IDrawable } from "../engine/Render";
import { Colors } from "../utils/Constants";
import { IDiet, IEdible, ISpeed } from "./EntityInterfaces";

export default class Animal implements IDrawable, IEdible {

    public getLocation = (): IDimensions => this.location;
    public getSize = (): IDimensions => this.size;
    public getFillStyle = (): CanvasColor => Colors.green;

    constructor(readonly name: string, readonly species: string, readonly diet: IDiet, readonly speed: ISpeed,
                private location: IDimensions, private size: IDimensions) {
                    timeKeeper.subscribe((time) => this.live(time));
                }

    public canEat(target: IEdible): boolean {
        if (this === target) return false;
        for (const source of this.diet.foodSources) {
            if (target.species === source.species) {
                return true;
            }
        }
        return false;
    }

    public live(time: ITime) {
        let add = - 1;
        if ((time.day * time.hour) % 2 === 0) {
            add = 1;
        }
        this.location = {x: this.location.x + add, y: this.location.y + add};
    }
}
