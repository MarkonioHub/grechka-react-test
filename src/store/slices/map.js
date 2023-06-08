import { createSlice } from '@reduxjs/toolkit'

// Slice

const initialState = {
    addresses: [],
    isSidebarOpen: false,
    currentAddress: ""
}

export const map = createSlice({
    name: 'map',
    initialState,
    reducers: {
        SET_ADDRESSES: (state, action) => {
            state.addresses = action.payload
        },
        SET_CURRENT_ADDRESS: (state, action) => {
            state.currentAddress = action.payload
        },
        SET_IS_SIDEBAR_OPEN: (state, action) => {
            state.isSidebarOpen = action.payload
        },
    },
})

export default map.reducer

// Actions

const { SET_ADDRESSES, SET_IS_SIDEBAR_OPEN, SET_CURRENT_ADDRESS } = map.actions

export const setAddresses = () => {
    return async dispatch => {
        try {
            const addresses = localStorage.getItem('addresses')
            dispatch(SET_ADDRESSES(addresses))
        } catch (e) {
            console.log(e)
        }
    }
}

export const setIsSidebarOpen = (value) => {
    return dispatch => {
        dispatch(SET_IS_SIDEBAR_OPEN(value))
    }
}

export const setCurrentAddress = (value) => {
    return dispatch => {
        console.log(value)
        dispatch(SET_CURRENT_ADDRESS(value))
    }
}
