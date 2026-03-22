import React, { useEffect, useState } from 'react';
import {
  Box,
  Stack,
  Container,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
} from '@mui/icons-material';
import axios from 'axios';
import type { Word } from './types/wods';
import Pagination from '@mui/material/Pagination';
import WordDetailDialog from './components/WordDetailDialog';
import Header from './components/Header'; // Import the new Header component
import WordCard from './components/WordCard'; // Import the new WordCard component
import AddWordDialog from './components/AddWordDialog'; // Import the new AddWordDialog component



const WordBook = () => {
  const [wordData,setWordData] = useState<Word[]>([]);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null); // Initialize with null
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [totalPages,setTotalPages] = useState(1);
  const [currentPage,setCurrentPage] = useState(1);
  const [isAddWordDialogOpen, setIsAddWordDialogOpen] = useState(false); // State for AddWordDialog
  const deleteWord = (id:number)=>{
    setWordData((prev)=>{
      return prev.filter((item)=>item.id!==id);
    });
  }
  const getWords = ()=>{
    axios.get("http://localhost:8080/words",{
      params:{
        size:20,
        page:currentPage-1,
        sort:"id,desc"
      }
    }).then((response)=>{
      setWordData(response.data.words);
      setTotalPages(response.data.totalPages);
    }).catch((error)=>{
      console.log(error);
    });
  }

  const handleOpenDetail = (word:Word) => {
    setSelectedWord(word);
    setIsDialogOpen(true);
  };

  const handleAddWordOpen = () => {
    setIsAddWordDialogOpen(true);
  };

  const handleAddWordClose = () => {
    setIsAddWordDialogOpen(false);
  };

  const handleAddWordSubmit = async (wordData: { word: string; meaning: string; source: string; example: string }) => {
    console.log("New word submitted:", wordData);
    try {
      // Assuming the backend returns the newly created Word object with id and createdAt
      const response = await axios.post<Word>('http://localhost:8080/words', wordData);
      const newWord = response.data;
      setWordData((prev) => {
        // Add the new word to the beginning of the list to show it immediately
        return [newWord, ...prev];
      });
    } catch (error) {
      console.error('Error adding new word:', error);
    }
  };

  useEffect(()=>{
    getWords();
  },[currentPage]); // Fetch words when currentPage changes
  const [searchValue,setSearchValue] = useState('')

  useEffect(()=>{
    if(searchValue===''){
      getWords();
      return;
    }
    const handle = setTimeout(()=>{
    axios.get("http://localhost:8080/words",{
      params:{
        "q":searchValue
      }
    }).then((response)=>{
      setWordData(response.data.words);
      setTotalPages(response.data.totalPages);
    }).catch((error)=>{
      console.log(error);
    });
  },500);
  return ()=>{
    clearTimeout(handle);
  }
  },[searchValue]);

  function search(event: React.ChangeEvent<HTMLInputElement, Element>) {
    setSearchValue(event.target.value);
  }
  return (
    <Box sx={{ bgcolor: '#f1f5f9', minHeight: '100vh' }}>
      <Header onAddClick={handleAddWordOpen} searchValue={searchValue} onSearchChange={search} /> {/* Pass handler to Header */}

      {/* 主体内容 */}
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {wordData.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}> {/* Changed size to item for Grid */}
              <WordCard word={item} onClick={handleOpenDetail} deleteWord={deleteWord} /> {/* Use the new WordCard component */}
            </Grid>
          ))}
        </Grid>

        {/* 分页组件 */}
        <Stack spacing={2} sx={{ mt: 4, alignItems: 'center' }}>
          <Pagination
            count={totalPages} // This will be dynamic based on total items and items per page
            page={currentPage} // This will be dynamic based on current page state
            color="primary"
            size="large"
            onChange={(e,p)=>{setCurrentPage(p)}}
          />
        </Stack>

      </Container>
      <WordDetailDialog 
        open={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        word={selectedWord} 
      />
      <AddWordDialog
        open={isAddWordDialogOpen}
        onClose={handleAddWordClose}
        onSubmit={handleAddWordSubmit}
      />
    </Box>
  );
};

export default WordBook;