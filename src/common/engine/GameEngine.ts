import { Observable, Subject, Subscriber } from "rxjs";
import { filter, scan, share, skipUntil, takeUntil, tap } from "rxjs/operators";

let speed = 1;
let isPaused = false;
const dayLength = 24;

export interface ITime {
    hour: number;
    day: number;
}

const variableSpeedLoop = (observer: Subscriber<boolean>) => {
    let tick = () => {
        observer.next(isPaused);
        setTimeout(() => tick(), 1000 / speed);
    };
    tick();
};

const start$ = new Subject();
start$.subscribe(() => isPaused = false);
const end$ = new Subject();
export const timeKeeper = new Observable(variableSpeedLoop).pipe(
    skipUntil(start$),
    filter((isPaused) => !isPaused), // Allow only not paused
    scan<boolean, ITime>((time) => ({hour: time.hour + 1, day: time.day}), {hour: 0, day: 0}),
    tap(time => time.hour = time.hour > dayLength ? 1 : time.hour),
    tap(time => time.day = time.hour === 1 ? time.day + 1 : time.day),
    takeUntil(end$),
    share(),
    );

export const start = () => start$.next();
export const end = () => end$.next();
export const setSpeed = (target: number) => {
    isPaused = target < 1;
    if (isPaused) return;
    speed = target;
};
export const calcCurrentTick = (time: ITime) => ((time.day - 1) * dayLength) + (time.hour);
