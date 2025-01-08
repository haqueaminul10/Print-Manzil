import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import html2canvas from 'html2canvas';
import 'react-resizable/css/styles.css';
import tShirt from '../assets/images.jpeg';
import '../style/addProduct.css';

const AddProduct = () => {
  const [uploadedLogo, setUploadedLogo] = useState(null);
  const [logoSize, setLogoSize] = useState({ width: 100, height: 100 });
  const tshirtRef = useRef();

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUploadedLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleResize = (event, { size }) => {
    setLogoSize(size);
  };

  const handleSaveDesign = async () => {
    if (tshirtRef.current) {
      const canvas = await html2canvas(tshirtRef.current);
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'final_tshirt_design.png';
      link.click();
    }
  };

  return (
    <div className='add-product-container'>
      <div className='add-product-main'>
        <div
          ref={tshirtRef}
          className='tshirt-container'
          style={{
            backgroundImage: `url(${tShirt})`,
          }}
        >
          {uploadedLogo && (
            <Draggable>
              <ResizableBox
                className='resizable-logo'
                width={logoSize.width}
                height={logoSize.height}
                resizeHandles={['se']}
                onResize={handleResize}
                lockAspectRatio={true}
              >
                <img
                  src={uploadedLogo}
                  alt='Uploaded Logo'
                  className='uploaded-logo'
                />
              </ResizableBox>
            </Draggable>
          )}
        </div>

        <div className='controls-section'>
          <div className='upload-input-container'>
            <input
              type='file'
              accept='image/*'
              onChange={handleLogoUpload}
              className='upload-input'
            />
          </div>
          <button onClick={handleSaveDesign} className='submit-button'>
            Submit Design
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
