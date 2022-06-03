import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  useTheme,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Accordions() {
  const theme = useTheme();
  return (
    <>
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card style={{ background: 'rgba(112, 99, 192, 0.45)' }}>
              <Typography variant="body1" style={{ margin: '15px' }}>
                Artifact Ownership
              </Typography>
              <CardContent>
                <Accordion style={{ background: 'rgba(112, 99, 192, 0.25)' }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Artifact DAO membership</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Through owning these Artifacts you are granted access to
                      one of the most sophisticated on-chain DAOs on Solana.
                      There will only ever be 117 spots, the number of Artifacts
                      in existence..
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion style={{ background: 'rgba(112, 99, 192, 0.25)' }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>Whitelisted</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      You will be forever whitelisted on all of our NFT drops
                      and giveaways. Artifacts work with our custom Candy
                      Machine as whitelist tokens for our mints.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion style={{ background: 'rgba(112, 99, 192, 0.25)' }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                  >
                    <Typography>Early Access</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Gain early access to all Solana Programs/Tools as we
                      develop them! We are not stingy!
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
            <Accordion
              style={{
                background: 'rgba(112, 99, 192, 0.25)',
                marginTop: '15px',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>About us</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Triptych Labs is a core team of 3 with many collaborators. Our
                  mission is to bring effective, secure tools to the space
                  through publishing our works for all to access. When we arent
                  busy writing contracts we are busy writing contracts. - Dom,
                  Evan, Peyton <br />
                  <br /> Need help with your project? <br /> Join our discord!
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Accordions;
