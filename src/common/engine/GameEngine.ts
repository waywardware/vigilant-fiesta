import { Observable, Subject, Subscriber } from "rxjs";
import { scan, share, skipUntil, takeUntil, tap, map } from "rxjs/operators";

let speed = 1;
let dayLength = 10;

export interface ITime {
    hour: number;
    day: number;
}

const variableSpeedLoop = (observer: Subscriber<number>) => {
    let tick = () => {
        observer.next();
        setTimeout(() => tick(), 1000 / speed);
    };
    tick();
};

const start$ = new Subject();
const end$ = new Subject();
export const timeKeeper = new Observable(variableSpeedLoop).pipe(
    skipUntil(start$),
    scan<number, ITime>((time, value) => ({hour: time.hour + 1, day: time.day}), {hour: 0, day: 0}),
    tap(time => time.hour = time.hour > dayLength ? 1 : time.hour),
    tap(time => time.day = time.hour === 1 ? time.day + 1 : time.day),
    takeUntil(end$),
    share(),
    );

export const start = () => start$.next();
export const end = () => end$.next();
export const setSpeed = (target: number) => speed = target;
