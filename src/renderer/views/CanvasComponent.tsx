import * as React from "react";
import Render from "../../common/engine/Render";
import { Animal } from "../../common/Animal";

export default class CanvasComponent extends React.Component {
    componentDidMount() {
        let render: Render = new Render(this.canvas, {x: 20, y: 20});
        let chicken: Animal = new Animal(
            {x: 1, y: 1},
            {x: 1, y: 1},
        );
        render.addDrawable(chicken);
        render.draw().then(() => {
            setTimeout(() => {
                chicken.move({x: 0, y: 0});
                render.draw();
            },         3000);
        });
    }

    render() {
        return (
            <canvas id="mainboard" ref="canvas"></canvas>
        );
    }

    private get canvas(): HTMLCanvasElement {
        /* tslint:disable:no-string-literal */
        return this.refs["canvas"] as HTMLCanvasElement;
    }
}
