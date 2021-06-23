import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: "25%",
        height: "225px",
        margin: "30px 20px 35px 20px",
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    BidAmount: {
        display: 'flex !important',
        alignItems: 'center'
    },
    toggle: {
        marginLeft: "10px",
        marginTop: "5px"
    }

}));

export default function DisplayCard(props) {
    const { user } = props;
    const [toggle, setToggle] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        const Bids = []
        if (user) {
            if (user?.bids?.length) {
                user.bids.forEach((bid) => {
                    Bids.push(bid.amount)
                })
                user.maxBid = Math.max(...Bids)
                user.minBid = Math.min(...Bids)
            }
            else {
                user.maxBid = 0;
            }
        }
    }, [])

    const handleToggle = () => {
        setToggle(prev => !prev)
    }


    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.cover}
                image={user.avatarUrl}
                title="Live from space album cover"
            />

            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {user.firstname + " " + user.lastname}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Email: {user.email}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Phone: {user.phone}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Bids: {user.bids.length}
                    </Typography>
                    <Typography className={classes.BidAmount} variant="subtitle1" color="textSecondary">
                        Max Bid: {user.maxBid}<span onClick={handleToggle} className={classes.toggle}>
                            {toggle ? (<AiFillCaretUp />) : (<AiFillCaretDown />)}

                        </span>
                    </Typography>
                    {toggle && <Typography className={classes.BidAmount} variant="subtitle1" color="textSecondary">
                        Min Bid: {user.minBid}
                    </Typography>}

                </CardContent>
            </div>

        </Card>
    );
}
