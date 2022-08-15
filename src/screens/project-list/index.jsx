import React from 'react'
import {SearchPanel} from './search-panel'
import {List} from './list'
import {useEffect, useState} from 'react'
import {cleanObject} from '../../utils'
import * as qs from 'qs'
const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () =>{
    const [param, setParam] = useState({
        name:'',
        personId:''
    })
    const [ list, setList] = useState([])
    const [ users, setUsers] = useState([])


    useEffect(() =>{
        fetch( `${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response =>{
            if (response.ok){
                console.log("response",response)
                setList(await response.json())
            }
        })
    },[param])

    useEffect(()=>{
        fetch( `${apiUrl}/users`).then(async response =>{
            if (response.ok){
                console.log("response",response)
                setUsers(await response.json())
            }
        })
    },[])
    return <div>
        <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
        <List users={users} list={list}></List>
    </div>
}