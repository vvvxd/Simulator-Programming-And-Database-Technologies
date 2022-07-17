import {Edit, ReferenceInput, PasswordInput, SelectInput, Create, Datagrid, DeleteButton, EditButton, List, SimpleForm, TextField, TextInput} from "react-admin";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadGroups} from "../../../services/group/groupActions";
export const UserList = () => (
    <List>
            <Datagrid>
                <TextField source="id" />
                <TextField source="firstName" />
                <TextField source="lastName" />
                <TextField source="email" />
                <TextField source="userGroupId" />
                <TextField source="role" />
                <TextField source="status" />
                <TextField source="firstEntry" />
                <TextField source="tasksSolved" />
                <TextField source="tasksSent" />
                <TextField source="tasksTotal" />
                <EditButton basePath="/users"/>
                <DeleteButton basePath="/users"/>
            </Datagrid>
    </List>
)
export const UserCreate = (props) => {

    return (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="email" multiline={true} fullWidth={true}/>
            <PasswordInput source="password"/>
            <TextInput source="firstName" multiline={true} fullWidth={true}/>
            <TextInput source="lastName" multiline={true} fullWidth={true}/>
            <ReferenceInput label="userGroupId" source="userGroupId" reference="groups">
                <SelectInput optionText="id" />
            </ReferenceInput>
            <SelectInput source="role" choices={[
                {id: 'USER', name: 'USER'},
                {id: 'ADMIN', name: 'ADMIN'},
            ]}/>
        </SimpleForm>
    </Create>);
};

export const UserEdit = (props) => {

    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput source="email" multiline={true} fullWidth={true}/>
                <PasswordInput source="password"/>
                <TextInput source="firstName" multiline={true} fullWidth={true}/>
                <TextInput source="lastName" multiline={true} fullWidth={true}/>
                <ReferenceInput label="userGroupId" source="userGroupId" reference="groups">
                    <SelectInput optionText="id" />
                </ReferenceInput>
                <SelectInput source="role" choices={[
                    {id: 'USER', name: 'USER'},
                    {id: 'ADMIN', name: 'ADMIN'},
                ]}/>
            </SimpleForm>
        </Edit>);
};
