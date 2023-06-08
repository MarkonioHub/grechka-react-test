import React, {Fragment, useState} from "react"
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import {useDispatch, useSelector} from "react-redux"

import ButtonGrey from "../../UI/ButtonGrey/ButtonGrey"

import {setCurrentAddress, setIsSidebarOpen} from "../../store/slices/map"

import "./my-map.css"

const MyMap = () => {
    const isSidebarOpen = useSelector(state => state.map.isSidebarOpen)
    const dispatch = useDispatch()
    const [ymapsState, setYmapsState] = useState()
    const [currentCoords, setCurrentCoords] = useState()

    async function geocode(coords) {
        let firstGeoObject
        await ymapsState.geocode(coords)
            .then(result => {
                firstGeoObject = result.geoObjects.get(0)
            })
        return firstGeoObject.getAddressLine()
    }

    async function addNewAddress (coords) {
        if (!isSidebarOpen) return
        setCurrentCoords(coords)
        const address = await geocode(coords)
        dispatch(setCurrentAddress(address))
    }

    return (
        <div className="my-map">
            <YMaps className="my-map" query={{ load: "package.full", apikey: "a5819b53-021d-4395-84b9-44402f49add0" }}>
                <Map
                    className="my-map__box"
                    onLoad={(ymaps) => {
                        setYmapsState(ymaps)
                    } }
                    defaultState={{ center: [55.75, 37.57], zoom: 9 }}
                    onClick={(e) => addNewAddress(e._sourceEvent.originalEvent.coords)}
                >
                    {isSidebarOpen ?
                        <Fragment>
                            {currentCoords ? <Placemark geometry={currentCoords} /> : false}
                        </Fragment>
                        :
                        <Fragment>
                            <Placemark geometry={[55.684758, 37.738521]} />
                            <Placemark geometry={[55.686758, 37.738521]} />
                            <Placemark geometry={[55.683758, 37.738521]} />
                        </Fragment>
                    }
                </Map>
            </YMaps>
            {isSidebarOpen ?
                false
                :
                <ButtonGrey classMod="my-map" text="Добавить адрес" onClick={() => dispatch(setIsSidebarOpen(true))}/>
            }
        </div>
    )
}

export default MyMap
