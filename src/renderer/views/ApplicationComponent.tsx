import * as React from "react";
import * as css from "../../common/utils/Styles";
import Render from "../../common/engine/Render";
import Animals from "../../common/entities/Animals";
import Animal from "../../common/entities/Animal";
import * as engine from "../../common/engine/GameEngine";

export class ApplicationComponent extends React.Component<{}>  {
    constructor(props: React.ReactPropTypes) {
        super(props);
    }
    componentDidMount() {
        let joe: Animal = Animals.Rabbit.create("Joe", {x: 5, y: 5});
        let bob: Animal = Animals.Rabbit.create("Bob", {x: 8, y: 8});
        let render: Render = new Render(this.canvas, {x: 20, y: 20});
        render.addDrawable(joe);
        render.addDrawable(bob);
        engine.start();
    }

    render() {
        return (
            <div className="application" style={css.application()}>
                <canvas id="mainboard" ref="canvas"></canvas>
            </div>
        );
    }

    public get canvas(): HTMLCanvasElement {
        /* tslint:disable:no-string-literal */
        return this.refs["canvas"] as HTMLCanvasElement;
    }
}
