import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch, placeholder = "Search movies..." }) => {
  const [query, setQuery] = useState('');

  // Debounced search - waits 500ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 500);

    // Cleanup: cancel previous timer when query changes
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <TextField
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.secondary' }} />
            </InputAdornment>
          ),
          endAdornment: query && (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} size="small">
                <ClearIcon sx={{ color: 'text.secondary' }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'background.paper',
            },
            '&.Mui-focused': {
              backgroundColor: 'background.paper',
            },
          },
        }}
      />
    </motion.div>
  );
};

export default SearchBar;