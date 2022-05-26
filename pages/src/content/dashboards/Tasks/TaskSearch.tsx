import { useRef, useState } from 'react';
import {
  Button,
  Card,
  Grid,
  Box,
  CardContent,
  FormControl,
  CardActions,
  Typography,
  Avatar,
  Divider,
  Link,
  Rating,
  OutlinedInput,
  Chip,
  Tooltip,
  AvatarGroup,
  Pagination,
  InputAdornment,
  Menu,
  MenuItem,
} from '@mui/material';
import { formatDistance, subMonths, subDays } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Text from 'src/components/Text';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import DAOProposals from 'src/content/pages/Apps/DAO/components/Proposals';
import { styled } from '@mui/material/styles';

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
`,
);

function TaskSearch() {
  const periods = [
    {
      value: 'popular',
      text: 'Most popular',
    },
    {
      value: 'recent',
      text: 'Recent tasks',
    },
    {
      value: 'updated',
      text: 'Latest updated tasks',
    },
    {
      value: 'oldest',
      text: 'Oldest tasks first',
    },
  ];

  const actionRef1 = useRef<any>(null);
  const [openPeriod, setOpenMenuPeriod] = useState<boolean>(false);
  const [period, setPeriod] = useState<string>(periods[0].text);

  const proposals = [
    {
      proposalNum: '0',
      proposalType: 'Expense',
      proposalDescription: 'Buy 100 Jungle Cats for DAO vault',
    },
    {
      proposalNum: '1',
      proposalType: 'Aquisition',
      proposalDescription: 'Take Over World.',
    },
  ];

  return (
    <>
      <Grid container spacing={3}></Grid>
    </>
  );
}

export default TaskSearch;
