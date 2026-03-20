import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  Typography, 
  Box, 
  Stack, 
  IconButton, 
  Fade, 
  alpha, 
  Divider, 
  Chip, 
  Tooltip 
} from '@mui/material';
import { 
  Close as CloseIcon, 
  VolumeUp as VolumeIcon, 
  MenuBook as SourceIcon, 
  EventNote as DateIcon,
  FormatQuote as QuoteIcon 
} from '@mui/icons-material';
import type { Word } from '../types/wods';

interface WordDetailDialogProps {
  open: boolean;
  onClose: () => void; // 建议简化为标准 void 回调
  word: Word | null;
}

const WordDetailDialog: React.FC<WordDetailDialogProps> = ({ open, onClose, word }) => {
  if (!word) return null;

  // 格式化日期：例如 2024-05-20
  const formattedDate = new Date(word.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Fade}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 5,
          overflow: 'hidden',
          backgroundImage: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)} 0%, #ffffff 100%)`,
          boxShadow: '0 24px 48px rgba(0,0,0,0.1)',
        },
      }}
    >
      {/* 顶部操作区 */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent sx={{ px: 4, pb: 6, pt: 0 }}>
        <Stack spacing={3}>
          
          {/* 单词标题与发音按钮 */}
          <Box>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 900, 
                  letterSpacing: '-0.02em',
                  background: (theme) => `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {word.word}
              </Typography>
              <Tooltip title="播放读音">
                <IconButton size="small" color="primary" sx={{ bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1) }}>
                  <VolumeIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
            
            <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 500, lineHeight: 1.4 }}>
              {word.meaning}
            </Typography>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          {/* 例句区域 */}
          {word.example && (
            <Box sx={{ position: 'relative' }}>
              <QuoteIcon 
                sx={{ 
                  position: 'absolute', 
                  top: -10, 
                  left: -10, 
                  fontSize: 40, 
                  color: (theme) => alpha(theme.palette.primary.main, 0.1) 
                }} 
              />
              <Box
                sx={{
                  pl: 2.5,
                  py: 1,
                  borderLeft: '4px solid',
                  borderColor: 'primary.main',
                  borderRadius: '2px',
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.03),
                }}
              >
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontStyle: 'italic', 
                    color: 'text.primary',
                    lineHeight: 1.6,
                    fontFamily: 'Georgia, serif', // 使用衬线体增加文学感
                    whiteSpace: 'pre-line'
                  }}
                >
                  {word.example}
                </Typography>
              </Box>
            </Box>
          )}

          {/* 底部元数据 */}
          <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ pt: 1 }}>
            <Chip 
              icon={<SourceIcon sx={{ fontSize: '1rem !important' }} />} 
              label={`来源: ${word.source}`} 
              variant="outlined" 
              size="small"
              sx={{ borderRadius: 1.5, borderColor: 'divider' }}
            />
            <Chip 
              icon={<DateIcon sx={{ fontSize: '1rem !important' }} />} 
              label={formattedDate} 
              variant="outlined" 
              size="small"
              sx={{ borderRadius: 1.5, borderColor: 'divider' }}
            />
          </Stack>

        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default WordDetailDialog;