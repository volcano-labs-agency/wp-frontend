import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/wp-json/wp/v2/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Blog Posts
      </Typography>
      <Grid container spacing={3}>
        {posts.map(post => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/150"
                alt={post.title.rendered}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title.rendered}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.excerpt.rendered.replace(/<[^>]+>/g, '').substring(0, 100)}...
                </Typography>
                <Button 
                  size="small" 
                  variant="contained" 
                  color="primary" 
                  href={post.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ marginTop: '10px' }}
                >
                  Leer más
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>  
  );
}

export default App;
