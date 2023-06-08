import { configureStore } from '@reduxjs/toolkit'

import map from './slices/map'

export const store = configureStore({
    reducer: { map },
})
