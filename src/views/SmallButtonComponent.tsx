import React from "react";

interface ISmallButtonProps {
    text: string;
    value: string | number;
    onClick: (value?: any) => void;
}

export class SmallButtonComponent extends React.Component<ISmallButtonProps> {

    render() {
        return (
            <button
                className="smallButton ui"
                onClick={() => this.props.onClick(this.props.value)}>
                {this.props.text}
            </button>
        );
    }
}
