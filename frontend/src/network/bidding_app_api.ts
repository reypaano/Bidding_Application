import { User } from "../models/user"


async function fetchData(input:RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init)
    if(response.ok)
        return response
    else {
        const errorBody = await response.json()
        const errorMessage = errorBody.error
        throw Error(errorMessage)
        
    }
}

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("/api/user", { method: "GET"})
    return response.json()
}

//signUp APIs
export interface SignupCredentials {
    username: string,
    email: string,
    password: string
}

export async function signUp (credentials: SignupCredentials): Promise<User> {
    const response = await fetchData("/api/users/signup",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })

    return response.json()
}

//login Credentials
export interface LoginCredentials {
    username: string,
    password: string
}

export async function login (credentials: LoginCredentials): Promise<User> {
    const response = await fetchData("/api/users/login",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })

    return response.json()
}

//logout
export async function logout() {
    await fetchData("/api/users/logout", { method: "POST"})
}
