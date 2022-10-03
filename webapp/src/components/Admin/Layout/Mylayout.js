// in src/MyLayout.js
import { Layout } from 'react-admin';
import React from "react";
import { MyAppBar } from './MyAppBar';
import {MyMenu} from "./MyMenu";

export const MyLayout = props => <Layout {...props} appBar={MyAppBar} menu={MyMenu} sx={{ '& .RaLayout-appFrame': { marginTop: 0 }}}/>;