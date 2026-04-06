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
import { useSearchParams } from 'react-router-dom';
import type { SelectChangeEvent } from '@mui/material'; // Import SelectChangeEvent for type safety from top-level



const WordBook = () => {
  const [wordData,setWordData] = useState<Word[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedWord, setSelectedWord] = useState<Word | null>(null); // Initialize with null
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [totalPages,setTotalPages] = useState(1);
  const currentPage = Number(searchParams.get("page"))||1;
  const querySearchValue = searchParams.get("query") || '';
  const searchByType = (searchParams.get("searchBy") as 'word' | 'meaning') || 'word'; // Read searchBy from URL params
  const synonym = searchParams.get("synonym")||'';
  const [searchValue, setSearchValue] = useState(querySearchValue);
  const [wordToModify, setWordToModify] = useState<Word | null>(null); // State for the word being modified
  const [searchType, setSearchType] = useState<'word' | 'meaning'>(searchByType); // State for the selected search type
  const [isAddWordDialogOpen, setIsAddWordDialogOpen] = useState(false); // State for AddWordDialog
  const deleteWord = (id:number)=>{
    setWordData((prev)=>{
      return prev.filter((item)=>item.id!==id);
    });
  }
  const modifyWordDialogOpen = (word: Word) => {
    setWordToModify(word);
    setIsAddWordDialogOpen(true);
  };
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
    if(wordToModify==null){
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
  }else{
      try {
      // Assuming the backend returns the newly created Word object with id and createdAt
      const response = await axios.put<Word>('http://localhost:8080/words/'+wordToModify.id, wordData);
      const newWord = response.data;
      setWordData((prev) => {
        // Add the new word to the beginning of the list to show it immediately
        setSelectedWord(newWord); 
        const updated = prev.map((item)=>{
          if(item.id===newWord.id){
            return newWord;
          }
          return item;
        });
        return updated;
      });
    } catch (error) {
      console.error('Error adding new word:', error);
    }
  }
  };
  
  useEffect(()=>{
    if(synonym!==''){
      axios.get(`http://localhost:8080/words`,{
      params:{
        "q": synonym,
        "searchBy": "meaning",
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
      return;
    }
    if(searchValue===''){
      getWords();
      return;
    }
    
    axios.get("http://localhost:8080/words",{
      params:{
        "q": querySearchValue,
        "searchBy": searchByType, // Pass the search type to the backend
        size:20, // Ensure pagination parameters are still included for search results
        page:currentPage-1,
        sort:"id,desc"
      }
    }).then((response)=>{
      setWordData(response.data.words);
      setTotalPages(response.data.totalPages);
    }).catch((error)=>{
      console.log(error);
    });
  },[currentPage,querySearchValue,synonym,searchByType]); // Add searchByType to dependencies

  const onSearchKeyDown = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==='Enter'){
      const newParams = new URLSearchParams(searchParams);
      if(searchValue!==''){
      newParams.set("page","1");
      newParams.delete("synonym");
      newParams.set("query",searchValue);
      setSearchParams(newParams);
      } else {
        newParams.delete("query"); // Remove query param if search value is empty
      }
      newParams.set("searchBy", searchType); // Update searchBy param in URL
      setSearchParams(newParams); // Set params after all updates
    }
    }



  function handleSearchValueChange(event: React.ChangeEvent<HTMLInputElement>) { // Renamed for clarity and corrected type
    setSearchValue(event.target.value);
  }

  const handleSearchTypeChange = (event: SelectChangeEvent<'word' | 'meaning'>) => {
    setSearchType(event.target.value as 'word' | 'meaning');
  };

  return (
    <Box sx={{ bgcolor: '#f1f5f9', minHeight: '100vh' }}>
      <Header
        onAddClick={handleAddWordOpen}
        searchValue={searchValue}
        onSearchChange={handleSearchValueChange}
        onSearchKeyDown={onSearchKeyDown}
        searchType={searchType} // Pass the current search type
        onSearchTypeChange={handleSearchTypeChange} // Pass the handler for search type changes
      />

      {/* 主体内容 */}
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {wordData.map((item, index) => ( // Corrected Grid usage: `item` prop is required for responsive layout
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id || index}> {/* Using item.id as key if available, otherwise index */}
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
            onChange={(e,p)=>{
              const newParams = new URLSearchParams(searchParams);
              newParams.set("page",p.toString());
              setSearchParams(newParams);
            }}
          />
        </Stack>

      </Container>
      <WordDetailDialog 
        openModifyWordDialog={modifyWordDialogOpen}
        open={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        word={selectedWord} 
      />
      <AddWordDialog
        wordToFill={wordToModify}
        open={isAddWordDialogOpen}
        onClose={handleAddWordClose}
        onSubmit={handleAddWordSubmit}
      />
    </Box>
  );
};

export default WordBook;