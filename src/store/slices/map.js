import { createSlice } from '@reduxjs/toolkit'

// Slice

const initialState = {
    addresses: [],
    isSidebarOpen: false,
    currentAddress: { text: "", lat: "", lon: "" },
    isLoading: true
}

export const map = createSlice({
    name: 'map',
    initialState,
    reducers: {
        SET_IS_LOADING: (state, action) => {
            state.isLoading = action.payload
        },
        SET_ADDRESSES: (state, action) => {
            state.addresses = action.payload
        },
        ADD_ADDRESS: (state, action) => {
            state.addresses = [...state.addresses, action.payload]
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

const {
    SET_IS_LOADING,
    SET_ADDRESSES,
    SET_IS_SIDEBAR_OPEN,
    SET_CURRENT_ADDRESS,
    ADD_ADDRESS
} = map.actions

export const setIsLoading = (value) => {
    return dispatch => {
        dispatch(SET_IS_LOADING(value))
    }
}

export const setAddresses = (addresses) => {
    return dispatch => {
        dispatch(SET_ADDRESSES(addresses))
    }
}

export const addAddress = (newAddress) => {
    return dispatch => {
        dispatch(ADD_ADDRESS(newAddress))
    }
}

export const setIsSidebarOpen = (value) => {
    return dispatch => {
        dispatch(SET_IS_SIDEBAR_OPEN(value))
    }
}

export const setCurrentAddress = (value) => {
    return dispatch => {
        dispatch(SET_CURRENT_ADDRESS(value))
    }
}
