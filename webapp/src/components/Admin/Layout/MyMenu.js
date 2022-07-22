import * as React from 'react';
import "./layout.css"
import { Menu } from 'react-admin';

export const MyMenu = (props) =>(
    <Menu className={"my-menu"}>
        <Menu.Item to="/groups" primaryText="Group"/>
        <Menu.Item to="/tasks" primaryText="Task"/>
        <Menu.Item to="/users" primaryText="User"/>
    </Menu>
)