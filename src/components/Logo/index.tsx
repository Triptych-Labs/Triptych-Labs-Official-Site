import { Box, Hidden, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

const LogoWrapper = styled(Box)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        padding: ${theme.spacing(0, 1, 0, 0)};
        display: flex;
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};
`,
);

const LogoSignWrapper = styled(Box)(
  () => `
        width: 52px;
        height: 38px;
        margin-top: 4px;
        transform: scale(.8);
`,
);

const LogoSign = styled(Box)(
  ({ theme }) => `
        width: 34px;
        height: 0px;
        border-radius: ${theme.general.borderRadiusSm};
        position: relative;
        transform: scale(0.25);
`,
);

const LogoSignInner = styled(Box)(
  ({ theme }) => `
        width: 16px;
        height: 16px;
        position: absolute;
        top: 12px;
        left: 12px;
        z-index: 5;
        border-radius: ${theme.general.borderRadiusSm};
        background: ${theme.header.background};
`,
);

const LogoTextWrapper = styled(Box)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
`,
);

const VersionBadge = styled(Box)(
  ({ theme }) => `
        background: ${theme.palette.success.main};
        color: ${theme.palette.success.contrastText};
        padding: ${theme.spacing(0.4, 1)};
        border-radius: ${theme.general.borderRadiusSm};
        text-align: center;
        display: inline-block;
        line-height: 1;
        font-size: ${theme.typography.pxToRem(11)};
`,
);

const LogoText = styled(Box)(
  ({ theme }) => `
        font-size: ${theme.typography.pxToRem(15)};
        font-weight: ${theme.typography.fontWeightBold};
`,
);

// <LogoSignInner />
function Logo() {
  return (
    <LogoWrapper>
      <LogoSignWrapper>
        <LogoSign>
          <img src="/static/images/labs.png" />
        </LogoSign>
      </LogoSignWrapper>
    </LogoWrapper>
  );
}

export default Logo;

