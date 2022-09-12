export const LOGIN = 'LOGIN'


const login = (state, token) => {
    return { token: token }
}


export const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return login(state, action.token)
        default:
            return state
    }
}