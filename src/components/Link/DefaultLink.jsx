import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import { NavLink as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  link: {
    color: 'inherit',
    textDecoration: 'underline !important',
    textDecorationColor: theme.palette.secondary.dark + '  !important',

    '&:hover': {
      textDecorationColor: theme.palette.secondary.main + '  !important',
      color: 'inherit',
    },
  },
}));

function DefaultLink(props) {
  const classes = useStyles();
  const { children, title, to = '#', color = "textSecondary", className, variant = "body2", ...rest } = props;

  return (
    <Link
      component={RouterLink}
      variant={variant}
      color={color}
      className={`${classes.link} ${className}`}
      underline='hover'
      {...rest}
      to={to}
      href={to}
    >
      {children || title}
    </Link>
  );
}

export default memo(DefaultLink);
