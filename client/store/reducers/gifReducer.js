const initialState = {
    gifs: []
}

export default function inputReducer(state = initialState, action) {
    switch (action.type) {
        case "fetchGifs/success":
            return { ...state, gifs: action.payload }
        case "fetchNewGifs/success":
            return { ...state, gifs: [...state.gifs,...action.payload] }
        default:
            return state;
    }
}