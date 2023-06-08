import React, { useState } from "react"

import './select-white.css'

const SelectWhite = ({ placeholder, list, name, classMod }) => {
    const [isSelectOpen, setIsSelectOpen] = useState(false)
    const [selectValue, setSelectValue] = useState("")
    const [selectPlaceholder, setSelectPlaceholder] = useState(placeholder)

    function selectNewValue (value) {
        setSelectValue(value)
        setSelectPlaceholder(value)
        setIsSelectOpen(false)
    }

    return (
        <div className={classMod ? `select-white select-white_${classMod}` : "select-white"}>
            <input type="text" className="select-white__input" name={name} value={selectValue} readOnly={true}/>
            <div
                className={isSelectOpen ? "select-white__placeholder select-white__placeholder_active" : "select-white__placeholder"}
                onClick={() => setIsSelectOpen(!isSelectOpen)}>{selectPlaceholder}
            </div>
            <div className="select-white__list">
                {list.map((item, key) =>
                    <div key={key} className="select-white__item" onClick={() => selectNewValue(item.name)}>{item.name}</div>
                )}
            </div>
        </div>
    );
};

export default SelectWhite;
