/* eslint-disable react-hooks/exhaustive-deps */
// src/components/user/UserDashboard.js
import React, { useState, useEffect } from 'react';
import {
  Container, Grid, TextField, Box, Typography, Paper,
  InputAdornment, ToggleButton, ToggleButtonGroup,
  CircularProgress, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { Search, ViewModule, ViewList, FilterList } from '@mui/icons-material';
import Header from '../common/Header';
import StoreCard from './StoreCard';
import { dashboardAPI } from '../../services/api';
import { toast } from 'react-toastify';

function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterRating, setFilterRating] = useState('all');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    filterAndSortStores();
  }, [searchTerm, sortBy, filterRating, stores]);

  const fetchDashboardData = async () => {
    try {
      const response = await dashboardAPI.getUserDashboard();
      setStores(response.data.data);
      setFilteredStores(response.data.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      toast.error('Failed to load stores');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortStores = () => {
    let filtered = [...stores];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(store =>
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Rating filter
    if (filterRating !== 'all') {
      if (filterRating === 'rated') {
        filtered = filtered.filter(store => store.user_rating !== null);
      } else if (filterRating === 'unrated') {
        filtered = filtered.filter(store => store.user_rating === null);
      }
    }

    // Sorting
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.average_rating - a.average_rating;
        case 'mostRated':
          return b.total_ratings - a.total_ratings;
        default:
          return 0;
      }
    });

    setFilteredStores(filtered);
  };

  const handleRatingUpdate = () => {
    // Refresh the data after rating submission
    fetchDashboardData();
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Header title="User Dashboard" />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Dashboard Header */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Available Stores
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Browse and rate stores on our platform
          </Typography>
        </Paper>

        {/* Search and Filter Bar */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search stores by name or address..."
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="Sort By"
                >
                  <MenuItem value="name">Name (A-Z)</MenuItem>
                  <MenuItem value="rating">Highest Rated</MenuItem>
                  <MenuItem value="mostRated">Most Rated</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Filter</InputLabel>
                <Select
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                  label="Filter"
                  startAdornment={<FilterList sx={{ mr: 1 }} />}
                >
                  <MenuItem value="all">All Stores</MenuItem>
                  <MenuItem value="rated">Rated by Me</MenuItem>
                  <MenuItem value="unrated">Not Rated Yet</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2}>
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(e, newMode) => newMode && setViewMode(newMode)}
                size="small"
                fullWidth
              >
                <ToggleButton value="grid">
                  <ViewModule />
                </ToggleButton>
                <ToggleButton value="list">
                  <ViewList />
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
        </Paper>

        {/* Results Summary */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="textSecondary">
            Showing {filteredStores.length} of {stores.length} stores
          </Typography>
        </Box>

        {/* Stores Display */}
        {filteredStores.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">
              No stores found
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Try adjusting your search or filters
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredStores.map((store) => (
              <Grid 
                item 
                key={store.id} 
                xs={12} 
                sm={viewMode === 'grid' ? 6 : 12} 
                md={viewMode === 'grid' ? 4 : 12}
              >
                <StoreCard 
                  store={store} 
                  viewMode={viewMode}
                  onRatingUpdate={handleRatingUpdate}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}

export default UserDashboard;
