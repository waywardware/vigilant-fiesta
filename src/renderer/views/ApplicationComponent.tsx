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
        let joe: Animal = Animals.Rabbit.create("Jimmy", {x: 0, y: 0});
        let bob: Animal = Animals.Rabbit.create("bob", {x: 0, y: 0});
        let render: Render = new Render(this.canvas, {x: 20, y: 20});
        render.addDrawable(joe);
        render.addDrawable(bob);
        render.draw();
        engine.timeKeeper.subscribe((data) => {
            let dim = joe.getLocation();
            joe.move({x: dim.x + 1, y: dim.y + 1});
        });
        setTimeout(() => {
            engine.timeKeeper.subscribe((data) => console.log("second time: ", data));
            engine.timeKeeper.subscribe(() => {
                let dim = bob.getLocation();
                bob.move({x: dim.x + 1, y: dim.y + 1});
            });
        },         3000);
        engine.timeKeeper.subscribe(() => render.draw());
        engine.timeKeeper.subscribe((data) => console.log("time: ", data));
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
