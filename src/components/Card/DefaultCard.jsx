import React, { memo } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function DefaultCard(props) {
  const { children, title } = props;

  return (
    <Card variant="outlined" style={{ width: '100%' }} >
      <CardContent>
        {title && (
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
        )}
        {children}
      </CardContent>
    </Card>
  );
}

export default memo(DefaultCard);