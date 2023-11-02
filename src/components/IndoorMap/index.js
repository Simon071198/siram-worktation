

import { useEffect, useState } from 'react';

// porp-types is a library for typechecking of props
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { apiWatchlistHistory, webserviceurl } from '../../services/api';
// IndoorMap configurations
import configs from './configs';

const getPositionStyles = (position) => {
  switch (position) {
    case 'A':
      return { top: 0, left: 0 };
    case 'B':
      return { top: 0, right: 0 };
    case 'C':
      return { bottom: 0, left: 0 };
    case 'D':
      return { bottom: 0, right: 0 };
    case 'E':
      return { top: '40%', left: 0 };
    case 'F':
      return { top: 0, left: '40%' };
    case 'G':
      return { top: '40%', right: 0 };
    case 'H':
      return { bottom: 0, left: '40%' };
    default:
      return { top: 0, left: 0 };
  }
};

function countDistance(cornerX, cornerY, lengthXY) {
  return Math.sqrt(
    Math.pow(lengthXY, 2) +
      Math.pow(lengthXY, 2) -
      2 * lengthXY * lengthXY * Math.cos(((cornerY - cornerX) * Math.PI) / 180),
  );
}

function getDistanceFromRssi(rssi, maxDistance) {
  console.log(parseInt(rssi, 10) / 99);
  console.log('max distance', maxDistance);
  return (parseInt(rssi, 10) / 99) * maxDistance;
}

const getWBPPosition = (WBPList, BoxDiagonal, BoxWidth) => {
  let temp = WBPList;
  for (let i = 0; i < temp.length; i++) {
    const distanceFromA = getDistanceFromRssi(temp[i].rssi[0], BoxDiagonal);
    const distanceFromD = getDistanceFromRssi(temp[i].rssi[1], BoxDiagonal);

    const x =
      (Math.pow(distanceFromA, 2) -
        Math.pow(distanceFromD, 2) +
        Math.pow(BoxWidth, 2)) /
      (2 * BoxWidth);
    const y = Math.sqrt(Math.pow(distanceFromA, 2) - Math.pow(x, 2));
    const yourPosition = { x, y };

    temp[i].position = yourPosition;
  }
  console.log(temp);

  return temp;
};

function IndoorMap({ gateway1, gateway2, dimension, listWB }) {
  const [WBPList, setWBPList] = useState(listWB);
  const BoxWidth = 1000;
  const BoxHeightScale = dimension.height / dimension.width;
  const BoxHeight = BoxWidth * BoxHeightScale;
  const BoxDiagonal = Math.sqrt(Math.pow(BoxWidth, 2) + Math.pow(BoxHeight, 2));

  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWBP, setSelectedWBP] = useState(null);
  const [detailWBP, setDetailWBP] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  // useEffect(() => {
  //   let temp = listWB;
  //   const newArr = getWBPPosition(temp, BoxDiagonal, BoxWidth);
  //   setWBPList(newArr);
  // }, []);

  const positionGateway1Styles = getPositionStyles(gateway1.position);
  const positionGateway2Styles = getPositionStyles(gateway2.position);
  const openModal = async (visitorId, wbp, position) => {
    console.log('WBP Detail', wbp);

    try {
      let params = {
        visitorId: visitorId,
        pageSize: 20,
      };

      let result = await apiWatchlistHistory(params);
      console.log('res history', result);

      setDetailWBP(result.records);
      setSelectedWBP(wbp);
      setModalPosition(position);
      setModalOpen(true);
    } catch (error) {
      console.error('Error fetching watchlist history:', error);
      alert('Connection error: tidak dapat mengambil data Prajurit Binaan');
    }
  };

  const closeModal = () => {
    setTabIndex(0);
    setSelectedWBP(null);
    setModalOpen(false);
  };

  const closeModalButton = () => {
    if (tabIndex !== 0) {
      setTabIndex(0);
    } else {
      setSelectedWBP(null);
      setModalOpen(false);
    }
  };

  return (
    <MDBox
      sx={{
        width: BoxWidth,
        height: BoxHeight,
        position: 'relative',
      }}
      // my={3}
      bgColor={'#ebebeb'}
    >
      {WBPList
        ? WBPList.map((row, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                left: row.position.x,
                top: row.position.y,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <Person
                onClick={(e) =>
                  openModal('ac1da4fd218f13ffd8f915b18894dac4', row, {
                    left: row.position.x,
                    top: row.position.y,
                    // top: e.currentTarget.offsetTop + e.currentTarget.clientHeight,
                    // left: e.currentTarget.offsetLeft,
                  })
                }
                sx={{
                  color:
                    parseInt(row.batt) > 3000
                      ? '#8ed31e'
                      : parseInt(row.batt) > 1000
                      ? '#eea620'
                      : '#ef4646',
                }}
                fontSize="large"
              />
              <div
                component="span"
                variant="subtitle2"
                color="#8ed31e"
                fontWeight="regular"
              >
                {row.name}
              </div>
            </Box>
          ))
        : null}
      <Modal
        open={modalOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: modalPosition.top,
            left: modalPosition.left,
            minWidth: '400px',
            minHeight: '200px',
            bgcolor: 'background.paper',
            border: '2px',
            borderRadius: '15px',
            boxShadow: 24,
            p: 2,
          }}
        >
          {selectedWBP && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6">
                  {tabIndex === 0
                    ? 'Detail Prajurit Binaan'
                    : tabIndex === 1
                    ? 'Aktivitas'
                    : tabIndex === 2
                    ? 'Riwayat Kesehatan'
                    : tabIndex === 3
                    ? 'Riwayat Perkara'
                    : null}
                </Typography>
                <IconButton
                  // color="primary"
                  size="small"
                  onClick={closeModalButton}
                  sx={{ p: 1 }} // Adjust padding as needed
                >
                  {tabIndex === 0 ? <Close /> : <ArrowBack />}
                </IconButton>
              </Box>

              {tabIndex === 0 ? (
                <Box style={{ display: 'flex', gap: 10 }}>
                  <Box style={{ flex: 1 }}>
                    <Avatar
                      alt={selectedWBP.name}
                      src={
                        'https://dev.transforme.co.id/gema_admin_api/images_visitor_data/e3996463ee010b4ccbbd5b96d7f5582b.jpg'
                      }
                      sx={{
                        width: '100%',
                        height: 250,
                        borderRadius: '5px',
                      }}
                    />
                  </Box>
                  <Box
                    style={{
                      flex: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box>
                      <Box
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box style={{ flex: 2 }}>
                          <Typography variant="subtitle2">Nama</Typography>
                        </Box>
                        <Box style={{ flex: 3 }}>
                          <Typography variant="subtitle2">
                            {selectedWBP.name}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box style={{ flex: 2 }}>
                          <Typography variant="subtitle2">DMAC</Typography>
                        </Box>
                        <Box style={{ flex: 3 }}>
                          <Typography variant="subtitle2">
                            {selectedWBP.dmac}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box style={{ flex: 2 }}>
                          <Typography variant="subtitle2">
                            Terakhir terpantau
                          </Typography>
                        </Box>
                        <Box style={{ flex: 3 }}>
                          <Typography variant="subtitle2">
                            {selectedWBP.time}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      style={{
                        display: 'flex',
                        justifyContent: 'start',
                        gap: 15,
                        marginTop: 20,
                      }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        style={{
                          backgroundColor: '#004dcf',
                        }}
                        onClick={() => setTabIndex(1)}
                      >
                        <Typography variant="subtitle3" color={'#fff'}>
                          Aktivitas
                        </Typography>
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        style={{
                          backgroundColor: '#14cc0b',
                        }}
                        onClick={() => setTabIndex(2)}
                      >
                        <Typography variant="subtitle3" color={'#fff'}>
                          Riwayat Kesehatan
                        </Typography>
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        style={{
                          backgroundColor: '#b47c0c',
                        }}
                        onClick={() => setTabIndex(3)}
                      >
                        <Typography variant="subtitle3" color={'#fff'}>
                          Riwayat Perkara
                        </Typography>
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ) : tabIndex === 1 ? (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 4,
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      p: 1,
                      overflow: 'auto',
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ width: '10%' }}>
                      Snapshot{' '}
                    </Typography>
                    <Typography variant="subtitle2">Nama</Typography>
                    <Typography variant="subtitle2">Kamera</Typography>
                    <Typography variant="subtitle2">Lokasi </Typography>
                    <Typography variant="subtitle2">Waktu </Typography>
                    <Typography variant="subtitle2">Aksi </Typography>
                  </Box>
                  <div style={{ height: '30vh', overflow: 'auto' }}>
                    {detailWBP.map((row, i) => (
                      <Box
                        key={i}
                        sx={{
                          display: 'flex',
                          gap: 4,
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          p: 1,
                          overflow: 'auto',
                        }}
                      >
                        <div sx={{ width: '10%' }}>
                          <Avatar
                            alt={row.name}
                            src={webserviceurl + row.image}
                            sx={{ width: 50, height: 50, borderRadius: '5px' }}
                          />
                        </div>

                        <Typography variant="subtitle2">
                          {selectedWBP.name}
                        </Typography>
                        <Typography variant="subtitle2">
                          {row.device_name}
                        </Typography>
                        <Typography variant="subtitle2">
                          {row.location_name}
                        </Typography>
                        <Typography variant="subtitle2">
                          {row.timestamp}
                        </Typography>
                        <Button
                          variant="contained"
                          size="small"
                          style={{
                            backgroundColor: '#004dcf',
                          }}
                          startIcon={<Search color="white" sx={{ mr: 1 }} />}
                        >
                          <Link to={`/kamera/${row.device_id}`}>
                            <Typography
                              style={{
                                fontSize: 10,
                                color: '#fff',
                                marginLeft: -6,
                              }}
                            >
                              Ke Kamera
                            </Typography>
                          </Link>
                        </Button>
                      </Box>
                    ))}
                  </div>
                </>
              ) : tabIndex === 2 ? (
                <Box>
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box style={{ flex: 2 }}>
                      <Typography variant="subtitle2" fontWeight={'bold'}>
                        Nama
                      </Typography>
                    </Box>
                    <Box style={{ flex: 3 }}>
                      <Typography variant="subtitle2">
                        {selectedWBP.name}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box style={{ flex: 2 }}>
                      <Typography variant="subtitle2" fontWeight={'bold'}>
                        Suhu
                      </Typography>
                    </Box>
                    <Box style={{ flex: 3 }}>
                      <Typography variant="subtitle2">
                        {`${selectedWBP.temp}°C`}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box style={{ flex: 2 }}>
                      <Typography variant="subtitle2" fontWeight={'bold'}>
                        Step
                      </Typography>
                    </Box>
                    <Box style={{ flex: 3 }}>
                      <Typography variant="subtitle2">
                        {`${selectedWBP.step} langkah`}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box style={{ flex: 2 }}>
                      <Typography variant="subtitle2" fontWeight={'bold'}>
                        Heart Rate
                      </Typography>
                    </Box>
                    <Box style={{ flex: 3 }}>
                      <Typography variant="subtitle2">
                        {selectedWBP.heartRate}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box style={{ flex: 2 }}>
                      <Typography variant="subtitle2" fontWeight={'bold'}>
                        Tensi Darah
                      </Typography>
                    </Box>
                    <Box style={{ flex: 3 }}>
                      <Typography variant="subtitle2">
                        {`${selectedWBP.systolic}/${selectedWBP.diastolic}`}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box style={{ flex: 2 }}>
                      <Typography variant="subtitle2" fontWeight={'bold'}>
                        Saturasi Oksigen
                      </Typography>
                    </Box>
                    <Box style={{ flex: 3 }}>
                      <Typography variant="subtitle2">
                        {`${selectedWBP.spo}%`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ) : tabIndex === 3 ? (
                <Box>
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box style={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight={'bold'}>
                        Nama
                      </Typography>
                    </Box>
                    <Box style={{ flex: 1 }}>
                      <Typography variant="subtitle2">
                        {selectedWBP.name}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box style={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight={'bold'}>
                        Perkara
                      </Typography>
                    </Box>
                    <Box style={{ flex: 1 }}>
                      <Typography variant="subtitle2">
                        {selectedWBP.crimeRecord.perkara}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box style={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight={'bold'}>
                        Pasal
                      </Typography>
                    </Box>
                    <Box style={{ flex: 1 }}>
                      <Typography variant="subtitle2">
                        {selectedWBP.crimeRecord.pasal}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box style={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight={'bold'}>
                        Tanggal Sidang
                      </Typography>
                    </Box>
                    <Box style={{ flex: 1 }}>
                      <Typography variant="subtitle2">
                        {selectedWBP.crimeRecord.sidangTanggal}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box style={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight={'bold'}>
                        Tanggal Vonis
                      </Typography>
                    </Box>
                    <Box style={{ flex: 1 }}>
                      <Typography variant="subtitle2">
                        {selectedWBP.crimeRecord.vonisTanggal}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box style={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight={'bold'}>
                        Hukuman
                      </Typography>
                    </Box>
                    <Box style={{ flex: 1 }}>
                      <Typography variant="subtitle2">
                        {selectedWBP.crimeRecord.hukuman}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box style={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight={'bold'}>
                        Mulai Penahanan
                      </Typography>
                    </Box>
                    <Box style={{ flex: 1 }}>
                      <Typography variant="subtitle2">
                        {selectedWBP.crimeRecord.awalMasuk}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box style={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight={'bold'}>
                        Sisa Masa Penahanan
                      </Typography>
                    </Box>
                    <Box style={{ flex: 1 }}>
                      <Typography variant="subtitle2">
                        {selectedWBP.crimeRecord.sisaMasaTahanan}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box style={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight={'bold'}>
                        Tanggal Bebas
                      </Typography>
                    </Box>
                    <Box style={{ flex: 1 }}>
                      <Typography variant="subtitle2">
                        {selectedWBP.crimeRecord.tanggalBebas}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ) : null}
            </>
          )}
        </Box>
      </Modal>

      <MDBox
        p={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          ...positionGateway1Styles,
        }}
      >
        <Router color="#a8a8a8" fontSize="large" />
        <div
          component="div"
          variant="button"
          color="#a8a8a8"
          fontWeight="medium"
        >
          {gateway1.name}
        </div>
      </MDBox>
      <MDBox
        p={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          ...positionGateway2Styles,
        }}
      >
        <Router color="#a8a8a8" fontSize="large" />
        <div
          component="div"
          variant="button"
          color="#a8a8a8"
          fontWeight="medium"
        >
          {gateway2.name}
        </div>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of IndoorMap
IndoorMap.defaultProps = {
  description: '',
};

// Typechecking props for the IndoorMap
IndoorMap.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  date: PropTypes.string.isRequired,
};

export default IndoorMap;
