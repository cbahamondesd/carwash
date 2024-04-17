import * as React from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const servicios = [
  {
    name: 'Lavado a mano',
    desc: 'Monthly subscription',
    price: '$15.00',
  },
  {
    name: 'Lavado automático',
    desc: 'Included in the Professional plan',
    price: 'Free',
  },
  {
    name: 'Encerado',
    desc: 'Devices needed for development',
    price: '$69.99',
  },
  {
    name: 'Aspirado y escobillado por dentro',
    desc: 'License',
    price: '$49.99',
  },
];

function Info({ totalPrice }) {
  return (
    <React.Fragment>
      <Typography variant="subtitle2" color="text.secondary">
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalPrice}
      </Typography>
      <List disablePadding>
        {servicios.map((servicio) => (
          <ListItem key={servicio.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={servicio.name}
              secondary={servicio.desc}
            />
            <Typography variant="body1" fontWeight="medium">
              {servicio.price}
            </Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;
