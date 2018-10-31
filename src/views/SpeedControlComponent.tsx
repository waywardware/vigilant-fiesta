import React from "react";
import * as engine from "../common/engine/GameEngine";
import { SmallButtonComponent } from "./SmallButtonComponent";

export class SpeedControlComponent extends React.Component {

    renderButton(text: string, value: number) {
        return <SmallButtonComponent text={text} value={value} onClick={this.onClick}/>;
    }

    render() {
        return (
            <div className="speedControls ui">
                {this.renderButton("||", 0)}
                {this.renderButton(">", 1)}
                {this.renderButton(">>", 2)}
                {this.renderButton(">>>", 4)}
            </div>
        );
    }

    onClick(value?: number) {
        engine.setSpeed(value as number);
    }
}
