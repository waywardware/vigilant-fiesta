const sinon = require("sinon");
import * as engine from "../../../src/common/engine/GameEngine";
import { expect } from "chai";
import Animals from "../../../src/common/entities/Animals";
import { take } from "rxjs/operators";

describe("Game engine", () => {
    describe("Timekeeper", () => {
        it("Should start at Day 1, Hour 1", done => {
            engine.timeKeeper.pipe(take(1)).subscribe(time => {
            expect(time.day).to.equal(1, "Expected to start at day 1");
            expect(time.hour).to.equal(1, "Expected to start at hour 1");
            done();
        });
            engine.start();
        });
        it("Should should start only after subscribe even if start is called first", done => {
            engine.start();
            setTimeout(() => {
                engine.timeKeeper.pipe(take(1)).subscribe(time => {
                    expect(time.day).to.equal(1, "Expected to start at day 1");
                    expect(time.hour).to.equal(1, "Expected to start at hour 1");
                    done();
                });
            }, 1000);
        });
    });
});
