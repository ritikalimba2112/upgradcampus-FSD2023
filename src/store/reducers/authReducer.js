// first try to get from local storage if not found then set default value
const initialState = {
   isLogin: localStorage.getItem("isLogin") === "true" ? true : false,
   isAdmin: localStorage.getItem("isAdmin") === "true" ? true : false,
   isRequestLogin: false,
   token: localStorage.getItem("token"),
   error: null,
   userId: localStorage.getItem("userId")
}

export default (state = initialState, action) => {
   switch (action.type) {
      case 'SIGN_IN_REQUEST':
         return {
            ...state,
            isLogin: false,
            isAdmin: false,
            isRequestLogin: true,
            error: null,
            token: null
         }
      case 'SIGN_IN_SUCCESS':
         localStorage.setItem("userId", action.payload.userId)
         localStorage.setItem("token", action.payload.token)
         localStorage.setItem("isAdmin", action.payload.isAdmin)
         localStorage.setItem("isLogin", true)

         return {
            ...state,
            isLogin: true,
            isAdmin: action.payload.isAdmin,
            isRequestLogin: false,
            error: null,
            token: action.payload.token,
            userId: action.payload.userId
         }
      case 'SIGN_IN_FAILED':
         return {
            ...state,
            isLogin: false,
            isAdmin: false,
            isRequestLogin: false,
            error: action.payload,
            token: null

         }
      case "SIGN_UP_SUCCESS": {
         console.log('signed up success');
         window.location.replace("/signin")
         return {
            ...state,
            isLogin: false,
            isAdmin: false,
            isRequestLogin: false,
            error: null,
            token: null
         }
      }
      case 'SIGN_OUT': {
         localStorage.removeItem("userId")
         localStorage.removeItem("token")
         localStorage.removeItem("isAdmin")
         localStorage.removeItem("isLogin")
         window.history.pushState({}, null, "/")
         return {
            ...state,
            isLogin: false,
            isAdmin: false,
            isRequestLogin: false,
            error: null,
            token: null
         }
      }
      default:
         {
            return state
         }
   }

}