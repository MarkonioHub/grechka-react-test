import React, {Fragment, useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"

import ButtonGrey from "../../UI/ButtonGrey/ButtonGrey"
import SelectWhite from "../../UI/SelectWhite/SelectWhite"
import {addAddress, setAddresses, setCurrentAddress, setIsSidebarOpen} from "../../store/slices/map"
import {getTitlesAndDescriptions} from "../../api/getTitlesAndDescriptions"

import "./sidebar.css"

const Sidebar = () => {
    const isSidebarOpen = useSelector(state => state.map.isSidebarOpen)
    const currentAddress = useSelector(state => state.map.currentAddress)
    const addresses = useSelector(state => state.map.addresses)
    const [selectData, setSelectData] = useState({titles: [], descriptions: []})
    const dispatch = useDispatch()
    const form = React.useRef(null)

    async function getSelectData () {
        const data = await getTitlesAndDescriptions()
        setSelectData(data)
    }

    useEffect( () => {
        getSelectData()
        const addressesStorage = localStorage.getItem("addresses")
        if (addressesStorage) dispatch(setAddresses(JSON.parse(addressesStorage)))
    }, [dispatch])

    useEffect( () => {
        localStorage.setItem("addresses", JSON.stringify(addresses))
    }, [addresses])

    function addNewAddress () {
        const formData = new FormData(form.current)
        const address = formDataInObject(formData)
        if (!address) {
            alert("Кликните на карту для постановки метки и выберите заголовок и описание из выпадающих списков")
        } else {
            dispatch(addAddress(address))
            dispatch(setIsSidebarOpen(false))
            dispatch(setCurrentAddress({ text: "", lat: "", lon: "" }))
        }
    }

    function formDataInObject (formData) {
        const object = {}
        let empty = false
        formData.forEach(function(value, key) {
            object[key] = value
            if (!value) empty = true
        })
        if (empty) {
            return false
        } else {
            return object
        }
    }

    return (
        <Fragment>
            {isSidebarOpen ?
                <div className="sidebar">
                    <form className="sidebar__area" ref={form}>
                        <button className="sidebar__close"
                                onClick={() => {
                                    dispatch(setIsSidebarOpen(false))
                                    dispatch(setCurrentAddress({ text: "", lat: "", lon: "" }))
                                }} type="button">

                        </button>
                        <div className="sidebar__title">Выберите адрес на карте</div>
                        <div className="sidebar__address">
                            <span className="sidebar__address-span">Адрес: </span>
                            <span className="sidebar__address-placeholder">{currentAddress.text}</span>
                            <input type="text" className="sidebar__address-input" name="address_string" readOnly={true} value={currentAddress.text || ''}/>
                        </div>
                        <input type="hidden" className="sidebar__address-hidden" name="lat" value={currentAddress.lat || ''}/>
                        <input type="hidden" className="sidebar__address-hidden" name="lon" value={currentAddress.lon || ''}/>
                        <SelectWhite placeholder="Заголовок" list={selectData.titles} name="title" classMod="sidebar"/>
                        <SelectWhite placeholder="Описание" list={selectData.descriptions} name="description" classMod="sidebar"/>
                        <ButtonGrey classMod="sidebar" text="Добавить" onClick={addNewAddress}/>
                    </form>
                </div>
                :
                false
            }
        </Fragment>
    )
}

export default Sidebar
