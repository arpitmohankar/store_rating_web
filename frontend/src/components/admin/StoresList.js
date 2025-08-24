// src/components/admin/StoresList.js
import React, { useState, useEffect } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination, TextField,
  Button, Dialog, DialogTitle, DialogContent, DialogActions,
  Box, Rating, TableSortLabel
} from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import { storeAPI } from '../../services/api';
import { toast } from 'react-toastify';

function StoresList() {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    owner_email: ''
  });

  useEffect(() => {
    fetchStores();
  }, []);

  useEffect(() => {
    const filtered = stores.filter(store =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStores(filtered);
  }, [searchTerm, stores]);

  const fetchStores = async () => {
    try {
      const response = await storeAPI.getAllStores();
      setStores(response.data.data);
      setFilteredStores(response.data.data);
    } catch (error) {
      console.error('Error fetching stores:', error);
      toast.error('Failed to load stores');
    }
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);

    const sortedStores = [...filteredStores].sort((a, b) => {
      if (property === 'average_rating') {
        return isAsc 
          ? b.average_rating - a.average_rating
          : a.average_rating - b.average_rating;
      }
      if (isAsc) {
        return a[property] > b[property] ? -1 : 1;
      }
      return a[property] < b[property] ? -1 : 1;
    });
    setFilteredStores(sortedStores);
  };

  const handleCreateStore = async () => {
    try {
      await storeAPI.createStore(formData);
      toast.success('Store created successfully');
      setOpenDialog(false);
      fetchStores();
      setFormData({
        name: '',
        email: '',
        address: '',
        owner_email: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create store');
    }
  };

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <TextField
            placeholder="Search stores..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
            }}
          />
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
          >
            Add Store
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'email'}
                    direction={orderBy === 'email' ? order : 'asc'}
                    onClick={() => handleSort('email')}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell>Address</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'average_rating'}
                    direction={orderBy === 'average_rating' ? order : 'asc'}
                    onClick={() => handleSort('average_rating')}
                  >
                    Rating
                  </TableSortLabel>
                </TableCell>
                <TableCell>Total Ratings</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStores
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((store) => (
                  <TableRow key={store.id}>
                    <TableCell>{store.name}</TableCell>
                    <TableCell>{store.email}</TableCell>
                    <TableCell>{store.address}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Rating 
                          value={parseFloat(store.average_rating)} 
                          readOnly 
                          precision={0.1}
                          size="small"
                        />
                        <Box ml={1}>({parseFloat(store.average_rating).toFixed(1)})</Box>
                      </Box>
                    </TableCell>
                    <TableCell>{store.total_ratings}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredStores.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        />
      </Paper>

      {/* Add Store Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Store</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Store Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              margin="normal"
              helperText="20-60 characters"
            />
            <TextField
              fullWidth
              label="Store Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Store Address"
              multiline
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              margin="normal"
              helperText="Max 400 characters"
            />
            <TextField
              fullWidth
              label="Owner Email"
              type="email"
              value={formData.owner_email}
              onChange={(e) => setFormData({...formData, owner_email: e.target.value})}
              margin="normal"
              helperText="Email of existing user who will be the owner"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateStore} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default StoresList;
