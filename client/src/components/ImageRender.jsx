import React, { useState, useEffect } from 'react';

const ImageRender = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch image data from the backend when the component mounts
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/uploadImage'); // Corrected URL
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      } else {
        console.error('Failed to fetch images');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };  

  return (
    <div>
      <h2>Images List</h2>
      {images.map((imageUrl, index) => (
        <img key={index} src={`http://localhost:5000${imageUrl}`} alt={`Image ${index}`} style={imageStyle} />
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
