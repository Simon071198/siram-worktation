import axios from 'axios';
import { get } from 'react-hook-form';

// export const webserviceurl = 'https://dev.transforme.co.id/';

// export const newWebservice = 'https://dev.transforme.co.id/siram_admin_api/';
export const newwebserviceurl = 'https://dev.transforme.co.id/siram_admin_api/';

export const webserviceurl = 'http://localhost:8000/';
const newBaseUrl: string = 'http://127.0.0.1:8000/api';

export const newWebservice = 'http://localhost:8000/api/';
// export const newwebserviceurl = 'http://localhost:8000/api/';

function getUrl(params) {
  const object = {
    page: params.page ? params.page : 1,
    pageSize: params.pageSize ? params.pageSize : Infinity,
    ...params.filter,
  };

  for (const key in object) {
    if (typeof object[key] === 'string') {
      object[key] = object[key].replace(/\s+/g, ' ').trim();
    }
  }

  const queryString = Object.keys(object)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`,
    )
    .join('&');
  return queryString;
}

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

// api filter pelacakan tersangka
export async function apiPelacakanTersangka(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/filter_tersangka.php',
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

// api realtime
export async function apiRealtimeLog(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/kamera_log_read.php',
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

// API status wbp start
export async function apiReadStatusWBP(params, token) {
  try {
    const response = await axios({
      method: 'get',
      url: newwebserviceurl + 'status_wbp_kasus',
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
// API status wbp end

// API Kasus start
export async function apiReadKasus(params, token) {
  try {
    const response = await axios({
      method: 'GET',
      url: `${newBaseUrl}/kasus`,
      params,
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
// API Kasus end

// api Penyidikan start
export async function apiReadPenyidikan(params, token) {
  const queryString = getUrl(params);
  const url = newWebservice + `penyidikan?${queryString}`;
  try {
    const response = await axios({
      method: 'get',
      // url: newwebserviceurl + 'penyidikan',
      url: url,
      // data: params,
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

export async function apiCreatePenyidikan(params, token) {
  console.log('params', params);
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/penyidikan_insert.php',
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

export async function apiUpdatePenyidikan(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/penyidikan_update.php',
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

export async function apiDeletePenyidikan(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/penyidikan_delete.php',
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
// api Penyidikan end

// api BAP start
export async function apiReadBAP(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/dokumen_bap_read.php',
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

export async function apiCreateBAP(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/dokumen_bap_insert.php',
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

export async function apiUpdateBAP(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/dokumen_bap_update.php',
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

export async function apiDeleteBAP(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/dokumen_bap_delete.php',
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
// api BAP end

// api PengadilanMiliter start
export async function apiReadPengadilanMiliter(params, token) {
  const queryString = getUrl(params);
  const url = newWebservice + `pengadilan_militer?${queryString}`;
  try {
    const response = await axios({
      method: 'get',
      // url: newwebserviceurl + 'siram_api/pengadilan_militer_read.php',
      // data: params,
      url: url,
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

export async function apiCreatePengadilanMiliter(params, token) {
  try {
    const response = await axios({
      method: 'post',
      // url: newwebserviceurl + 'siram_api/pengadilan_militer_insert.php',
      url: newWebservice + `pengadilan_militer`,
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

export async function apiUpdatePengadilanMiliter(params, token) {
  try {
    const response = await axios({
      method: 'put',
      // url: newwebserviceurl + 'siram_api/pengadilan_militer_update.php',
      url: newWebservice + `pengadilan_militer`,
      params,
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

export async function apiDeletePengadilanMiliter(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/pengadilan_militer_delete.php',
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
// api PengadilanMiliter end

// api Oditur start
export async function apiReadOditur(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/oditur_read.php',
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

export async function apiCreateOditur(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/oditur_insert.php',
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

export async function apiUpdateOditur(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/oditur_update.php',
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

export async function apiDeleteOditur(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/oditur_delete.php',
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
// api Oditur end

// api Daftar Kasus start
export async function apiReadDaftarKasus(params, token) {
  const queryString = getUrl(params);
  const url = newWebservice + `kasus?${queryString}`;
  console.log('urlKasus', url);

  try {
    console.log('paramsRead', params);
    const response = await axios({
      method: 'get',
      url: url,
      // url: newwebserviceurl + 'siram_api/kasus_read.php',
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

export async function apiCreateDaftarKasus(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + `kasus`,
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

export async function apiUpdateDaftarKasus(params, token) {
  try {
    const response = await axios({
      method: 'put',
      url: newwebserviceurl + 'kasus',
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

export async function apiDeleteDaftarKasus(params, token) {
  try {
    const response = await axios({
      method: 'delete',
      url: newwebserviceurl + 'kasus?kasus_id=' + params.kasus_id,
      // data: params,
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
// api Daftar Kasus end

// api barang bukti start
export async function apiReadBarangBukti(params, token) {
  try {
    const response = await axios({
      method: 'GET',
      url: `${newBaseUrl}/barang_bukti_kasus`,
      params,
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

export async function apiCreateBarangBukti(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: `${newBaseUrl}/barang_bukti_kasus`,
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

export async function apiUpdateBarangBukti(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: `${newBaseUrl}/barang_bukti_kasus?_method=PUT`,
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data',
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

export async function apiDeleteBarangBukti(params, token) {
  try {
    const response = await axios({
      method: 'DELETE',
      url: `${newBaseUrl}/barang_bukti_kasus`,
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
// api barang bukti end

// api Saksi start
export async function apiReadSaksi(params, token) {
  const queryString = getUrl(params);
  const url = newWebservice + `saksi?${queryString}`;
  try {
    const response = await axios({
      method: 'get',
      url: `${newBaseUrl}/saksi`,
      params,
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

export async function apiCreateSaksi(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: `${newBaseUrl}/saksi`,
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

export async function apiUpdateSaksi(params, token) {
  try {
    const response = await axios({
      method: 'put',
      url: `${newBaseUrl}/saksi`,
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

export async function apiDeleteSaksi(params, token) {
  try {
    const response = await axios({
      method: 'delete',
      url: `${newBaseUrl}/saksi`,
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
// api Saksi end

// api Jaksa penuntut start
export async function apiReadJaksapenuntut(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/oditur_penuntut_read.php',
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

export async function apiCreateJaksapenuntut(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/jaksa_penuntut_insert.php',
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

export async function apiUpdateJaksapenuntut(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/jaksa_penuntut_update.php',
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

export async function apiDeleteJaksapenuntut(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/jaksa_penuntut_delete.php',
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
// api Jaksa penuntut end

// api Jaksa penyidik start
export async function apiReadJaksaPenyidik(params, token) {
  const queryString = getUrl(params);
  const url = newWebservice + `oditur_penyidik?${queryString}`;
  try {
    const response = await axios({
      method: 'get',
      url: url,
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

export async function apiCreateJaksaPenyidik(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/jaksa_penyidik_insert.php',
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

export async function apiUpdateJaksaPenyidik(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/jaksa_penyidik_update.php',
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

export async function apiDeleteJaksaPenyidik(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/jaksa_penyidik_delete.php',
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
// api Jaksa penyidik end

// api Oditur penyidik start
export async function apiReadOditurPenyidik(params, token) {
  try {
    const response = await axios({
      method: 'get',
      url: `${newBaseUrl}/oditur_penyidik`,
      params,
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

export async function apiCreateOditurPenyidik(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: `${newBaseUrl}/oditur_penyidik`,
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

export async function apiUpdateOditurPenyidik(params, token) {
  try {
    const response = await axios({
      method: 'put',
      url: `${newBaseUrl}/oditur_penyidik`,
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

export async function apiDeleteOditurPenyidik(params, token) {
  try {
    const response = await axios({
      method: 'delete',
      url: `${newBaseUrl}/oditur_penyidik`,
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
// api Oditur penyidik end

// api Oditur penuntut start
export async function apiReadOditurPenuntut(params, token) {
  try {
    const response = await axios({
      method: 'get',
      url: `${newBaseUrl}/oditur_penuntut`,
      params,
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

export async function apiCreateOditurPenuntut(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: `${newBaseUrl}/oditur_penuntut`,
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

export async function apiUpdateOditurPenuntut(params, token) {
  try {
    const response = await axios({
      method: 'put',
      url: `${newBaseUrl}/oditur_penuntut`,
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

export async function apiDeleteOditurPenuntut(params, token) {
  try {
    const response = await axios({
      method: 'delete',
      url: `${newBaseUrl}/oditur_penuntut`,
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
// api Oditur penuntut end

// api hakim start
export async function apiReadHakim(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/hakim_read.php',
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

export async function apiCreateHakim(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/hakim_insert.php',
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

export async function apiUpdateHakim(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/hakim_update.php',
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

export async function apiDeleteHakim(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/hakim_delete.php',
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
// api hakim end

// log kamera start
export async function apiReadLogKamera(params) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/kamera_log_read.php',
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
// log kamera end

// aktifitas Pengunjung start
export async function apiReadAktifitasPengunjung(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/aktivitas_pengunjung_read.php',
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

export async function apiDeleteAktifitasPengunjung(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/aktivitas_pengunjung_delete.php',
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

export async function apiUpdateAktifitasPengunjung(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/aktivitas_pengunjung_update.php',
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

export async function apiCreateAktifitasPengunjung(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/aktivitas_pengunjung_insert.php',
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
// aktifitas Pengunjung end

// api kamera
export async function apiReadKamera(params, token) {
  try {
    const response = await axios({
      method: 'get',
      url: `${newBaseUrl}/kamera`,
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

export async function apiDeleteKamera(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/kamera_delete.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(params);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiUpdateKamera(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/kamera_update.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(params);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiCreateKamera(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/kamera_insert.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
export async function apiReadGateway(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/dashboard_gateway_read.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(params);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiDeleteGateway(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/gateway_delete.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(params);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiUpdateGateway(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/gateway_update.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(params);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiCreateGateway(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/gateway_insert.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
export async function apiReadGelang(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/dashboard_gelang_read.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(params);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiDeleteGelang(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/gelang_delete.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(params);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiUpdateGelang(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/gelang_update.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(params);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiCreateGelang(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/gelang_insert.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
export async function apiDeleteKategoriPerkara(params, token) {
  try {
    const response = await axios({
      method: 'delete',
      // url: newwebserviceurl + 'siram_api/kategori_perkara_delete.php',
      url: newwebserviceurl + `kategori_perkara?kategori_perkara_id=` + params.kategori_perkara_id,
      // data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiUpdateKategoriPerkara(params, token) {
  try {
    const response = await axios({
      method: 'put',
      // url: newwebserviceurl + 'siram_api/kategori_perkara_update.php',
      url: newwebserviceurl + `kategori_perkara`,
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiCreateKategoriPerkara(params, token) {
  try {
    const response = await axios({
      method: 'post',
      // url: newwebserviceurl + 'siram_api/kategori_perkara_insert.php',
      url: newWebservice + `kategori_perkara`,
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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

export async function apiReadKota(params, token) {
  try {
    const response = await axios({
      method: 'get',
      url: `${newBaseUrl}/kota`,
      params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiReadProvinsi(params, token) {
  try {
    const response = await axios({
      method: 'get',
      url: `${newBaseUrl}/provinsi`,
      params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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

export async function apiReadjenisperkara(params, token) {
  const queryString = getUrl(params);
  const url = newWebservice + `jenis_perkara?${queryString}`;
  try {
    const response = await axios({
      method: 'GET',
      url: `${newBaseUrl}/jenis_perkara`,
      params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Visitor API
export async function apiReadVisitor(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://dev.transforme.co.id/siram_admin_api/siram_api/pengunjung_read.php',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function apiCreateVisitor(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://dev.transforme.co.id/siram_admin_api/siram_api/pengunjung_insert.php',
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
export async function apiUpdateVisitor(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://dev.transforme.co.id/siram_admin_api/siram_api/pengunjung_update.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function apiDeletePengunjung(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://dev.transforme.co.id/siram_admin_api/siram_api/pengunjung_delete.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
export async function apiReadAllEvent(params, token) {
  // const queryString = getUrl(params);
  // const url = newWebservice + `kegiatan?${queryString}`;
  try {
    const response = await axios({
      method: 'get',
      url: newwebserviceurl + 'kegiatan',
      params,
      // url: url,
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
export async function apiUpdateAllEvent(params, token) {
  try {
    const response = await axios({
      method: 'put',
      // url: newwebserviceurl + 'siram_api/kegiatan_update.php',
      url: newWebservice + `kegiatan`,
      params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function apiDeleteAllEvent(params, token) {
  try {
    const response = await axios({
      method: 'delete',
      // url: newWebservice + 'siram_api/kegiatan_delete.php',
      // data: params,
      url: newwebserviceurl + `kegiatan?kegiatan_id=` + params.kegiatan_id,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function apiCreateAllEvent(params, token) {
  try {
    const response = await axios({
      method: 'post',
      // url: newwebserviceurl + 'siram_api/kegiatan_insert.php',
      url: newWebservice + `kegiatan`,
      params,
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

// api ruangan otmil
export async function apiReadAllRuanganOtmil(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/ruangan_otmil_read.php',
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

//Read shift
export async function apiReadAllShift(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/shift_read.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
export async function apiDeleteShift(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/shift_delete.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Edit Shift
export async function apiEditShift(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/shift_update.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
export async function apiReadAllGrupPetugas(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/grup_petugas_read.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
export async function apiCreatGrupPetugas(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/grup_petugas_insert.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Update
export async function apiUpdateGrupPetugas(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/grup_petugas_update.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Delete
export async function apiDeleteGrupPetugas(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/grup_petugas_delete.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Rekap Absensi -------------------------------------------+
// Read Absensi
export async function apiReadAllRekapAbsensi(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/rekap_absensi.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Read Cuti
export async function apiReadAllRekapCuti(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/rekap_cuti.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
export async function apiReadAllPetugasShift(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: newWebservice + 'siram_api/petugas_shift_read.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Create
export async function apiCretePetugasShift(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: newWebservice + 'siram_api/petugas_shift_insert.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Update
export async function apiEditPetugasShift(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: newWebservice + 'siram_api/petugas_shift_update.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('edyt', response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
//Delete
export async function apiDeletePetugasShift(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: newWebservice + 'siram_api/petugas_shift_delete.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Schedule ----------------------------
//Read
export async function apiReadAllScheduleShift(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: newWebservice + 'siram_api/schedule_read.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Create
export async function apiCreateScheduleShift(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: newWebservice + 'siram_api/schedule_insert.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Delete
export async function apiDeleteScheduleShift(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: newWebservice + 'siram_api/schedule_delete.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Penugasan ----------------------------------------------
//Read
export async function apiReadAllPenugasanShift(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: newWebservice + 'siram_api/penugasan_read.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
//create
export async function apiCreatePenugasanShift(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: newWebservice + 'siram_api/penugasan_insert.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
//Edit
export async function apiEditPenugasanShift(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: newWebservice + 'siram_api/penugasan_update.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Delete
export async function apiDeletePenugasanShift(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: newWebservice + 'siram_api/penugasan_delete.php',
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

//Read Ruangan summary
export async function apiReadAllRuanganSummary(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/ruangan_summary.php',
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

//Read All Zona ----------------------------
export async function apiReadZona(token) {
  try {
    const response = await axios({
      method: 'GET',
      url: `${newBaseUrl}/lokasi_otmil`,
      params: params,
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

export async function apiReadAlllokasiOtmil(params, token) {
  try {
    const response = await axios({
      method: 'GET',
      url: `${newBaseUrl}/zona`,
      data: {},
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// api version
export async function apiversion(params) {
  try {
    const response = await axios({
      method: 'POST',
      url: newwebserviceurl + 'siram_api/version_check.php',
      data: params,
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
      method: 'GET',
      url: `${newBaseUrl}/ruangan_otmil`,
      params,
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

export async function apiCreateAllRuanganOtmil(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: `${newBaseUrl}/ruangan_otmil`,
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('add js', response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiDeleteAllRuangan(params, token) {
  try {
    const response = await axios({
      method: 'DELETE',
      url: `${newBaseUrl}/ruangan_otmil`,
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

export async function apiUpdateAllRuanganOtmil(params, token) {
  try {
    const response = await axios({
      method: 'put',
      url: `${newBaseUrl}/ruangan_otmil`,
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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

export async function apiCreateJenisJahat(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/jenis_perkara_insert.php',
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

export async function apiUpdateJenisJahat(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/jenis_perkara_update.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiDeleteJenisJahat(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newwebserviceurl + 'siram_api/jenis_perkara_delete.php  ',
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

export async function apiReadKategoriPerkara(params, token) {
  const queryString = getUrl(params);
  const url = newWebservice + `kategori_perkara?${queryString}`;
  try {
    const response = await axios({
      method: 'get',
      // url: newwebserviceurl + 'siram_api/kategori_perkara_read.php',
      // data: params,
      url: url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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

    const response = await axios({
      method: 'post',
      url: 'https://dev.transforme.co.id/siram_admin_api/siram_api/kamera_log_read.php',
      data: JSON.stringify(parameter),
    });
    // console.log(response.data);

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
export async function apiBuilding(params, token) {
  try {
    const response = await axios({
      method: 'get',
      url: `${newBaseUrl}/kamera_read_by_location`,
      params: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response, 'response');
    return response;
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
      },
    );

    console.log(response.data.code);

    if (response.data.code === 1000) {
      const visitorResponse = await axios.post(
        webserviceurl + 'gema_admin_api/visitor/readOne.php',
        {
          visitorId: response.data.data.imageID,
        },
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
              paramApiLocal,
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
      url: newWebservice + 'login',
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

export async function apiReadAllLokasi(token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/lokasi_kesatuan_read.php',
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

export async function apiReadAllPangkat(params, token) {
  console.log(params, token, '6666 ');
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/pangkat_read.php',
      data: params,
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

export async function apiKota(params, token) {
  try {
    const response = await axios({
      method: 'get',
      url: `${newBaseUrl}/kota`,
      params,
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

export async function apiProvinsi(params, token) {
  try {
    const response = await axios({
      method: 'get',
      url: `${newBaseUrl}/provinsi`,
      params,
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
export async function apiStatusKawin(token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/status_kawin_read.php',
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

export async function apiPendidikan(token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/pendidikan_read.php',
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

export async function apiKesatuan(token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/kesatuan_read.php',
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

export async function apiReadAllKategoriJahat(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/kategori_perkara_read.php',
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

export async function apiReadAllJenisPerkara(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/jenis_perkara_read.php',
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.records);
    return response;
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
  console.log('testingStaff');
  const object = {
    page: params.page ? params.page : 1,
    pageSize: params.pageSize ? params.pageSize : Infinity,
    ...params.filter,
  };
  console.log('objectStaff:', object);
  try {
    const response = await axios({
      method: 'get',
      url: newWebservice + 'petugas',
      // url: newWebservice + 'petugas',
      params: object,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
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
  console.log('params:', params, 'token:', token);
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
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiReadAllHunian(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: newWebservice + 'siram_api/hunian_wbp_otmil_read.php',
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

export async function apiGelang(params, token) {
  try {
    const response = await axios({
      method: 'POST',
      url: newWebservice + 'siram_api/dashboard_gelang_read.php',
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
    const dataParam = {
      page: params.page ? params.page : 1,
      pageSize: params.pageSize ? params.pageSize : 100000000,
      ...params.filter,
    };
    const response = await axios({
      method: 'get',
      url: newWebservice + 'wbp_profile',
      // params: dataParam,
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

export async function apiGatewayLog(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/gateway_log_read.php',
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

export async function apiTipeAsetRead(params: any, token: any) {
  try {
    const response = await axios({
      method: 'get',
      url: `${newBaseUrl}/tipe_aset`,
      params,
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

export async function apiTipeAsetInsert(params: any, token: any) {
  try {
    const response = await axios({
      method: 'post',
      url: `${newBaseUrl}/tipe_aset`,
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

export async function apiTipeAsetUpdate(params: any, token: any) {
  try {
    const response = await axios({
      method: 'put',
      url: `${newBaseUrl}/tipe_aset`,
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

export async function apiTipeAsetDelete(params: any, token: any) {
  try {
    const response = await axios({
      method: 'delete',
      url: `${newBaseUrl}/tipe_aset`,
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

export async function apiAsetRead(params: any, token: any) {
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

export async function apiMatraRead(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/matra_read.php',
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

//datasidang
export async function apiSidangRead(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/sidang_read.php',
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

export async function apiSidangUpdate(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/sidang_update.php',
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

export async function apiSidangInsert(params, token) {
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

export async function apiSidangDelete(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/sidang_delete.php',
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

export async function apiJenisSidangRead(params, token) {
  try {
    const response = await axios({
      method: 'get',
      url: `${newBaseUrl}/jenis_persidangan`,
      params,
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

export async function apiJenisPidanaRead(params, token) {
  const queryString = getUrl(params);
  const url = newWebservice + `jenis_pidana?${queryString}`;
  try {
    const response = await axios({
      method: 'get',
      url: url,
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

export async function apiJenisSidangInsert(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: `${newBaseUrl}/jenis_persidangan`,
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

export async function apiJenisSidangUpdate(params: any, token: any) {
  try {
    const response = await axios({
      method: 'put',
      url: `${newBaseUrl}/jenis_persidangan`,
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

export async function apiJenisSidangDelete(params: any, token: any) {
  try {
    const response = await axios({
      method: 'delete',
      url: `${newBaseUrl}/jenis_persidangan`,
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

export async function apiAhliRead(params, token) {
  try {
    const response = await axios({
      method: 'get',
      url: `${newBaseUrl}/ahli`,
      params,
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

export async function apiAhliInsert(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: `${newBaseUrl}/ahli`,
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

export async function apiAhliUpdate(params, token) {
  try {
    const response = await axios({
      method: 'put',
      url: `${newBaseUrl}/ahli`,
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

export async function apiAhliDelete(params, token) {
  try {
    const response = await axios({
      method: 'delete',
      url: `${newBaseUrl}/ahli`,
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

export async function apiJaksaRead(params, token) {
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

export async function apiHakimRead(params, token) {
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

export async function apiHakimInsert(params, token) {
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

export async function apiHakimUpdate(params, token) {
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

export async function apiHakimDelete(params, token) {
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

export async function apiStatusWbp(params, token) {
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

export async function apiKasusRead(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/kasus_read.php',
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

export async function apiPengadilanMiliterRead(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/pengadilan_militer_read.php',
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

export async function allKameraOtmilByLocation(token) {
  const otmil = {
    lokasi_otmil_id: '1tcb4qwu-tkxh-lgfb-9e6f-xm1k3zcu0vot',
  };
  try {
    const response = await axios({
      method: 'post',
      url: newWebservice + 'siram_api/kamera_read_by_location.php',
      data: otmil,
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

export async function apiGedungOtmilRead(params, token) {
  try {
    const response = await axios({
      method: 'get',
      url: `${newBaseUrl}/gedung_otmil`,
      params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiInsertGedungOtmil(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: `${newBaseUrl}/gedung_otmil`,
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function apiUpdateGedungOtmil(params, token) {
  try {
    const response = await axios({
      method: 'put',
      url: `${newBaseUrl}/gedung_otmil`,
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function apiDeleteGedungOtmil(params, token) {
  try {
    const response = await axios({
      method: 'delete',
      url: `${newBaseUrl}/gedung_otmil`,
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function apiLantaiOtmilRead(params, token) {
  try {
    const response = await axios({
      method: 'get',
      url: `${newBaseUrl}/lantai_otmil`,
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiInsertLantaiOtmil(params, token) {
  try {
    const response = await axios({
      method: 'post',
      url: `${newBaseUrl}/lantai_otmil`,
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiUpdateLantaiOtmil(params, token) {
  try {
    const response = await axios({
      method: 'put',
      url: `${newBaseUrl}/lantai_otmil`,
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiDeleteLantaiOtmil(params, token) {
  try {
    const response = await axios({
      method: 'delete',
      url: `${newBaseUrl}/lantai_otmil`,
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiReadKameraTersimpan(params: any, token: any) {
  try {
    const response = await axios({
      method: 'get',
      url: `${newBaseUrl}/kamera_tersimpan`,
      params: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function apiCreateKameraTersimpan(params: any, token: any) {
  try {
    const response = await axios({
      method: 'post',
      url: `${newBaseUrl}/kamera_tersimpan`,
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function apiUpdateKameraTersimpan(params: any, token: any) {
  try {
    const response = await axios({
      method: 'put',
      url: `${newBaseUrl}/kamera_tersimpan`,
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiDeleteKameraTersimpan(params: any, token: any) {
  try {
    const response = await axios({
      method: 'delete',
      url: `${newBaseUrl}/kamera_tersimpan`,
      data: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
