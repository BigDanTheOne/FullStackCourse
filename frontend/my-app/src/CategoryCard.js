import React from 'react';
import Color from 'color';
import GoogleFont from 'react-google-font-loader';
import { makeStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';

const useStyles = makeStyles(() => ({
    actionArea: {
        borderRadius: 16,
        transition: '0.2s',
        '&:active': {
            transform: 'scale(1.1)',
        },
    },
    card: ({ color }) => ({
        width: 120,
        height: 130,
        borderRadius: 16,
        '&:hover': {
            // boxShadow: `0 6px 12px 0 ${Color(color)
            //     .rotate(-12)
            //     .darken(0.2)
            //     .fade(0.5)}`,
        },
    }),
    content: ({ color }) => {
        return {
            backgroundColor: color,
            // padding: '1rem 1rem 1rem',
        };
    },
    title: {
        fontFamily: 'Keania One',
        fontSize: '1rem',
        color: '#fff',
        textTransform: 'uppercase',
    },
}));

export default function CustomCard({image, title, color }){
    const styles = useStyles({ color: color});
    const mediaStyles = useFourThreeCardMediaStyles();
    return (
        <CardActionArea className={styles.actionArea}>
            <Card className={styles.card}>
                <CardMedia classes={mediaStyles} image={image} />
                <CardContent className={styles.content}>
                    <Typography className={styles.title} variant={'h2'}>
                        {title}
                    </Typography>
                </CardContent>
            </Card>
        </CardActionArea>
    );
};


// <CustomCard
//     title={'Dota 2'}
//     subtitle={'Be a Legend!'}
//     image={
//         'https://steamcdn-a.akamaihd.net/apps/dota2/images/blog/play/dota_heroes.png'
//     }
//     color={'#203f52'}
// />

