import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Card,
  CardContent,
  Container,
  IconButton,
  InputBase,
  Avatar,
  Chip,
  alpha
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Search as SearchIcon,
  Add as AddIcon,
  AutoAwesome as MagicIcon,
  Settings as SettingsIcon,
  VolumeUp as VolumeIcon,
  FavoriteBorder as FavoriteIcon
} from '@mui/icons-material';
import axios from 'axios';
import type { Word } from './types/wods';
import WordDetailDialog from './components/WordDetailDialog';


const WordBook = () => {
  const color="#6366f1";
  const [wordData,setWordData] = useState<Word[]>([]);

  const [selectedWord, setSelectedWord] = useState<Word>({
    id: 1,
  word: '',
  meaning: '',      // 对应你 API 返回的字段
  source: '',   // 问号表示可选字段
  example: '',
  createdAt: ''});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDetail = (word:Word) => {
    setSelectedWord(word);
    setIsDialogOpen(true);
  };

const getRandomLightHex = () => {
  const count = () => Math.floor(Math.random() * 56 + 200).toString(16);
  //console.log(`#${count()}${count()}${count()}`)
  return `#${count()}${count()}${count()}`;
};
  useEffect(()=>{
    axios.get("http://localhost:8080/words",{
      params:{
        size:1000,
        page:0,
        sort:"id,desc"
      }
    }).then((response)=>{
      setWordData(response.data.words);
    });
  },[]);
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
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
              <Card 
                onClick={() => handleOpenDetail(item)}
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
                    bgcolor: getRandomLightHex(), opacity: 0.5,
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
                    <Chip 
                      label={item.source} 
                      size="small" 
                      sx={{ 
                        bgcolor: alpha(getRandomLightHex(), 0.05), 
                        color: getRandomLightHex(), 
                        fontWeight: 1000,
                        fontSize: '0.65rem'
                      }} 
                    />
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
                      {item.meaning}
                    </Typography>
                  </Box>

                  {/* 底部：操作栏 */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton size="small" sx={{ bgcolor: '#f8fafc' }}><VolumeIcon fontSize="small" /></IconButton>
                      <IconButton size="small" sx={{ bgcolor: '#f8fafc' }}><SettingsIcon fontSize="small" /></IconButton>
                    </Box>
                    <Box sx={{ width: 32, height: 4, bgcolor: getRandomLightHex(), borderRadius: 2 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <WordDetailDialog 
        open={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        word={selectedWord} 
      />
    </Box>
  );
};

export default WordBook;