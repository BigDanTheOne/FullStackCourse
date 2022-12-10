import Slide from "@mui/material/Slide";
import {styled} from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@material-ui/core/Divider";
import React from 'react';
import GoogleFontLoader from 'react-google-font-loader';
import NoSsr from '@material-ui/core/NoSsr';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import { Info, InfoSubtitle, InfoTitle } from '@mui-treasury/components/info';
import { useApexInfoStyles } from '@mui-treasury/styles/info/apex';
import { useGraphicBtnStyles } from '@mui-treasury/styles/button/graphic';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Div1 = styled('div')(({ theme }) => ({
    padding: theme.spacing(0.5),
    fontFamily: 'Ubuntu',
    fontSize: '13px',
    fontWeight: 'bold',
    color: 'green'
}));
const Div2 = styled('div')(({ theme }) => ({
    padding: theme.spacing(0.5),
    fontFamily: 'Ubuntu',
    fontSize: '20px',
}));
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

export default function Card({
                   thumbnail,
                   title,
                   subtitle,
                   description,
                    event_id,
                    user_id,
                    reloadData,
                    joined = false,
               })
{
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    function handleClickButton(event_id, user_id, join = true) {
        fetch(`http://127.0.0.1:5000/api/events/joinUser/?event_id=${event_id}&user_id=${user_id}&join=${!join}`,
            {
                headers: {
                    "content_type": "application/json",
                },
                method: "GET",
            })
            .then((response) => response.json())
            .then((data_) => {
                if (data_ === true) {
                    return true
                }
                // console.log(reloadData)
                reloadData();
            });
    };

    const handleClose = () => {
        setOpen(false);
    };
    const styles = useStyles();
    const btnStyles = useGraphicBtnStyles();
    return (
        <div className={styles.root}>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Column className={styles.card}>
                    <Row p={2} gap={2}>
                        <Avatar
                            className={styles.logo}
                            variant={'rounded'}
                            src={thumbnail}
                        />
                        <Info position={'top'} useStyles={useApexInfoStyles}>
                            <Div1 size="large">{title}</Div1>
                            <Div2 size="large">{subtitle}</Div2>
                        </Info>
                    </Row>
                    <Divider className={styles.divider} light/>
                    <Info position={'top'} useStyles={useApexInfoStyles}>
                        <Div2 size="large">{description}</Div2>
                    </Info>
                    <Row p={1} gap={2} position={'bottom'}>
                        <Item>
                            {/*<AvatarGroup max={4} classes={{avatar: styles.avatar}}>*/}
                            {/*    {new Array(5).fill(0).map((_, index) => (*/}
                            {/*        <Avatar*/}
                            {/*            key={index}*/}
                            {/*            src={`https://i.pravatar.cc/300?img=${Math.floor(*/}
                            {/*                Math.random() * 30*/}
                            {/*            )}`}*/}
                            {/*        />*/}
                            {/*    ))}*/}
                            {/*</AvatarGroup>*/}
                        </Item>
                        <Item position={'middle-right'}>
                            <Button
                                className={styles.join}
                                classes={btnStyles}
                                variant={'contained'}
                                color={'primary'}
                                disableRipple
                            >
                                {joined ? 'Не смогу' : 'Откликнуться'}
                            </Button>
                        </Item>
                    </Row>
                </Column>
            </Dialog>
            <Column className={styles.card} onClick={handleClickOpen}>
                <Row p={2} gap={2}>
                    <Avatar
                        className={styles.logo}
                        variant={'rounded'}
                        src={thumbnail}
                    />
                    <Info position={'top'} useStyles={useApexInfoStyles}>
                        <Div1 size="large">{title}</Div1>
                        <Div2 size="large">{subtitle}</Div2>
                    </Info>
                </Row>
                <Row p={1} gap={2} position={'bottom'}>
                        <Item>
                            {/*<AvatarGroup max={4} classes={{avatar: styles.avatar}}>*/}
                            {/*    {new Array(5).fill(0).map((_, index) => (*/}
                            {/*        <Avatar*/}
                            {/*            key={index}*/}
                            {/*            src={`https://i.pravatar.cc/300?img=${Math.floor(*/}
                            {/*                Math.random() * 30*/}
                            {/*            )}`}*/}
                            {/*        />*/}
                            {/*    ))}*/}
                            {/*</AvatarGroup>*/}
                        </Item>
                        <Item position={'middle-right'} onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleClickButton(event_id, user_id, joined === true);
                        }}>
                            <Button
                                className={styles.join}
                                classes={btnStyles}
                                variant={'contained'}
                                color={'primary'}
                                disableRipple
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleClickButton(event_id, user_id, joined === true);
                                }}
                            >
                                {joined ? 'Не смогу' : 'Откликнуться'}
                            </Button>
                        </Item>
                    </Row>
            </Column>
        </div>
    );
};
