const initialState = {
    inputState: {url:""}
}

export default function inputReducer(state = initialState, action) {
    switch (action.type) {
        case "setInputState/success":  
            return { ...state, inputState: action.payload }    
        default:
            return state;
    }
}