import React, { useState, useEffect } from 'react';

import axios from 'axios';



import { useFormik } from 'formik';

import {
  apiWatchListList,
  apiWatchlistHistory,
  apiVisitorInmateList,
} from '../../services/api';
import {
  apiVisitorUpdate,
  apiVisitorUpdateWithImage,
  apiDeleteVisitor,
  apiEditToAddWatchlist,
} from '../../services/api';

export default function InmateFaceDB() {
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 8; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Total number of pages (based on itemsPerPage)
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [detailDpo, setDetailDpo] = useState([{}]);

  const [imagePreview, setImagePreview] = useState(null);

  const [nameValue, setNameValue] = useState('');
  const [identityValue, setIdentityValue] = useState('');
  const [countryIdValue, setCountryIdValue] = useState('');
  const [dobValue, setDobValue] = useState('');
  const [statusVaksinValue, setStatusVaksinValue] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditWatchListOpen, setIsModalEditWatchListOpen] =
    useState(false);

  const [dataToDelete, setDataToDelete] = useState(null);
  const [dataToEditWatchList, setDataToEditWatchList] = useState(null);

  const [totalItemPage, setTotalItemPage] = useState(0);

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  const handleClose = () => {
    // setOpenDialog(false);
  };

  const formik = useFormik({
    onSubmit: (values) => {
      handleInsertVisitor({ ...values, image: imagePreview });
      // console.log(values);
    },
  });
  const handleInsertVisitor = async () => {
    // try {
    console.log({
      name: nameValue,
      identity: identityValue,
      country_id: countryIdValue,
      dob: dobValue,
      status_vaksin: statusVaksinValue,
      gender: genderValue,
    });
  };

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
  let handleUpdateWithImage = async () => {
    setLoading(true);
    let params = {
      visitorId: selectedCard.visitor_id,
      userId: selectedCard.user_id,
      name: nameValue,
      identity: identityValue,
      partment: selectedCard.partment,
      gender: genderValue,
      phone: selectedCard.phone,
      custom_name: selectedCard.custom_name,
      custom_phone: selectedCard.custom_phone,
      custom_identity: selectedCard.custom_identity,

      custom_name_last: selectedCard.custom_name_last,
      category: selectedCard.category,
      custom_visitor_id: selectedCard.custom_visitor_id,
      employee_id: selectedCard.employee_id,

      face_invalid: selectedCard.face_invalid,
      shift_id: selectedCard.shift_id,
      country_id: countryIdValue,
      dob: dobValue,
      status_vaksin: statusVaksinValue,
      image: imagePreview,
    };
    console.log(params);
    await setLoading(true);
    apiVisitorUpdateWithImage(params)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setLoading(false);
          setIsModalEditOpen(false);
          fetchData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log('Updating with image...');
  };
  const handleUpdateWithoutImage = async () => {
    let params = {
      visitorId: selectedCard.visitor_id,
      userId: selectedCard.user_id,
      name: nameValue,
      identity: identityValue,
      partment: selectedCard.partment,
      gender: genderValue,
      phone: selectedCard.phone,
      custom_name: selectedCard.custom_name,
      custom_phone: selectedCard.custom_phone,
      custom_identity: selectedCard.custom_identity,
      // checkIn : selectedCard.checkIn,
      // checkOut : selectedCard.checkOut,
      custom_name_last: selectedCard.custom_name_last,
      category: selectedCard.category,
      custom_visitor_id: selectedCard.custom_visitor_id,
      employee_id: selectedCard.employee_id,
      // vms_visit_company : selectedCard.vms_visit_company,
      // pcr_antigen : selectedCard.pcr_antigen,
      face_invalid: selectedCard.face_invalid,
      shift_id: selectedCard.shift_id,
      country_id: countryIdValue,
      dob: dobValue,
      status_vaksin: statusVaksinValue,
    };
    console.log(params);
    await setLoading(true);
    apiVisitorUpdate(params)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setLoading(false);
          setIsModalEditOpen(false);
          fetchData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log('Updating without image...');
  };
  const renderImagePreview = () => {
    return (
      <img
        style={{ height: 300, width: 200, marginBottom: 2, borderRadius: 10 }}
        src={imagePreview}
      />
    );
  };

  const handleOpenEditWatchListModal = (data) => {
    setDataToEditWatchList(data);
    setIsModalEditWatchListOpen(true);
  };

  const handleCloseEditWatchListModal = () => {
    setDataToEditWatchList(null);
    setIsModalEditWatchListOpen(false);
  };

  const handleEditWatchListConfirmed = async () => {
    setLoading(true);
    if (dataToEditWatchList) {
      const params = {
        visitorId: dataToEditWatchList.visitor_id,
      };
      console.log(params, 'params');
      await setLoading(true);
      apiEditToAddWatchlist(params)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setLoading(false);
            fetchData();
            handleCloseEditWatchListModal();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleOpenDeleteModal = (data) => {
    setDataToDelete(data);
    setIsModalDeleteOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDataToDelete(null);
    setIsModalDeleteOpen(false);
  };

  const handleDeleteConfirmed = async () => {
    setLoading(true);
    if (dataToDelete) {
      const params = {
        visitorId: dataToDelete.visitor_id,
      };
      await setLoading(true);
      apiDeleteVisitor(params)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setLoading(false);
            fetchData();
            handleCloseDeleteModal();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  let handleDeleteClick = async (data) => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this visitor?'
    );

    if (isConfirmed) {
      console.log(data);
      let params = {
        visitorId: data.visitor_id,
      };
      await setLoading(true);
      apiDeleteVisitor(params)
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            setLoading(false);
            fetchData();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDetailClick = async (data) => {
    await setSelectedCard(data);
    console.log(data);
    await apiWatchlistHistory({ visitorId: data.visitor_id, pageSize: 5 }).then(
      (res) => {
        console.log(res);
        setDetailDpo(res.records);
      }
    );
    await setIsModalOpen(true); // Open the modal when a card is clicked
  };

  const fetchData = async () => {
    setLoading(true);
    let response = await apiVisitorInmateList({
      pageSize: itemsPerPage,
      pageIndex: currentPage,
      name: searchQuery.trim(), // Trim the search query to remove leading/trailing spaces
    });
    setData(response.records);
    console.log(response, 'data');
    setTotalPages(response.pagesCount);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, searchQuery]); // Update when currentPage or searchQuery changes

  const handleSearch = () => {
    setCurrentPage(1); // Reset to the first page when performing a search
    fetchData();
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  function calculateAge(birthdate) {
    // console.log("Birthdate:", birthdate);
    const birthDate = new Date(birthdate);
    // console.log("Parsed Birthdate:", birthDate);

    const currentDate = new Date();
    // console.log("Current Date:", currentDate);

    let age = currentDate.getFullYear() - birthDate.getFullYear();
    // console.log("Initial Age:", age);

    const birthMonth = birthDate.getMonth();
    const currentMonth = currentDate.getMonth();

    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--; // Subtract 1 if birthday hasn't occurred yet this year
    }

    // console.log("Final Age:", age);
    return age;
  }

  function formatDateToIndonesian(dateString) {
    const months = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${months[month]} ${year}`;
  }
  async function imageUrlToBase64(imageUrl) {
    try {
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
      });
      const imageBuffer = response.data;

      const arrayBufferView = new Uint8Array(imageBuffer);
      const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
      const base64String = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(blob);
      });

      return `data:image/jpeg;base64,${base64String}`;
    } catch (error) {
      console.error('Error:', error);
      throw error; // Rethrow the error to be caught at the caller's level if needed
    }
  }

  const handleEditClick = async (data) => {
    await setSelectedCard(data);
    await setNameValue(data.name);
    await setIdentityValue(data.identity);
    await setCountryIdValue(data.country_id);
    await setDobValue(data.dob);
    await setStatusVaksinValue(data.status_vaksin);
    await setGenderValue(data.gender);
    setImagePreview(
      'https://dev.transforme.co.id/gema_admin_api' + data.face_pics
    );
    // Assuming data.face_pics contains the image path
    const imageUrl = 'http://43.205.129.136/gema_admin_api' + data.face_pics;
    // const imageUrl = "https://placehold.co/600x400.png";

    // const base64Image = await imageUrlToBase64(imageUrl);

    setIsModalEditOpen(true); // Open the modal when a card is clicked
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBlock: 20,
        }}
      >
        <h3> Database Pengenalan Wajah Prajurit Binaan</h3>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch} style={{ color: 'white' }}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((data, index) => (
            <div key={index} className="max-w-sm mx-auto">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={
                    data.face_pics
                      ? 'https://dev.transforme.co.id/gema_admin_api' +
                        data.face_pics
                      : 'https://via.placeholder.com/200x300'
                  }
                  alt={data.name}
                  className="h-48 w-full object-cover"
                />
                <div className="px-4 py-2">
                  <div className="flex justify-between items-center mb-2">
                    <h6 className="text-lg font-semibold">{data.name}</h6>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white rounded-md px-2 py-1 focus:outline-none"
                      onClick={() => handleDetailClick(data)}
                    >
                      Detail
                    </button>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex">
                      <p className="text-sm">Gender&nbsp;</p>
                      <p className="text-lg">{data.gender ? 'Man' : 'Woman'}</p>
                    </div>
                    <div className="flex">
                      <p className="text-sm">Age&nbsp;</p>
                      <p className="text-lg">{calculateAge(data.dob)}</p>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="flex">
                      <p className="text-sm">Nationality&nbsp;</p>
                      <p className="text-lg">{data.country_name}</p>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="flex">
                      <p className="text-sm">Data Created&nbsp;</p>
                      <p className="text-lg">
                        {formatDateToIndonesian(data.create_stamp)}
                      </p>
                    </div>
                  </div>
                  <div className="mb-2">
                    <p
                      className={`text-lg ${
                        data.status_vaksin === 0
                          ? 'text-red-500'
                          : data.status_vaksin === 1
                          ? 'text-orange-500'
                          : data.status_vaksin === 2
                          ? 'text-yellow-500'
                          : 'text-green-500'
                      }`}
                    >
                      {data.status_vaksin === 0
                        ? 'Not Vaccinated'
                        : data.status_vaksin === 1
                        ? 'Vaccine 1'
                        : data.status_vaksin === 2
                        ? 'Vaccine 2'
                        : data.status_vaksin === 3
                        ? 'Booster 1'
                        : data.status_vaksin === 4
                        ? 'Booster 2'
                        : ''}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-2 py-1 focus:outline-none"
                        onClick={() => handleEditClick(data)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-2 py-1 focus:outline-none"
                        onClick={() => handleDetailClick(data)}
                      >
                        Detail
                      </button>
                    </div>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white rounded-md px-2 py-1 focus:outline-none"
                      onClick={() => handleOpenDeleteModal(data)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center">
  <p className="text-sm text-gray-700">
    {data.length > 0 ? (
      <>
        Showing{' '}
        {data.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} -{' '}
        {currentPage === totalPages
          ? totalItemPage
          : Math.min(currentPage * itemsPerPage, totalItemPage)}{' '}
        of {totalItemPage} data
      </>
    ) : (
      'No data found'
    )}
  </p>
  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className={`${
        currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
      } relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium focus:outline-none`}
    >
      Previous
    </button>
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        onClick={() => handlePageChange(i + 1)}
        className={`${
          currentPage === i + 1
            ? 'bg-blue-500 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        } relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium focus:z-10 focus:outline-none`}
      >
        {i + 1}
      </button>
    ))}
    <button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={`${
        currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
      } relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium focus:outline-none`}
    >
      Next
    </button>
  </nav>
</div>

      </div>

      {isModalEditOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 bg-white p-8 rounded-lg overflow-y-scroll">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold">Edit Data</div>
              <button
                onClick={() => setIsModalEditOpen(false)}
                className="text-blue-500 hover:underline focus:outline-none"
              >
                Tutup
              </button>
            </div>

            <form
              className="px-10 w-full flex flex-col gap-8 items-center"
              onSubmit={async (event) => {
                event.preventDefault(); // Prevent page reload

                if (imagePreview.startsWith('data:image/')) {
                  // Execute function for updating with image
                  await handleUpdateWithImage();
                } else {
                  // Execute function for updating without image
                  await handleUpdateWithoutImage();
                }
              }}
            >
              <div className="flex justify-center gap-8 w-full">
                <div className="max-w-xs w-1/3">
                  <div className="max-w-xs mx-auto mt-3 p-1 bg-white border border-gray-200 rounded-lg shadow-md flex flex-col items-center">
                    {renderImagePreview()}
                    <input
                      accept="image/*"
                      type="file"
                      id="image-upload"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="image-upload">
                      <button
                        type="button"
                        className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none"
                      >
                        Upload Image
                      </button>
                    </label>
                  </div>
                </div>
                <div className="w-2/3">
                  <input
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                    className="w-full mt-2 p-2 border border-gray-200 rounded-lg"
                    placeholder="Nama Prajurit Binaan"
                  />
                  <input
                    value={selectedCard?.visitor_id}
                    onChange={(e) => setVisitorIdValue(e.target.value)}
                    className="w-full mt-2 p-2 border border-gray-200 rounded-lg"
                    placeholder="ID Prajurit Binaan"
                    disabled
                  />
                  <input
                    value={identityValue}
                    onChange={(e) => setIdentityValue(e.target.value)}
                    className="w-full mt-2 p-2 border border-gray-200 rounded-lg"
                    placeholder="Identity Number / ID Card Number"
                  />
                  <input
                    value={dobValue}
                    onChange={(e) => setDobValue(e.target.value)}
                    type="date"
                    className="w-full mt-2 p-2 border border-gray-200 rounded-lg"
                    placeholder="Tanggal Lahir"
                  />
                  <select
                    name="status_vaksin"
                    value={statusVaksinValue}
                    onChange={(e) => setStatusVaksinValue(e.target.value)}
                    className="w-full mt-2 p-2 border border-gray-200 rounded-lg"
                  >
                    <option value={0}>Belum Vaksin</option>
                    <option value={1}>Vaksin Dosis 1</option>
                    <option value={2}>Vaksin Dosis 2</option>
                    <option value={3}>Vaksin Booster 1</option>
                    <option value={4}>Vaksin Booster 2</option>
                  </select>
                  <select
                    name="gender"
                    value={
                      genderValue ? (genderValue === 'true' ? 't' : 'f') : ''
                    }
                    onChange={(e) => setGenderValue(e.target.value)}
                    className="w-full mt-2 p-2 border border-gray-200 rounded-lg"
                  >
                    <option disabled value="">
                      Silahkan Memilih Gender
                    </option>
                    <option value="t">Pria</option>
                    <option value="f">Wanita</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              height: '80%',
              // maxWidth: 600,
              backgroundColor: 'white',
              padding: 30,
              borderRadius: 8,
              overflowY: 'scroll',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <div>
                <div>Detail Database Wajah </div>
              </div>
              <button onClick={() => setIsModalOpen(false)}>tutup </button>
            </div>

            {selectedCard && (
              <div>
                <div
                  style={{
                    display: 'flex',
                  }}
                >
                  <div style={{ width: 400, height: 400 }}>
                    <img
                      className="w-full h-full object-contain"
                      src={
                        selectedCard.face_pics
                          ? 'https://dev.transforme.co.id/gema_admin_api' +
                            selectedCard.face_pics
                          : 'https://via.placeholder.com/200x300'
                      }
                      alt={selectedCard.name}
                    />
                  </div>
                  <div className="bg-white p-4 rounded-lg overflow-x-auto">
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="font-bold">Name</td>
                          <td>{selectedCard.name}</td>
                        </tr>
                        <tr>
                          <td className="font-bold">Date of Birth</td>
                          <td>{selectedCard.dob}</td>
                        </tr>
                        <tr>
                          <td className="font-bold">Country</td>
                          <td>{selectedCard.country_name}</td>
                        </tr>
                        <tr>
                          <td className="font-bold">ID Card</td>
                          <td>{selectedCard.identity}</td>
                        </tr>
                        <tr>
                          <td className="font-bold">Gender</td>
                          <td>{selectedCard.gender ? 'Male' : 'Female'}</td>
                        </tr>
                        <tr>
                          <td className="font-bold">Input Date</td>
                          <td>{selectedCard.create_stamp}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    // marginBottom: 10,
                    marginTop: 20,
                  }}
                >
                  <div>
                    <div>Riwayat Tangkapan Kamera </div>
                    {/* {selectedCard && (
                <Typography variant="subtitle1">
                  Name: {selectedCard.name}
                </Typography>
              )} */}
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: '15px',
                    marginTop: 20,
                  }}
                >
                  {detailDpo.map((data, index) => (
                    <div
                      className="group cursor-pointer border border-gray-200 hover:border-blue-500 rounded-lg shadow-lg p-4"
                      //  onClick={() => handleCardClick(data)}
                    >
                      <img
                        className="w-full h-48 object-cover"
                        src={
                          selectedCard.face_pics
                            ? 'https://dev.transforme.co.id/gema_admin_api' +
                              data.image
                            : 'https://via.placeholder.com/200x300'
                        }
                        alt={selectedCard.name}
                      />
                      <div className="p-4">
                        <p className="text-lg font-semibold mb-2 group-hover:text-blue-500">
                          {data.timestamp}
                        </p>
                        <p className="text-md mb-2">{data.device_name}</p>
                        <p className="text-md">{data.location_name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {isModalEditWatchListOpen && (
        <div>
          <div>Konfirmasi Ubah Status Prajurit Binaan </div>
          <div>
            <div>Anda Yakin Mengubah Status menjadi Watch List?</div>
          </div>
          <div>
            <button onClick={handleCloseEditWatchListModal}>Batal</button>
            <button onClick={handleEditWatchListConfirmed}>
              Ubah Status Menjadi Watchlist
            </button>
          </div>
        </div>
      )}
      {isModalDeleteOpen && (
        <div>
          <div>Confirm Delete</div>
          <div>
            <div>Are you sure you want to delete this visitor?</div>
          </div>
          <div>
            <button onClick={handleCloseDeleteModal}>Cancel</button>
            <button onClick={handleDeleteConfirmed}>Delete</button>
          </div>
        </div>
      )}
    </>
  );
}
