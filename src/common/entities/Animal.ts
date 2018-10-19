import { ITime, timeKeeper, calcCurrentTick } from "../engine/GameEngine";
import { CanvasColor, IDimensions, IDrawable } from "../engine/Render";
import { Colors } from "../utils/Constants";
import { IDiet, IEdible, ISpeed } from "./EntityInterfaces";
import { Observable, Subject, merge } from "rxjs";
import { takeUntil, take, scan, last } from "rxjs/operators";

export default class Animal implements IDrawable, IEdible {

    private readonly kill$: Subject<any> = new Subject();
    private readonly death$: Observable<any>;
    private readonly life$: Observable<ITime>;

    private color: CanvasColor = Colors.green;

    public readonly getLocation = (): IDimensions => this.location;
    public readonly getSize = (): IDimensions => this.size;
    public readonly getFillStyle = (): CanvasColor => this.color;

    constructor(readonly name: string, readonly species: string, readonly diet: IDiet,
        readonly speed: ISpeed, readonly maxAge: number, private location: IDimensions,
        private size: IDimensions) {
        this.life$ = timeKeeper.pipe(takeUntil(this.kill$), take(maxAge));
        this.death$ = this.life$.pipe(last(), take(1));

        this.life$.subscribe(time => this.live(time));
        this.death$.subscribe(() => this.death());
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

    public readonly kill = () => this.kill$.next();

    private live(time: ITime) {
        // TODO: Need a simple ai here.
        let add = - 1;
        let currentTick = calcCurrentTick(time);
        let remainer = currentTick % 2;
        if (remainer === 0) {
            add = 1;
        }
        this.location = { x: this.location.x + add, y: this.location.y + add };
    }

    private death() {
        this.color = Colors.red;
    }

}
