// src/components/user/StoreCard.js
import React, { useState } from 'react';
import {
  Card, CardContent, Typography, Rating, Box, Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Chip, Divider, Stack
} from '@mui/material';
import { 
  Star, StarBorder, LocationOn, Email, 
  Edit, RateReview, People 
} from '@mui/icons-material';
import { ratingAPI } from '../../services/api';
import { toast } from 'react-toastify';

function StoreCard({ store, viewMode, onRatingUpdate }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [rating, setRating] = useState(store.user_rating || 0);
  const [hover, setHover] = useState(-1);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitRating = async () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setSubmitting(true);
    try {
      await ratingAPI.submitRating({
        storeId: store.id,
        rating: rating
      });
      
      toast.success(store.user_rating ? 'Rating updated successfully' : 'Rating submitted successfully');
      setOpenDialog(false);
      onRatingUpdate();
    } catch (error) {
      toast.error('Failed to submit rating');
    } finally {
      setSubmitting(false);
    }
  };

  const labels = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent',
  };

  const getLabelText = (value) => {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  };

  return (
    <>
      <Card 
        sx={{ 
          height: viewMode === 'grid' ? '100%' : 'auto',
          display: 'flex',
          flexDirection: viewMode === 'grid' ? 'column' : 'row',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 3
          }
        }}
      >
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            {store.name}
          </Typography>
          
          <Stack spacing={1} sx={{ mb: 2 }}>
            <Box display="flex" alignItems="center" gap={1}>
              <LocationOn fontSize="small" color="action" />
              <Typography variant="body2" color="textSecondary">
                {store.address}
              </Typography>
            </Box>
            
            <Box display="flex" alignItems="center" gap={1}>
              <Email fontSize="small" color="action" />
              <Typography variant="body2" color="textSecondary">
                {store.email}
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Average Rating
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Rating 
                  value={store.average_rating} 
                  readOnly 
                  precision={0.1}
                  size="small"
                />
                <Typography variant="body2">
                  ({store.average_rating.toFixed(1)})
                </Typography>
              </Box>
            </Box>
            
            <Chip 
              icon={<People />}
              label={`${store.total_ratings} ratings`}
              size="small"
              variant="outlined"
            />
          </Box>

          {store.user_rating && (
            <Box sx={{ p: 1, bgcolor: 'primary.light', borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" color="white" gutterBottom>
                Your Rating
              </Typography>
              <Rating 
                value={store.user_rating} 
                readOnly 
                size="small"
                sx={{ color: 'white' }}
              />
            </Box>
          )}

          <Button
            fullWidth
            variant={store.user_rating ? "outlined" : "contained"}
            startIcon={store.user_rating ? <Edit /> : <RateReview />}
            onClick={() => {
              setRating(store.user_rating || 0);
              setOpenDialog(true);
            }}
          >
            {store.user_rating ? 'Update Rating' : 'Rate This Store'}
          </Button>
        </CardContent>
      </Card>

      {/* Rating Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle>
          {store.user_rating ? 'Update Your Rating' : 'Rate This Store'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h6" gutterBottom>
              {store.name}
            </Typography>
            
            <Rating
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              onChangeActive={(event, newHover) => setHover(newHover)}
              size="large"
              icon={<Star fontSize="inherit" />}
              emptyIcon={<StarBorder fontSize="inherit" />}
              getLabelText={getLabelText}
            />
            
            {rating !== null && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">
                  {labels[hover !== -1 ? hover : rating]}
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmitRating} 
            variant="contained"
            disabled={submitting || rating === 0}
          >
            {submitting ? 'Submitting...' : 'Submit Rating'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default StoreCard;
