import React from 'react';
import {Admin, Resource} from 'react-admin';
import dataProvider from "./Provider/dataprovider";
import {UserCreate, UserEdit, UserList} from "./User/UserForm";
import {GroupCreate, GroupEdit, GroupList} from "./Group/GroupForm";
import {TaskCreate, TaskEdit, TaskList} from "./Task/TaskForm";
import {authProvider} from "./Provider/authProvider";
import {MyLayout} from "./Layout/Mylayout";
import {MyLogin} from "./Layout/MyLogin";

const Admins = () => {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider} layout={MyLayout} loginPage={MyLogin}>
      <Resource name="groups" list={GroupList} edit={GroupEdit} create={GroupCreate}/>
        <Resource name="users" list={UserList} create={UserCreate} edit={UserEdit}/>
        <Resource name="tasks" list={TaskList} create={TaskCreate} edit={TaskEdit}/>
    </Admin>
  )
}
export default Admins;