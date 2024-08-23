import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ImageView = () => {
  const { imageUrl } = useParams();
  const imageUrlPath = `uploads/${imageUrl}`;
  
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Payment Screenshot</h2>
      <div style={{ maxWidth: '80%', margin: 'auto' }}>
        <img
          src={imageUrlPath}
          alt="Payment Screenshot"
          style={{
            maxWidth: '100%',
            height: 'auto',
            border: '1px solid #ccc',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
          onError={() => setImgError(true)}
        />
        {imgError && <p style={{ color: 'red' }}>Image failed to load.</p>}
      </div>
      <br />
      <button onClick={() => navigate(-1)} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Go Back
      </button>
    </div>
  );
}  
export default ImageView;
