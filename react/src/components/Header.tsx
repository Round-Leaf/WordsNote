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
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  AutoAwesome as MagicIcon,
} from '@mui/icons-material';

interface HeaderProps {
  onAddClick?: () => void;
  onSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue?: string;
  userAvatarSrc?: string;
}

const Header: React.FC<HeaderProps> = ({
  onAddClick,
  onSearchChange,
  searchValue,
  userAvatarSrc = "/api/placeholder/40/40", // Default placeholder
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
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>
              WordsNote
            </Typography>
          </Box>

          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'rgba(0,0,0,0.04)',
            borderRadius: 3,
            px: 2, py: 0.5,
            width: { xs: '150px', md: '300px' }
          }}>
            <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
            <InputBase
              placeholder="Quick search..."
              sx={{ ml: 1, fontSize: '0.875rem' }}
              value={searchValue}
              onChange={onSearchChange}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
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