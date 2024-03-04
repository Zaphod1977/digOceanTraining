import React, { useState, useEffect } from 'react';

const ImageRender = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);
    fetchImages();
  }, []);  

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      // Ensure this URL matches the endpoint provided by your server
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'}/api/images/list`);
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      } else {
        throw new Error('Failed to fetch images');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Error fetching images: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Images List</h2>
      {images.map((imageUrl, index) => (
        // Assuming the server returns the complete path, or adjust as necessary
        <img key={index} src={imageUrl} alt={`Image ${index}`} style={imageStyle} />
      ))}
    </div>
  );
};

const imageStyle = {
  maxWidth: '100%',
  maxHeight: '200px', // Adjust as needed
  margin: '10px 0',
};

export default ImageRender;