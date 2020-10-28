import React from 'react';
import { green, red, purple } from '@material-ui/core/colors';
import {Assignment, Cancel, InsertDriveFile}  from '@material-ui/icons';

const ListCategories = [
    {
        name: 'Went Well',
        color: green[500],
        icon: <Assignment/>,
        id: 'well'
    },
    {
        name: 'To Improve',
        color: red['A400'],
        icon: <Cancel/>,
        id: 'improve'
    },
    {
        name: 'Action Item',
        color: purple[800],
        icon: <InsertDriveFile/>,
        id: 'action'
    }
]
export default ListCategories;