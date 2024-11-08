import React, { useState, useRef, useEffect } from 'react';
import { 
  Button, 
  Menu, 
  MenuItem, 
  Typography, 
  Link,
  ClickAwayListener
} from '@mui/material';
import { styled } from '@mui/system';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledButton = styled(Button)(({ theme, transparent }) => ({
  justifyContent: 'space-between',
  width: '100%',
  padding: theme?.spacing?.(1, 2) ?? '8px 16px',
  color: theme?.palette?.text?.primary ?? '#000',
  backgroundColor: transparent ? 'transparent' : (theme?.palette?.background?.paper ?? '#fff'),
  border: transparent ? 'none' : `1px solid ${theme?.palette?.divider ?? '#e0e0e0'}`,
  '&:hover': {
    backgroundColor: transparent ? 'rgba(0, 0, 0, 0.04)' : (theme?.palette?.action?.hover ?? '#f5f5f5'),
  },
  '&:focus': {
    outline: 'none',
    boxShadow: `0 0 0 2px ${theme?.palette?.primary?.main ?? '#1976d2'}`,
  },
}));

const Dropdown = ({ 
  options = [], 
  placeholder = 'Select an option', 
  hasDropIcon = true, 
  optionTag = "button", 
  transparent = true 
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const buttonRef = useRef(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    handleClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <StyledButton
          ref={buttonRef}
          onClick={handleClick}
          endIcon={hasDropIcon ? <KeyboardArrowDownIcon /> : null}
          transparent={transparent}
        >
          <Typography variant="body2">
            {selectedOption ? selectedOption.label : placeholder}
          </Typography>
        </StyledButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {Array.isArray(options) && options.map((option) => (
            optionTag === "button" ? (
              <MenuItem 
                key={option.value} 
                onClick={() => handleOptionClick(option)}
                sx={{ whiteSpace: 'nowrap' }}
              >
                {option.label}
              </MenuItem>
            ) : (
              <MenuItem 
                key={option.value}
                component={Link}
                href={option.value}
                sx={{ whiteSpace: 'nowrap' }}
              >
                {option.label}
              </MenuItem>
            )
          ))}
        </Menu>
      </div>
    </ClickAwayListener>
  );
};

export default Dropdown;