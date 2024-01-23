import React, { useState } from 'react';
import ImageUploader from './ImageUplaoder.jsx';

const Note = ({ onNoteSave }) => {
  const [noteText, setNoteText] = useState('');
  const [imageUrls, setImageUrls] = useState([]);

  const handleImageUpload = (url) => {
    setImageUrls([...imageUrls, url]);
  };

  const handleNoteSave = () => {
    // Call the parent component's function to save the note
    onNoteSave({ text: noteText, images: imageUrls });
    // Clear the input fields after saving
    setNoteText('');
    setImageUrls([]);
  };

  return (
    <div>
      <ImageUploader onUpload={handleImageUpload} />
      {/* Display uploaded images */}
      {imageUrls.length > 0 && (
        <div>
          <p>Uploaded Images:</p>
          {imageUrls.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`Image ${index}`} style={imageStyle} />
          ))}
        </div>
      )}
    </div>
  );
};

const imageStyle = {
  maxWidth: '100%',
  maxHeight: '200px', // Adjust as needed
  margin: '10px 0',
};

export default Note;
