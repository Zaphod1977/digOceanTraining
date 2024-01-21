import React, { useState } from 'react';
import ImageUploader from './ImageUplaoder.jsx';

const Note = ({ onNoteSave }) => {
  const [noteText, setNoteText] = useState('');
  const [imageUrls, setImageUrls] = useState([]);

  const handleImageUpload = (url) => {
    setImageUrls([...imageUrls, url]);
  };

  const handleSave = () => {
    // Some logic to get noteText and imageUrls
    onNoteSave({ noteText, imageUrls });
  };

  const handleNoteSave = () => {
    // Call the parent component's function to save the note
    onNoteSave({ noteText, imageUrls });
    // Clear the input fields after saving
    setNoteText('');
    setImageUrls([]);
  };

  return (
    <div>
      {/* <textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} />
      <button onClick={handleSave}>Save Note</button> */}
      <ImageUploader onUpload={handleImageUpload} />
      {/* <button onClick={handleNoteSave}>Save Note</button> */}
    </div>
  );
};

export default Note;