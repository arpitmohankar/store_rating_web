// src/components/admin/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Paper, Card, CardContent, Typography,
  Box, Tab, Tabs, CircularProgress
} from '@mui/material';
import { People, Store, Star, Dashboard } from '@mui/icons-material';
import Header from '../common/Header';
import UsersList from './UsersList';
import StoresList from './StoresList';
import { dashboardAPI } from '../../services/api';
import { toast } from 'react-toastify';

function AdminDashboard() {
  const [tabValue, setTabValue] = useState(0);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await dashboardAPI.getAdminDashboard();
      setDashboardData(response.data.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
      <Header title="Admin Dashboard" />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Dashboard color="primary" sx={{ mr: 2, fontSize: 40 }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Dashboard
                    </Typography>
                    <Typography variant="h5">
                      Overview
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <People color="primary" sx={{ mr: 2, fontSize: 40 }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Total Users
                    </Typography>
                    <Typography variant="h5">
                      {dashboardData?.totalUsers || 0}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Store color="primary" sx={{ mr: 2, fontSize: 40 }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Total Stores
                    </Typography>
                    <Typography variant="h5">
                      {dashboardData?.totalStores || 0}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Star color="primary" sx={{ mr: 2, fontSize: 40 }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Total Ratings
                    </Typography>
                    <Typography variant="h5">
                      {dashboardData?.totalRatings || 0}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs for Users and Stores */}
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary">
            <Tab label="Users Management" />
            <Tab label="Stores Management" />
          </Tabs>
        </Paper>

        {/* Tab Panels */}
        {tabValue === 0 && <UsersList />}
        {tabValue === 1 && <StoresList />}
      </Container>
    </>
  );
}

export default AdminDashboard;
