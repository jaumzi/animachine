import React, { memo, useState } from 'react';
import {
    InputBase,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { fade, makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import { ROUTES } from 'config/RoutesConfig';

const useStyles = makeStyles(theme => ({
    search: {
        display: 'flex',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 2),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    iconButton: {
        padding: 10,
    },
}));

function InputSearch(props) {
    let history = useHistory()
    const classes = useStyles();

    const [state, setState] = useState({
        search: '',
    });
    const { search } = state;

    function setValue (data) {
        const value = data.target.value;
        setState({
            ...state,
            search: value
        });
    }
    async function handleSubmit() {
        history.push(ROUTES.SEARCH.src(search), {search}); // redireciona
    }

    return (
        <div className={classes.search}>
            <InputBase
                placeholder="Buscar"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={setValue}
                value={search}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="btn-search" onClick={handleSubmit}>
                <SearchIcon />
            </IconButton>
        </div>
    );
}

export default memo(InputSearch);