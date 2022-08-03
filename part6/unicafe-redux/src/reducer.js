const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log("action",action)
  const estado = {
    good: state.good,
    ok: state.ok,
    bad: state.bad
  }
  switch (action.type) {
    case 'GOOD':
     estado.good += 1
      return estado
    case 'OK':
      estado.ok += 1
      return estado
    case 'BAD':
      estado.bad += 1
      return estado
    case 'ZERO':
      return {
        good: 0,
        bad: 0,
        ok: 0
      }
        
      
    default: return state
  }
  
}

export default counterReducer