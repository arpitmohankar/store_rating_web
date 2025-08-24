// src/pages/Landing.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, Button, Grid, Card, CardContent,
  AppBar, Toolbar, Paper, Chip, Avatar, Stack, Divider
} from '@mui/material';
import {
  Store, People, Dashboard, Security,
  ManageAccounts, Login, PersonAdd, CheckCircle,
  Speed, Verified, Support
} from '@mui/icons-material';

function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Speed />,
      title: 'Fast & Easy',
      description: 'Quick and simple rating system for stores'
    },
    {
      icon: <Security />,
      title: 'Secure Platform',
      description: 'Role-based access control for all users'
    },
    {
      icon: <Verified />,
      title: 'Verified Ratings',
      description: 'Authentic ratings from real users'
    },
    {
      icon: <Support />,
      title: '24/7 Support',
      description: 'Always here to help you'
    }
  ];

  const roleFeatures = [
    {
      role: 'Administrator',
      color: 'error',
      icon: <ManageAccounts sx={{ fontSize: 40 }} />,
      features: [
        'Manage all users and stores',
        'View comprehensive dashboard',
        'Add new stores and users',
        'Access all platform analytics',
        'Apply filters and sorting'
      ]
    },
    {
      role: 'Store Owner',
      color: 'warning',
      icon: <Store sx={{ fontSize: 40 }} />,
      features: [
        'View store dashboard',
        'See average rating',
        'Track user ratings',
        'Monitor store performance',
        'Manage store profile'
      ]
    },
    {
      role: 'User',
      color: 'success',
      icon: <People sx={{ fontSize: 40 }} />,
      features: [
        'Rate stores (1-5 stars)',
        'Search and filter stores',
        'View all stores',
        'Update ratings anytime',
        'Manage your profile'
      ]
    }
  ];

  const stats = [
    { number: '500+', label: 'Active Stores' },
    { number: '10K+', label: 'Happy Users' },
    { number: '50K+', label: 'Ratings Given' },
    { number: '4.5', label: 'Average Rating' }
  ];

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Navigation Bar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
          <Store sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Store Rating Platform
          </Typography>
          <Button 
            color="inherit" 
            onClick={() => navigate('/login')}
            startIcon={<Login />}
          >
            Login
          </Button>
          <Button 
            variant="outlined" 
            sx={{ ml: 2, color: 'white', borderColor: 'white' }}
            onClick={() => navigate('/signup')}
            startIcon={<PersonAdd />}
          >
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          pt: 8,
          pb: 10,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" fontWeight="bold" gutterBottom>
                Rate & Discover
                <br />
                Best Stores
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Join our platform to rate stores, share your experiences, 
                and help others make informed decisions.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button 
                  variant="contained" 
                  size="large"
                  sx={{ bgcolor: 'white', color: 'primary.main' }}
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  sx={{ borderColor: 'white', color: 'white' }}
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <Dashboard sx={{ fontSize: 300, opacity: 0.2 }} />
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Wave Shape */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            overflow: 'hidden',
            lineHeight: 0
          }}
        >
          <svg
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            style={{ width: '100%', height: 60 }}
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="#f5f5f5"
            />
          </svg>
        </Box>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ mt: -5, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  bgcolor: 'white',
                  borderRadius: 2
                }}
              >
                <Typography variant="h3" color="primary" fontWeight="bold">
                  {stat.number}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" textAlign="center" fontWeight="bold" gutterBottom>
          Why Choose Our Platform?
        </Typography>
        <Typography variant="h6" textAlign="center" color="textSecondary" sx={{ mb: 6 }}>
          Everything you need to rate and discover stores
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box textAlign="center">
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'primary.light',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  {feature.icon}
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Role Features Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" textAlign="center" fontWeight="bold" gutterBottom>
            Features for Every Role
          </Typography>
          <Typography variant="h6" textAlign="center" color="textSecondary" sx={{ mb: 6 }}>
            Tailored experiences based on your role
          </Typography>

          <Grid container spacing={4}>
            {roleFeatures.map((role, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar
                        sx={{
                          bgcolor: `${role.color}.light`,
                          color: `${role.color}.main`,
                          mr: 2
                        }}
                      >
                        {role.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="h5" fontWeight="bold">
                          {role.role}
                        </Typography>
                        <Chip 
                          label={role.role === 'Administrator' ? 'Full Access' : role.role === 'Store Owner' ? 'Dashboard Access' : 'Rate & Review'}
                          size="small"
                          color={role.color}
                        />
                      </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Stack spacing={1.5}>
                      {role.features.map((feature, idx) => (
                        <Box key={idx} display="flex" alignItems="center">
                          <CheckCircle 
                            sx={{ 
                              mr: 1, 
                              color: `${role.color}.main`,
                              fontSize: 20 
                            }} 
                          />
                          <Typography variant="body2">
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" textAlign="center" fontWeight="bold" gutterBottom>
          How It Works
        </Typography>
        <Typography variant="h6" textAlign="center" color="textSecondary" sx={{ mb: 6 }}>
          Get started in 3 simple steps
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: 'primary.main',
                  mx: 'auto',
                  mb: 2,
                  fontSize: '1.5rem'
                }}
              >
                1
              </Avatar>
              <Typography variant="h6" gutterBottom>
                Sign Up
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Create your account in less than a minute with our simple registration process
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: 'primary.main',
                  mx: 'auto',
                  mb: 2,
                  fontSize: '1.5rem'
                }}
              >
                2
              </Avatar>
              <Typography variant="h6" gutterBottom>
                Browse Stores
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Explore our extensive list of registered stores and their ratings
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: 'primary.main',
                  mx: 'auto',
                  mb: 2,
                  fontSize: '1.5rem'
                }}
              >
                3
              </Avatar>
              <Typography variant="h6" gutterBottom>
                Rate & Review
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Share your experience by rating stores from 1 to 5 stars
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of users rating and discovering stores
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button 
              variant="contained" 
              size="large"
              sx={{ 
                bgcolor: 'white', 
                color: 'primary.main',
                px: 4,
                '&:hover': {
                  bgcolor: 'grey.100'
                }
              }}
              onClick={() => navigate('/signup')}
              startIcon={<PersonAdd />}
            >
              Create Free Account
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              sx={{ 
                borderColor: 'white', 
                color: 'white',
                px: 4,
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
              onClick={() => navigate('/login')}
              startIcon={<Login />}
            >
              Sign In
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center" mb={2}>
                <Store sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Store Rating Platform
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Your trusted platform for authentic store ratings and reviews.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    opacity: 0.8, 
                    cursor: 'pointer',
                    '&:hover': { opacity: 1 }
                  }}
                  onClick={() => navigate('/login')}
                >
                  Login
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    opacity: 0.8, 
                    cursor: 'pointer',
                    '&:hover': { opacity: 1 }
                  }}
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Contact
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Email: support@storerating.com
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Phone: +1 234 567 8900
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3, bgcolor: 'grey.800' }} />
          <Typography variant="body2" textAlign="center" sx={{ opacity: 0.6 }}>
            © 2024 Store Rating Platform. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Landing;
