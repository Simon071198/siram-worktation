import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Box,
  Card,
  CardMedia,
  MenuItem,
  TextField,
  Snackbar,
  Alert,
  CardContent,
  Modal,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import { Search } from "@mui/icons-material";
import Loader from "services/loader";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import CloseIcon from "@mui/icons-material/Close";

import { makeStyles } from "@mui/styles";
import { apiSearchVisitorByName, apiWatchlistHistory } from "services/api";
import { webserviceurl } from "services/api";

const useStyles = makeStyles(() => ({
  formControl: {
    margin: 1,
    minWidth: 320,
    gap: 10,
    // minHeight: 100,
  },
  selectEmpty: {
    marginTop: 2,
  },
}));
export default function SearchVisitorByName() {
  const classes = useStyles();
  const [searchName, setSearchName] = useState("");

  const [imagePreview, setImagePreview] = useState(null);
  let [searchResult, setSearchResult] = useState(null);
  let [totalResult, setTotalResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [detailWatchlist, setDetailDpo] = useState([{}]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsFound(false);
    setIsNotFound(false);
  };
  const handleCardClick = async (data) => {
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
  const handleSearch = async () => {
    try {
      setLoading(true);
      let params = JSON.stringify({
        name: searchName,
      });
      let data = await apiSearchVisitorByName(params);
      console.log(data);
      setSearchResult(data.records);
      setTotalResult(data.total);
      if (data.total > 0) {
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
    <DashboardLayout>
      <DashboardNavbar />
      <div>
        <Typography variant="h5" gutterBottom>
        Pencarian di Database
        </Typography>

        <Typography variant="body" gutterBottom>
        Fitur untuk mencari data berdasarkan nama, silahkan masukan parameter yang diperlukan         </Typography>
        <br />
        <form
          fullWidth
          style={{
            padding: "0px 40px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            // alignItems: "center",
          }}
        >
          {/* <div style={{width: "50%"}}></div> */}
          <div
            style={{
              display: "flex",
              gap: "2rem",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <div
              style={
                {
                  // display: "flex",
                  // flexDirection: "column",
                  // gap: "2rem",
                }
              }
            >
              <Card
                // className={classes.card}
                style={{
                  minWidth: 400,
                  maxWidth: 600,
                  margin: "auto",
                  marginTop: 3,
                  padding: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: 10,
                }}
              >
                <TextField
                  label="Nama Prajurit Binaan"
                  variant="outlined"
                  fullWidth
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  sx={{ mb: 0, mt: 1, mx: 1, width: "90%" }}
                />
                <MDBox display="flex" justifyContent="center" margin={1}>
                  <Button
                    variant="contained"
                    size="medium"
                    style={{
                      backgroundColor: "#004dcf",
                    }}
                    startIcon={<Search color="white" sx={{ mr: 1 }} />}
                    onClick={handleSearch}
                    // disabled={!imagePreview}
                  >
                    <Typography
                      style={{
                        fontSize: 15,
                        color: "#fff",
                        marginLeft: -6,
                      }}
                    >
                      Search
                    </Typography>
                  </Button>
                </MDBox>
              </Card>
            </div>
            <div
              style={{
                maxHeight: "70vh",
                overflowY: "auto",
                /* Custom scrollbar styles */
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.4)",
              }}
            >
              {" "}
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead sx={{ mb: 2 }}>
                    <TableRow>
                      <TableCell>Hasil Pencarian</TableCell>
                      {/* <TableCell align="right">Calories</TableCell>
          <TableCell align="right">Fat&nbsp;(g)</TableCell>
          <TableCell align="right">Carbs&nbsp;(g)</TableCell>
          <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {searchResult?.map((row) => (
                      <TableRow
                        onClick={() => handleCardClick(row)}
                        style={{ cursor: "pointer" }}
                        key={row.visitor_id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.create_stamp}</TableCell>
                        <TableCell align="right">{row.identity}</TableCell>
                        <TableCell align="right">
                          <Avatar
                            style={{
                              width: 90,
                              height: 90,
                            }}
                            alt="User Avatar"
                            src={webserviceurl + row.face_pics}
                          />
                        </TableCell>
                        {/* Display other relevant columns */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </form>
        <Loader open={loading} />
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              height: "80%",
              // maxWidth: 600,
              backgroundColor: "white",
              padding: 30,
              borderRadius: 8,
              overflowY: "scroll",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div>
                <Typography variant="h3" gutterBottom>
                Detail Prajurit Binaan                </Typography>
                {/* {selectedCard && (
                <Typography variant="subtitle1">
                  Name: {selectedCard.name}
                </Typography>
              )} */}
              </div>
              <Button
                variant="contained"
                onClick={() => setIsModalOpen(false)}
                size="medium"
                style={{
                  backgroundColor: "#004dcf",
                }}
                startIcon={<CloseIcon color="white" sx={{ mr: 1 }} />}
              >
                <Typography
                  style={{
                    fontSize: 15,
                    color: "#fff",
                    marginLeft: -6,
                  }}
                >
                  Tutup
                </Typography>
              </Button>
            </div>
            {/* Display the detailed card information here */}
            {selectedCard && (
              <div>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <div style={{ width: 400, height: 400 }}>
                    <CardMedia
                      component="img"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      image={
                        selectedCard.face_pics
                          ? webserviceurl + selectedCard.face_pics
                          : "https://via.placeholder.com/200x300"
                      }
                      alt={selectedCard.name}
                    />
                  </div>

                  <TableContainer component={Paper}>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                          <strong>Nama</strong>
                          </TableCell>
                          <TableCell>{selectedCard.name}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <strong>Tanggal Lahir</strong>
                          </TableCell>
                          <TableCell>{selectedCard.dob}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <strong>Kebangsaan</strong>
                          </TableCell>
                          <TableCell>{selectedCard.country_name}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <strong>Nomor Identitas</strong>
                          </TableCell>
                          <TableCell>{selectedCard.identity}</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>
                            <strong>Jenis Kelamin</strong>
                          </TableCell>
                          <TableCell>
                            {selectedCard.gender ? "Male" : "Female"}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <strong> ID Prajurit Binaan</strong>
                          </TableCell>
                          <TableCell>{selectedCard.visitor_id}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <strong>Tanggal Input </strong>
                          </TableCell>
                          <TableCell>{selectedCard.create_stamp}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* ... other card details ... */}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // marginBottom: 10,
                    marginTop: 20,
                  }}
                >
                  <div>
                    <Typography variant="h5" gutterBottom>
                    Riwayat Tangkapan Kamera Prajurit Binaan 
                    </Typography>
                    {/* {selectedCard && (
                <Typography variant="subtitle1">
                  Name: {selectedCard.name}
                </Typography>
              )} */}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    marginTop: 20,
                  }}
                >
                  {detailWatchlist.map((data, index) => (
                    <Card
                      onClick={() => handleCardClick(data)}
                      style={{ cursor: "pointer" }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={
                          selectedCard.face_pics
                            ? webserviceurl + data.image
                            : "https://via.placeholder.com/200x300"
                        }
                        alt={selectedCard.name}
                      />
                      <CardContent>
                        <Typography variant="h6" align="center" gutterBottom>
                          {data.timestamp}
                        </Typography>
                        <Typography variant="h6" align="center">
                          {data.device_name}
                        </Typography>
                        <Typography variant="h6" align="center">
                          {data.location_name}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Modal>
        {isFound && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={isFound}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{
                width: "100%",
                backgroundColor: "#58B15C",
                color: "#fff",
                fontWeight: 600,
              }}
            >
              Data Ditemukan
            </Alert>
          </Snackbar>
        )}
        {isNotFound && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={isNotFound}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{
                width: "100%",
                backgroundColor: "#f72e4d",
                color: "#fff",
                fontWeight: 600,
              }}
            >
              Data Tidak Ditemukan
            </Alert>
          </Snackbar>
        )}
        {/* Display the search results here */}
      </div>
    </DashboardLayout>
  );
}
