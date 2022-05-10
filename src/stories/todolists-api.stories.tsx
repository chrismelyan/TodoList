import React, {useEffect, useState} from 'react';
import axios from "axios";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        let promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', {
            withCredentials: true
        })
        promise.then(res => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const title = 'React 18.0'
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, {
            withCredentials: true,
            headers: {
                'API-KEY': '344e1d93-75ad-4579-8284-aae71a3ea37e'
            }
        }).then(res => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = "36950fd3-fd2b-425b-8b87-85645d51bc79"
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {
            withCredentials: true,
            headers: {
                'API-KEY': '344e1d93-75ad-4579-8284-aae71a3ea37e'
            }
        }).then(res => {

        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = "3fa2e76a-a0e2-4ec4-b833-1b0bc2ebb076"
        const title = 'NOOOOOOOOOO!!!!!!'
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title}, {
            withCredentials: true,
            headers: {
                'API-KEY': '344e1d93-75ad-4579-8284-aae71a3ea37e'
            }
        }).then(res => {

        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}