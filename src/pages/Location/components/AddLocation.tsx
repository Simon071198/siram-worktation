import React, { useState } from 'react';

import { apiCreateLocation } from '../../../services/api';
import { webserviceurl } from '../../../services/api';

interface LocationData {
  location_name: string;
  lat: string;
  long: string;
}

interface CreateLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: LocationData) => void;
}

export default function AddLocation() {
  const [formData, setFormData] = useState();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Kirim data ke API Anda di sini
    onCreate(formData);

    // Tutup modal
    onClose();
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Create Location</h2>
          <form>
            <label htmlFor="location_name">Location Name:</label>
            <input
              type="text"
              id="location_name"
              name="location_name"
              value={formData.location_name}
              onChange={handleChange}
              required
            />
            <br />
            <label htmlFor="lat">Latitude:</label>
            <input
              type="text"
              id="lat"
              name="lat"
              value={formData.lat}
              onChange={handleChange}
              required
            />
            <br />
            <label htmlFor="long">Longitude:</label>
            <input
              type="text"
              id="long"
              name="long"
              value={formData.long}
              onChange={handleChange}
              required
            />
            <br />
            <button type="button" onClick={handleSubmit}>Create Location</button>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateLocationModal;
