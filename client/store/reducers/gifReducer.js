const initialState = {
    gifs: []
}

export default function inputReducer(state = initialState, action) {
    switch (action.type) {
        case "fetchGifs/success":
            console.log('first fetch triggered');
            return { ...state, gifs: action.payload }
        case "fetchNewGifs/success":
            console.log('new triggered');
            return { ...state, gifs: [...state.gifs,...action.payload] }
        default:
            return state;
    }
}