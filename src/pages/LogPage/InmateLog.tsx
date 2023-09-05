import { useState, useEffect, useMemo } from "react";

import DataTable from "examples/Tables/DataTable";
import {

  TableCell,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Typography,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
//   import DataTable from "examples/Tables/DataTable";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import MDInput from "components/MDInput";
import Loader from "services/loader";
import { apiVisitorLogList } from "../../services/api";
import { webserviceurl } from "../../services/api";
let useStyles = makeStyles(() => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBlock: 20,
    // color: "red",
  },
}));

const DataNotFoundModal = ({ open, onClose, message }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Data Not Found</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default function VisitorLog() {
  let classes = useStyles();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [totalItemPage, setTotalItemPage] = useState(0);

  let [startDate, setStartDate] = useState("");
  let [endDate, setEndDate] = useState("");

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedAnalytics, setSelectedAnalytics] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [jsonData, setJsonData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
    setSelectedDevice("");
  };

  const handleDeviceChange = (event) => {
    setSelectedDevice(event.target.value);
  };
  const selectedLocationEntry = jsonData.find(
    (entry) => entry.location === selectedLocation
  );
  const devices = selectedLocationEntry ? selectedLocationEntry.devices : [];

  function exportToCSV(data, filename) {
    const csvData = convertToCSV(data);
    const csvBlob = new Blob([csvData], { type: "text/csv" });
    // Check if the browser supports the HTML5 "download" attribute
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      // For IE browser
      window.navigator.msSaveOrOpenBlob(csvBlob, filename);
    } else {
      // For other browsers
      const csvURL = URL.createObjectURL(csvBlob);
      const tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", filename);
      tempLink.setAttribute("target", "_blank");
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
    }
  }

  const handleExportClick = () => {
    if (data && data.length > 0) {
      exportToCSV(data, "exported_data.csv");
    } else {
      setShowModal(true);
      setModalMessage("No data found to export.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalMessage("");
  };
  function handleStartDateChange(e) {
    setStartDate(e.target.value);
  }
  function handleEndDateChange(e) {
    setEndDate(e.target.value);
  }
  function convertToCSV(data) {
    const csvRows = [];
    const headers = Object.keys(data[0]);

    csvRows.push(headers.join(","));

    for (const row of data) {
      const values = headers.map((header) => {
        const escapedValue = String(row[header]).replace(/"/g, '\\"');
        return `"${escapedValue}"`;
      });
      csvRows.push(values.join(","));
    }

    return csvRows.join("\n");
  }
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  let fetch = () => {
    let params = {
      from: `${startDate} 00:00`,
      to: `${endDate} 23:59`,
      device_id: selectedDevice,
      country_id: selectedCountry,
      age: selectedAge,
      analytics: selectedAnalytics,
      name: selectedName,
      gender: selectedGender,
      pageSize: itemsPerPage,
      pageIndex: currentPage,
    };
    setLoading(true);
    console.log(params);
    apiVisitorLogList(params).then((res) => {
      console.log(res);
      setData(res.records);
      setLoading(false);
      setTotalPages(res.pagesCount);
      setTotalItemPage(res.total);
      console.log(data);
    });
  };
  useEffect(() => {
    const date = getTodayDate();
    setEndDate(date);
    setStartDate(date);
  }, []);

  useEffect(() => {
    if (endDate !== "") {
      fetch();
    }
  }, [
    currentPage,
    endDate,
    startDate,
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
        webserviceurl + "location/readOnline.php"
      );
      console.log(result.data.data.records);
      setJsonData(result.data.data.records);
    };
    fetchData();
  }, []);
  const columnsVisitorLogTable = useMemo(
    () => [
      {
        Header: "Camera Image",
        accessor: "image",
        width: "10%",
        Cell: ({ row }) => (
          <TableCell>
            <img
              src={webserviceurl + row.original.image}
              alt="Camera Image"
              style={{ width: "100px" }}
            />
          </TableCell>
        ),
      },
      {
        Header: "Database Image",
        accessor: "face_pics",
        width: "10%",
        Cell: ({ row }) => (
          <TableCell>
            {row.original.face_pics == null ? (
              <Typography variant="body6">No Image</Typography>
            ) : (
              <img
                src={webserviceurl + row.original.face_pics}
                alt="Database Image"
                style={{ width: "100px" }}
              />
            )}
          </TableCell>
        ),
      },
      { Header: "Name", accessor: "visitor_name", width: "10%" },
      // { Header: "Gender", accessor: "gender", width: "10%" },
      {
        Header: "Gender",
        accessor: "gender",
        width: "10%",
        Cell: ({ row }) => (
          <TableCell>
            <Typography variant="body6">
              {row.original.gender === true
                ? "Pria"
                : row.original.gender === false
                ? "Wanita"
                : row.original.gender === null || row.original.gender === ""
                ? "Unknown"
                : null}
            </Typography>
          </TableCell>
        ),
      },
      { Header: "Age", accessor: "age", width: "10%" },
      // { Header: "Nationality", accessor: "nationality", width: "10%" },  
      // { Header: "Status", accessor: "status", width: "10%" },
      {
        Header: " Status",
        accessor: "status",
        width: "10%",
        Cell: ({ row }) => (
          <TableCell>
            <Typography variant="body6">
              {
                row.original.isdpo === true
                ? "Watchlist"
                : row.original.isemployee === true
                ? "Petugas Lemasmil"
                : row.original.isdpo === false && row.original.isemployee === false
                ? "Warga Binaan"
                : null
              }            
            </Typography>
          </TableCell>
        ),
      },
      {
        Header: "Camera Filter",
        accessor: "device_name",
        width: "10%",
        Cell: ({ row }) => (
          <TableCell>
            <Typography variant="body6">
              {row.original.device_name} - {row.original.location_name}
            </Typography>
          </TableCell>
        ),
      },
      { Header: "Timestamp", accessor: "timestamp", width: "10%" },
      // { Header: "Location", accessor: "location_name", width: "10%" },
      // { Header: "Visitor ID", accessor: "visitor_id", width: "10%" },
    ],
    []
  );
  const columnsVisitorLogTableUnrecognized = useMemo(
    () => [
      {
        Header: "Camera Image",
        accessor: "image",
        width: "10%",
        Cell: ({ row }) => (
          <TableCell>
            <img
              src={webserviceurl + row.original.image}
              alt="Camera Image"
              style={{ width: "100px" }}
            />
          </TableCell>
        ),
      },
      // {
      //   Header: "Database Image",
      //   accessor: "face_pics",
      //   width: "10%",
      //   Cell: ({ row }) => (
      //     <TableCell>
      //       <img
      //         src={
      //           "https://dev.transforme.co.id/gema_admin_api" +
      //           row.original.face_pics
      //         }
      //         alt="Database Image"
      //         style={{ width: "100px" }}
      //       />
      //     </TableCell>
      //   ),
      // },
      { Header: "Name", accessor: "visitor_name", width: "10%" },
      // {
      //   Header: "Gender",
      //   accessor: "gender",
      //   width: "10%",
      //   Cell: ({ row }) => (
      //     <TableCell>
      //       <Typography variant="body6">

      //       {row.original.gender == true ? "Pria" : "Wanita"}
      //       </Typography>
      //     </TableCell>
      //   ),
      // },
      { Header: "Age", accessor: "age", width: "10%" },
      // { Header: "Nationality", accessor: "nationality", width: "10%" },
      { Header: "Status", accessor: "status", width: "10%" },
      {
        Header: "Camera Filter",
        accessor: "device_name",
        width: "10%",
        Cell: ({ row }) => (
          <TableCell>
            <Typography variant="body6">
              {row.original.device_name} - {row.original.location_name}
            </Typography>
          </TableCell>
        ),
      },
      { Header: "Timestamp", accessor: "timestamp", width: "10%" },
      // { Header: "Location", accessor: "location_name", width: "10%" },
      // { Header: "Visitor ID", accessor: "visitor_id", width: "10%" },
    ],
    []
  );
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Loader open={loading} />

      <div className={classes.header}>
        <h3> Log Prajurit Binaan</h3>
        <div style={{ display: "flex", width: "70%", gap: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-autowidth-label">
              Select Analytics
            </InputLabel>
            <Select
              fullWidth
              name="Select Analytics"
              value={selectedAnalytics}
              onChange={(e) => setSelectedAnalytics(e.target.value)}
              inputProps={{ "aria-label": "Without label" }}
              label="Select Analytics"
              sx={{ height: "4vh" }}
            >
              <MenuItem value="">All Analytics</MenuItem>
              <MenuItem value="unrecognized">Unrecognized</MenuItem>
              <MenuItem value="face_recognition">Face Recognition</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            {/* <InputLabel id="demo-simple-select-autowidth-label">
            Age
          </InputLabel> */}
            <TextField
              fullWidth
              name="Name"
              value={selectedName}
              onChange={(e) => setSelectedName(e.target.value)}
              inputProps={{ "aria-label": "Without label" }}
              label="Name"
              sx={{ height: "4vh" }}
            />
          </FormControl>
          <FormControl fullWidth>
            {/* <InputLabel id="demo-simple-select-autowidth-label">
            Age
          </InputLabel> */}
            <TextField
              fullWidth
              name="Age"
              value={selectedAge}
              onChange={(e) => setSelectedAge(e.target.value)}
              inputProps={{ "aria-label": "Without label" }}
              label="Age"
              sx={{ height: "4vh" }}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-autowidth-label">
              Select Country
            </InputLabel>
            <Select
              fullWidth
              name="Select Country"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              inputProps={{ "aria-label": "Without label" }}
              label="Select Country"
              sx={{ height: "4vh" }}
            >
              {/* <MenuItem disabled value="">Select Nationality</MenuItem> */}
              <MenuItem value="">All Nationality</MenuItem>
              <MenuItem value="WNA">WNA</MenuItem>
              <MenuItem value="WNI">WNI</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-autowidth-label">
              Select Gender
            </InputLabel>
            <Select
              fullWidth
              name="Select Gender"
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              inputProps={{ "aria-label": "Without label" }}
              label="Select Gender"
              sx={{ height: "4vh" }}
            >
              {/* <MenuItem disabled value="">Select Nationality</MenuItem> */}
              <MenuItem value="">All Gender</MenuItem>
              <MenuItem value="true">Pria</MenuItem>
              <MenuItem value="false">Wanita</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-autowidth-label">
              Select Location
            </InputLabel>
            <Select
              fullWidth
              name="Select Location"
              value={selectedLocation}
              onChange={handleLocationChange}
              inputProps={{ "aria-label": "Without label" }}
              label="Select Location"
              sx={{ height: "4vh" }}
            >
              <MenuItem value="">All Location</MenuItem>
              {jsonData.map((entry) => (
                <MenuItem key={entry.location} value={entry.location}>
                  {entry.location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-autowidth-label">
              Select Device
            </InputLabel>
            <Select
              fullWidth
              name="Select Device"
              value={selectedDevice}
              onChange={handleDeviceChange}
              inputProps={{ "aria-label": "Without label" }}
              label="Select Device"
              sx={{ height: "4vh" }}
            >
              <MenuItem value="">All Devices</MenuItem>

              {devices.map((device) => (
                <MenuItem key={device.deviceId} value={device.deviceId}>
                  {device.deviceName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Button
          onClick={handleExportClick}
          variant="contained"
          style={{ color: "white" }}
        >
          Export CSV
        </Button>
        <DataNotFoundModal
          open={showModal}
          onClose={handleCloseModal}
          message={modalMessage}
        />
      </div>
      <div className={classes.header}>
        <MDInput
          type="date"
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
        />
        <MDInput
          type="date"
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange}
        />
        {/* <MDButton onClick={fetch} color="info" variant="contained">
          {" "}
          Query{" "}
        </MDButton> */}
      </div>
      {selectedAnalytics == "unrecognized" ? (
        <DataTable
          // canSearch={true}
          entriesPerPage={{ defaultValue: 50, entries: [50] }}
          table={{
            columns: columnsVisitorLogTableUnrecognized,
            rows: data,
          }}
          showTotalEntries={false}
        />
      ) : (
        <DataTable
          // canSearch={true}
          entriesPerPage={{ defaultValue: 50, entries: [50] }}
          table={{
            columns: columnsVisitorLogTable,
            rows: data,
          }}
          showTotalEntries={false}
        />
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: 100,
        }}
      >
        <Typography variant="h8" align="center" gutterBottom>
          {data.length > 0 ? (
            <>
              Showing{" "}
              {data.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} -{" "}
              {currentPage == totalPages
                ? totalItemPage
                : Math.min(currentPage * itemsPerPage, totalItemPage)}{" "}
              of {totalItemPage} data
            </>
          ) : (
            "No data found"
          )}
        </Typography>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </DashboardLayout>
  );
}
