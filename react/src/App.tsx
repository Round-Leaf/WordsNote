import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Grid, // 使用最新的 Grid2 组件
  Container 
} from '@mui/material';

// 模拟单词数据
const wordData = [
  { word: 'Ephemeral', definition: 'Lasting for a very short time. Often used to describe things in nature like flowers or the beauty of a sunset.' },
  { word: 'Serendipity', definition: 'The occurrence and development of events by chance in a happy or beneficial way.' },
  { word: 'Eloquent', definition: 'Fluent or persuasive in speaking or writing. This person can express complex ideas in a very simple and beautiful way that everyone understands.' },
  { word: 'Resilient', definition: 'Able to withstand or recover quickly from difficult conditions.' },
  { word: 'Meticulous', definition: 'Showing great attention to detail; very careful and precise.' },
];

const WordBook = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        My WordsNote
      </Typography>
      
      <Grid container spacing={3}>
        {wordData.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.02)', boxShadow: 6 } 
            }}>
              <CardContent>
                {/* 单词标题 */}
                <Typography variant="h5" component="div" color="primary" sx={{ fontWeight: '600' }}>
                  {item.word}
                </Typography>
                
                {/* 分割线效果 */}
                <Box sx={{ width: '40px', height: '4px', bgcolor: 'secondary.main', my: 1.5, borderRadius: 1 }} />

                {/* 释义：关键在于多行省略逻辑 */}
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3, // 限制显示 3 行，多余的显示省略号
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: 1.6
                  }}
                >
                  {item.definition}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WordBook;