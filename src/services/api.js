import axios from 'axios';

export const webserviceurl = 'https://dev.transforme.co.id/';

export const newWebservice = 'https://dev.transforme.co.id/siram_admin_api/';
export const newwebserviceurl = 'https://dev.transforme.co.id/siram_admin_api/';

function removeBase64Prefix(base64String) {
  // Find the index of the comma that separates the prefix from the actual base64 data
  const commaIndex = base64String.indexOf(',');

  // Check if a comma was found and if it's not at the start of the string
  if (commaIndex !== -1 && commaIndex > 0) {
    // Remove the prefix (including the comma) and return the rest of the string
    return base64String.slice(commaIndex + 1);
  }

  // If no comma or prefix is found, return the base64 string as is
  return base64String;
}

// api kamera
export async function apiReadKamera(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/dashboard_kamera_read.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        // Authorization : `Bearer ${params.token}`
      },
    });
    console.log(params);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiDeleteKamera(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/kamera_delete.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log(params);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiUpdateKamera(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/kamera_update.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log(params);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiCreateKamera(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/kamera_insert.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log(params);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// api Gateway start
export async function apiReadGateway(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/dashboard_gateway_read.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        // Authorization : `Bearer ${params.token}`
      },
    });
    console.log(params);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiDeleteGateway(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/gateway_delete.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log(params);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiUpdateGateway(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/gateway_update.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log(params);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiCreateGateway(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/gateway_insert.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log(params);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
// api Gateway end

// api Gelang start
export async function apiReadGelang(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/dashboard_gelang_read.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        // Authorization : `Bearer ${params.token}`
      },
    });
    console.log(params);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiDeleteGelang(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/gelang_delete.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log(params);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiUpdateGelang(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/gelang_update.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log(params);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiCreateGelang(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/gelang_insert.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log(params);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
// api Gelang end

// api kategori Perkara start
export async function apiDeleteKategoriPerkara(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/kategori_perkara_delete.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiUpdateKategoriPerkara(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/kategori_perkara_update.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiCreateKategoriPerkara(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/kategori_perkara_insert.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log(params);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
// api kategori Perkara end

export async function apiReadKota() {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/kota_read.php',
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiReadProvinsi() {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/provinsi_read.php',
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiReadAllJenisJahat() {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://dev.transforme.co.id/siram_admin_api/read_all_jenis_jahat.php',
      data: {},
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data.records);
    return response.data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiReadAllKesatuan() {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://dev.transforme.co.id/siram_admin_api/read_all_kesatuan.php',
      data: {},
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data.records);
    return response.data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiReadjenisperkara(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/jenis_perkara_read.php',
      data: params,
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Visitor API
export async function apiReadVisitor(params) {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://dev.transforme.co.id/siram_admin_api/siram_api/pengunjung_read.php',
      data: params,
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function apiCreateVisitor(params) {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://dev.transforme.co.id/siram_admin_api/siram_api/pengunjung_insert.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function apiUpdateVisitor(params) {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://dev.transforme.co.id/siram_admin_api/siram_api/pengunjung_update.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function apiDeletePengunjung(params) {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://dev.transforme.co.id/siram_admin_api/siram_api/pengunjung_delete.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Camera API
export async function apiReadAllCamera(params) {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://dev.transforme.co.id/siram_admin_api/read_all_camera.php',
      data: params,
    });

    console.log(response.data);

    return response.data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Gateway API
export async function apiReadAllGateway(params) {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://dev.transforme.co.id/siram_admin_api/read_all_gatewayWBP.php',
      data: params,
    });

    console.log(response.data);

    return response.data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Gelang API
export async function apiReadAllGelang(params) {
  try {
    const response = await axios({
      method: 'post',
      url: webserviceurl + 'siram_admin_api/read_all_gelangWBP.php',
      data: params,
    });

    console.log(response.data);

    return response.data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Event API
export async function apiReadAllEvent(params) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/kegiatan_read.php',
      data: params,
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function apiUpdateAllEvent(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/kegiatan_update.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function apiDeleteAllEvent(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/kegiatan_delete.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function apiCreateAllEvent(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/kegiatan_insert.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// api ruangan otmil
export async function apiReadAllRuanganOtmil(params) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/ruangan_otmil_read.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Read shift
export async function apiReadAllShift(params) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/shift_read.php',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
//Create shift
export async function apiCreatShift(params) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/shift_insert.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Delete Shift
export async function apiDeleteShift(params) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/shift_delete.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Edit Shift
export async function apiEditShift(params) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/shift_update.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log('shift', response);
    return response;
  } catch (error) {
    console.log('shift', params, '777', params.token);
    console.log(error);
    throw error;
  }
}

//Grup-------------------------------------
//Read
export async function apiReadAllGrupPetugas(params) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/grup_petugas_read.php',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params}`,
      },
    });
    console.log('data', response);

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Create
export async function apiCreatGrupPetugas(params) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/grup_petugas_insert.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Update
export async function apiUpdateGrupPetugas(params) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/grup_petugas_update.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Delete
export async function apiDeleteGrupPetugas(params) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/grup_petugas_delete.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Petugas Shift
//Read
export async function apiReadAllPetugasShift(params) {
  try {
    const response = await axios({
      method: 'POST',
      url: newWebservice + 'siram_api/petugas_shift_read.php',
      data: params.pageSize,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log('dtaa', response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Read Ruangan summary
export async function apiReadAllRuanganSummary(params) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/ruangan_summary.php',
      data: params,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Read All Zona ----------------------------
export async function apiReadZona(params) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/zona_read.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiReadAlllokasiOtmil(params) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/lokasi_otmil_read.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// api ruangan lemasmil
export async function apiReadAllRuanganLemasmil(params) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/ruangan_lemasmil_read.php',
      data: params,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiReadAlllokasiLemasmil(params) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/lokasi_lemasmil_read.php',
      data: params,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// API Ruangan Otmil
export async function apiReadAllRuangan(params) {
  try {
    const response = await axios({
      method: 'POST',
      url: webserviceurl + 'siram_admin_api/siram_api/ruangan_otmil_read.php',
      data: params,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiCreateAllRuanganOtmil(params) {
  try {
    const response = await axios({
      method: 'post',
      url: webserviceurl + 'siram_admin_api/siram_api/ruangan_otmil_insert.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log('add js', response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiDeleteAllRuangan(params) {
  try {
    const response = await axios({
      method: 'post',
      url: webserviceurl + 'siram_admin_api/siram_api/ruangan_otmil_delete.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiUpdateAllRuanganOtmil(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/ruangan_otmil_update.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log(response, 'fata');
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiWatchListList(params) {
  try {
    const response = await axios({
      method: 'post',
      url: webserviceurl + 'visitor/readDpo.php',
      data: params,
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export async function apiReadAllJenisJahat(params) {
//   try {
//     const response = await axios({
//       method: "post",
//       url:  webserviceurl + "siram_admin_api/read_all_jenis_jahat.php",
//       data: params,
//     });
//     console.log(response.data.records);
//     return response.data.records;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

export async function apiCreateJenisJahat(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/jenis_perkara_insert.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiUpdateJenisJahat(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/jenis_perkara_update.php',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiDeleteJenisJahat(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/jenis_perkara_delete.php  ',
      data: params.params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params.token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiReadKategoriPerkara(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/kategori_perkara_read.php',
      data: params,
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiVisitorRealtimeLogList(params) {
  try {
    let parameter = {
      pageSize: 100,
      filters: {},
    };
    if (params.device_id != '') {
      parameter.filters.device_id = params.device_id;
    }
    if (params.country_id != '') {
      parameter.filters.country_id = params.country_id;
    }
    if (params.age != '') {
      parameter.filters.age = params.age;
    }

    if (params.analytics != '') {
      parameter.filters.analytics = params.analytics;
    }
    if (params.name != '') {
      parameter.filters.name = params.name;
    }
    if (params.gender != '') {
      parameter.filters.gender = params.gender;
    }

    console.log(parameter, 'parameter');
    const response = await axios({
      method: 'post',
      url: "https://dev.transforme.co.id/siram_admin_api/siram_api/kamera_log_read.php",
      data: JSON.stringify(parameter),
    });
    // console.log(response.data);
    console.log(response.data.records);
    return response.data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiVisitorEmployeeList(params) {
  try {
    let parameter = {
      pageSize: params.pageSize,
      pageIndex: params.pageIndex,
      filters: {
        must: [
          {
            match_all: {
              isemployee: true,
            },
          },
        ],
      },
    };

    if (params.name) {
      parameter.filters.must.push({
        match: {
          name: params.name,
        },
      });
    }
    const response = await axios({
      method: 'post',
      url: webserviceurl + '/gema_admin_api/visitor/read.php',
      data: parameter,
    });
    console.log(response.data.data);
    return response.data.data;
    // Rest of your code...
  } catch (error) {
    // Handle error...
  }
}
export async function apiVisitorInmateList(params) {
  try {
    let parameter = {
      pageSize: params.pageSize,
      pageIndex: params.pageIndex,
      filters: {
        must: [
          // {
          //   match_all: {
          //     "isdpo": false,
          //   },
          // },
        ],
      },
    };

    if (params.name) {
      parameter.filters.must.push({
        match: {
          name: params.name,
        },
      });
    }
    const response = await axios({
      method: 'post',
      url: webserviceurl + '/gema_admin_api/visitor/readInmate.php',
      data: parameter,
    });
    console.log(response.data.data);
    return response.data.data;
    // Rest of your code...
  } catch (error) {
    // Handle error...
  }
}

export async function apiVisitorWNAList(params) {
  try {
    let parameter = {
      pageSize: params.pageSize,
      pageIndex: params.pageIndex,
      filters: {
        must: params.name
          ? [
              {
                match: {
                  name: params.name,
                },
              },
            ]
          : [],
        must_not: [
          {
            match_all: {
              country_id: '100',
            },
          },
        ],
      },
    };

    const response = await axios({
      method: 'post',
      url: webserviceurl + '/gema_admin_api/visitor/read.php',
      data: parameter,
    });

    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiWatchlistHistory(params) {
  try {
    const response = await axios({
      method: 'post',
      url: webserviceurl + '/gema_admin_api/visitor_log/readOne.php',
      data: params,
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiVisitorList(params) {
  try {
    const response = await axios({
      method: 'post',
      url: webserviceurl + '/gema_admin_api/visitor/read.php',
      data: params,
    });
    console.log(response.data.data.records);
    return response.data.data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiUserList(params) {
  try {
    const response = await axios({
      method: 'post',
      url: webserviceurl + '/gema_admin_api/user/read.php',
      data: params,
    });
    console.log(response.data.data.records);
    return response.data.data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiSearchDpoByName(params) {
  try {
    const response = await axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/visitor/searchDpoByName.php',
      data: params,
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function apiSearchVisitorByName(params) {
  try {
    const response = await axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/visitor/searchVisitorByName.php',
      data: params,
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiAllCameraOnlineList(params) {
  try {
    const response = await axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/device/read_online.php',
      data: params,
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function apiAllCameraOfflineList(params) {
  try {
    const response = await axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/device/read_offline.php',
      data: params,
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function apiAllCameraDamageList(params) {
  try {
    const response = await axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/device/read_damage.php',
      data: params,
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function apiLocationDeviceStatusTotalSummary(params) {
  try {
    const response = await axios({
      method: 'post',
      url:
        webserviceurl +
        'gema_admin_api/location/locationDeviceStatusTotalSummary.php',
      data: params,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function apiLocationDeviceStatusTotalSummaryByLocation(params) {
  try {
    const response = await axios({
      method: 'post',
      url:
        webserviceurl +
        gema_admin_api /
          'location/locationDeviceStatusTotalSummaryByLocation.php',
      data: params,
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiVisitorLogList(params) {
  try {
    let parameter = {
      // pageSize: 100,
      pageSize: params.pageSize,
      pageIndex: params.pageIndex,
      filters: {},
    };
    if (params.from != '') {
      parameter.filters.from = params.from;
    }
    if (params.to != '') {
      parameter.filters.to = params.to;
    }
    if (params.device_id != '') {
      parameter.filters.device_id = params.device_id;
    }
    if (params.country_id != '') {
      parameter.filters.country_id = params.country_id;
    }
    if (params.age != '') {
      parameter.filters.age = params.age;
    }

    if (params.analytics != '') {
      parameter.filters.analytics = params.analytics;
    }
    if (params.name != '') {
      parameter.filters.name = params.name;
    }
    if (params.gender != '') {
      parameter.filters.gender = params.gender;
    }

    console.log(parameter, 'parameter');
    const response = await axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/visitor_log/readAll.php',
      data: JSON.stringify(parameter), // Pass an empty object if 'params' is undefined
    });
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiDeviceList(params) {
  try {
    const response = await axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/device/read.php',
      data: params,
    });
    console.log(response.data.data.records);
    return response.data.data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiBraceletList(params) {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://dev.transforme.co.id/device/read_bracelet.php',
      data: params,
    });
    console.log(response.data.data.records);
    return response.data.data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiLocationDeviceList(params) {
  try {
    const response = await axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/location/read.php',
      data: params,
    });
    console.log(response.data.data.records);
    return response.data.data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function apiLocationOnlineDeviceList(params) {
  try {
    const response = await axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/location/readOnline.php',
      data: params,
    });
    console.log(response.data.data.records);
    return response.data.data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiDeviceDetail(id) {
  try {
    const response = await axios({
      method: 'post',
      // url: webserviceurl + 'gema_admin_api/device/read_one.php',
      url: webserviceurl + 'siram_admin_api/siram_api/kamera_read_one.php',

      data: {
        deviceId: id,
      },
    });
    // console.log(response);
    return response.data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function apiDeviceDelete(params) {
  try {
    const response = axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/device/delete.php',
      data: params,
    });
    return response.status;
  } catch (error) {
    throw error;
  }
}

// export function apiDeleteVisitor(params) {
//   try {
//     const response = axios({
//       method: "post",
//       url: webserviceurl + "gema_admin_api/visitor/delete.php",
//       data: params,
//     });
//     return response;
//   } catch (error) {
//     throw error;
//   }
// }
export function apiDeleteUser(params) {
  try {
    const response = axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/user/delete.php',
      data: params,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export function apiDeviceInsert(params) {
  try {
    const response = axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/device/create.php',
      data: params,
    });
    return response;
  } catch (error) {
    throw error;
  }
}
export function apiUserInsert(params) {
  try {
    const response = axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/user/create.php',
      data: params,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export function apiUserUpdate(params) {
  try {
    console.log(params);
    const response = axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/user/update.php',
      data: JSON.stringify(params),
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    return response;
  } catch (error) {
    throw error;
  }
}
export function apiVisitorUpdateWithImage(params) {
  try {
    console.log(params);
    const response = axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/visitor/updateWithImage.php',
      data: JSON.stringify(params),
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export function apiVisitorUpdate(params) {
  try {
    console.log(params);
    const response = axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/visitor/update.php',
      data: JSON.stringify(params),
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function apiDeleteVisitor(params) {
  try {
    console.log(params);
    const response = await axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/visitor/delete.php',
      data: JSON.stringify(params),
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    // console.log(response.data);
    if (response.data.status == 200) {
      // const cleanedBase64String = removeBase64Prefix(response.data.data.image);
      let paramsChina = {
        groupID: '1', // face database group ID
        dbID: 'testcideng', // ID of face database
        // imageID: response.data.data.visitorId, // ID of face image
        // imageData: cleanedBase64String,
        imageIDs: [params.visitorId], // ID of face image
      };
      console.log(paramsChina, 'paramsChina');
      let responseChina = axios({
        method: 'delete',
        url: 'https://faceengine.deepcam.cn/pipeline/api/face/delete',
        data: JSON.stringify(paramsChina),
        // headers: {
        //   "Content-Type": "application/json",
        // },
      });
      console.log(responseChina);
      return responseChina;
    }
  } catch (error) {
    throw error;
  }
}
export async function apiEditToRemoveWatchlist(params) {
  try {
    console.log(params);
    const response = await axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/visitor/editRemoveWatchlist.php',
      data: JSON.stringify(params),
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function apiEditToAddWatchlist(params) {
  try {
    console.log(params);
    const response = await axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/visitor/editAddWatchlist.php',
      data: JSON.stringify(params),
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiEmployeeInsert(params) {
  try {
    console.log(params);
    const response = await axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/visitor/createEmployee.php',
      data: JSON.stringify(params),
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    console.log(response.data);
    if (response.data.status == 200) {
      const cleanedBase64String = removeBase64Prefix(response.data.data.image);
      let paramsChina = {
        groupID: '1', // face database group ID
        dbID: 'testcideng', // ID of face database
        imageID: response.data.data.visitorId, // ID of face image
        imageData: cleanedBase64String,
      };
      let responseChina = axios({
        method: 'post',
        url: 'https://faceengine.deepcam.cn/pipeline/api/face/add',
        data: JSON.stringify(paramsChina),
        // headers: {
        //   "Content-Type": "application/json",
        // },
      });
      console.log(responseChina);
      return responseChina;
    }
  } catch (error) {
    throw error;
  }
}
export async function apiWatchlistInsert(params) {
  try {
    console.log(params);
    const response = await axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/visitor/createWatchlist.php',
      data: JSON.stringify(params),
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    console.log(response.data);
    if (response.data.status == 200) {
      const cleanedBase64String = removeBase64Prefix(response.data.data.image);
      let paramsChina = {
        groupID: '1', // face database group ID
        dbID: 'testcideng', // ID of face database
        imageID: response.data.data.visitorId, // ID of face image
        imageData: cleanedBase64String,
      };
      let responseChina = axios({
        method: 'post',
        url: 'https://faceengine.deepcam.cn/pipeline/api/face/add',
        data: JSON.stringify(paramsChina),
        // headers: {
        //   "Content-Type": "application/json",
        // },
      });
      console.log(responseChina);
      return responseChina;
    }
  } catch (error) {
    throw error;
  }
}
export async function apiInmateInsert(params) {
  try {
    console.log(params);
    const response = await axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/visitor/createInmate.php',
      data: JSON.stringify(params),
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    console.log(response.data);
    if (response.data.status == 200) {
      const cleanedBase64String = removeBase64Prefix(response.data.data.image);
      let paramsChina = {
        groupID: '1', // face database group ID
        dbID: 'testcideng', // ID of face database
        imageID: response.data.data.visitorId, // ID of face image
        imageData: cleanedBase64String,
      };
      let responseChina = axios({
        method: 'post',
        url: 'https://faceengine.deepcam.cn/pipeline/api/face/add',
        data: JSON.stringify(paramsChina),
        // headers: {
        //   "Content-Type": "application/json",
        // },
      });
      console.log(responseChina);
      return responseChina;
    }
  } catch (error) {
    throw error;
  }
}

export async function apiVisitorInsert(params) {
  try {
    console.log(params);
    const response = await axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/visitor/create.php',
      data: JSON.stringify(params),
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    // console.log(response.data);
    if (response.data.status == 200) {
      const cleanedBase64String = removeBase64Prefix(response.data.data.image);
      let paramsChina = {
        groupID: '1', // face database group ID
        dbID: 'testcideng', // ID of face database
        imageID: response.data.data.visitorId, // ID of face image
        imageData: cleanedBase64String,
      };
      let responseChina = axios({
        method: 'post',
        url: 'https://faceengine.deepcam.cn/pipeline/api/face/add',
        data: JSON.stringify(paramsChina),
        // headers: {
        //   "Content-Type": "application/json",
        // },
      });
      console.log(responseChina);
      return responseChina;
    }
  } catch (error) {
    throw error;
  }
}

export async function apiDpoInsert(params) {
  try {
    console.log(params);
    const response = await axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/visitor/createDpo.php',
      data: JSON.stringify(params),
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    // console.log(response.data);
    if (response.data.status == 200) {
      const cleanedBase64String = removeBase64Prefix(response.data.data.image);
      let paramsChina = {
        groupID: '1', // face database group ID
        dbID: 'testcideng', // ID of face database
        imageID: response.data.data.visitorId, // ID of face image
        imageData: cleanedBase64String,
      };
      let responseChina = axios({
        method: 'post',
        url: 'https://faceengine.deepcam.cn/pipeline/api/face/add',
        data: JSON.stringify(paramsChina),
        // headers: {
        //   "Content-Type": "application/json",
        // },
      });
      console.log(responseChina);
      return responseChina;
    }
  } catch (error) {
    throw error;
  }
}

export async function apiVisitorSearch(params) {
  try {
    let image = removeBase64Prefix(params);
    // console.log(params);
    let body = {
      groupID: '1',
      dbIDs: ['1', '2', '22', '101', 'testcideng'],
    };

    const response = await axios.post(
      'https://faceengine.deepcam.cn/pipeline/api/face/match',
      {
        ...body,
        imageData: image,
      }
    );

    console.log(response.data.code);

    if (response.data.code === 1000) {
      const visitorResponse = await axios.post(
        webserviceurl + 'gema_admin_api/visitor/readOne.php',
        {
          visitorId: response.data.data.imageID,
        }
      );

      console.log(visitorResponse.data.data.records);
      return visitorResponse.data.data.records;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function apiDeviceUpdate(params) {
  try {
    const response = axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/device/update.php',
      data: params,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export function apiPageLocation(params) {
  try {
    const response = axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/location/location_list.php',
      data: params,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export function apiLocationDelete(params) {
  try {
    const response = axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/location/delete.php',
      data: params,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export function apiLocationUpdate(params) {
  try {
    const response = axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/location/update.php',
      data: params,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export function apiLocationList() {
  try {
    const response = axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/location/location_list.php',
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export function apiCountryList() {
  try {
    const response = axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/country/read.php',
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export function apiCameraList(params) {
  try {
    const response = axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/dm/read.php',
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export function apiAdminLogin(params) {
  try {
    const response = axios({
      method: 'post',
      url: webserviceurl + 'gema_admin_api/user/login.php',
      data: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}
export function faceCompareChina(params) {
  return new Promise((resolve, reject) => {
    // Add a flag to check if the function has been executed
    let isExecuted = false;

    let body = {
      groupID: '1',
      dbIDs: ['1', '2', '22', '101', 'testcideng'],
    };

    axios
      .post('https://faceengine.deepcam.cn/pipeline/api/face/match', {
        ...body,
        ...params,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.data && !isExecuted) {
          isExecuted = true; // Set the flag to true to prevent further executions

          let paramApiLocal = {
            name: response.data.data.imageID,
            image: 'data:image/jpeg;base64,' + params.imageData,
          };

          axios
            .post(
              webserviceurl + 'gema_admin_api/visitor_log/insert.php',
              paramApiLocal
            )
            .then((result) => {
              console.log('result', result);
              resolve(response); // Resolve the outer promise
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          resolve(response); // Resolve the outer promise
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function apiUserRegister(params) {
  try {
    const response = axios({
      method: 'post',
      url: 'http://localhost:8888/siram-test/user_register.php',
      data: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export function apiUserLogin(params) {
  try {
    const response = axios({
      method: 'POST',
      url: 'https://dev.transforme.co.id/siram_admin_api/siram_api/user_login.php',
      data: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

//new api

export async function apiReadAllLokasi() {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/lokasi_kesatuan_read.php',
      data: {},
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data.records);
    return response.data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiReadAllPangkat() {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/pangkat_read.php',
      data: {},
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data.records);
    return response.data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiKota() {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/kota_read.php',
      data: {},
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data.records);
    return response.data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiProvinsi() {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/provinsi_read.php',
      data: {},
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data.records);
    return response.data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiAgama(token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/agama_read.php',
      data: {},
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.records);
    return response.data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function apiStatusKawin() {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/status_kawin_read.php',
      data: {},
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data.records);
    return response.data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiPendidikan() {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/pendidikan_read.php',
      data: {},
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data.records);
    return response.data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiKeahlian(token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/bidang_keahlian_read.php',
      data: {},
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.records);
    return response.data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiKesatuan() {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/kesatuan_read.php',
      data: {},
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data.records);
    return response.data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiReadAllKategoriJahat() {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/kategori_perkara_read.php',
      data: {},
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data.records);
    return response.data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiReadAllJenisPerkara(token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/jenis_perkara_read.php',
      data: {},
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.records);
    return response.data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiCreateAllStaff(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/petugas_insert.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('dtaa', response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiReadAllStaff(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: newWebservice + 'siram_api/petugas_read.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiDeleteAllStaff(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/petugas_delete.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiUpdateAllStaff(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/petugas_update.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiReadAllHunian(params) {
  try {
    const response = await axios({
      method: 'POST',
      url: newWebservice + 'siram_api/hunian_wbp_otmil_read.php',
      data: params,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiGelang(params) {
  try {
    const response = await axios({
      method: 'POST',
      url: newWebservice + 'siram_api/dashboard_gelang_read.php',
      data: params,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiCreateWBP(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/wbp_profile_insert.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiReadAllWBP(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/wbp_profile_read.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiDeleteAllWBP(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/wbp_profile_delete.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiUpdateWBP(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/wbp_profile_update.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiReadAllUser(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/user_read.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiCreateUser(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/user_insert.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiNewDeleteUser(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/user_delete.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiEditUser(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/user_update.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiReadAllRole(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/user_role_read.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiChangePassword(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/user_password_update.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiGatewayLog(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/gateway_log_read.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiAsetRead(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/aset_read.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiTipeAsetRead(params,token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/tipe_aset_read.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiTipeAsetInsert(params,token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/tipe_aset_insert.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiTipeAsetUpdate(params,token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/tipe_aset_update.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiTipeAsetDelete(params,token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/tipe_aset_delete.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiAsetInsert(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/aset_insert.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiAsetUpdate(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/aset_update.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiAsetDelete(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/aset_delete.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiMatraRead(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/matra_read.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//datasidang
export async function apiSidangRead(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/sidang_read.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiSidangInsert(params,token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/sidang_insert.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiJenisSidangRead(params,token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/jenis_persidangan_read.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiJenisSidangInsert(params,token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/jenis_persidangan_insert.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiJenisSidangUpdate(params,token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/jenis_persidangan_update.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function apiJenisSidangDelete(params,token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/jenis_persidangan_delete.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiAhliRead(params,token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/ahli_read.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiAhliInsert(params,token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/ahli_insert.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function apiAhliUpdate(params,token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/ahli_update.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function apiAhliDelete(params,token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/ahli_delete.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}



export async function apiJaksaRead(params,token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/jaksa_read.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function apiHakimRead(params,token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/hakim_read.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiHakimInsert(params,token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/hakim_insert.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiHakimUpdate(params,token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/hakim_update.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiHakimDelete(params,token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/hakim_delete.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiStatusWbp(params,token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/status_wbp_kasus_read.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function allKameraLemasmil() {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/kamera_read_all_lemasmil.php',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data.records);
    return response.data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function allKameraOtmil() {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/kamera_read_all_otmil.php',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data.records);
    return response.data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
}