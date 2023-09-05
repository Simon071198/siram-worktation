import { useState, useEffect, useMemo } from 'react';

import DataTable from 'examples/Tables/DataTable';
import {
  TableCell,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import axios from 'axios';
import { apiVisitorRealtimeLogList } from '../../services/api';
import { makeStyles } from '@mui/styles';

import { webserviceurl } from '../../services/api';

let useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBlock: 20,
  },
}));

const DataNotFoundModal = ({ open, onClose, message }) => {
  return (
    <div
      className={`fixed ${open ? 'block' : 'hidden'} inset-0 overflow-y-auto`}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h2 className="text-xl font-bold text-gray-900">Data Not Found</h2>
            <p className="text-gray-700">{message}</p>
          </div>
          <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Realtime() {
  let classes = useStyles();

  const [data, setData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [selectedAnalytics, setSelectedAnalytics] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [jsonData, setJsonData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
    setSelectedDevice('');
  };

  const handleDeviceChange = (event) => {
    setSelectedDevice(event.target.value);
  };

  const selectedLocationEntry = jsonData.find(
    (entry) => entry.location === selectedLocation,
  );
  const devices = selectedLocationEntry ? selectedLocationEntry.devices : [];

  function exportToCSV(data, filename) {
    const csvData = convertToCSV(data);
    const csvBlob = new Blob([csvData], { type: 'text/csv' });
    // Check if the browser supports the HTML5 "download" attribute
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      // For IE browser
      window.navigator.msSaveOrOpenBlob(csvBlob, filename);
    } else {
      // For other browsers
      const csvURL = URL.createObjectURL(csvBlob);
      const tempLink = document.createElement('a');
      tempLink.href = csvURL;
      tempLink.setAttribute('download', filename);
      tempLink.setAttribute('target', '_blank');
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
    }
  }

  const handleExportClick = () => {
    if (data && data.length > 0) {
      exportToCSV(data, 'exported_data.csv');
    } else {
      setShowModal(true);
      setModalMessage('No data found to export.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalMessage('');
  };

  function convertToCSV(data) {
    const csvRows = [];
    const headers = Object.keys(data[0]);

    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = headers.map((header) => {
        const escapedValue = String(row[header]).replace(/"/g, '\\"');
        return `"${escapedValue}"`;
      });
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  }

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

  let fetch = async () => {
    let params = {
      device_id: selectedDevice,
      country_id: selectedCountry,
      age: selectedAge,
      analytics: selectedAnalytics,
      name: selectedName,
      gender: selectedGender,
    };
    await setLoading(true);
    let data = await apiVisitorRealtimeLogList(params);
    setData(data);
    setLoading(false);
    console.log(data);
  };
  useEffect(() => {
    fetch();
  }, [
    selectedDevice,
    selectedCountry,
    selectedAge,
    selectedAnalytics,
    selectedName,
    selectedGender,
  ]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post(
        webserviceurl + 'location/readOnline.php',
      );
      console.log(result.data.data.records);
      setJsonData(result.data.data.records);
    };
    fetchData();
  }, []);

  const columnsRealtimeTable = useMemo(
    () => [
      {
        Header: 'Camera Image',
        accessor: 'image',
        width: '10%',
        Cell: ({ row }) => (
          <TableCell>
            <img
              src={
                'https://dev.transforme.co.id/gema_admin_api' +
                row.original.image
              }
              alt="Camera Image"
              style={{ width: '100px' }}
            />
          </TableCell>
        ),
      },
      {
        Header: 'Database Image',
        accessor: 'face_pics',
        width: '10%',
        Cell: ({ row }) => (
          <TableCell>
            {row.original.face_pics == null ? (
              <Typography variant="body6">No Image</Typography>
            ) : (
              <img
                src={
                  'https://dev.transforme.co.id/gema_admin_api' +
                  row.original.face_pics
                }
                alt="Database Image"
                style={{ width: '100px' }}
              />
            )}
          </TableCell>
        ),
      },
      { Header: 'Name', accessor: 'visitor_name', width: '10%' },
      // { Header: "Gender", accessor: "gender", width: "10%" },
      {
        Header: 'Gender',
        accessor: 'gender',
        width: '10%',
        Cell: ({ row }) => (
          <TableCell>
            <Typography variant="body6">
              {row.original.gender === true
                ? 'Pria'
                : row.original.gender === false
                ? 'Wanita'
                : row.original.gender === null || row.original.gender === ''
                ? 'Unknown'
                : null}
            </Typography>
          </TableCell>
        ),
      },
      {
        Header: 'Age',
        accessor: 'age',
        width: '10%',
        Cell: ({ row }) => (
          <TableCell>
            <Typography variant="body6">
              {calculateAge(row.original.dob)}
            </Typography>
          </TableCell>
        ),
      },

      {
        Header: 'Status',
        accessor: 'status',
        width: '10%',
        Cell: ({ row }) => (
          <TableCell>
            <Typography variant="body6">
              {row.original.isdpo
                ? 'Watchlist'
                : row.original.isemployee
                ? 'Employee'
                : 'Prajurit Binaan'}
            </Typography>
          </TableCell>
        ),
      },
      {
        Header: 'Camera Filter',
        accessor: 'device_name',
        width: '10%',
        Cell: ({ row }) => (
          <TableCell>
            <Typography variant="body6">
              {row.original.device_name} - {row.original.location_name}
            </Typography>
          </TableCell>
        ),
      },
      { Header: 'Timestamp', accessor: 'timestamp', width: '10%' },
    ],
    [],
  );
  const columnsRealtimeTableUnrecognized = useMemo(
    () => [
      {
        Header: 'Camera Image',
        accessor: 'image',
        width: '10%',
        Cell: ({ row }) => (
          <TableCell>
            <img
              src={
                'https://dev.transforme.co.id/gema_admin_api' +
                row.original.image
              }
              alt="Camera Image"
              style={{ width: '100px' }}
            />
          </TableCell>
        ),
      },
      { Header: 'Name', accessor: 'visitor_name', width: '10%' },

      { Header: 'Age', accessor: 'age', width: '10%' },
      { Header: 'Status', accessor: 'status', width: '10%' },
      {
        Header: 'Camera Filter',
        accessor: 'device_name',
        width: '10%',
        Cell: ({ row }) => (
          <TableCell>
            <Typography variant="body6">
              {row.original.device_name} - {row.original.location_name}
            </Typography>
          </TableCell>
        ),
      },
      { Header: 'Timestamp', accessor: 'timestamp', width: '10%' },
    ],
    [],
  );
  return (
    <>
      <div className={classes.header}>
        <h3>Log Realtime</h3>
        <div className="flex w-[70%] space-x-4">
          <div className="w-1/6">
            <div className="w-full">
              <label
                htmlFor="analytics-select"
                className="block text-sm font-medium text-gray-700"
              >
                Select Analytics
              </label>
              <select
                id="analytics-select"
                name="Select Analytics"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={selectedAnalytics}
                onChange={(e) => setSelectedAnalytics(e.target.value)}
              >
                <option value="">All Analytics</option>
                <option value="unrecognized">Unrecognized</option>
                <option value="face_recognition">Face Recognition</option>
              </select>
            </div>
          </div>
          <div className="w-1/6">
            <div className="w-full">
              <label
                htmlFor="name-input"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name-input"
                type="text"
                name="Name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={selectedName}
                onChange={(e) => setSelectedName(e.target.value)}
              />
            </div>
          </div>
          <div className="w-1/6">
            <div className="w-full">
              <label
                htmlFor="age-input"
                className="block text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <input
                id="age-input"
                type="text"
                name="Age"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value)}
              />
            </div>
          </div>
          <div className="w-1/6">
            <div className="w-full">
              <label
                htmlFor="country-select"
                className="block text-sm font-medium text-gray-700"
              >
                Select Country
              </label>
              <select
                id="country-select"
                name="Select Country"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="">All Nationality</option>
                <option value="WNA">WNA</option>
                <option value="WNI">WNI</option>
              </select>
            </div>
          </div>
          <div className="w-1/6">
            <div className="w-full">
              <label
                htmlFor="gender-select"
                className="block text-sm font-medium text-gray-700"
              >
                Select Gender
              </label>
              <select
                id="gender-select"
                name="Select Gender"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
              >
                <option value="">All Gender</option>
                <option value="true">Pria</option>
                <option value="false">Wanita</option>
              </select>
            </div>
          </div>
          <div className="w-1/6">
            <div className="w-full">
              <label
                htmlFor="location-select"
                className="block text-sm font-medium text-gray-700"
              >
                Select Location
              </label>
              <select
                id="location-select"
                name="Select Location"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={selectedLocation}
                onChange={handleLocationChange}
              >
                <option value="">All Location</option>
                {jsonData.map((entry) => (
                  <option key={entry.location} value={entry.location}>
                    {entry.location}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-1/6">
            <div className="w-full">
              <label
                htmlFor="device-select"
                className="block text-sm font-medium text-gray-700"
              >
                Select Device
              </label>
              <select
                id="device-select"
                name="Select Device"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={selectedDevice}
                onChange={handleDeviceChange}
              >
                <option value="">All Devices</option>
                {devices.map((device) => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.deviceName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={handleExportClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Export CSV
        </button>
        <DataNotFoundModal
          open={showModal}
          onClose={handleCloseModal}
          message={modalMessage}
        />
      </div>

      {selectedAnalytics == 'unrecognized' ? (
        <DataTable
          // canSearch={true}
          entriesPerPage={{ defaultValue: 100, entries: [50, 100] }}
          table={{
            columns: columnsRealtimeTableUnrecognized,
            rows: data,
          }}
        />
      ) : (
        <DataTable
          // canSearch={true}
          entriesPerPage={{ defaultValue: 100, entries: [50, 100] }}
          table={{
            columns: columnsRealtimeTable,
            rows: data,
          }}
        />
      )}
    </>
  );
}
