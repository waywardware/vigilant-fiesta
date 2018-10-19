const sinon = require("sinon");
import {expect} from "chai";
import Render, { IDrawable } from "../../../src/common/engine/Render";
import {JSDOM} from "jsdom";

describe("Canvas Renderer", () => {
    const dom = new JSDOM("<canvas id='canvas'></canvas");
    let canvas: HTMLCanvasElement = dom.window.document.getElementById("canvas") as HTMLCanvasElement;
    let firstDrawable: IDrawable = {
        getLocation: () => ({x: 1, y: 1}),
        getSize: () => ({x: 1, y: 1}),
    };
    let secondDrawable: IDrawable = {
        getLocation: () => ({x: 2, y: 2}),
        getSize: () => ({x: 1, y: 1}),
    };

    describe("Drawable registation", () => {
        it("Should add new drawables", () => {
            let getContext = sinon.stub(canvas, "getContext");
            let render: Render = new Render(canvas, {x: 10, y: 10});

            render.addDrawable(firstDrawable);
            render.addDrawable(secondDrawable);
            expect(render.drawableList).to.contain(firstDrawable, "fistDrawable should be registered");
            expect(render.drawableList).to.contain(secondDrawable, "secondDrawable should be registered");

            getContext.restore();
            render.clean();
        });
        it("Should remove drawables", () => {
            let getContext = sinon.stub(canvas, "getContext");
            let render: Render = new Render(canvas, {x: 10, y: 10});

            render.addDrawable(firstDrawable);
            render.addDrawable(secondDrawable);
            render.removeDrawable(firstDrawable);
            expect(render.drawableList)
                .to.be.an("Array", "drawableList should be an array")
                .of.length(1, "Array should be size 1")
                .that.contains(secondDrawable, "secondDrawable should be registered")
                .but.does.not.contain(firstDrawable, "firstDrawable should not be registered");

            render.removeDrawable(secondDrawable);
            expect(render.drawableList)
                .to.be.an("Array", "drawableList should be an array")
                .of.length(0, "Array should be empty");
            getContext.restore();
            render.clean();
        });
    });
});
