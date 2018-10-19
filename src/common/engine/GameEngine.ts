import { Subject } from "rxjs";
import { scan, share, takeUntil, tap } from "rxjs/operators";

let speed: number = 1;
export const dayLength = 24;
export const emit = {
    every: (timeUnit: number) => ({
        ms: timeUnit,
        sec: timeUnit * 1000,
    }),
};
export interface ITime {
    hour: number;
    day: number;
}

const start$: Subject<number> = new Subject();
const stop$ = new Subject();
const tick$ = new Subject();

let timeout: any;
let startLoop = (targetSpeed: number) => {
    speed = targetSpeed;
    if (timeout) {
        clearTimeout(timeout);
    }
    let loop = () => {
        if (speed > 0) {
            tick$.next();
            timeout = setTimeout(loop, speed);
        }
    };
    loop();
};

start$.subscribe(startLoop);
stop$.subscribe(() => speed = 0);

export const timeKeeper = tick$.pipe(
    takeUntil(stop$),
    scan<{}, ITime>(time => ({ hour: time.hour + 1, day: time.day }), { hour: 0, day: 0 }),
    tap(time => time.hour = time.hour > dayLength ? 1 : time.hour),
    tap(time => time.day = time.hour === 1 ? time.day + 1 : time.day),
    share(),
);

export const start = (targetSpeed: number = emit.every(1).sec) => start$.next(targetSpeed);
export const stop = () => stop$.next();
export const setSpeed = (target: number) => {
    if (speed === 0 && target > 0) {
        start$.next(target);
    } else {
        speed = target;
    }
};
export const calcCurrentTick = (time: ITime) => ((time.day - 1) * dayLength) + (time.hour);
