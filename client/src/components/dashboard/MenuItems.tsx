import React from 'react';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import People from '@mui/icons-material/People';
import Dashboard from '@mui/icons-material/Dashboard';
import BarChart from '@mui/icons-material/BarChart';

export const MenuItems = (
    <>
        <ListItemButton>
            <ListItemIcon>
                <Dashboard />
            </ListItemIcon>
            <ListItemText primary='Katas' />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <People />
            </ListItemIcon>
            <ListItemText primary='Users' />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <BarChart />
            </ListItemIcon>
            <ListItemText primary='Ranking' />
        </ListItemButton>
    </>
);
