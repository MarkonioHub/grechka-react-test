import React from "react"

import './button-grey.css'

const ButtonGrey = ({ classMod, onClick, text }) => {
    return (
        <button className={classMod ? `button-grey button-grey_${classMod}` : "button-grey"} type="button" onClick={onClick}>
            {text}
        </button>
    );
};

export default ButtonGrey
