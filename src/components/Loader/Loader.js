import React, {Fragment} from "react"
import {useSelector} from "react-redux"

import "./loader.css"

const Loader = () => {
    const isLoading = useSelector(state => state.map.isLoading)
    return (
        <Fragment>
            {isLoading ?
                <div className="loader">
                    loader
                </div>
                :
                false
            }
        </Fragment>
    );
};

export default Loader
