const notificationReducer = (state = '', action) => {
    switch (action.type){
        case 'NOTIFICATION':
            return action.mensaje
        default:
            return state
    }
}
export const setNotification = (mensaje,dur) => {
    return async dispatch => {
        
        const duracion = dur*1000
        await dispatch({type: 'NOTIFICATION',
        mensaje:`${mensaje}`})
        setTimeout(() => dispatch({
          type: 'NOTIFICATION',
          mensaje: ''
        }),duracion)
    }
}


export default notificationReducer