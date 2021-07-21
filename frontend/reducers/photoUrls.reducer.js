export default photoUrlsReducer = (state = [], action) => {
    switch (action.type) {
        case "addPhotoUrl":
            return [...state, action.url];
        default:
            return state;
    }
}