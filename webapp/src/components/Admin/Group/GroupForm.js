import {DeleteButton, EditButton, Create, Datagrid, Edit, List, SimpleForm, TextField, TextInput} from "react-admin";
import React from "react";

export const GroupList = () => (
    <List sx={{width: 800, marginLeft: 20
}}>
        <>
            <Datagrid rowClick={"edit"}>
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="shortName" />
            </Datagrid>
        </>
    </List>
)
export const GroupCreate = (props) => (
    <Create {...props} redirect="list">
        <SimpleForm>
            <TextInput source="name"/>
            <TextInput source="shortName"/>
        </SimpleForm>
    </Create>
);
export const GroupEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled={true} source="id" />
            <TextInput source="name"/>
            <TextInput source="shortName"/>
        </SimpleForm>
    </Edit>
);