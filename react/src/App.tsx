import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Card,
  CardContent,
  Container,
  Grid, // 使用最新的 Grid2
  IconButton,
  InputBase,
  Avatar,
  Chip,
  alpha
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  AutoAwesome as MagicIcon,
  Settings as SettingsIcon,
  VolumeUp as VolumeIcon,
  FavoriteBorder as FavoriteIcon
} from '@mui/icons-material';

const wordData = [
  { word: 'Ephemeral', definition: 'Lasting for a very short time.', category: 'Nature', color: '#6366f1' },
  { word: 'Serendipity', definition: 'Happy chance occurrence.', category: 'Life', color: '#ec4899' },
  { word: 'Eloquent', definition: 'Persuasive speaking or writing.', category: 'Skill', color: '#f59e0b' },
  { word: 'Resilient', definition: 'Recovering quickly from difficulty.', category: 'Mindset', color: '#10b981' },
  { word: 'Meticulous', definition: 'Great attention to detail.', category: 'Quality', color: '#3b82f6' },
  { word: 'Luminous', definition: 'Full of or shedding light.', category: 'Visual', color: '#8b5cf6' },
];

const WordBook = () => {
  return (
    <Box sx={{ bgcolor: '#f1f5f9', minHeight: '100vh' }}>
      {/* 顶部任务栏 - 极简浮动设计 */}
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
              <InputBase placeholder="Quick search..." sx={{ ml: 1, fontSize: '0.875rem' }} />
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton sx={{ bgcolor: 'white', border: '1px solid #e2e8f0' }}><AddIcon /></IconButton>
              <Avatar src="/api/placeholder/40/40" sx={{ width: 40, height: 40, border: '2px solid white' }} />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* 主体内容 */}
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {wordData.map((item, index) => (
            <Grid xs={12} sm={6} md={4} lg={3} key={index}>
              <Card 
                sx={{ 
                  aspectRatio: '1 / 1', // 强制正方形
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 6, // 超大圆角
                  border: '1px solid rgba(255,255,255,0.8)',
                  boxShadow: '0 10px 30px -5px rgba(0,0,0,0.05)',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-10px) scale(1.02)',
                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.12)',
                    '& .bg-circle': { transform: 'scale(1.2)', opacity: 0.1 }
                  }
                }}
              >
                {/* 装饰性背景圆圈 */}
                <Box 
                  className="bg-circle"
                  sx={{ 
                    position: 'absolute', top: -20, right: -20, 
                    width: 120, height: 120, borderRadius: '50%', 
                    bgcolor: item.color, opacity: 0.05,
                    transition: 'all 0.6s ease'
                  }} 
                />

                <CardContent sx={{ 
                  p: 4, 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {/* 顶部：分类和收藏 */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* <Chip 
                      label={item.category} 
                      size="small" 
                      sx={{ 
                        bgcolor: alpha(item.color, 0.1), 
                        color: item.color, 
                        fontWeight: 700,
                        fontSize: '0.65rem'
                      }} 
                    /> */}
                    <IconButton size="small" sx={{ color: 'text.disabled' }}>
                      <FavoriteIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  {/* 中间：单词主体 */}
                  <Box>
                    <Typography variant="h4" sx={{ 
                      fontWeight: 800, 
                      color: '#1e293b',
                      mb: 1,
                      fontSize: { md: '1.75rem', lg: '2rem' },
                      letterSpacing: -1
                    }}>
                      {item.word}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: '#64748b', 
                      lineHeight: 1.6,
                      // 限制释义字数，防止溢出正方形
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {item.definition}
                    </Typography>
                  </Box>

                  {/* 底部：操作栏 */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton size="small" sx={{ bgcolor: '#f8fafc' }}><VolumeIcon fontSize="small" /></IconButton>
                      <IconButton size="small" sx={{ bgcolor: '#f8fafc' }}><SettingsIcon fontSize="small" /></IconButton>
                    </Box>
                    <Box sx={{ width: 32, height: 4, bgcolor: item.color, borderRadius: 2 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WordBook;