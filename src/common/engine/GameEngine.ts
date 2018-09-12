import Rx, { Subscriber, Subject, interval, Observable, Operator, merge } from "rxjs";
import { take, map, scan, filter, withLatestFrom, share } from "rxjs/operators";

let speed = 1;
let dayLength = 10;

export const setSpeed = (target: number) => speed = target;

const countUpAndResetAfter = (resetNumber: number) => scan((count) => {
    console.log("count: ", count);
    if (count === resetNumber) {
        count = 0;
    }
    return count + 1;
},                                                         0);

const variableSpeedLoop = (observer: Subscriber<number>) => {
    let tick = () => {
        observer.next();
        setTimeout(() => tick(), 1000 / speed);
    };
    tick();
};

const hourStream = new Observable(variableSpeedLoop).pipe(countUpAndResetAfter(dayLength));
const dayStream = hourStream.pipe(filter(hour => hour === 1), scan(count => count + 1, 0), share());
export const timeKeeper = hourStream.pipe(/*withLatestFrom(dayStream),*/ map((hourInput) => {
    return {hour: hourInput};
}),                                                                      share());
