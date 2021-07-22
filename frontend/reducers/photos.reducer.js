export default photosReducer = (state = [], action) => {
    switch (action.type) {
        case "addPhoto":
            return [...state, action.photo];
        default:
            return state;
    }
}