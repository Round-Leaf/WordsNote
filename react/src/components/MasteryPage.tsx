import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import type { Word } from '../types/wods';

const MasteryPage: React.FC = () => {
  const [word, setWord] = useState<Word | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8080/words', {
        params: {
          size: 1,
          page: 0,
          sort: 'id,desc',
        },
      })
      .then((response) => {
        setWord(response.data.words?.[0] ?? null);
        setError(response.data.words?.length ? '' : 'No words available yet.');
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load a word.');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleRate = (value: number) => {
    setSelectedRating(value);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'linear-gradient(180deg, #eef2ff, #f8fafc)', py: 8 }}>
      <Container maxWidth="sm">
        <Stack spacing={4} alignItems="center" textAlign="center">
          <Box>
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 1.5 }}>
              Mastery Challenge
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, mt: 1, color: '#0f172a' }}>
              How well do you remember this word?
            </Typography>
            <Typography variant="body1" sx={{ color: '#475569', mt: 1 }}>
              Read the word and choose a number from 1 to 5. The meaning stays hidden until you rate yourself.
            </Typography>
          </Box>

          <Card
            sx={{
              borderRadius: 4,
              boxShadow: '0 30px 70px rgba(15, 23, 42, 0.08)',
              overflow: 'hidden',
              width: '100%',
              bgcolor: 'rgba(255,255,255,0.95)',
            }}
          >
            <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
              {loading ? (
                <Box sx={{ display: 'grid', placeItems: 'center', minHeight: 260 }}>
                  <CircularProgress />
                </Box>
              ) : error || !word ? (
                <Stack spacing={2} alignItems="center" sx={{ minHeight: 260, justifyContent: 'center' }}>
                  <Typography variant="h6" sx={{ color: '#475569' }}>
                    {error || 'No word available.'}
                  </Typography>
                  <Button href="/" variant="contained" color="primary">
                    Return to Word List
                  </Button>
                </Stack>
              ) : (
                <Stack spacing={4}>
                  <Box>
                    <Typography variant="button" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 1.2 }}>
                      Word Card
                    </Typography>
                    <Typography variant="h2" sx={{ fontWeight: 900, mt: 2, color: '#0f172a' }}>
                      {word.word}
                    </Typography>
                  </Box>

                  <Box sx={{ p: 3, borderRadius: 3, bgcolor: '#f8fafc', border: '1px solid rgba(148, 163, 184, 0.18)' }}>
                    <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1.5, letterSpacing: 0.8 }}>
                      Meaning
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        minHeight: 72,
                        color: selectedRating ? '#0f172a' : '#334155',
                        fontWeight: 700,
                        lineHeight: 1.5,
                        transition: 'all 0.3s ease',
                        filter: selectedRating ? 'none' : 'blur(6px)',
                        letterSpacing: selectedRating ? 0.2 : 0,
                      }}
                    >
                      {selectedRating ? word.meaning : 'Remember the word first, then choose a score to reveal the meaning.'}
                    </Typography>
                  </Box>

                  <Stack spacing={2} alignItems="center">
                    <Typography variant="subtitle1" sx={{ color: '#475569', fontWeight: 700 }}>
                      Rate your recall
                    </Typography>
                    <Stack direction="row" spacing={1.5} justifyContent="center" flexWrap="wrap">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <Button
                          key={value}
                          variant={selectedRating === value ? 'contained' : 'outlined'}
                          color="primary"
                          sx={{ minWidth: 48, borderRadius: 3, px: 0 }}
                          onClick={() => handleRate(value)}
                        >
                          {value}
                        </Button>
                      ))}
                    </Stack>
                    {selectedRating ? (
                      <Typography variant="body2" sx={{ color: '#334155' }}>
                        You rated this word <strong>{selectedRating}</strong>. The meaning is now visible.
                      </Typography>
                    ) : (
                      <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                        Tap a number to reveal the meaning and complete the review.
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              )}
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
};

export default MasteryPage;
