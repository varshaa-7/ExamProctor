import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useThemeMode } from 'src/context/ThemeModeContext';

const ThemeToggle = ({ sx }) => {
  const { mode, toggleMode } = useThemeMode();

  return (
    <Tooltip title={mode === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}>
      <IconButton onClick={toggleMode} sx={sx} aria-label="toggle theme">
        {mode === 'light' ? (
          <IconMoon width={18} height={18} />
        ) : (
          // make sun icon white for dark mode visibility
          <IconSun width={18} height={18} style={{ color: '#ffffff' }} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
