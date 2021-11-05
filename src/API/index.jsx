import { API } from "./api";

export const registerNewUser = data => {
    return API.signUp(JSON.stringify(data)) 
}

export const signIn = data => {
    return API.signIn(JSON.stringify(data))
}

export const saveLogData = (data, userId) => {
    return API.saveData(JSON.stringify(data), 'users', userId)
}

export const saveReviewIntoUserData = (data, userId) => {
    return API.post(JSON.stringify(data), 'users', `${userId}/reviews`)
}

export const getUsers = userId => {
    return API.get('users', userId)
}

export const getUser = userId => {
    return API.get('users', userId)
}

export const editUser = (data, userId) => {
    return API.patch(JSON.stringify(data), 'users', userId)
}

export const sendReview = (data , userId) => {
    return API.post(JSON.stringify(data), 'reviews' , userId)
}

export const getAllReviews = id => {
    return API.get('reviews' , id)
}

export const sendComment = (data, reviewId) => {
    return API.post(JSON.stringify(data), 'reviews', `${reviewId}/comments`)
}

export const getComments = reviewId => {
    return API.get('reviews', `${reviewId}/comments`)
}

export const deleteComment = (reviewId, commentId) => {
    return API.delete('reviews', `${reviewId}/comments/${commentId}`)
}

export const deleteReview = (url, id) => {
    return API.delete(url, id)
}

export const sendReviewIntoMovie = (data, movieId) => {
    return API.post(JSON.stringify(data), 'movies', `${movieId}/reviews`)
}

export const getMovies = () => {
    return API.get('movies', '')
}

export const getSingleMovie = id => {
    return API.get('movies', id)
}