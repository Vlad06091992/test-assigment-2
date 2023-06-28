import React, {FC, useEffect} from 'react'
import {Link, NavLink, Outlet, useNavigate} from 'react-router-dom'
import s from './Sidebar.module.css'
import closeIcon from './closeOutline.svg'
import {Button} from "@mui/material";
import {inspect} from "util";
import styles from "./Root.module.scss"
import {useSelector} from "react-redux";
import {RootState} from "app/store";


export const Root = () => {
    const navigate = useNavigate();
    const currentURL = useSelector((state: RootState) => state.app.currentURL)


    const button = {"display": "block", "margin": "20px", "width": "80%"}
    const activeButton = {...button,"background": "blue",}


    useEffect(() => {
        if (currentURL == '') {
            navigate('/posts');
        } else {
            navigate(currentURL)
        }
    }, [])


    return (
        <div className={styles.root}>
            <aside className={styles.aside}>
                <Link to={'posts'} style={{textDecoration: 'none'}}>
                    <Button
                        sx={ currentURL === "/posts" ? activeButton : button}
                        size={'large'}
                        variant="contained"
                        color={'primary'}
                    >
                        Posts
                    </Button>
                </Link>
                <Link to={'todos'} style={{textDecoration: 'none'}}>
                    <Button
                        sx={ currentURL === "/todos" ? activeButton : button}
                        size={'large'}
                        variant="contained"
                        color={'primary'}
                    >
                        Todos
                    </Button>
                </Link>
                <Link to={'photos'} style={{textDecoration: 'none'}}>
                    <Button
                        sx={ currentURL === "/photos" ? activeButton : button}
                        size={'large'}
                        variant="contained"
                        color={'primary'}
                    >
                        Photos
                    </Button>
                </Link>

            </aside>
            <div className={styles.rightLine}></div>
            <div className={styles.outlet}>
                <Outlet/>
            </div>
        </div>
    )
}
