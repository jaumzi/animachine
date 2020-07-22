import React, { memo } from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Breadcrumbs, Typography, Link } from '@material-ui/core';
import { NavigateNext as NavigateNextIcon } from '@material-ui/icons';
import { IsMobile } from 'util/Methods';

const useStyles = makeStyles(theme => ({
    link: {
        textDecorationColor: theme.palette.primary
    },
    breadcrumbPaper: {
        padding: '2px 8px',
        backgroundColor: '#8e8e8e8e',
    },
    breadcrumbSeparator: {
        margin: '0px 2px',
    }
}));

function BreadCrumb(props) {
    const classes = useStyles();
    const getNumberBySize = () => (IsMobile() ? 2 : 3);

    const { data, clickMode } = props;
    const itens = getNumberBySize();

    let ActionElement = ({ children, b }) =>
        <Link
            component={LinkRouter}
            href={b.link}
            to={b.link}
            color="inherit"
            className={classes.link}
        >
            {children}
        </Link>

    if (clickMode) {
        ActionElement = ({ children, b }) =>
            <Link
                component={LinkRouter}
                href='#'
                to='#'
                color="inherit"
                onClick={b.action}
                className={classes.link}
            >
                {children}
            </Link>
    }

    return (
        <Paper elevation={0} className={classes.breadcrumbPaper}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                arial-label="Breadcrumb"
                maxItems={itens}
                itemsAfterCollapse={itens < 3 ? 1 : 2}
                itemsBeforeCollapse={1}
                classes={{
                    separator: classes.breadcrumbSeparator,
                }}
            >
                {data && data.map((b, i) => {

                    if (i === data.length - 1 || !b.link) {
                        return (
                            <Typography
                                key={`breadcrumb-${i}`}
                                variant="subtitle1"
                                color="secondary"
                            >
                                <strong>
                                    {b.name}
                                </strong>
                            </Typography>
                        );
                    }
                    return (
                        <ActionElement key={`breadcrumb-${i}`} {...{ b }} >
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                            >
                                {b.name}
                            </Typography>
                        </ActionElement>
                    );
                })}
            </Breadcrumbs>
        </Paper>
    );
}


export default memo(BreadCrumb);