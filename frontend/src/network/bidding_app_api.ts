import { Item } from "../models/item"
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
    const response = await fetchData("/api/users", { method: "GET"})
    return response.json()
}

//signUp APIs
export interface SignupCredentials {
    username: string,
    email: string,
    password: string,
    wallet: number
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
    password: string,
    wallet: number
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


export interface ItemInput {
    _id: string,
    itemName: string,
    currentPrice: number,
    duration: string,
    status: string
}


export async function createItem (item: ItemInput): Promise<Item> {
    const response = await fetchData("/api/items",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
    return response.json()
}
export async function fetchItems(): Promise<Item[]>{
    const response = await fetchData("api/items/", { method: "GET"})
    return response.json()
}

export async function updateItem(itemId:string): Promise<Item>{ console.log(itemId)
    const response = await fetchData("/api/items/bid/"+ itemId,
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        // body: JSON.stringify(user)
    })
    return response.json()
}


export async function closeItem(itemId:string): Promise<Item>{ console.log(itemId)
    const response = await fetchData("/api/items/closeItem/"+ itemId,
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        // body: JSON.stringify(user)
    })
    return response.json()
}
export async function updateUser(userId:string, user: SignupCredentials): Promise<User> { 
    const response = await fetchData("/api/users/" + userId, 
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    })

    return response.json()
}