import React from 'react';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const Data = [
    {
        title: 'Users',
        path: '#',
        icons: <IoIcons.IoMdPeople/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        subNav: [
            {
                title: 'Users',
                path: '/',
                icons: <IoIcons.IoIosPaper/>
            },
            {
                title: 'Create User',
                path: '/createUser',
                icons: <IoIcons.IoIosPaper/>
            }
        ]
    },
    {
        title: 'Polls',
        path: '#',
        icons: <IoIcons.IoMdPeople/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        subNav: [
            {
                title: 'Polls',
                path: '/polls',
                icons: <IoIcons.IoIosPaper/>
            },
            {
                title: 'Create Poll',
                path: '/createPoll',
                icons: <IoIcons.IoIosPaper/>
            }
        ]
    }
]