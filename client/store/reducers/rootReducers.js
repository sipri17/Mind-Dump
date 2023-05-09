import { combineReducers } from "redux";
import inputReducer from "./inputReducer";
import gifReducer from "./gifReducer"



const rootReducer = combineReducers({
     inputState : inputReducer,
     gifs: gifReducer
}) 

export default rootReducer
