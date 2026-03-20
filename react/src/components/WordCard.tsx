import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  IconButton,
  alpha
} from '@mui/material';
import {
  VolumeUp as VolumeIcon,
  FavoriteBorder as FavoriteIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import type { Word } from '../types/wods';

interface WordCardProps {
  word: Word;
  onClick: (word: Word) => void;
}

const getRandomLightHex = () => {
  const count = () => Math.floor(Math.random() * 56 + 200).toString(16);
  return `#${count()}${count()}${count()}`;
};

const WordCard: React.FC<WordCardProps> = ({ word, onClick }) => {
  const randomBgColor = getRandomLightHex();
  const randomChipColor = getRandomLightHex();

  return (
    <Card
      onClick={() => onClick(word)}
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
          bgcolor: randomBgColor, opacity: 0.5,
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
            label={word.source}
            size="small"
            sx={{
              bgcolor: alpha(randomChipColor, 0.05),
              color: randomChipColor,
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
            {word.word}
          </Typography>
          <Typography variant="body2" sx={{
            color: '#64748b',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {word.meaning}
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
  );
};

export default WordCard;