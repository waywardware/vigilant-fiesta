import * as React from "react";
import * as css from "../../common/utils/Styles";
import CanvasComponent from "./CanvasComponent";

export class ApplicationComponent extends React.Component<{}>  {
    render() {
        return (
            <div className="application" style={css.application()}>
                <CanvasComponent/>
            </div>
        );
    }
}
