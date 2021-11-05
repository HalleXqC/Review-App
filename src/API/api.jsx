export const API_KEY = "AIzaSyBZVMiUPdaVlD-k833NacLXLOrb8yzqKXM"
export const BASE_REG_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
export const BASE_LOG_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
export const BASE_SAVEDATA_URL = `https://review-app-4b9fd-default-rtdb.europe-west1.firebasedatabase.app`

export const API = {
    signUp: (data) => {
        return fetch(BASE_REG_URL, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        })
    },
    signIn: (data) => {
        return fetch(BASE_LOG_URL, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        })
    },
    saveData: (data, url, userId) => {
        return fetch(`${BASE_SAVEDATA_URL}/${url}/${userId}.json`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },  
            body: data
        })
    },
    post: (data , url , userId) => {
        return fetch(`${BASE_SAVEDATA_URL}/${url}/${userId}.json`, {
            method: 'POST',
            body: data
        })
    },
    get: (url , userId) => {
        return fetch(`${BASE_SAVEDATA_URL}/${url}/${userId}.json`)
    },
    delete: (url, id) => {
        return fetch(`${BASE_SAVEDATA_URL}/${url}/${id}.json`, {
            method: 'DELETE'
        })
    },
    patch: (data, url, id) => {
        return fetch(`${BASE_SAVEDATA_URL}/${url}/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        })
    }
}