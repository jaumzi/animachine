import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { ROUTES } from 'config/RoutesConfig';
import { useHistory } from 'react-router-dom';
import { Grid, CardActionArea } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        // display: 'flex',
        // flexDirection: 'column',
        // width: '100%',
    },
    content: {
        flex: '1 0 auto',
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
    cover: {
        minWidth: '130px',
        maxWidth: '130px',
        minHeight: '150px',
        maxHeight: '150px',
    },
}));

function ProgramCard(props) {
    const history = useHistory();
    const { program, fontId } = props;
    const classes = useStyles();

    function goToEpisodes() {
        history.push(ROUTES.PROGRAM_EPISODES.src(0, 0), { fontId, url: program.link }); // redireciona
    }

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={goToEpisodes} >
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                >
                    <Grid item xs={8}>
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                {/* <Grid
                                container
                                direction="column"
                                justify="space-between"
                            > */}
                                <Typography component="h5" variant="subtitle1">
                                    {program?.title}
                                </Typography>
                                {/* <DefaultLink variant="subtitle2" onClick={goToEpisodes} color="secondary">
                            <strong>
                                Ver episódios
                            </strong>
                        </DefaultLink> */}
                                {/* </Grid> */}
                            </CardContent>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        {program?.thumb && (
                            <CardMedia
                                className={classes.cover}
                                image={program.thumb}
                                title={program?.title}
                            />
                        )}
                    </Grid>
                </Grid>
            </CardActionArea>
        </Card>
    );
}


export default ProgramCard;