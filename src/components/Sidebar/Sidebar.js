import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"

import ButtonGrey from "../../UI/ButtonGrey/ButtonGrey"
import SelectWhite from "../../UI/SelectWhite/SelectWhite"
import {setIsSidebarOpen} from "../../store/slices/map"
import {getTitlesAndDescriptions} from "../../api/getTitlesAndDescriptions"

import "./sidebar.css"

const Sidebar = () => {
    const isSidebarOpen = useSelector(state => state.map.isSidebarOpen)
    const currentAddress = useSelector(state => state.map.currentAddress)
    const [selectData, setSelectData] = useState({titles: [], descriptions: []})
    const dispatch = useDispatch()

    async function getData () {
        const data = await getTitlesAndDescriptions()
        setSelectData(data)
    }

    useEffect( () => {
        getData()
    }, [])

    return (
        <div className={isSidebarOpen ? "sidebar sidebar_open" : "sidebar"}>
            <div className="sidebar__area">
                <button className="sidebar__close" onClick={() => dispatch(setIsSidebarOpen(false))}></button>
                <div className="sidebar__title">Выберите адрес на карте</div>
                <div className="sidebar__address">
                    <span className="sidebar__address-span">Адрес: </span>
                    <span className="sidebar__address-placeholder">{currentAddress}</span>
                    <input type="text" className="sidebar__address-input" readOnly={true} value={currentAddress || ''}/>
                </div>
                <SelectWhite placeholder="Заголовок" list={selectData.titles} name="title" classMod="sidebar"/>
                <SelectWhite placeholder="Описание" list={selectData.descriptions} name="description" classMod="sidebar"/>
                <ButtonGrey classMod="sidebar" text="Добавить"/>
            </div>
        </div>
    )
}

export default Sidebar
