import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
  InputBase,
  Avatar,
  Button,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  AutoAwesome as MagicIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import type { SelectChangeEvent } from '@mui/material';

interface HeaderProps {
  onAddClick?: () => void;
  onMasteryClick?: () => void;
  onSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue?: string;
  userAvatarSrc?: string;
  onSearchKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  searchType: 'word' | 'meaning';
  onSearchTypeChange: (event: SelectChangeEvent<'word' | 'meaning'>) => void;
}

const Header: React.FC<HeaderProps> = ({
  onAddClick,
  onMasteryClick,
  onSearchChange,
  onSearchKeyDown,
  searchValue,
  userAvatarSrc = "/api/placeholder/40/40",
  searchType,
  onSearchTypeChange,
}) => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        color: '#1e293b'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1, gap: { xs: 1, sm: 2 } }}>
          <Box onClick={()=>{window.location.href="/"}} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{
              bgcolor: 'primary.main',
              width: 32, height: 32,
              borderRadius: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(63, 81, 181, 0.3)'
            }}>
              <MagicIcon sx={{ color: 'white', fontSize: 20 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: -0.5, display: { xs: 'none', sm: 'block' } }}>
              WordsNote
            </Typography>
          </Box>

          <Box sx={{
            display: 'flex',
            // Allow search box to grow on small screens, but limit its max width on larger screens
            flexGrow: { xs: 1, sm: 0 },
            maxWidth: { xs: 'none', sm: '300px' },
            alignItems: 'center',
            bgcolor: 'rgba(0,0,0,0.04)', // Background color for the search box
            borderRadius: 3, // Border radius for the search box
            px: 2, py: 0.5,
            width: { md: '300px' } // Keep fixed width for md and up, but allow flexGrow on xs
          }}>
            <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
            <InputBase
              placeholder="Quick search..."
              sx={{ ml: 1, fontSize: '0.875rem', flexGrow: 1 }} // Allow InputBase to take available space
              value={searchValue}
              onKeyDown={onSearchKeyDown}
              onChange={onSearchChange}
            />
            {/* New Select component for search type */}
            <FormControl variant="standard" sx={{ minWidth: { xs: 70, sm: 100 }, ml: 1 }}>
              <Select
                value={searchType}
                onChange={onSearchTypeChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Search type' }}
                sx={{
                  '.MuiSelect-select': {
                    p: 0,
                    pr: '24px !important', // Adjust padding to prevent text overlap with icon
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                  },
                  '.MuiOutlinedInput-notchedOutline': { border: 'none' }, // Remove default border
                  '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' }, // Remove border on hover
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' }, // Remove border when focused
                  '.MuiSvgIcon-root': {
                    fontSize: 18,
                    color: 'text.secondary',
                  },
                }}
              >
                <MenuItem value="word">Word</MenuItem>
                <MenuItem value="meaning">Meaning</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={onMasteryClick}
              startIcon={<SchoolIcon />}
              sx={{ textTransform: 'none', display: { xs: 'none', sm: 'inline-flex' } }}
            >
              Mastery
            </Button>
            <IconButton sx={{ bgcolor: 'white', border: '1px solid #e2e8f0' }} onClick={onAddClick}>
              <AddIcon />
            </IconButton>
            <Avatar src={userAvatarSrc} sx={{ width: 40, height: 40, border: '2px solid white' }} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;