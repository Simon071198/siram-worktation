import axios from "axios";

export const webserviceurl = "https://dev.transforme.co.id/gema_admin_api/";

function removeBase64Prefix(base64String) {
  // Find the index of the comma that separates the prefix from the actual base64 data
  const commaIndex = base64String.indexOf(",");

  // Check if a comma was found and if it's not at the start of the string
  if (commaIndex !== -1 && commaIndex > 0) {
    // Remove the prefix (including the comma) and return the rest of the string
    return base64String.slice(commaIndex + 1);
  }

  // If no comma or prefix is found, return the base64 string as is
  return base64String;
}

export async function apiWatchListList(params) {
  try {
    const response = await axios({
      method: "post",
      url: webserviceurl + "visitor/readDpo.php",
      data: params,
    });
    console.log(response.data.data);
    return response.data.data;
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
    if (params.device_id != "") {
      parameter.filters.device_id = params.device_id;
    }
    if (params.country_id != "") {
      parameter.filters.country_id = params.country_id;
    }
    if (params.age != "") {
      parameter.filters.age = params.age;
    }

    if (params.analytics != "") {
      parameter.filters.analytics = params.analytics;
    }
    if (params.name != "") {
      parameter.filters.name = params.name;
    }
    if (params.gender != "") {
      parameter.filters.gender = params.gender;
    }

    console.log(parameter, "parameter");
    const response = await axios({
      method: "post",
      url: webserviceurl + "visitor_log/readRealtime.php",
      data: JSON.stringify(parameter),
    });
    console.log(response.data);
    console.log(response.data.data.records);
    return response.data.data.records;
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
      method: "post",
      url: webserviceurl + "visitor/read.php",
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
      method: "post",
      url: webserviceurl + "visitor/readInmate.php",
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
              country_id: "100",
            },
          },
        ],
      },
    };

    const response = await axios({
      method: "post",
      url: webserviceurl + "visitor/read.php",
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
      method: "post",
      url: webserviceurl + "visitor_log/readOne.php",
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
      method: "post",
      url: webserviceurl + "visitor/read.php",
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
      method: "post",
      url: webserviceurl + "user/read.php",
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
      method: "post",
      url: webserviceurl + "visitor/searchDpoByName.php",
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
      method: "post",
      url: webserviceurl + "visitor/searchVisitorByName.php",
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
      method: "post",
      url: webserviceurl + "device/read_online.php",
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
      method: "post",
      url: webserviceurl + "device/read_offline.php",
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
      method: "post",
      url: webserviceurl + "device/read_damage.php",
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
      method: "post",
      url: webserviceurl + "location/locationDeviceStatusTotalSummary.php",
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
      method: "post",
      url:
        webserviceurl +
        "location/locationDeviceStatusTotalSummaryByLocation.php",
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
    if (params.from != "") {
      parameter.filters.from = params.from;
    }
    if (params.to != "") {
      parameter.filters.to = params.to;
    }
    if (params.device_id != "") {
      parameter.filters.device_id = params.device_id;
    }
    if (params.country_id != "") {
      parameter.filters.country_id = params.country_id;
    }
    if (params.age != "") {
      parameter.filters.age = params.age;
    }

    if (params.analytics != "") {
      parameter.filters.analytics = params.analytics;
    }
    if (params.name != "") {
      parameter.filters.name = params.name;
    }
    if (params.gender != "") {
      parameter.filters.gender = params.gender;
    }

    console.log(parameter, "parameter");
    const response = await axios({
      method: "post",
      url: webserviceurl + "visitor_log/readAll.php",
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
      method: "post",
      url: webserviceurl + "device/read.php",
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
      method: "post",
      url: "https://dev.transforme.co.id/gema_admin_api/device/read_bracelet.php",
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
      method: "post",
      url: webserviceurl + "location/read.php",
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
      method: "post",
      url: webserviceurl + "location/readOnline.php",
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
      method: "post",
      url: webserviceurl + "device/read_one.php",
      data: {
        deviceId: id,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function apiDeviceDelete(params) {
  try {
    const response = axios({
      method: "post",
      url: webserviceurl + "device/delete.php",
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
//       url: webserviceurl + "visitor/delete.php",
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
      method: "post",
      url: webserviceurl + "user/delete.php",
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
      method: "post",
      url: webserviceurl + "device/create.php",
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
      method: "post",
      url: webserviceurl + "user/create.php",
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
      method: "post",
      url: webserviceurl + "user/update.php",
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
      method: "post",
      url: webserviceurl + "visitor/updateWithImage.php",
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
      method: "post",
      url: webserviceurl + "visitor/update.php",
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
      method: "post",
      url: webserviceurl + "visitor/delete.php",
      data: JSON.stringify(params),
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    // console.log(response.data);
    if (response.data.status == 200) {
      // const cleanedBase64String = removeBase64Prefix(response.data.data.image);
      let paramsChina = {
        groupID: "1", // face database group ID
        dbID: "testcideng", // ID of face database
        // imageID: response.data.data.visitorId, // ID of face image
        // imageData: cleanedBase64String,
        imageIDs: [params.visitorId], // ID of face image
      };
      console.log(paramsChina, "paramsChina");
      let responseChina = axios({
        method: "delete",
        url: "https://faceengine.deepcam.cn/pipeline/api/face/delete",
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
      method: "post",
      url: webserviceurl + "visitor/editRemoveWatchlist.php",
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
      method: "post",
      url: webserviceurl + "visitor/editAddWatchlist.php",
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
      method: "post",
      url: webserviceurl + "visitor/createEmployee.php",
      data: JSON.stringify(params),
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    console.log(response.data);
    if (response.data.status == 200) {
      const cleanedBase64String = removeBase64Prefix(response.data.data.image);
      let paramsChina = {
        groupID: "1", // face database group ID
        dbID: "testcideng", // ID of face database
        imageID: response.data.data.visitorId, // ID of face image
        imageData: cleanedBase64String,
      };
      let responseChina = axios({
        method: "post",
        url: "https://faceengine.deepcam.cn/pipeline/api/face/add",
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
      method: "post",
      url: webserviceurl + "visitor/createWatchlist.php",
      data: JSON.stringify(params),
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    console.log(response.data);
    if (response.data.status == 200) {
      const cleanedBase64String = removeBase64Prefix(response.data.data.image);
      let paramsChina = {
        groupID: "1", // face database group ID
        dbID: "testcideng", // ID of face database
        imageID: response.data.data.visitorId, // ID of face image
        imageData: cleanedBase64String,
      };
      let responseChina = axios({
        method: "post",
        url: "https://faceengine.deepcam.cn/pipeline/api/face/add",
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
      method: "post",
      url: webserviceurl + "visitor/createInmate.php",
      data: JSON.stringify(params),
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    console.log(response.data);
    if (response.data.status == 200) {
      const cleanedBase64String = removeBase64Prefix(response.data.data.image);
      let paramsChina = {
        groupID: "1", // face database group ID
        dbID: "testcideng", // ID of face database
        imageID: response.data.data.visitorId, // ID of face image
        imageData: cleanedBase64String,
      };
      let responseChina = axios({
        method: "post",
        url: "https://faceengine.deepcam.cn/pipeline/api/face/add",
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
      method: "post",
      url: webserviceurl + "visitor/create.php",
      data: JSON.stringify(params),
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    // console.log(response.data);
    if (response.data.status == 200) {
      const cleanedBase64String = removeBase64Prefix(response.data.data.image);
      let paramsChina = {
        groupID: "1", // face database group ID
        dbID: "testcideng", // ID of face database
        imageID: response.data.data.visitorId, // ID of face image
        imageData: cleanedBase64String,
      };
      let responseChina = axios({
        method: "post",
        url: "https://faceengine.deepcam.cn/pipeline/api/face/add",
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
      method: "post",
      url: webserviceurl + "visitor/createDpo.php",
      data: JSON.stringify(params),
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    // console.log(response.data);
    if (response.data.status == 200) {
      const cleanedBase64String = removeBase64Prefix(response.data.data.image);
      let paramsChina = {
        groupID: "1", // face database group ID
        dbID: "testcideng", // ID of face database
        imageID: response.data.data.visitorId, // ID of face image
        imageData: cleanedBase64String,
      };
      let responseChina = axios({
        method: "post",
        url: "https://faceengine.deepcam.cn/pipeline/api/face/add",
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
      groupID: "1",
      dbIDs: ["1", "2", "22", "101", "testcideng"],
    };

    const response = await axios.post(
      "https://faceengine.deepcam.cn/pipeline/api/face/match",
      {
        ...body,
        imageData: image,
      }
    );

    console.log(response.data.code);

    if (response.data.code === 1000) {
      const visitorResponse = await axios.post(
        webserviceurl + "visitor/readOne.php",
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
      method: "post",
      url: webserviceurl + "device/update.php",
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
      method: "post",
      url: webserviceurl + "location/location_list.php",
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
      method: "post",
      url: webserviceurl + "location/delete.php",
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
      method: "post",
      url: webserviceurl + "location/update.php",
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
      method: "post",
      url: webserviceurl + "location/location_list.php",
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export function apiCountryList() {
  try {
    const response = axios({
      method: "post",
      url: webserviceurl + "country/read.php",
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export function apiCameraList(params) {
  try {
    const response = axios({
      method: "post",
      url: webserviceurl + "dm/read.php",
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export function apiAdminLogin(params) {
  try {
    const response = axios({
      method: "post",
      url: webserviceurl + "user/login.php",
      data: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
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
      groupID: "1",
      dbIDs: ["1", "2", "22", "101", "testcideng"],
    };

    axios
      .post("https://faceengine.deepcam.cn/pipeline/api/face/match", {
        ...body,
        ...params,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.data && !isExecuted) {
          isExecuted = true; // Set the flag to true to prevent further executions

          let paramApiLocal = {
            name: response.data.data.imageID,
            image: "data:image/jpeg;base64," + params.imageData,
          };

          axios
            .post(webserviceurl + "visitor_log/insert.php", paramApiLocal)
            .then((result) => {
              console.log("result", result);
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
