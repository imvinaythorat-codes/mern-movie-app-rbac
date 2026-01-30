import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, IconButton, Chip } from '@mui/material';
import { SwapVert as SwapVertIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { SORT_OPTIONS } from '@/utils/constants';

const SortControls = ({ sortBy, sortOrder, onSortChange, onOrderChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Sort By Dropdown */}
        <FormControl 
          size="small" 
          sx={{ 
            minWidth: { xs: 140, sm: 180 },
            flex: 1,
          }}
        >
          <InputLabel id="sort-by-label">Sort By</InputLabel>
          <Select
            labelId="sort-by-label"
            value={sortBy}
            label="Sort By"
            onChange={(e) => onSortChange(e.target.value)}
            sx={{
              backgroundColor: 'background.paper',
            }}
          >
            {SORT_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sort Order Toggle */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={sortOrder === 'asc' ? 'A → Z' : 'Z → A'}
            size="small"
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              fontWeight: 600,
              fontSize: { xs: '0.75rem', sm: '0.8125rem' },
              display: { xs: 'none', sm: 'flex' },
            }}
          />
          <IconButton
            onClick={onOrderChange}
            sx={{
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.main',
                transform: 'rotate(180deg)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <SwapVertIcon sx={{ color: 'primary.main', '&:hover': { color: 'white' } }} />
          </IconButton>
        </Box>
      </Box>
    </motion.div>
  );
};

export default SortControls;