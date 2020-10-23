import React from 'react';
import { green, red, purple } from '@material-ui/core/colors';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CancelIcon from '@material-ui/icons/Cancel';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
const ListCategories = [
    {
        name: 'Went Well',
        color: green[500],
        icon: <AssignmentIcon/>,
        id: 'well'
    },
    {
        name: 'To Improve',
        color: red['A400'],
        icon: <CancelIcon/>,
        id: 'improve'
    },
    {
        name: 'Action Item',
        color: purple[800],
        icon: <InsertDriveFileIcon/>,
        id: 'action'
    }
]
export default ListCategories;