


export function setInputState(input) {
    return async (dispatch, getState) => {
        try {          
            dispatch({
                type: "setInputState/success",
                payload: input
            })
            
            
            
        } catch (error) {
            console.error(error)
        }
    
    }
}









