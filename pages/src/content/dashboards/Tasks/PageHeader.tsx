import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
function PageHeader() {

  const user =
  {
    name: 'Triptych DAO',
    avatar: process.env.PUBLIC_URL + '/static/labs.png'
  };
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
        {user.name}
        </Typography>
        <Typography variant="subtitle2">
          Govern Together
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
