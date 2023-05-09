import { combineReducers } from "redux";
import inputReducer from "./inputReducer";



const rootReducer = combineReducers({
     inputState : inputReducer
}) 

export default rootReducer
