import React, { useState, useEffect } from 'react';
import { SearchIcon, CloseIcon } from '@heroicons/react/solid'
import { apiVisitorSearch, apiWatchlistHistory, webserviceurl } from '../../services/api';

export default function DatabaseSearch() {
  const [imagePreview, setImagePreview] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [detailWatchlist, setDetailDpo] = useState([{}]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsFound(false);
    setIsNotFound(false);
  };

  const renderImagePreview = () => {
    if (imagePreview) {
      return (
        <img
          className="h-72 w-48 mb-2 rounded-2xl"
          src={imagePreview}
          alt="Image Preview"
        />
      );
    } else {
      // Placeholder image if no image is selected
      return (
        <img
          className="h-72 w-48 mb-2 rounded-2xl"
          src="https://via.placeholder.com/200x300"
          alt="Placeholder"
        />
      );
    }
  };

  const handleCardClick = async (data) => {
    await setSelectedCard(data);
    await apiWatchlistHistory({ visitorId: data.visitor_id, pageSize: 5 }).then(
      (res) => {
        setDetailDpo(res.records);
      }
    );
    await setIsModalOpen(true); // Open the modal when a card is clicked
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      let data = await apiVisitorSearch(imagePreview);
      setSearchResult(data);
      if (data.length > 0) {
        setIsFound(true);
      } else {
        setIsNotFound(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h5 className="text-2xl mb-2">Pencarian di Database</h5>
        <p className="mb-2">
          Fitur untuk mencari data berdasarkan gambar, silahkan masukan parameter
          yang diperlukan
        </p>
        <br />
        <form
          style={{
            padding: '0px 40px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <div>
              <div className="max-w-sm mx-auto rounded-xl overflow-hidden shadow-lg">
                {renderImagePreview()}
                <input
                  accept="image/*"
                  type="file"
                  id="image-upload"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="image-upload"
                  className="block px-6 py-3 bg-primary text-white text-center cursor-pointer"
                >
                  Unggah Gambar
                </label>
              </div>
            </div>
            <div>
              <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="py-2">Hasil Pencarian</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResult?.map((row) => (
                      <tr
                        onClick={() => handleCardClick(row)}
                        className="cursor-pointer"
                        key={row.name}
                      >
                        <td className="px-6 py-4 border-b">{row.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button
              type="button"
              className="bg-primary text-white px-6 py-3 rounded-md cursor-pointer"
              onClick={handleSearch}
              disabled={!imagePreview}
            >
              Cari
            </button>
          </div>
        </form>
        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70">
            <div className="bg-white w-4/5 h-4/5 max-w-3xl p-6 rounded-xl overflow-y-scroll">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold">Detail Prajurit Binaan</h3>
                <button
                  type="button"
                  className="bg-primary text-white px-4 py-2 rounded-md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Tutup
                </button>
              </div>
              {selectedCard && (
                <div className="flex">
                  <div className="w-72 h-72">
                    <img
                      className="w-full h-full object-contain"
                      src={
                        selectedCard.face_pics
                          ? webserviceurl + selectedCard.face_pics
                          : 'https://via.placeholder.com/200x300'
                      }
                      alt={selectedCard.name}
                    />
                  </div>
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <td className="font-semibold">Nama</td>
                          <td>{selectedCard.name}</td>
                        </tr>
                        <tr>
                          <td className="font-semibold">Tanggal Lahir</td>
                          <td>{selectedCard.dob}</td>
                        </tr>
                        <tr>
                          <td className="font-semibold">Kebangsaan</td>
                          <td>{selectedCard.country_name}</td>
                        </tr>
                        <tr>
                          <td className="font-semibold">Nomor Identitas</td>
                          <td>{selectedCard.identity}</td>
                        </tr>
                        <tr>
                          <td className="font-semibold">Jenis Kelamin</td>
                          <td>{selectedCard.gender ? 'Male' : 'Female'}</td>
                        </tr>
                        <tr>
                          <td className="font-semibold">ID Prajurit Binaan</td>
                          <td>{selectedCard.visitor_id}</td>
                        </tr>
                        <tr>
                          <td className="font-semibold">Tanggal Input</td>
                          <td>{selectedCard.create_stamp}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              <div className="flex justify-between items-center mt-6">
                <h5 className="text-xl font-semibold">
                  Riwayat Tangkapan Kamera Prajurit Binaan
                </h5>
              </div>
              <div className="flex gap-4 mt-6">
                {detailWatchlist.map((data, index) => (
                  <div
                    className="cursor-pointer"
                    key={index}
                    onClick={() => handleCardClick(data)}
                  >
                    <div className="max-w-xs bg-white shadow-md rounded-md overflow-hidden">
                      <img
                        className="h-48 w-full object-cover"
                        src={
                          selectedCard.face_pics
                            ? webserviceurl + data.image
                            : 'https://via.placeholder.com/200x300'
                        }
                        alt={selectedCard.name}
                      />
                      <div className="px-4 py-2">
                        <p className="text-lg font-semibold">{data.timestamp}</p>
                        <p className="text-lg">{data.device_name}</p>
                        <p className="text-lg">{data.location_name}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {isFound && (
          <div className="fixed bottom-0 right-0 mr-8 mb-8">
            <div className="bg-green-500 text-white px-6 py-3 rounded-md">
              Data Ditemukan
            </div>
          </div>
        )}
        {isNotFound && (
          <div className="fixed bottom-0 right-0 mr-8 mb-8">
            <div className="bg-red-500 text-white px-6 py-3 rounded-md">
              Data Tidak Ditemukan
            </div>
          </div>
        )}
      </div>
    </>
  );
}
