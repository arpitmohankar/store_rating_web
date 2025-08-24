// src/components/store/StoreDashboard.js
import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Card, CardContent, Typography, Box,
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Rating, Chip, CircularProgress,
  LinearProgress, Avatar
} from '@mui/material';
import { 
  Store, Star, People, TrendingUp, 
  StarBorder, Assessment 
} from '@mui/icons-material';
import Header from '../common/Header';
import { dashboardAPI } from '../../services/api';
import { toast } from 'react-toastify';

function StoreDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await dashboardAPI.getStoreOwnerDashboard();
      setDashboardData(response.data.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getRatingDistribution = () => {
    if (!dashboardData?.ratings) return [];
    
    const distribution = [0, 0, 0, 0, 0];
    dashboardData.ratings.forEach(r => {
      distribution[r.rating - 1]++;
    });
    
    return distribution.map((count, index) => ({
      stars: index + 1,
      count: count,
      percentage: dashboardData.ratings.length > 0 
        ? (count / dashboardData.ratings.length) * 100 
        : 0
    }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!dashboardData?.store) {
    return (
      <>
        <Header title="Store Dashboard" />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Store sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              No Store Found
            </Typography>
            <Typography variant="body1" color="textSecondary">
              You don't have a store associated with your account yet.
            </Typography>
          </Paper>
        </Container>
      </>
    );
  }

  const ratingDistribution = getRatingDistribution();

  return (
    <>
      <Header title="Store Owner Dashboard" />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Store Info Card */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Store sx={{ fontSize: 40, color: 'primary.main' }} />
            <Box flex={1}>
              <Typography variant="h4" gutterBottom>
                {dashboardData.store.name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {dashboardData.store.email} • {dashboardData.store.address}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Average Rating
                    </Typography>
                    <Typography variant="h4">
                      {dashboardData.store.averageRating.toFixed(1)}
                    </Typography>
                    <Rating 
                      value={dashboardData.store.averageRating} 
                      readOnly 
                      precision={0.1}
                      size="small"
                    />
                  </Box>
                  <Star sx={{ fontSize: 40, color: 'warning.main' }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Total Ratings
                    </Typography>
                    <Typography variant="h4">
                      {dashboardData.store.totalRatings}
                    </Typography>
                  </Box>
                  <People sx={{ fontSize: 40, color: 'primary.main' }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      5 Star Ratings
                    </Typography>
                    <Typography variant="h4">
                      {dashboardData.ratings.filter(r => r.rating === 5).length}
                    </Typography>
                  </Box>
                  <TrendingUp sx={{ fontSize: 40, color: 'success.main' }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Latest Rating
                    </Typography>
                    <Typography variant="h4">
                      {dashboardData.ratings[0]?.rating || 'N/A'}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {dashboardData.ratings[0] 
                        ? new Date(dashboardData.ratings[0].created_at).toLocaleDateString()
                        : 'No ratings yet'}
                    </Typography>
                  </Box>
                  <Assessment sx={{ fontSize: 40, color: 'info.main' }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Rating Distribution */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Rating Distribution
              </Typography>
              {ratingDistribution.reverse().map((item) => (
                <Box key={item.stars} sx={{ mb: 2 }}>
                  <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                    <Typography variant="body2" sx={{ minWidth: 20 }}>
                      {item.stars}
                    </Typography>
                    <Star fontSize="small" sx={{ color: 'warning.main' }} />
                    <Box flex={1}>
                      <LinearProgress 
                        variant="determinate" 
                        value={item.percentage}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ minWidth: 40, textAlign: 'right' }}>
                      {item.count}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* Recent Ratings Table */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recent Ratings
              </Typography>
              
              {dashboardData.ratings.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <StarBorder sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="body1" color="textSecondary">
                    No ratings received yet
                  </Typography>
                </Box>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell>Rating</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dashboardData.ratings.slice(0, 10).map((rating) => (
                        <TableRow key={rating.id}>
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Avatar sx={{ width: 32, height: 32 }}>
                                {rating.user_name.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography variant="body2">
                                  {rating.user_name}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                  {rating.user_email}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Rating value={rating.rating} readOnly size="small" />
                          </TableCell>
                          <TableCell>
                            {new Date(rating.created_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default StoreDashboard;
