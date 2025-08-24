// // src/pages/Login.js
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import {
//   Container, Paper, TextField, Button, Typography,
//   Box, Alert, InputAdornment, IconButton
// } from '@mui/material';
// import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
// import { toast } from 'react-toastify';
// import { authAPI } from '../services/api';

// function Login() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const response = await authAPI.login(formData);
      
//       if (response.data.success) {
//         // Store token and user data
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('user', JSON.stringify(response.data.user));
        
//         toast.success('Login successful!');
//         navigate('/dashboard');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setError(error.response?.data?.message || 'Login failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Box
//         sx={{
//           marginTop: 8,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
//           <Typography component="h1" variant="h4" align="center" gutterBottom>
//             Store Rating Platform
//           </Typography>
//           <Typography component="h2" variant="h6" align="center" color="textSecondary" gutterBottom>
//             Sign In
//           </Typography>

//           {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

//           <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               type="email"
//               autoComplete="email"
//               autoFocus
//               value={formData.email}
//               onChange={handleChange}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Email />
//                   </InputAdornment>
//                 ),
//               }}
//             />
            
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type={showPassword ? 'text' : 'password'}
//               id="password"
//               autoComplete="current-password"
//               value={formData.password}
//               onChange={handleChange}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Lock />
//                   </InputAdornment>
//                 ),
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       onClick={() => setShowPassword(!showPassword)}
//                       edge="end"
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//               disabled={loading}
//             >
//               {loading ? 'Signing In...' : 'Sign In'}
//             </Button>

//             <Box sx={{ textAlign: 'center' }}>
//               <Typography variant="body2">
//                 Don't have an account?{' '}
//                 <Link to="/signup" style={{ textDecoration: 'none' }}>
//                   Sign Up
//                 </Link>
//               </Typography>
//             </Box>
//           </Box>
//         </Paper>
//       </Box>
//     </Container>
//   );
// }

// export default Login;

// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container, Paper, TextField, Button, Typography,
  Box, Alert, InputAdornment, IconButton, Grid,
  Card, CardContent, Chip, Divider, Stack, Avatar
} from '@mui/material';
import { 
  Visibility, VisibilityOff, Email, Lock, 
  AdminPanelSettings, Person, Store,
  ContentCopy, CheckCircle
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { authAPI } from '../services/api';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Test credentials for demo
  const testCredentials = [
    {
      role: 'Administrator',
      email: 'admin@storerating.com',
      password: 'Admin@123',
      icon: <AdminPanelSettings />,
      color: 'error',
      description: 'Full system access'
    },
    {
      role: 'Normal User',
      email: 'john@example.com',
      password: 'User@123',
      icon: <Person />,
      color: 'success',
      description: 'Rate & review stores'
    },
    {
      role: 'Store Owner',
      email: 'owner@store.com',
      password: 'Owner@123',
      icon: <Store />,
      color: 'warning',
      description: 'Manage store dashboard'
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await authAPI.login(formData);
      
      if (response.data.success) {
        // Store token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        toast.success('Login successful!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (email, password) => {
    setFormData({ email, password });
    // Auto-submit after filling
    setTimeout(() => {
      document.getElementById('login-form').requestSubmit();
    }, 100);
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success('Copied to clipboard!', { autoClose: 1000 });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Grid container spacing={3}>
          {/* Login Form */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 4, height: '100%' }}>
              <Typography component="h1" variant="h4" align="center" gutterBottom>
                Store Rating Platform
              </Typography>
              <Typography component="h2" variant="h6" align="center" color="textSecondary" gutterBottom>
                Sign In to Your Account
              </Typography>

              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

              <Box 
                component="form" 
                id="login-form"
                onSubmit={handleSubmit} 
                sx={{ mt: 2 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  value={formData.email}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>

                <Divider sx={{ my: 2 }}>OR</Divider>

                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2">
                    Don't have an account?{' '}
                    <Link to="/signup" style={{ textDecoration: 'none' }}>
                      Sign Up
                    </Link>
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                      Back to Home
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Test Credentials Card */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 4, height: '100%', bgcolor: 'grey.50' }}>
              <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                <Typography variant="h5" align="center" fontWeight="bold">
                  Demo Credentials
                </Typography>
                <Chip 
                  label="For Testing" 
                  color="primary" 
                  size="small" 
                  sx={{ ml: 2 }}
                />
              </Box>
              
              <Typography variant="body2" align="center" color="textSecondary" sx={{ mb: 3 }}>
                Use these credentials to explore different user roles
              </Typography>

              <Stack spacing={2}>
                {testCredentials.map((cred, index) => (
                  <Card 
                    key={index} 
                    sx={{ 
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 3
                      }
                    }}
                  >
                    <CardContent>
                      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                        <Box display="flex" alignItems="center">
                          <Avatar
                            sx={{ 
                              bgcolor: `${cred.color}.light`,
                              color: `${cred.color}.main`,
                              mr: 2
                            }}
                          >
                            {cred.icon}
                          </Avatar>
                          <Box>
                            <Typography variant="h6">
                              {cred.role}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {cred.description}
                            </Typography>
                          </Box>
                        </Box>
                        <Chip 
                          label={cred.role.split(' ')[0]}
                          color={cred.color}
                          size="small"
                        />
                      </Box>
                      
                      <Divider sx={{ mb: 2 }} />
                      
                      <Stack spacing={1}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                          <Typography variant="body2" color="textSecondary">
                            Email:
                          </Typography>
                          <Box display="flex" alignItems="center">
                            <Typography variant="body2" fontFamily="monospace">
                              {cred.email}
                            </Typography>
                            <IconButton 
                              size="small" 
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(cred.email, index * 2);
                              }}
                            >
                              {copiedIndex === index * 2 ? 
                                <CheckCircle fontSize="small" color="success" /> : 
                                <ContentCopy fontSize="small" />
                              }
                            </IconButton>
                          </Box>
                        </Box>
                        
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                          <Typography variant="body2" color="textSecondary">
                            Password:
                          </Typography>
                          <Box display="flex" alignItems="center">
                            <Typography variant="body2" fontFamily="monospace">
                              {cred.password}
                            </Typography>
                            <IconButton 
                              size="small" 
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(cred.password, index * 2 + 1);
                              }}
                            >
                              {copiedIndex === index * 2 + 1 ? 
                                <CheckCircle fontSize="small" color="success" /> : 
                                <ContentCopy fontSize="small" />
                              }
                            </IconButton>
                          </Box>
                        </Box>
                      </Stack>

                      <Button
                        fullWidth
                        variant="outlined"
                        color={cred.color}
                        size="small"
                        sx={{ mt: 2 }}
                        onClick={() => handleQuickLogin(cred.email, cred.password)}
                      >
                        Quick Login as {cred.role}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </Stack>

              <Alert severity="info" sx={{ mt: 3 }}>
                <Typography variant="body2">
                  <strong>Note:</strong> These are test accounts for demonstration purposes. 
                  Click on any credential to auto-fill the login form.
                </Typography>
              </Alert>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Login;
