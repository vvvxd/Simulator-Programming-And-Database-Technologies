import * as React from 'react';
import { AppBar } from 'react-admin';
import "./layout.css";

export const MyAppBar = (props) =>(
    <AppBar
        sx={{
            "& .RaAppBar-title": {
                flex: 1,
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
            },
            background: "#bebebe",
            height: 75,
        }}
        {...props}
    >
        <div className={"my-css"}>
            <a href={"/"} className={"text"}>
                <h5>Main</h5>
            </a>
        </div>

    </AppBar>
)