import { Paper } from '@mui/material';
import Countdown from 'react-countdown';
import { Theme, createStyles, makeStyles } from '@mui/material/';
import React from 'react';

interface MintCountdownProps {
  date: Date | undefined;
  style?: React.CSSProperties;
  status?: string;
  onComplete?: () => void;
}

interface MintCountdownRender {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

export const MintCountdown: React.FC<MintCountdownProps> = ({
  date,
  status,
  style,
  onComplete,
}) => {
  const renderCountdown = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: MintCountdownRender) => {
    hours += days * 24;
    if (completed) {
      return status ? <span>{status}</span> : null;
    } else {
      return (
        <div>
          <Paper elevation={0}>
            <span>{hours < 10 ? `0${hours}` : hours}</span>
            <span>hrs</span>
          </Paper>
          <Paper elevation={0}>
            <span>{minutes < 10 ? `0${minutes}` : minutes}</span>
            <span>mins</span>
          </Paper>
          <Paper elevation={0}>
            <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
            <span>secs</span>
          </Paper>
        </div>
      );
    }
  };

  if (date) {
    return (
      <Countdown
        date={date}
        onComplete={onComplete}
        renderer={renderCountdown}
      />
    );
  } else {
    return null;
  }
};
