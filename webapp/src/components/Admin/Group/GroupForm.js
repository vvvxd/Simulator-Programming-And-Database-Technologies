import {DeleteButton, EditButton, Create, Datagrid, Edit, List, SimpleForm, TextField, TextInput} from "react-admin";
import React from "react";

export const GroupList = () => (
    <List>
        <>
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="shortName" />
                <EditButton basePath="/groups"/>
                <DeleteButton basePath="/groups"/>
            </Datagrid>
        </>
    </List>
)
export const GroupCreate = (props) => (
    <Create {...props}>
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