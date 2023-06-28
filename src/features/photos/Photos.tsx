import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch} from "app/hooks";
import {appSlice} from "app/appSlice";

export const Photos = ()=>{
    const url = useLocation().pathname
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(appSlice.actions.setCurrentURL(url))
    },[])

    return <div>photos</div>
}