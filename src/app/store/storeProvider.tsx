'use client'

import { Provider } from "react-redux"
import store from "./store"

//@ts-expect-error: unknown
function StoreProvider({children}) {
  return <Provider store={store} >{children}</Provider>
}

export default StoreProvider;