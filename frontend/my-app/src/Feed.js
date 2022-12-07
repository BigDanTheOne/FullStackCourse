import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import AdbIcon from '@mui/icons-material/Adb';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InputBase from '@mui/material/InputBase';
import Dialog from "@mui/material/Dialog";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import PropTypes from "prop-types";
import TeamCardDemo from './Cards'
import TeamCard from "./Cards";
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import {blue, grey} from "@mui/material/colors";
import Tabs, {tabsClasses} from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import EventCard from "./EventCard"
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import {makeStyles} from "@material-ui/core/styles";
import {Column, Item, Row} from "@mui-treasury/components/flex";
import {Info} from "@mui-treasury/components/info";
import {useApexInfoStyles} from "@mui-treasury/styles/info/apex";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Button from "@material-ui/core/Button";
import CategoryCard from "./CategoryCard";
import { FixedSizeList as List } from 'react-window';
import {places} from "./places"
import Slide from "@mui/material/Slide";
import Popover from '@mui/material/Popover';
import CloseIcon from "@mui/icons-material/Close";
import {setPlacesIDs} from "./features/map/mapSlice";
import {addUsers} from './features/users/usersSlice'
import { useSelector, useDispatch } from 'react-redux';


const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 50,
    backgroundColor: alpha(grey[800], 0.15),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(() => ({
    divider: {
        margin: `10px 100px`
    },
    root: {
        height: '200px',
        transition: '0.3s',
        position: 'relative',
        '&:before': {
            transition: '0.2s',
            position: 'absolute',
            width: '100%',
            height: '100%',
            content: '""',
            display: 'block',
            backgroundColor: '#d9daf1',
            borderRadius: '1rem',
            zIndex: 0,
            bottom: 0,
            boxShadow: '-12px 12px 64px 0 #bcc3d6', // TODO: consider removing
        },
        '&:hover': {
            '&:before': {
                bottom: -6,
            },
            '& $card': {
                boxShadow: '-12px 12px 64px 0 #bcc3d6',
            },
        },
    },
    card: {
        zIndex: 1,
        position: 'relative',
        borderRadius: '1rem',
        boxShadow: '0 6px 20px 0 #dbdbe8',
        backgroundColor: '#fff',
        transition: '0.4s',
        height: '100%',
    },
    logo: {
        width: '100px',
        height: '100px',
        borderRadius: '0.75rem',
    },
    avatar: {
        fontFamily: 'Ubuntu',
        fontSize: '0.875rem',
        backgroundColor: '#6d7efc',
    },
    join: {
        background: 'linear-gradient(to top, #638ef0, #82e7fe)',
        '& > *': {
            textTransform: 'none !important',
        },
    },
}));

export default function ResponsiveAppBar(props) {
    let dispatcher = useDispatch();
    useEffect(() => {
        // fetch(`http://127.0.0.1:5000/api/events/eventFilter/?filters=${filter}`,
        //     {
        //         headers:{
        //             "content_type": "application/json",
        //         },
        //         method: "GET",
        //     })
        //     .then((response) => response.json())
        //     .then((data) => {console.log(data); feedData = data});
        // let EventIds = new Set()
        // for (let feedData of props.initFeedData){
        //     console.log("initFeedData: ", props.initFeedData )
        //     EventIds.add(feedData['id'])
        // }
        // EventIds = JSON.stringify([...EventIds])
        // fetch(`http://127.0.0.1:5000//api/events/getEventsMembers/?EventIds=${EventIds}`,
        //     {
        //         headers:{
        //             "content_type":"application/json",
        //         },
        //     })
        //     .then((response) => response.json())
        //     .then((data) => {console.log(data); dispatcher(addUsers(data))});
    }, []);
    const fetchFeed = async (Category = '["Granny"]') => {}

    const [value, setValue] = React.useState(0);
    const [feedData, setFeed] = React.useState(props.initFeedData);
    const [discovery, setDiscovery] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleChange = (event, newValue) => {
        switch (newValue) {
            case 0:
                props.setFilter({filterValue: '["Granny"]', loading: true})
                break;
            case 1:
                props.setFilter({filterValue: '["Kids"]', loading: true})
                break;
            case 2:
                props.setFilter({filterValue: '["Animals"]', loading: true})
                break;
            case 3:
                props.setFilter({filterValue: '["Poors"]', loading: true})
                break;
        }
    };

    // const handleClose = () => {
    //     setDiscovery(false);
    // };

    return (
    <React.Fragment>
        <AppBar>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <Typography>
                            Москва
                        </Typography>
                    </Box>
                    <Typography >
                        Помогатор
                    </Typography>
                    {/*<AdbIcon sx={{ display: { xs: 'flex', md: 'none', flexGrow: 1}, mr: 1 }} />*/}
                    <Typography sx={{flexGrow: 1}} />
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            sx={{ p: 2 }}
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton  sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp"/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        <StyledBox
            sx={{
                pt: 1,
                px: 2,
                pb: 2,
                height: `calc(100% - 76px)`,
                overflow: 'auto',
                position: 'relative',
                top: '56px',
            }}
        >
            <Popover
                open={discovery}
                anchorEl={anchorEl}
                sx={{position: "absolute", zIndex: 1, width: 1, height: "500px", ma: 5}}
            >
                <Box sx={{ width: 1, height: "500px", border: 0, borderRadius: 5, backgroundColor: grey[300], ma:5 }}>
                    The content of the Popper.
                </Box>
            </Popover>
            <Box sx={{ flexGrow: 1, padding:"0px 0px", bgcolor: 'background.paper' }}>
                <Tabs
                    variant="scrollable"
                    aria-label="scrollable auto tabs example"
                    value={false}
                    sx={{
                        [`& .${tabsClasses}`]: {
                            '&.Mui-disabled': { opacity: 0.8 },
                        },
                        padding: "0px 0px",
                        margin: "0px 0px"
                    }}
                    onChange={handleChange}
                >
                    <Tab icon={
                        <CategoryCard
                        title={'Бабушки'}
                        image={
                            'https://pic.rutubelist.ru/video/92/c0/92c032d06e1337a8312ad47bdb731152.jpg'
                        }
                        color={'#203f52'}
                        />
                    }
                    />
                    <Tab icon={
                        <CategoryCard
                            title={'Дети'}
                            image={
                                'https://fb.ru/media/i/2/5/6/8/5/2/7/i/2568527.jpg?1635177612'
                            }
                            color={'#203f52'}
                        />
                    }/>
                    <Tab icon={
                        <CategoryCard
                            title={'Животные'}
                            image={
                                'https://www.socialinform.ru/wp-content/uploads/2022/02/1shutterstock_662918968.jpeg'
                            }
                            color={'#203f52'}
                        />
                    }/>
                    <Tab icon={
                        <CategoryCard
                            title={'Бедные'}
                            image={
                                'https://boomcdn.azureedge.net/boomstarter/uploads/asset/image/377168/embed_asset.png'
                            }
                            color={'#203f52'}
                        />
                    }/>
                    }/>
                </Tabs>
            </Box>
            <TeamCard
                places = {props.initFeedData}
            />
        </StyledBox>
    </React.Fragment>);
}
