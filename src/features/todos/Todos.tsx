import {useEffect} from "react";
import {appSlice} from "app/appSlice";
import {useAppDispatch} from "app/hooks";
import {useLocation} from "react-router-dom";

export const Todos = ()=>{
    const url = useLocation().pathname
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(appSlice.actions.setCurrentURL(url))
    },[])


    return <div>Todos</div>
}