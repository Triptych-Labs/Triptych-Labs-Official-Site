import {
  Card,
  Box,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  LinearProgress
} from '@mui/material';

import { styled } from '@mui/material/styles';
import AssignmentTurnedInTwoToneIcon from '@mui/icons-material/AssignmentTurnedInTwoTone';
import CancelPresentationTwoToneIcon from '@mui/icons-material/CancelPresentationTwoTone';

const RootWrapper = styled(Card)(
  ({ theme }) => `
    color: ${theme.colors.alpha.white[0]};
    
    .MuiCardHeader-title {
      color: ${theme.colors.alpha.white[0]};
    }
`
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.alpha.white[100]};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

const AvatarError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.main};
      color: ${theme.palette.error.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.error};
`
);

const TypographySecondary = styled(Typography)(
  ({ theme }) => `
      color: ${theme.colors.alpha.white[70]};
`
);

const LinearProgressWrapper = styled(LinearProgress)(
  ({ theme }) => `
        flex-grow: 1;
        margin-right: ${theme.spacing(1)};
        height: 10px;
        background-color: ${theme.colors.error.main};

        .MuiLinearProgress-barColorPrimary {
          background-color: ${theme.colors.alpha.white[100]};
          border-top-right-radius: ${theme.general.borderRadius};
          border-bottom-right-radius: ${theme.general.borderRadius};
        }
`
);

function Performance() {
  

  return (
    <RootWrapper sx={{ p: 1 ,border:"solid",}}>
      <CardContent>
        <Box display="flex" sx={{ px: 2, pb: 3 }} justifyContent="center" alignItems="center">
          <Box display="flex" justifyContent="center" sx={{flexDirection:"column"}}>
      <CardHeader
        title="DAO Holdings"
        titleTypographyProps={{ variant: 'h3' }}
      />
            <Typography sx={{textAlign:"center"}} variant="h1">235.345</Typography>
            <TypographySecondary sx={{textAlign:"center"}} variant="subtitle1" noWrap>
              SOL
            </TypographySecondary>
          </Box>
        </Box>
      </CardContent>
    </RootWrapper>
  );
}

export default Performance;
