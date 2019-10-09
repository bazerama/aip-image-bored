export function getLoggedInUser() {
    const currentUser = localStorage.getItem('user');
    if (currentUser == null) {
        // modify this to become a global const.
        return Promise.reject('user not authenticated');
    }

    const userJson = JSON.parse(currentUser);
    var userId = userJson.user;

    return userId;
}
