import { Observable, Subject, Subscriber, Observer, interval, of } from "rxjs";
import { filter, scan, takeUntil, tap, skipWhile, skipUntil, share, withLatestFrom, concatMap, map, skip } from "rxjs/operators";

let speed: number = 1;
export const dayLength = 24;
export interface ITime {
    hour: number;
    day: number;
}

const start$: Subject<number> = new Subject();
const stop$ = new Subject();
const tick$ = new Subject();

start$.subscribe((targetSpeed) => startLoop(targetSpeed));
stop$.subscribe(() => speed = 0);

let timeout: any;
let startLoop = (targetSpeed: number) => {
    speed = targetSpeed;
    if (timeout) {
        clearTimeout(timeout);
    }
    let loop = () => {
        if (speed > 0) {
            tick$.next();
            timeout = setTimeout(() => loop(), speed);
        }
    };
    loop();
};


export const timeKeeper = tick$.pipe(
    takeUntil(stop$),
    scan<{}, ITime>((time) => ({ hour: time.hour + 1, day: time.day }), { hour: 0, day: 0 }),
    tap(time => time.hour = time.hour > dayLength ? 1 : time.hour),
    tap(time => time.day = time.hour === 1 ? time.day + 1 : time.day),
    share(),
);


export const start = (targetSpeed: number = emitt.every(1).sec) => start$.next(targetSpeed);
export const stop = () => stop$.next();
export const setSpeed = (target: number) => {
    if (speed === 0 && target > 0) {
        start$.next(target);
    } else {
        speed = target;
    }
};
export const calcCurrentTick = (time: ITime) => ((time.day - 1) * dayLength) + (time.hour);
export const emitt = {
    every: (timeUnit: number) => ({
        ms: timeUnit,
        sec: timeUnit * 1000,
    }),
};

