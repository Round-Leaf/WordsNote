import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
  alpha,
  Fade,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material';
import { Close as CloseIcon, AddCircleOutline as AddIcon } from '@mui/icons-material';
import axios from 'axios';


interface AddWordDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (wordData: { word: string; meaning: string; source: string; example: string }) => void;
}

const AddWordDialog: React.FC<AddWordDialogProps> = ({ open, onClose, onSubmit }) => {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [source, setSource] = useState('');
  const [example, setExample] = useState('');
  const [availableSources, setAvailableSources] = useState<string[]>([]);
  const [isAddingNewSource, setIsAddingNewSource] = useState(false);
  const NEW_SOURCE_OPTION_VALUE = "__ADD_NEW_SOURCE__"; // 用于“添加新来源”选项的唯一值

  useEffect(() => {
    if(open==false) return;
    axios.get('http://localhost:8080/sources')
      .then((response) => {
        setAvailableSources(response.data);
      })
      .catch((error) => {
        console.error('Error fetching sources:', error);
      });
    },[open]);

  const handleClearForm = () => {
    setWord('');
    setMeaning('');
    setSource('');
    setExample('');
    setIsAddingNewSource(false); // 清空时重置添加新来源的状态
  };

  const handleSubmit = () => {
    onSubmit({ word, meaning, source, example });
    handleClearForm(); // 提交后清空表单
    onClose();
  };

  const handleSourceChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    if (selectedValue === NEW_SOURCE_OPTION_VALUE) {
      setIsAddingNewSource(true);
      setSource(''); // 切换到添加新来源时，清空当前来源输入
    } else {
      setIsAddingNewSource(false);
      setSource(selectedValue);
      // 如果选择了一个新的、不在当前列表中的来源（例如，用户之前输入了一个新来源并提交了，
      // 但我们没有刷新availableSources），这里可以考虑将其添加到availableSources中。
      // 但为了简化，我们假设STATIC_AVAILABLE_SOURCES是固定的，新添加的来源在提交时处理。
    }
  };

  const handleClose = () => {
    handleClearForm(); // 关闭时清空表单
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Fade}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 5, // 超大圆角
          overflow: 'hidden',
          backgroundImage: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)} 0%, #ffffff 100%)`,
          boxShadow: '0 24px 48px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.8)',
        },
      }}
    >
      <DialogTitle sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        pb: 1,
        pt: 2,
        px: 4,
        background: (theme) => `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
        borderBottom: '1px solid rgba(0,0,0,0.05)',
      }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 700,
            color: 'primary.dark',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <AddIcon sx={{ fontSize: 28, color: 'primary.main' }} />
          Add New Word
        </Typography>
        <IconButton onClick={handleClose} size="small" sx={{ color: 'text.secondary' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: 4, py: 3 }}>
        <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            id="word"
            label="Word"
            type="text"
            fullWidth
            variant="outlined"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField
            margin="dense"
            id="meaning"
            label="Meaning"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          
          {/* 来源选择/输入区域 */}
          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel id="source-label">Source</InputLabel>
            <Select
              labelId="source-label"
              id="source-select"
              // 如果正在添加新来源，则Select的值显示为特殊选项，否则显示当前source
              value={isAddingNewSource ? NEW_SOURCE_OPTION_VALUE : source}
              label="Source"
              onChange={handleSourceChange}
              sx={{ borderRadius: 2 }} // 应用圆角到Select组件本身
            >
              {availableSources.map((src) => (
                <MenuItem key={src} value={src}>
                  {src}
                </MenuItem>
              ))}
              <Divider /> {/* 分隔现有来源和添加新来源选项 */}
              <MenuItem value={NEW_SOURCE_OPTION_VALUE}>
                <Typography variant="body2" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AddIcon fontSize="small" /> Add New Source...
                </Typography>
              </MenuItem>
            </Select>
          </FormControl>

          {/* 当用户选择“添加新来源”时，显示此文本输入框 */}
          {isAddingNewSource && (
            <TextField
            margin="dense"
            id="new-source" // 新的ID
            label="Enter New Source" // 新的标签
            type="text"
            fullWidth
            variant="outlined"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            sx={{ mt: 1, '& .MuiOutlinedInput-root': { borderRadius: 2 } }} // 添加顶部外边距和圆角
            />
          )}
          <TextField
            margin="dense"
            id="example"
            label="Example Sentence"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={example}
            onChange={(e) => setExample(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 4, pb: 3, pt: 1 }}>
        <Button
          onClick={handleClose}
          color="inherit"
          variant="outlined"
          sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disableElevation
          sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
          startIcon={<AddIcon />}
          disabled={!word || !meaning} // 单词和释义为必填项
        >
          Add Word
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddWordDialog;