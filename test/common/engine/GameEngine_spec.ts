const sinon = require("sinon");
import * as engine from "../../../src/common/engine/GameEngine";
import { expect } from "chai";
import { take, last, filter, takeWhile } from "rxjs/operators";

// tslint:disable:no-unused-expression
describe("Game engine", () => {
    afterEach(() => {
        // Whatever state the engine is in, reset it.
        engine.start(1);
        engine.stop();
    });
    describe("Timekeeper", () => {
        let speed = Math.pow(10, 1000);
        describe("Starting and ending", () => {
            it("Should start only when start is called", done => {
                let hasStartBeenCalled: boolean = false;
                engine.timeKeeper.pipe(take(1)).subscribe(time => {
                    expect(hasStartBeenCalled, "timekeeper was started too early").to.be.true;
                    done();
                });
                setTimeout(() => {
                    hasStartBeenCalled = true;
                    engine.start(speed);
                }, 10);
            });
            it("Should start anew when start is called after an end", done => {
                engine.start(speed);
                let take5 = engine.timeKeeper.pipe(take(5));
                take5.pipe(last()).subscribe((endingTimeOfFistSub) => {
                    let count = engine.calcCurrentTick(endingTimeOfFistSub);
                    expect(count).to.equal(5);
                    engine.stop();
                    engine.start(speed);
                    engine.timeKeeper.pipe(take(1)).subscribe((time) => {
                        expect(time.hour).to.equal(1, "Expected hour to reset");
                        expect(time.day).to.equal(1, "Expected day to reset");
                        done();
                    });
                });
            });
            it("Should not send out more event after an end", done => {
                let count = 0;
                let take10 = engine.timeKeeper.pipe(take(10));
                take10.pipe(last()).subscribe((time) => {
                    count = engine.calcCurrentTick(time);
                    expect(count).to.equal(10, "Expected time to still pass");

                    engine.stop();
                    count = 0;

                    take10.pipe(last()).subscribe((time) => {
                        // In a working engine, this shouldn't happen
                        count = engine.calcCurrentTick(time);
                    });
                    setTimeout(() => {
                        expect(count).to.equal(0, "Expected to not receive more events");
                        done();
                    }, 10);
                });
                engine.start(speed);
            });
        });
        describe("Keeping time correctly", () => {
            it("Should start at Day 1, Hour 1", done => {
                engine.timeKeeper.pipe(take(1)).subscribe(time => {
                    expect(time.day).to.equal(1, "Expected to start at day 1");
                    expect(time.hour).to.equal(1, "Expected to start at hour 1");
                    done();
                });
                engine.start(speed);
            });
            it("Should increase hour correctly", done => {
                let previousTime: engine.ITime = {hour: 0, day: 0 };
                let oneDay = engine.timeKeeper.pipe(take(engine.dayLength));

                oneDay.subscribe(time => {
                    expect(time.hour).to.be.greaterThan(previousTime.hour);
                    previousTime = time;
                });
                oneDay.pipe(last()).subscribe(() => done());

                engine.start(speed);
            });
            it(`Should increase day correctly (every ${engine.dayLength} hours)`, done => {
                let previousTime: engine.ITime = {day: 0, hour: 0};
                let everyHourForFiveDays = engine.timeKeeper.pipe(takeWhile(time => time.day < 3));
                let everyDay = everyHourForFiveDays.pipe(filter(time => time.hour === 1 && time.day > 1));
                let lastTick = everyHourForFiveDays.pipe(last());

                everyDay.pipe().subscribe(time => {
                    expect(previousTime.hour).to.equal(engine.dayLength, `Expected day to end on ${engine.dayLength}`);
                    expect(time.day).to.be.greaterThan(previousTime.day, "Expected day count to increase");
                });
                everyHourForFiveDays.subscribe(time => {
                    previousTime = time;
                });
                lastTick.subscribe(() => done());
                engine.start(speed);
            });
            it("Should send out the same tick to all subscribers", done => {
                let take10 = engine.timeKeeper.pipe(take(10));
                let lastTick = take10.pipe(last());
                let timeFromFirstSub: engine.ITime;

                take10.subscribe(time => timeFromFirstSub = time);
                take10.subscribe(time => {
                    expect(time).to.equal(timeFromFirstSub, "Expected all subs to have same data");
                });
                take10.subscribe(time => {
                    expect(time).to.equal(timeFromFirstSub, "Expected all subs to have same data");
                });
                take10.subscribe(time => {
                    expect(time).to.equal(timeFromFirstSub, "Expected all subs to have same data");
                });
                take10.subscribe(time => {
                    expect(time).to.equal(timeFromFirstSub, "Expected all subs to have same data");
                });
                lastTick.subscribe(() => done());
                engine.start(speed);
            });
        });
        describe("Controlling the flow of time", () => {
            it("Should pause and resume");
            it("Should change speed");
            it("Should behave no different if start is called multiple times");
        });
    });
});
