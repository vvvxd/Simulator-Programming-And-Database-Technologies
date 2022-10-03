import {
    Create,
    Datagrid,
    WrapperField,
    Edit,
    EditButton,
    List,
    SimpleForm,
    TextField,
    TextInput,
    DeleteButton
} from "react-admin";
import React from "react";
import {RichTextInput} from "ra-input-rich-text";

export const TaskList = () => (
    <List>
        <>
            <Datagrid rowClick={"edit"}>
                <TextField source="id" />
                <TextField source="referenceQuery" />
                <TextField source="title" />
                <TextField source="serialNumber" />
                <TextField source="description" />
                <TextField source="decidedRight" />
                <TextField source="decidedWrong" />
                <TextField source="totalAttempts" />
                <TextField source="queryHistoryId" />
            </Datagrid>
        </>
    </List>
)
export const TaskCreate = (props) => (
    <Create {...props} redirect="list">
        <SimpleForm>
            <TextInput source="referenceQuery" multiline={true} fullWidth={true}/>
            <TextInput source="title" multiline={true} fullWidth={true}/>
            <TextInput source="serialNumber" />
            <TextInput source="description" multiline={true} fullWidth={true}/>
        </SimpleForm>
    </Create>
);
export const TaskEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled={true} source="id" />
            <TextInput source="referenceQuery" multiline={true} fullWidth={true}/>
            <TextInput source="title" multiline={true} fullWidth={true}/>
            <TextInput source="serialNumber" />
            <TextInput source="description" multiline={true} fullWidth={true}/>
        </SimpleForm>
    </Edit>
);