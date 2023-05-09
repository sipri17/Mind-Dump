import { apiKey } from '@env'


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

export function fetchGifs(search) {
    return async (dispatch, getState) => {
        try {    
            const response = await fetch(
                `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}&limit=20&offset=0&rating=g&lang=en`
            );      
            if (!response.ok) {
                throw await res.json()
            }
            const {data} = await response.json()
            dispatch({
                type: "fetchGifs/success",
                payload: data
            })
            
            
            
        } catch (error) {
            console.error(error)
        }
    
    }
}

export function fetchNewGifs(search,offset,setLoading) {
    return async (dispatch, getState) => {
        try {    
            setLoading(true)
            const response = await fetch(
                `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}&limit=20&offset=${offset}&rating=g&lang=en`
            );      
            if (!response.ok) {
                throw await res.json()
            }
            const {data} = await response.json()
            dispatch({
                type: "fetchNewGifs/success",
                payload: data
            })
            
            
            
        } catch (error) {
            console.error(error)
        }finally{
            setLoading(false)
        }
    
    }
}









