import * as React from "react";
import Render from "../../common/engine/Render";
import Animal from "../../common/entities/Animal";
import Animals from "../../common/entities/Animals";
import Plants from "../../common/entities/Plants";
import Plant from "../../common/entities/Plant";

export default class CanvasComponent extends React.Component {
    componentDidMount() {
        let render: Render = new Render(this.canvas, {x: 20, y: 20});
        let dog: Animal = Animals.Dog.create("jerry", {x: 1, y: 1});
        let shrub: Plant = Plants.Shrub.create("timmy", {x: 2, y: 2});
        console.log(dog.canEat({species: Animals.Rabbit.species}));
        render.addDrawable(dog);
        render.addDrawable(shrub);
        render.draw();
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
