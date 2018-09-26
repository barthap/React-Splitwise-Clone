import * as React from 'react';

interface IButtonProps {
    text: string;
    onClick: () => void;
    icon?: string;
    btnStyle?: string;
}

const Button: React.SFC<IButtonProps> = (props) => {
        const {btnStyle, text, onClick, icon} = props;
        const glyphIcon = icon ? <span className={`glyphicon ${icon}`}/> : '';

        return (
            <button className={`btn ${btnStyle}`} type="button" onClick={onClick}>
                {glyphIcon} {text}
            </button>
        );
};

Button.defaultProps = {
    btnStyle: 'btn-default'
};

export default Button;