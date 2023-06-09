import React, {Fragment, useState} from "react"
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import {useDispatch, useSelector} from "react-redux"

import ButtonGrey from "../../UI/ButtonGrey/ButtonGrey"

import {setCurrentAddress, setIsLoading, setIsSidebarOpen} from "../../store/slices/map"

import "./my-map.css"

const MyMap = () => {
    const isSidebarOpen = useSelector(state => state.map.isSidebarOpen)
    const addresses = useSelector(state => state.map.addresses)
    const currentAddress = useSelector(state => state.map.currentAddress)
    const dispatch = useDispatch()
    const [ymapsState, setYmapsState] = useState()

    async function geocode(coords) {
        let firstGeoObject
        await ymapsState.geocode(coords)
            .then(result => {
                firstGeoObject = result.geoObjects.get(0)
            })
        return firstGeoObject.getAddressLine()
    }

    async function addCurrentAddress (coords) {
        if (!isSidebarOpen) return
        const addressText = await geocode(coords)
        dispatch(setCurrentAddress({ text: addressText, lat: coords[0], lon: coords[1] }))
    }

    return (
        <div className="my-map">
            {isSidebarOpen || addresses.length ?
                false
                :
                <div className="my-map__note">Нет сохранённых адресов</div>
            }
            <YMaps className="my-map" query={{ load: "package.full", apikey: "a5819b53-021d-4395-84b9-44402f49add0" }}>
                <Map
                    className="my-map__box"
                    onLoad={(ymaps) => {
                        dispatch(setIsLoading(false))
                        setYmapsState(ymaps)
                    }}
                    defaultState={{ center: [55.75, 37.57], zoom: 9 }}
                    onClick={(e) => addCurrentAddress(e._sourceEvent.originalEvent.coords)}
                >
                    {isSidebarOpen ?
                        <Fragment>
                            {currentAddress.lat && currentAddress.lon ?
                                <Placemark geometry={[currentAddress.lat, currentAddress.lon]} />
                                : false
                            }
                        </Fragment>
                        :
                        <Fragment>
                            {addresses.map((item, key) =>
                                <Placemark key={key} geometry={[item.lat, item.lon]}
                                           properties={{balloonContent: `<div class='balloon-title'>${item.title}</div><div class='balloon-description'>${item.description}</div>`}}
                                           modules={['geoObject.addon.balloon']}/>
                            )}
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
