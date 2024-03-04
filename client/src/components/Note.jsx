import React, { useState } from 'react';
import ImageUpload from './ImageUploader.jsx'; // Make sure the import path matches your file structure

const Note = ({ onNoteSave }) => {
  const [noteText, setNoteText] = useState('');
  const [imageUrls, setImageUrls] = useState([]);

  const handleImageUpload = (url) => {
    setImageUrls([...imageUrls, url]);
  };

  const handleNoteSave = () => {
    onNoteSave({ text: noteText, images: imageUrls });
    setNoteText('');
    setImageUrls([]);
  };

  return (
    <div>
      <ImageUpload onUpload={handleImageUpload} />
      {imageUrls.length > 0 && (
        <div>
          <p>Uploaded Images:</p>
          {imageUrls.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`Uploaded`} style={imageStyle} />
          ))}
        </div>
      )}
    </div>
  );
};

const imageStyle = {
  maxWidth: '100%',
  maxHeight: '200px',
  margin: '10px 0',
};

export default Note;
