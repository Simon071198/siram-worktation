import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import {
  apiReadAllPangkat,
  apiReadAllRuanganOtmil,
  apiReadAllKesatuan,
  apiReadAllJenisJahat,
  apiReadAllKategoriJahat,
  apiReadAllJenisPerkara,
  apiReadAllLokasi,
  apiKota,
  apiProvinsi,
  apiAgama,
  apiStatusKawin,
  apiPendidikan,
  apiKeahlian,
  apiKesatuan,
  apiReadAllHunian,
  apiGelang,
  apiMatraRead,
  apiStatusWbp,
} from '../../../services/api';
import { useFetcher } from 'react-router-dom';
import { deflate } from 'zlib';
import { Alerts } from './AlertInmate';
import { TbLockSquareRoundedFilled } from 'react-icons/tb';

interface Kota {
  kota_id: string;
  nama_kota: string;
}

interface Provinsi {
  provinsi_id: string;
  nama_provinsi: string;
}

interface Agama {
  agama_id: string;
  nama_agama: string;
}

interface StatusKawin {
  status_kawin_id: string;
  nama_status_kawin: string;
}

interface Pendidikan {
  pendidikan_id: string;
  nama_pendidikan: string;
}

interface Keahlian {
  bidang_keahlian_id: string;
  nama_bidang_keahlian: string;
}

interface Kesatuan {
  kesatuan_id: string;
  nama_kesatuan: string;
}

const dataUserItem = localStorage.getItem('dataUser');
const tokenItem = localStorage.getItem('token');
const dataAdmin = dataUserItem ? JSON.parse(dataUserItem) : null;
// const [isLoading, setIsLoading] = useState(false);

// console.log(token,'TOKEN')

export const AddInmateModal = ({
  closeModal,
  onSubmit,
  defaultValue,
  isDetail,
  isEdit,
  token,
  dataWbp,
}: any) => {
  const [pangkat, setPangkat] = useState([]);
  const [kategoriJahat, setKategoriJahat] = useState([]);
  const [jenisPerkara, setJenisPerkara] = useState([]);
  const [kota, setKota] = useState<Kota[]>([]);
  const [provinsi, setProvinsi] = useState<Provinsi[]>([]);
  const [agama, setAgama] = useState<Agama[]>([]);
  const [statusKawin, setStatusKawin] = useState<StatusKawin[]>([]);
  const [pendidikan, setPendidikan] = useState<Pendidikan[]>([]);
  const [keahlian, setKeahlian] = useState<Keahlian[]>([]);
  const [kesatuan, setKesatuan] = useState<Kesatuan[]>([]);
  const [hunian, setHunian]: any = useState([]);
  const [gelang, setGelang]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [matra, setMatra] = useState([]);
  const [statusWbp, setStatusWbp] = useState([]);

  const [formState, setFormState] = useState(
    defaultValue || {
      foto_wajah: '',
      nama: '',
      pangkat_id: '',
      matra_id: '',
      nrp: '',
      alamat: '',
      kesatuan_id: '',
      nama_kontak_keluarga: '',
      nomor_kontak_keluarga: '',
      hubungan_kontak_keluarga: '',
      provinsi_id: '',
      kota_id: '',
      jenis_kelamin: '',
      agama_id: '',
      tanggal_lahir: '',
      tempat_lahir: '',
      status_kawin_id: '',
      pendidikan_id: '',
      is_sick: '',
      wbp_sickness: '',
      // kejahatan: 'a',
      // kategori_perkara_id_jenis_perkara: '',
      // jenis_perkara_id: '',
      // vonis_tahun: '',
      // vonis_bulan: '',
      // vonis_hari: '',
      tanggal_ditahan_otmil: '',
      tanggal_masa_penahanan_otmil: '',
      bidang_keahlian_id: '',
      gelang_id: '',
      DMAC: '',
      residivis: '',
      hunian_wbp_otmil_id: '',
      nomor_tahanan: '',
      is_isolated: '',
      akses_ruangan_otmil_id: [],
      zona_merah: [],
      lokasi_otmil_id: dataAdmin.lokasi_otmil_id,
      is_deleted: '0',
      status_wbp_kasus_id: '',
      tanggal_penetapan_tersangka: '',
      tanggal_penetapan_terdakwa: '',
      tanggal_penetapan_terpidana: '',
      zat_adiktif: '',
      jenis_olahraga: '',
      penyakit: '',
      berat_badan: '',
      tinggi_badan: '',
      pola_makan: '',
      // zona_hijau: [],
      // zona_kuning: [],
      // zona_merah: [],
      // lokasi_lemasmil_id:'',
      // nama_gateway:''
    },
  );

  const [errors, setErrors] = useState<string[]>([]);
  const [zona, setZona]: any = useState([]);
  const modalContainerRef = useRef(null);
  const [autocompleteDataZona, setAutocompleteDataZona]: any = useState(zona);
  const [filteredJenisPerkara, setFilteredJenisPerkara] = useState([]);
  const [dataArrayPasal, setDataArrayPasal]: any = useState([]);
  const [inputPasal, setInputPasal]: any = useState('');

  // useEffect(() => {
  //   const handleOutsideClick = (e: any) => {
  //     if (
  //       modalContainerRef.current &&
  //       !modalContainerRef.current.contains(e.target)
  //     ) {
  //       closeModal();
  //     }
  //   };

  //   document.addEventListener('mousedown', handleOutsideClick);
  //   return () => {
  //     document.removeEventListener('mousedown', handleOutsideClick);
  //   };
  // }, [closeModal]);

  const validateForm = () => {
    let errorFields: any = [];

    for (const [key, value] of Object.entries(formState)) {
      if (key !== 'lokasi_otmil_id')
        if (formState.is_sick === '0') {
          if (key === 'wbp_sickness') {
            if (!value) {
              continue;
            }
          }
        }

      if (key === 'lokasi_lemasmil_id' || key === 'nama_hunian_wbp_lemasmil') {
        console.log('STATUS ADA');
        continue;
      }

      if (
        formState.status_wbp_kasus_id === '' ||
        formState.status_wbp_kasus_id === null
      ) {
        console.log('STATUS KOSONG');
        if (
          key === 'tanggal_penetapan_tersangka' ||
          key === 'tanggal_penetapan_terdakwa' ||
          key === 'tanggal_penetapan_terpidana'
        ) {
          continue;
        }
      } else if (
        formState.status_wbp_kasus_id === '55ae39b7-dbad-4c89-8968-6d1e2450c963'
      ) {
        //terpidana
        console.log('STATUS terpidana');
        if (
          key === 'tanggal_penetapan_tersangka' ||
          key === 'tanggal_penetapan_terdakwa'
        ) {
          continue;
        }
      } else if (
        formState.status_wbp_kasus_id === 'ca91a6a8-4a1e-4bb3-a6bf-7a2e708a2064'
      ) {
        //terdakwa
        console.log('STATUS terdakwa');
        if (
          key === 'tanggal_penetapan_tersangka' ||
          key === 'tanggal_penetapan_terpidana'
        ) {
          // if (!value) {
          //   errorFields.push(key);
          // }
          continue;
        }
      } else if (
        formState.status_wbp_kasus_id === 'e9e467a1-9132-4787-8938-7517da9ba964'
      ) {
        //tersangka
        console.log('STATUS tersangka');
        if (
          key === 'tanggal_penetapan_terdakwa' ||
          key === 'tanggal_penetapan_terpidana'
        ) {
          continue;
        }
      }
      // else {
      //   console.log('STATUS ANEH');
      // }

      if (!value) {
        errorFields.push(key);
      }
    }

    if (errorFields.length > 0) {
      console.log(errorFields);
      setErrors(errorFields);
      return false;
    }

    setErrors([]);
    return true;
  };

  const handleChange = (e: any) => {
    // console.log('TEST', e.target.name, '&', e.target.value);

    if (e.target.name === 'gelang_id') {
      const selectedGelang = gelang.find(
        (item: any) => item.gelang_id === e.target.value,
      );
      // console.log(selectedGelang, 'ASDASDS');
      setFormState({
        ...formState,
        gelang_id: e.target.value,
        DMAC: selectedGelang ? selectedGelang.dmac : '',
      });
    } else if (e.target.name === 'is_sick') {
      // Jika is_sick berubah, atur nilai wbp_sickness sesuai kondisi
      const newWbpSickness =
        e.target.value === '0' ? '' : formState.wbp_sickness;
      setFormState({
        ...formState,
        is_sick: e.target.value,
        wbp_sickness: newWbpSickness,
      });
    } else if (e.target.name === 'tanggal_penetapan_terdakwa') {
      if (isEdit) {
        setFormState({
          ...formState,
          tanggal_penetapan_tersangka: formState.tanggal_penetapan_tersangka,
          tanggal_penetapan_terdakwa: e.target.value,
          tanggal_penetapan_terpidana: formState.tanggal_penetapan_terpidana,
        });
      } else {
        setFormState({
          ...formState,
          tanggal_penetapan_tersangka: '',
          tanggal_penetapan_terdakwa: e.target.value,
          tanggal_penetapan_terpidana: '',
        });
      }
    } else if (e.target.name === 'tanggal_penetapan_terpidana') {
      if (isEdit) {
        setFormState({
          ...formState,
          tanggal_penetapan_tersangka: formState.tanggal_penetapan_tersangka,
          tanggal_penetapan_terdakwa: formState.tanggal_penetapan_terdakwa,
          tanggal_penetapan_terpidana: e.target.value,
        });
      } else {
        setFormState({
          ...formState,
          tanggal_penetapan_tersangka: '',
          tanggal_penetapan_terdakwa: '',
          tanggal_penetapan_terpidana: e.target.value,
        });
      }
    } else if (e.target.name === 'tanggal_penetapan_tersangka') {
      if (isEdit) {
        setFormState({
          ...formState,
          tanggal_penetapan_tersangka: e.target.value,
          tanggal_penetapan_terdakwa: formState.tanggal_penetapan_terdakwa,
          tanggal_penetapan_terpidana: formState.tanggal_penetapan_terpidana,
        });
      } else {
        setFormState({
          ...formState,
          tanggal_penetapan_tersangka: e.target.value,
          tanggal_penetapan_terdakwa: '',
          tanggal_penetapan_terpidana: '',
        });
      }
    } else {
      console.log('tanpa if');
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  };

  const handleSelectProvinsi = (e: any) => {
    // setSelectedOption(e)
    setFormState({ ...formState, provinsi_id: e?.value, kota_id: '' });
  };

  const handleSelectKota = (e: any) => {
    // setSelectedOption(e)
    setFormState({ ...formState, kota_id: e?.value });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      console.log(reader.result, 'reader reader');

      reader.onloadend = async () => {
        console.log(reader.result, 'reader.result reader.result');
        setFormState({ ...formState, foto_wajah: reader.result });

        // setImagePreview(reader.result);
        console.log(formState.foto_wajah, 'imagePreview imagePreview');
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formState, 'formState');
    if (!validateForm()) return;
    setButtonLoad(true);
    onSubmit(formState).then(() => setButtonLoad(false)); //dikasih  then ... catch
    console.log(formState, 'formstateSuccesValidate');

    // closeModal();
  };

  // Function to handle adding a "zona" to a specific input
  const handleAddZona = (zonaId: any, inputField: any) => {
    console.log('ZONA', zonaId, 'INPUT', inputField);

    if (formState[inputField].includes(zonaId)) {
      // Check if the "zona" is already added to any input

      // If it's already added, show an error or handle it as needed
      setErrors([
        ...errors,
        `Zona ${zonaId} is already assigned to ${inputField}.`,
      ]);
    } else {
      // If it's not added to any input, assign it to the specified input
      setFormState({
        ...formState,
        [inputField]: [...formState[inputField], zonaId],
      });

      // Remove the selected zona from the autocomplete data
      setAutocompleteDataZona((prevData: any) =>
        prevData.filter(
          (zonaItem: any) => zonaItem.ruangan_otmil_id !== zonaId,
        ),
      );
    }
  };

  // Function to handle removing a "zona" from the selected chips
  const handleRemoveZona = (zonaId: any, inputField: any) => {
    // Remove the zona from the selected input field
    setFormState({
      ...formState,
      [inputField]: formState[inputField].filter((id: any) => id !== zonaId),
    });

    // Add the removed zona back to the autocomplete data

    if (!isEdit) {
      setAutocompleteDataZona((prevData: any) => [
        ...prevData,
        zona.find((zonaItem: any) => zonaItem.ruangan_otmil_id === zonaId),
      ]);
    }
  };

  useEffect(() => {
    Promise.all([
      matraData(),
      pangkatData(),
      kotaData(),
      provinsiData(),
      agamaData(),
      statusKawinData(),
      pendidikanData(),
      keahlianData(),
      kesatuanData(),
      hunianData(),
      gelangData(),
      getAllJenisPerkara(),
      getAllKategoriPerkara(),
      getAllRuangan(),
      statusWbpData(),
    ]).then(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (isDetail) {
      setFormState({
        ...formState,
        akses_ruangan_otmil: defaultValue.akses_ruangan_otmil,
      });
    }
  }, [isDetail]);

  // const handleInputPasal = (e: any) => {
  //   const newValue = e.target.value;
  //   setFormState({ ...formState, input_pasal: newValue });
  // };

  // const handlePasal = () => {
  //   if (formState.input_pasal.trim() !== '') {
  //     setFormState({
  //       ...formState,
  //       array_pasal: [...formState.array_pasal, formState.input_pasal],
  //       input_pasal: '', // Mengosongkan nilai input setelah ditambahkan ke dalam array
  //     });
  //   }
  // };

  // const handleRemovePasal = (index: any) => {
  //   const newArrayPasal = formState.array_pasal.filter(
  //     (_: any, i: any) => i !== index
  //   );

  //   setFormState({
  //     ...formState,
  //     array_pasal: newArrayPasal,
  //   });
  // };

  const getAllRuangan = async () => {
    await apiReadAllRuanganOtmil(
      {
        pageSize: 1000,
        page: 1,
        filter: {
          nama_lokasi_otmil: 'Cimahi',
        },
      },
      token,
    )
      .then((res) => {
        console.log(res.data.records, 'res');

        setZona(res.data.records);
        setAutocompleteDataZona(res.data.records);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        }),
      );
  };

  const getAllKategoriPerkara = async () => {
    let params = {};
    await apiReadAllKategoriJahat(params, token)
      .then((res) => {
        setKategoriJahat(res);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        }),
      );
  };

  const getAllJenisPerkara = async () => {
    let params = {
      pageSize: 1000,
    };
    await apiReadAllJenisPerkara(params, token)
      .then((res) => {
        setJenisPerkara(res.data.records);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        }),
      );
  };

  const pangkatData = async () => {
    let params = {};
    await apiReadAllPangkat(params, token)
      .then((res) => {
        setPangkat(res);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        }),
      );
  };

  const kotaData = async () => {
    await apiKota(token)
      .then((res) => {
        setKota(res);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        }),
      );
  };

  const provinsiData = async () => {
    await apiProvinsi(token)
      .then((res) => {
        setProvinsi(res);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        }),
      );
  };

  const agamaData = async () => {
    await apiAgama(token)
      .then((res) => {
        setAgama(res);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        }),
      );
  };

  const statusKawinData = async () => {
    await apiStatusKawin(token)
      .then((res) => {
        setStatusKawin(res);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        }),
      );
  };

  const pendidikanData = async () => {
    await apiPendidikan(token)
      .then((res) => {
        setPendidikan(res);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        }),
      );
  };

  const keahlianData = async () => {
    await apiKeahlian(token)
      .then((res) => {
        setKeahlian(res);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        }),
      );
  };

  const kesatuanData = async () => {
    await apiKesatuan(token)
      .then((res) => {
        setKesatuan(res);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        }),
      );
  };

  const hunianData = async () => {
    let params = {
      pageSize: 1000,
      page: 1,
      filter: {},
    };
    await apiReadAllHunian(params, token)
      .then((res) => {
        setHunian(res.data.records);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        }),
      );
  };

  const gelangData = async () => {
    let params = {
      pageSize: 1000,
      page: 1,
      filter: {},
    };
    await apiGelang(params, token)
      .then((res) => {
        const result = res.data.records;
        // const dataGelangId = dataWbp.map((item:any)=>item.gelang_id)
        // const filter = result.filter((item:any)=>!dataGelangId.includes(item.gelang_id))
        setGelang(result);
      }, token)
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        }),
      );
  };

  const matraData = async () => {
    await apiMatraRead(
      {
        params: {
          pageSize: 1000,
          page: 1,
          filter: {},
        },
      },
      token,
    )
      .then((res) => {
        setMatra(res.data.records);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        }),
      );
  };

  const statusWbpData = async () => {
    await apiStatusWbp(
      {
        params: {
          pageSize: 1000,
          page: 1,
          filter: {},
        },
      },
      token,
    )
      .then((res) => {
        setStatusWbp(res.data.records);
      })
      .catch((err) =>
        Alerts.fire({
          icon: 'error',
          title: err.message,
        }),
      );
  };

  const handleRemoveFoto = () => {
    setFormState({ ...formState, foto_wajah: '' });
    const inputElement = document.getElementById(
      'image-upload',
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
  };

  // Add this CSS style within your modal component
  const modalStyles: any = {
    backdrop: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.5)', // Background color with transparency for the blur effect
      backdropFilter: 'blur(5px)', // Adjust the blur intensity as needed
      zIndex: 40, // Ensure the backdrop is behind the modal
    },
    modalContainer: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      // Add your other modal styles here
    },
  };

  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      width: '100%',
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: 'rgb(30 41 59)',
      borderColor: 'rgb(30 41 59)',
      color: 'white',
      paddingTop: 3,
      paddingBottom: 3,
      paddingLeft: 3,
      paddingRight: 4.5,
      borderRadius: 5,

      '&:hover': {
        borderColor: 'rgb(30 41 59)',
      },
      '&:active': {
        borderColor: 'rgb(30 41 59)',
      },
      '&:focus': {
        borderColor: 'rgb(30 41 59)',
      },
    }),
    input: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
    menu: (provided: any) => ({
      ...provided,
      color: 'white',
      paddingLeft: '5px',
      paddingRight: '5px',
      backgroundColor: 'rgb(30 41 59)',
    }),
    option: (styles: any, { isDisabled, isFocused, isSelected }: any) => {
      return {
        ...styles,
        borderRadius: '6px',

        backgroundColor: isDisabled
          ? undefined
          : isSelected
            ? ''
            : isFocused
              ? 'rgb(51, 133, 255)'
              : undefined,

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled,
        },
      };
    },
    placeholder: (provided: any) => ({
      ...provided,
      color: 'white',
    }),

    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
    clearIndicator: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
    multiValue: (styles: any) => {
      return {
        ...styles,
        backgroundColor: 'rgb(51, 133, 255)',
      };
    },
    multiValueLabel: (styles: any) => ({
      ...styles,
      color: 'white',
    }),
  };

  return (
    // <div
    //   ref={modalContainerRef}
    //   className="modal-container fixed z-[9999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[85vh] w-1/2 overflow-y-scroll bg-boxdark"
    // >
    <div>
      <div style={modalStyles.backdrop}></div>
      <div
        ref={modalContainerRef}
        style={modalStyles.modalContainer}
        className="modal-container fixed z-[999] flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[85vh] w-1/2 overflow-y-scroll bg-slate-600 border border-slate-800 rounded-md"
      >
        {/* <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full"> */}
        <div className="modal rounded-sm w-full">
          {isLoading ? (
            <div>
              <div className="flex flex-row-reverse pr-5 pt-3">
                <strong
                  className="text-xl align-center cursor-pointer "
                  onClick={closeModal}
                >
                  &times;
                </strong>
              </div>
              <div className="h-[500px] justify-center flex items-center">
                <svg
                  className="animate-spin h-20 w-20 text-white "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </div>
          ) : (
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <div className="w-full flex justify-between mb-2  ">
                <div>
                  <h3 className="text-xl font-semibold text-black  dark:text-white">
                    {isDetail
                      ? 'Detail data Tersangka'
                      : isEdit
                        ? 'Edit data Tersangka'
                        : 'Tambah data Tersangka'}
                  </h3>
                </div>
                <strong
                  className="text-xl align-center cursor-pointer "
                  onClick={closeModal}
                >
                  &times;
                </strong>
              </div>

              <form onSubmit={handleSubmit}>
                <div>
                  {/* ----- DATA PRIBADI ----- */}
                  <div>
                    <p className="mt-10 mb-3 text-center bg-slate-500 font-bold text-white rounded-md">
                      Data Tersangka
                    </p>
                    <div className="flex flex-col gap-4">
                      <div className=" grid grid-cols-2 gap-4 items-start ">
                        {/* Gambar */}

                        {isDetail && (
                          <div className="form-group w-full h-fit">
                            <div className=" mt-1 flex flex-col items-center">
                              <img
                                className="object-cover w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                                src={
                                  'https://dev.transforme.co.id/siram_admin_api' +
                                  formState.foto_wajah
                                }
                                alt="Image Preview"
                              />
                            </div>
                          </div>
                        )}

                        {isEdit && (
                          <div className="form-group w-full h-fit ">
                            <div className="mt-1 flex flex-col items-center">
                              {formState.foto_wajah ? (
                                formState.foto_wajah.startsWith(
                                  'data:image/',
                                ) ? (
                                  <img
                                    className="object-cover  w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                                    src={formState.foto_wajah}
                                    alt="Image Preview"
                                  />
                                ) : (
                                  <img
                                    className="object-cover  w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                                    src={
                                      'http://dev.transforme.co.id/siram_admin_api' +
                                      formState.foto_wajah
                                    }
                                    alt="Image Preview"
                                  />
                                ) // Don't render anything if the image format is not as expected
                              ) : (
                                <img
                                  className="w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                                  src="https://via.placeholder.com/200x300"
                                  alt="Placeholder"
                                />
                              )}

                              <input
                                accept="image/*"
                                type="file"
                                id="image-upload"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                              />
                              <div className="flex gap-2">
                                <label htmlFor="image-upload">
                                  <div className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-4 rounded">
                                    Edit Gambar
                                  </div>
                                </label>
                                <button
                                  onClick={handleRemoveFoto}
                                  className="cursor-pointer bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-2 rounded"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <p className="error-text">
                              {errors.map((item) =>
                                item === 'foto_wajah' ? 'Masukan foto' : '',
                              )}
                            </p>
                          </div>
                        )}

                        {!isEdit && !isDetail && (
                          <div className="form-group w-full h-fit ">
                            <div className="mt-1 flex flex-col items-center">
                              {formState.foto_wajah ? (
                                <img
                                  className="object-cover w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                                  src={formState.foto_wajah}
                                  alt="Image Preview"
                                />
                              ) : (
                                <img
                                  className="w-[200px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                                  src="https://via.placeholder.com/200x300"
                                  alt="Placeholder"
                                />
                              )}
                              <input
                                accept="image/*"
                                type="file"
                                id="image-upload"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                              />
                              <div className="flex gap-2">
                                <label htmlFor="image-upload">
                                  <div className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-4 rounded">
                                    Unggah Gambar
                                  </div>
                                </label>

                                <button
                                  onClick={handleRemoveFoto}
                                  className="cursor-pointer bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-2 rounded"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                </button>
                              </div>
                              <p className="error-text">
                                {errors.map((item) =>
                                  item === 'foto_wajah' ? 'Masukan foto' : '',
                                )}
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="flex flex-col gap-4 ">
                          {/* Nama */}
                          <div className="form-group w-full flex flex-col">
                            <label
                              className="  block text-sm font-medium text-black dark:text-white"
                              htmlFor="id"
                            >
                              Nama
                            </label>
                            <input
                              className="w-full rounded border border-stroke  py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:text-gray dark:bg-slate-800  dark:focus:border-primary"
                              name="nama"
                              placeholder="Nama"
                              onChange={handleChange}
                              value={formState.nama}
                              disabled={isDetail}
                            />
                            <p className="error-text">
                              {errors.map((item) =>
                                item === 'nama' ? 'Masukan nama' : '',
                              )}
                            </p>
                          </div>

                          {/* Pangkat */}
                          <div className="form-group w-full flex flex-col">
                            <label
                              className="  block text-sm font-medium text-black dark:text-white"
                              htmlFor="id"
                            >
                              Pangkat
                            </label>
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              styles={customStyles}
                              defaultValue={
                                isEdit || isDetail
                                  ? {
                                      value: formState.pangkat_id,
                                      label: formState.pangkat,
                                    }
                                  : formState.pangkat_id
                              }
                              isDisabled={isDetail}
                              isClearable={true}
                              isSearchable={true}
                              placeholder="Pilih Pangkat"
                              name="pangkat_id"
                              options={pangkat.map((item: any) => ({
                                value: item.pangkat_id,
                                label: item.nama_pangkat,
                              }))}
                            />
                            <p className="error-text">
                              {errors.map((item) =>
                                item === 'pangkat_id' ? 'Pilih pangkat' : '',
                              )}
                            </p>
                          </div>

                          {/* Matra */}
                          <div className="form-group w-full flex flex-col">
                            <label
                              className="  block text-sm font-medium text-black dark:text-white"
                              htmlFor="id"
                            >
                              Matra
                            </label>
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              styles={customStyles}
                              isDisabled={isDetail}
                              isClearable={true}
                              isSearchable={true}
                              name="matra_id"
                              placeholder="Pilih Matra"
                              defaultValue={
                                isEdit || isDetail
                                  ? {
                                      value: formState.matra_id,
                                      label: formState.nama_matra,
                                    }
                                  : formState.matra_id
                              }
                              options={matra.map((item: any) => ({
                                value: item.pengunjung_id,
                                label: item.nama_matra,
                              }))}
                            />
                            <p className="error-text">
                              {errors.map((item) =>
                                item === 'matra_id' ? 'Pilih matra' : '',
                              )}
                            </p>
                          </div>

                          {/* NRP */}
                          <div className="form-group w-full flex flex-col">
                            <label
                              className="  block text-sm font-medium text-black dark:text-white"
                              htmlFor="id"
                            >
                              NRP
                            </label>
                            <input
                              className="w-full rounded border border-stroke  py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:text-gray dark:bg-slate-800  dark:focus:border-primary"
                              name="nrp"
                              placeholder="Nomor registrasi"
                              onChange={handleChange}
                              value={formState.nrp}
                              disabled={isDetail}
                            />
                            <p className="error-text">
                              {errors.map((item) =>
                                item === 'nrp'
                                  ? 'Masukan nomor registrasi'
                                  : '',
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-5">
                        {/* Pendidikan*/}
                        <div className="form-group w-full flex flex-col ">
                          <label
                            className="  block text-sm font-medium text-black dark:text-white"
                            htmlFor="id"
                          >
                            Pendidikan Militer
                          </label>
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            styles={customStyles}
                            name="pendidikan_id"
                            isDisabled={isDetail}
                            isClearable={true}
                            isSearchable={true}
                            placeholder="Pilih Pendidikan"
                            defaultValue={
                              isEdit || isDetail
                                ? {
                                    value: formState.pendidikan_id,
                                    label: formState.nama_pendidikan,
                                  }
                                : formState.pendidikan_id
                            }
                            options={pendidikan.map((item) => ({
                              value: item.pendidikan_id,
                              label: item.nama_pendidikan,
                            }))}
                          />
                          <p className="error-text">
                            {errors.map((item) =>
                              item === 'pendidikan_id'
                                ? 'Pilih pendidikan'
                                : '',
                            )}
                          </p>
                        </div>

                        {/* Kesatuan */}
                        <div className="form-group w-full flex flex-col">
                          <label
                            className="  block text-sm font-medium text-black dark:text-white"
                            htmlFor="id"
                          >
                            Kesatuan
                          </label>
                          {/* <select
                            className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                            name="kesatuan_id"
                            onChange={handleChange}
                            value={formState.kesatuan_id}
                            disabled={isDetail}
                          >
                            <option value="" disabled>
                              Pilih Kesatuan
                            </option>
                            {kesatuan.map((item: any) => (
                              <option value={item.kesatuan_id}>
                                {item.nama_kesatuan}
                              </option>
                            ))}
                          </select> */}
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            styles={customStyles}
                            name="kesatuan_id"
                            isDisabled={isDetail}
                            isClearable={true}
                            isSearchable={true}
                            placeholder="Pilih Kesatuan"
                            defaultValue={
                              isEdit || isDetail
                                ? {
                                    value: formState.kesatuan_id,
                                    label: formState.nama_kesatuan,
                                  }
                                : formState.kesatuan_id
                            }
                            options={kesatuan.map((item: any) => ({
                              value: item.kesatuan_id,
                              label: item.nama_kesatuan,
                            }))}
                          />
                          <p className="error-text">
                            {errors.map((item) =>
                              item === 'kesatuan_id' ? 'Pilih kesatuan' : '',
                            )}
                          </p>
                        </div>

                        {/* Jenis Kelamin */}
                        <div className="form-group w-full flex flex-col">
                          <label
                            className=" block text-sm font-medium text-black dark:text-white"
                            htmlFor="id"
                          >
                            Jenis Kelamin
                          </label>
                          <select
                            className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                            name="jenis_kelamin"
                            onChange={handleChange}
                            value={formState.jenis_kelamin}
                            disabled={isDetail}
                          >
                            <option disabled value="">
                              Pilih Jenis Kelamin
                            </option>
                            <option value="1">Laki-laki</option>
                            <option value="0">Perempuan</option>
                          </select>
                          <p className="error-text">
                            {errors.map((item) =>
                              item === 'jenis_kelamin'
                                ? 'Pilih jenis kelamin'
                                : '',
                            )}
                          </p>
                        </div>

                        {/* Agama */}
                        <div className="form-group w-full flex flex-col">
                          <label
                            className="  block text-sm font-medium text-black dark:text-white"
                            htmlFor="id"
                          >
                            Agama
                          </label>
                          {/* <select
                            className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                            name="agama_id"
                            onChange={handleChange}
                            value={formState.agama_id}
                            disabled={isDetail}
                          >
                            <option value="" disabled>
                              Pilih Agama
                            </option>

                            {agama.map((item) => (
                              <option value={item.agama_id}>
                                {item.nama_agama}
                              </option>
                            ))}
                          </select> */}
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            styles={customStyles}
                            name="agama_id"
                            isDisabled={isDetail}
                            isClearable={true}
                            isSearchable={true}
                            placeholder="Pilih Agama"
                            defaultValue={
                              isEdit || isDetail
                                ? {
                                    value: formState.agama_id,
                                    label: formState.nama_agama,
                                  }
                                : formState.agama_id
                            }
                            options={agama.map((item: any) => ({
                              value: item.agama_id,
                              label: item.nama_agama,
                            }))}
                          />
                          <p className="error-text">
                            {errors.map((item) =>
                              item === 'agama_id' ? 'Pilih agama' : '',
                            )}
                          </p>
                        </div>

                        {/* Tempat Lahir */}
                        <div className="form-group w-full flex flex-col">
                          <label
                            className="  block text-sm font-medium text-black dark:text-white"
                            htmlFor="id"
                          >
                            Tempat Lahir
                          </label>
                          <input
                            className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[10.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                            name="tempat_lahir"
                            placeholder="Tempat Lahir"
                            onChange={handleChange}
                            value={formState.tempat_lahir}
                            disabled={isDetail}
                          />
                          <p className="error-text">
                            {errors.map((item) =>
                              item === 'tempat_lahir'
                                ? 'Masukan tempat_lahir'
                                : '',
                            )}
                          </p>
                        </div>

                        {/* Tanggal Lahir */}
                        <div className="form-group w-full flex flex-col">
                          <label
                            className="  block text-sm font-medium text-black dark:text-white"
                            htmlFor="id"
                          >
                            Tanggal Lahir
                          </label>
                          <input
                            type="date"
                            className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                            name="tanggal_lahir"
                            onChange={handleChange}
                            value={formState.tanggal_lahir}
                            disabled={isDetail}
                          />
                          <p className="error-text">
                            {errors.map((item) =>
                              item === 'tanggal_lahir'
                                ? 'Masukan tanggal lahir'
                                : '',
                            )}
                          </p>
                        </div>

                        {/* Provinsi */}
                        <div className="form-group w-full flex flex-col">
                          <label
                            className="  block text-sm font-medium text-black dark:text-white"
                            htmlFor="id"
                          >
                            Provinsi
                          </label>

                          {/* <select
                            className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                            name="provinsi_id"
                            onChange={handleChange}
                            value={formState.provinsi_id}
                            disabled={isDetail}
                          >
                            <option disabled value="">
                              Pilih Provinsi
                            </option>
                            {provinsi.map((item) => (
                              <option value={item.provinsi_id}>
                                {item.nama_provinsi}
                              </option>
                            ))}
                          </select> */}
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={
                              isEdit || isDetail
                                ? {
                                    value: formState.provinsi_id,
                                    label: formState.nama_provinsi,
                                  }
                                : formState.provinsi_id
                            }
                            placeholder={'Pilih provinsi'}
                            isClearable={true}
                            isSearchable={true}
                            isDisabled={isDetail}
                            name="provinsi_id"
                            styles={customStyles}
                            options={provinsi.map((item: any) => ({
                              value: item.provinsi_id,
                              label: item.nama_provinsi,
                            }))}
                            onChange={handleSelectProvinsi}
                          />
                          <p className="error-text">
                            {errors.map((item) =>
                              item === 'provinsi_id' ? 'Pilih provinsi' : '',
                            )}
                          </p>
                        </div>

                        {/* Kota */}
                        <div className="form-group w-full flex flex-col">
                          <label
                            className="  block text-sm font-medium text-black dark:text-white"
                            htmlFor="id"
                          >
                            Kota
                          </label>
                          {/* <select
                            className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                            name="kota_id"
                            onChange={handleChange}
                            value={formState.kota_id}
                            disabled={isDetail}
                          >
                            <option disabled value="">
                              Pilih Kota
                            </option>
                            {kota
                              .filter((item: any) => {
                                return (
                                  item.provinsi_id === formState.provinsi_id
                                );
                              })
                              .map((item) => (
                                <option value={item.kota_id}>
                                  {item.nama_kota}
                                </option>
                              ))}
                          </select> */}
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={
                              isEdit || isDetail
                                ? {
                                    value: formState.kota_id,
                                    label: formState.nama_kota,
                                  }
                                : formState.kota_id
                            }
                            placeholder={'Pilih kota'}
                            isClearable={true}
                            isSearchable={true}
                            isDisabled={isDetail}
                            name="kota_id"
                            styles={customStyles}
                            options={kota
                              .filter((item: any) => {
                                return (
                                  item.provinsi_id === formState.provinsi_id
                                );
                              })
                              .map((item) => ({
                                value: item.kota_id,
                                label: item.nama_kota,
                              }))}
                            onChange={handleSelectKota}
                          />
                          <p className="error-text">
                            {errors.map((item) =>
                              item === 'kota_id' ? 'Pilih Kota' : '',
                            )}
                          </p>
                        </div>
                      </div>
                      {/* Alamat */}
                      <div className="form-group w-full flex flex-col">
                        <label
                          className=" block text-sm font-medium text-black dark:text-white"
                          htmlFor="id"
                        >
                          Alamat
                        </label>
                        <textarea
                          className="w-full max-h-[94px] min-h-[94px] rounded border border-stroke  py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                          name="alamat"
                          placeholder="Alamat"
                          onChange={handleChange}
                          value={formState.alamat}
                          disabled={isDetail}
                        />
                        <p className="error-text">
                          {errors.map((item) =>
                            item === 'alamat' ? 'Masukan alamat' : '',
                          )}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 ">
                        {/* Status Kawin */}
                        <div className="form-group w-full flex flex-col">
                          <label
                            className="  block text-sm font-medium text-black dark:text-white"
                            htmlFor="id"
                          >
                            Status Kawin
                          </label>

                          {/* <select
                            className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                            name="status_kawin_id"
                            onChange={handleChange}
                            value={formState.status_kawin_id}
                            disabled={isDetail}
                          >
                            <option value="" disabled>
                              Pilih Status Kawin
                            </option>
                            {statusKawin.map((item) => (
                              <option value={item.status_kawin_id}>
                                {item.nama_status_kawin}
                              </option>
                            ))}
                          </select> */}
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            styles={customStyles}
                            name="status_kawin_id"
                            isDisabled={isDetail}
                            isClearable={true}
                            isSearchable={true}
                            placeholder="Pilih Status Kawin"
                            defaultValue={
                              isEdit || isDetail
                                ? {
                                    value: formState.status_kawin_id,
                                    label: formState.nama_status_kawin,
                                  }
                                : formState.status_kawin_id
                            }
                            options={statusKawin.map((item) => ({
                              value: item.status_kawin_id,
                              label: item.nama_status_kawin,
                            }))}
                          />
                          <p className="error-text">
                            {errors.map((item) =>
                              item === 'status_kawin_id'
                                ? 'Pilih status nikah'
                                : '',
                            )}
                          </p>
                        </div>

                        {/* Kontak Keluarga Nama */}
                        <div className="form-group w-full flex flex-col">
                          <label
                            className="  block text-sm font-medium text-black dark:text-white"
                            htmlFor="id"
                          >
                            Nama Keluarga
                          </label>
                          <input
                            className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                            name="nama_kontak_keluarga"
                            placeholder="Nama keluarga"
                            onChange={handleChange}
                            value={formState.nama_kontak_keluarga}
                            disabled={isDetail}
                          />
                          <p className="error-text">
                            {errors.map((item) =>
                              item === 'nama_kontak_keluarga'
                                ? 'Masukan nama keluarga'
                                : '',
                            )}
                          </p>
                        </div>

                        {/* Status Keluarga */}
                        <div className="form-group w-full flex flex-col">
                          <label
                            className="  block text-sm font-medium text-black dark:text-white"
                            htmlFor="id"
                          >
                            Status Hubungan
                          </label>
                          <input
                            className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                            name="hubungan_kontak_keluarga"
                            placeholder="Status hubungan"
                            onChange={handleChange}
                            value={formState.hubungan_kontak_keluarga}
                            disabled={isDetail}
                          />

                          <p className="error-text">
                            {errors.map((item) =>
                              item === 'hubungan_kontak_keluarga'
                                ? 'Pilih status hubungan'
                                : '',
                            )}
                          </p>
                        </div>

                        {/* Kontak Keluarga no HP */}
                        <div className="form-group w-full flex flex-col">
                          <label
                            className="  block text-sm font-medium text-black dark:text-white"
                            htmlFor="id"
                          >
                            Nomor Kontak Keluarga
                          </label>
                          <input
                            className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                            name="nomor_kontak_keluarga"
                            placeholder="Kontak keluarga"
                            onChange={handleChange}
                            value={formState.nomor_kontak_keluarga}
                            disabled={isDetail}
                          />
                          <p className="error-text">
                            {errors.map((item) =>
                              item === 'nomor_kontak_keluarga'
                                ? 'Masukan kontak keluarga'
                                : '',
                            )}
                          </p>
                        </div>

                        {/* Penyakit */}
                        <div className="form-group w-full ">
                          <label
                            className="  block text-sm font-medium text-black dark:text-white"
                            htmlFor="id"
                          >
                            Penyakit (?)
                          </label>
                          <select
                            className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                            name="is_sick"
                            onChange={handleChange}
                            value={formState.is_sick}
                            disabled={isDetail}
                          >
                            <option value="" disabled>
                              Silahkan Pilih
                            </option>

                            <option value="0">Tidak</option>
                            <option value="1">Ya</option>
                          </select>
                          <p className="error-text">
                            {errors.map((item) =>
                              item === 'is_sick' ? 'Pilih Ya/Tidak' : '',
                            )}
                          </p>
                        </div>

                        {formState.is_sick === '0' ||
                        formState.is_sick === '' ? null : (
                          <>
                            <div className="form-group w-full flex flex-col">
                              <label
                                className="  block text-sm font-medium text-black dark:text-white"
                                htmlFor="id"
                              >
                                Nama Penyakit
                              </label>
                              <input
                                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                                name="wbp_sickness"
                                placeholder="Nama Penyakit"
                                onChange={handleChange}
                                value={formState.wbp_sickness}
                                disabled={isDetail}
                              />
                              <p className="error-text">
                                {errors.map((item) =>
                                  item === 'wbp_sickness'
                                    ? 'Masukan nama penyakit'
                                    : '',
                                )}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ----- DATA PERKARA ----- */}
                  <div className="mt-4">
                    <p className="mt-10 mb-3 text-center bg-slate-500 font-bold text-white rounded-md">
                      Data Perkara
                    </p>

                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        {/* Kategori Perkara */}
                        {/* <div className="form-group w-full ">
                          <label
                            className="  block text-sm font-medium text-black dark:text-white"
                            htmlFor="id"
                          >
                            Kategori Perkara
                          </label>
                          <select
                            className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                            name="kategori_perkara_id_jenis_perkara"
                            onChange={handleChange}
                            value={formState.kategori_perkara_id_jenis_perkara}
                            disabled={isDetail}
                          >
                            <option value="">Pilih Kategori Perkara</option>
                            {kategoriJahat.map((item: any) => (
                              <option value={item.kategori_perkara_id}>
                                {item.nama_kategori_perkara}
                              </option>
                            ))}
                          </select>
                          <p className="error-text">
                            {errors.map((item) =>
                              item === 'kategori_perkara_id_jenis_perkara'
                                ? 'Pilih kategori perkara'
                                : ''
                            )}
                          </p>
                        </div> */}

                        {/* Jenis Perkara */}
                        {/* <div className="form-group w-full ">
                          <label
                            className="  block text-sm font-medium text-black dark:text-white"
                            htmlFor="id"
                          >
                            Jenis Perkara
                          </label>
                          <select
                            className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                            name="jenis_perkara_id"
                            onChange={handleChange}
                            value={formState.jenis_perkara_id}
                            disabled={isDetail}
                          >
                            <option value="">Pilih Jenis Perkara</option>
                            {jenisPerkara
                              .filter((item: any) => {
                                // Apply your filter condition here
                                // For example, only render items that meet a certain condition
                                return (
                                  item.kategori_perkara_id ===
                                  formState.kategori_perkara_id_jenis_perkara
                                ); // Change 'someCondition' to your actual condition
                              })
                              .map((item: any) => (
                                <option
                                  key={item.jenis_perkara_id}
                                  value={item.jenis_perkara_id}
                                >
                                  {item.nama_jenis_perkara} - {item.pasal}
                                </option>
                              ))}
                          </select>
                          <p className="error-text">
                            {errors.map((item) =>
                              item === 'jenis_perkara_id'
                                ? 'Pilih jenis perkara'
                                : ''
                            )}
                          </p>
                        </div> */}
                      </div>

                      {/* Pasal */}
                      {/* <div className="hidden">
                        <p className="text-white">Pasal</p>
                        <select className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary">
                          <option value="">Pilih Jenis Perkara</option>
                          {jenisPerkara.map((item: any) => (
                            <option value={item.pasal}>{item.pasal}</option>
                          ))}
                        </select> */}

                      {/* <div className="border-[1px] border-slate-500 rounded-md p-2">
                      <div className="flex flex-row gap-2">

                        <input
                          type="text"
                          value={formState.input_pasal}
                          placeholder={isDetail ? '' : 'Input Pasal'}
                          onChange={handleInputPasal}
                          disabled={isDetail}
                          className="w-full rounded border border-stroke  dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                        ></input>

                        <button
                          onClick={handlePasal}
                          type="button"
                          className="py-3 px-3 rounded-md bg-blue-500"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 text-white"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </button>
                      </div>
                      <div
                        className={`mt-2 flex flex-col overflow-hidden gap-2 ${
                          formState.array_pasal?.length === 0
                            ? 'hidden'
                            : 'block'
                        }`}
                      >
                        {formState.array_pasal?.map((item: any, index: any) => (
                          <div className="flex flex-row items-center">
                            <p
                              key={index}
                              className="capitalize px-3 py-1 truncate w-full  rounded-md bg-boxdark border-[1px] border-slate-500  text-white"
                            >
                              {item}
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                handleRemovePasal(index);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div> */}
                      {/* </div> */}

                      {/* Vonis */}
                      {isDetail && (
                        <div className=" grid grid-cols-3 gap-4">
                          {/* Vonis Tahun */}
                          <div className="form-group w-full ">
                            <label
                              className="  block text-sm font-medium text-black dark:text-white"
                              htmlFor="id"
                            >
                              Vonis Tahun
                            </label>
                            <input
                              className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                              name="vonis_tahun"
                              placeholder="Tahun"
                              onChange={handleChange}
                              value={formState.vonis_tahun}
                              disabled={isDetail}
                            />
                            <p className="error-text">
                              {errors.map((item) =>
                                item === 'vonis_tahun'
                                  ? 'Masukan vonis tahun'
                                  : '',
                              )}
                            </p>
                          </div>

                          {/* Vonis Bulan */}
                          <div className="form-group w-full ">
                            <label
                              className="  block text-sm font-medium text-black dark:text-white"
                              htmlFor="id"
                            >
                              Vonis Bulan
                            </label>
                            <input
                              className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                              name="vonis_bulan"
                              placeholder="Bulan"
                              onChange={handleChange}
                              value={formState.vonis_bulan}
                              disabled={isDetail}
                            />
                            <p className="error-text">
                              {errors.map((item) =>
                                item === 'vonis_bulan'
                                  ? 'Masukan vonis bulan'
                                  : '',
                              )}
                            </p>
                          </div>

                          {/* Vonis Hari */}
                          <div className="form-group w-full ">
                            <label
                              className="  block text-sm font-medium text-black dark:text-white"
                              htmlFor="id"
                            >
                              Vonis Hari
                            </label>
                            <input
                              className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                              name="vonis_hari"
                              placeholder="Hari"
                              onChange={handleChange}
                              value={formState.vonis_hari}
                              disabled={isDetail}
                            />
                            <p className="error-text">
                              {errors.map((item) =>
                                item === 'vonis_hari'
                                  ? 'Masukan vonis hari'
                                  : '',
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          {/* Tanggal diTahan */}
                          <div className="form-group w-full ">
                            <label
                              className="  block text-sm font-medium text-black dark:text-white"
                              htmlFor="id"
                            >
                              Tanggal Ditahan
                            </label>
                            <input
                              type="date"
                              className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                              name="tanggal_ditahan_otmil"
                              onChange={handleChange}
                              value={formState.tanggal_ditahan_otmil}
                              disabled={isDetail}
                            />
                            <p className="error-text">
                              {errors.map((item) =>
                                item === 'tanggal_ditahan_otmil'
                                  ? 'Masukan tanggal ditahan'
                                  : '',
                              )}
                            </p>
                          </div>

                          {/* Keahlian */}
                          <div className="form-group w-full ">
                            <label
                              className="  block text-sm font-medium text-black dark:text-white"
                              htmlFor="id"
                            >
                              Keahlian
                            </label>
                            {/* <select
                              className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                              name="bidang_keahlian_id"
                              onChange={handleChange}
                              value={formState.bidang_keahlian_id}
                              disabled={isDetail}
                            >
                              <option disabled value="">
                                Pilih Keahlian
                              </option>
                              {keahlian.map((item) => (
                                <option value={item.bidang_keahlian_id}>
                                  {item.nama_bidang_keahlian}
                                </option>
                              ))}
                            </select> */}
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              styles={customStyles}
                              name="bidang_keahlian_id"
                              isDisabled={isDetail}
                              isClearable={true}
                              isSearchable={true}
                              placeholder="Pilih Keahlian"
                              defaultValue={
                                isEdit || isDetail
                                  ? {
                                      value: formState.bidang_keahlian_id,
                                      label: formState.nama_bidang_keahlian,
                                    }
                                  : formState.bidang_keahlian_id
                              }
                              options={keahlian.map((item: any) => ({
                                value: item.bidang_keahlian_id,
                                label: item.nama_bidang_keahlian,
                              }))}
                            />
                            <p className="error-text">
                              {errors.map((item) =>
                                item === 'bidang_keahlian_id'
                                  ? 'Pilih keahlian'
                                  : '',
                              )}
                            </p>
                          </div>

                          {/* Gelang */}
                          <div className="form-group w-full ">
                            <label
                              className="  block text-sm font-medium text-black dark:text-white"
                              htmlFor="id"
                            >
                              Gelang
                            </label>
                            <select
                              className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                              name="gelang_id"
                              onChange={handleChange}
                              value={formState.gelang_id}
                              disabled={isDetail}
                            >
                              <option value="" disabled>
                                Pilih Gelang
                              </option>

                              {isDetail
                                ? gelang.map((item: any) => (
                                    <option value={item.gelang_id}>
                                      {item.nama_gelang}
                                    </option>
                                  ))
                                : isEdit
                                  ? gelang.map((item: any) => {
                                      const isUsed = dataWbp.some(
                                        (wbp: any) =>
                                          wbp.gelang_id === item.gelang_id,
                                      );
                                      return (
                                        <option
                                          value={item.gelang_id}
                                          key={item.gelang_id}
                                        >
                                          {item.nama_gelang}{' '}
                                          {isUsed
                                            ? '(Sedang Digunakan)'
                                            : '(Tidak Digunakan)'}
                                        </option>
                                      );
                                    })
                                  : gelang
                                      .filter(
                                        (item: any) =>
                                          !dataWbp
                                            .map(
                                              (wbp: any) =>
                                                wbp.gelang_id || wbp.gelang_id,
                                            )
                                            .includes(item.gelang_id),
                                      )
                                      .map((item: any) => (
                                        <option value={item.gelang_id}>
                                          {item.nama_gelang}
                                        </option>
                                      ))}
                            </select>
                            {/* <Select
                              name="gelang_id"
                              onChange={handleChange}
                              isClearable={true}
                              isSearchable={true}
                              isDisabled={isDetail}
                              placeholder="Pilih Gelang"
                              styles={customStyles}
                            /> */}
                            <p className="error-text">
                              {errors.map((item) =>
                                item === 'gelang_id' ? 'Pilih gelang' : '',
                              )}
                            </p>
                          </div>

                          {/* DMAC Gelang */}
                          <div className="form-group w-full ">
                            <label
                              className="  block text-sm font-medium text-black dark:text-white"
                              htmlFor="id"
                            >
                              DMAC Gelang
                            </label>
                            <input
                              type="text"
                              className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                              name="DMAC"
                              placeholder="DMAC"
                              onChange={handleChange}
                              value={formState.DMAC}
                              disabled
                            />
                            <p className="error-text">
                              {errors.map((item) =>
                                item === 'DMAC' ? 'Pilih gelang dulu' : '',
                              )}
                            </p>
                          </div>

                          {/* Residivis */}
                          <div className="form-group w-full ">
                            <label
                              className="  block text-sm font-medium text-black dark:text-white"
                              htmlFor="id"
                            >
                              Residivis
                            </label>

                            <select
                              className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                              name="residivis"
                              onChange={handleChange}
                              value={formState.residivis}
                              disabled={isDetail}
                            >
                              <option value="" disabled>
                                Pilih Residivis
                              </option>

                              <option value="0">Tidak</option>
                              <option value="1">Ya</option>
                            </select>
                            <p className="error-text">
                              {errors.map((item) =>
                                item === 'residivis' ? 'Pilih Ya/Tidak' : '',
                              )}
                            </p>
                          </div>

                          {/* Hunian Tahanan */}
                          <div className="form-group w-full ">
                            <label
                              className="  block text-sm font-medium text-black dark:text-white"
                              htmlFor="id"
                            >
                              Hunian Tahanan
                            </label>
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              styles={customStyles}
                              name="hunian_wbp_otmil_id"
                              isDisabled={isDetail}
                              isClearable={true}
                              isSearchable={true}
                              placeholder="Pilih Hunian Tahanan"
                              defaultValue={
                                isEdit || isDetail
                                  ? {
                                      value: formState.hunian_wbp_otmil_id,
                                      label: formState.nama_hunian_wbp_otmil,
                                    }
                                  : formState.hunian_wbp_otmil_id
                              }
                              options={hunian.map((item: any) => ({
                                value: item.hunian_wbp_otmil_id,
                                label: item.nama_hunian_wbp_otmil,
                              }))}
                            />
                            <p className="error-text">
                              {errors.map((item) =>
                                item === 'hunian_wbp_otmil_id'
                                  ? 'Pilih hunian'
                                  : '',
                              )}
                            </p>
                          </div>

                          {/* Nomor Tahanan*/}
                          <div className="form-group w-full ">
                            <label
                              className="  block text-sm font-medium text-black dark:text-white"
                              htmlFor="id"
                            >
                              Nomor Tahanan
                            </label>
                            <input
                              type="text"
                              className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                              name="nomor_tahanan"
                              placeholder="Nomor Tahanan"
                              onChange={handleChange}
                              value={formState.nomor_tahanan}
                              disabled={isDetail}
                            />
                            <p className="error-text">
                              {errors.map((item) =>
                                item === 'nomor_tahanan'
                                  ? 'Masukan nomor tahanan'
                                  : '',
                              )}
                            </p>
                          </div>

                          {/* Terisolasi */}
                          <div className="form-group w-full ">
                            <label
                              className="  block text-sm font-medium text-black dark:text-white"
                              htmlFor="id"
                            >
                              Terisolasi (?)
                            </label>
                            <select
                              className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                              name="is_isolated"
                              onChange={handleChange}
                              value={formState.is_isolated}
                              disabled={isDetail}
                            >
                              <option value="" disabled>
                                Silahkan Dipilih
                              </option>
                              <option value="0">Tidak</option>
                              <option value="1">Ya</option>
                            </select>
                            <p className="error-text">
                              {errors.map((item) =>
                                item === 'is_isolated' ? 'Pilih Ya/Tidak' : '',
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {/* Status Wbp*/}
                          <div className="form-group w-full ">
                            <label
                              className="  block text-sm font-medium text-black dark:text-white"
                              htmlFor="id"
                            >
                              Status Tersangka
                            </label>
                            <select
                              className="capitalize w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                              name="status_wbp_kasus_id"
                              onChange={handleChange}
                              // defaultValue={formState.status_wbp_kasus_id ?? ''}
                              defaultValue={
                                isEdit || isDetail
                                  ? {
                                      value: formState.status_wbp_kasus_id,
                                      label: formState.nama_status_wbp_kasus,
                                    }
                                  : formState.status_wbp_kasus_id
                              }
                              disabled={isDetail}
                            >
                              <option disabled value="">
                                Pilih status
                              </option>
                              {statusWbp.map((item: any) => (
                                <option value={item.status_wbp_kasus_id}>
                                  {item.nama_status_wbp_kasus}
                                </option>
                              ))}
                            </select>
                            {/* <Select
                              className="basic-single"
                              classNamePrefix="select"
                              styles={customStyles}
                              name="status_wbp_kasus_id"
                              isDisabled={isDetail}
                              isClearable={true}
                              isSearchable={true}
                              placeholder="Pilih Status"
                              defaultValue={
                                isEdit || isDetail
                                  ? {
                                      value: formState.status_wbp_kasus_id,
                                      label: formState.nama_status_wbp_kasus,
                                    }
                                  : formState.status_wbp_kasus_id
                              }
                              options={statusWbp.map((item: any) => ({
                                value: item.status_wbp_kasus_id,
                                label: item.nama_status_wbp_kasus,
                              }))}
                            /> */}
                            <p className="error-text">
                              {errors.map((item) =>
                                item === 'status_wbp_kasus_id'
                                  ? 'Pilih status'
                                  : '',
                              )}
                            </p>
                          </div>

                          {/* Tanggal Penetapan*/}
                          {/* <div
                            className={`form-group w-full ${
                              formState.status_wbp_kasus_id === '' ||
                              formState.status_wbp_kasus_id === null
                                ? 'hidden'
                                : ''
                            }`}
                          >
                            <label
                              className="  block text-sm font-medium text-black dark:text-white"
                              htmlFor="id"
                            >
                              Tanggal penetapan{' '}
                              {formState.status_wbp_kasus_id ===
                              '55ae39b7-dbad-4c89-8968-6d1e2450c963' //id terpidana
                                ? 'terpidana'
                                : formState.status_wbp_kasus_id ===
                                  'ca91a6a8-4a1e-4bb3-a6bf-7a2e708a2064' // id terdakwa
                                ? 'terdakwa'
                                : 'tersangka'}
                            </label>
                            <input
                              type="date"
                              className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                              // name="tanggal_penetapan_terpidana"
                              name={
                                formState.status_wbp_kasus_id ===
                                '55ae39b7-dbad-4c89-8968-6d1e2450c963' //id terpidana
                                  ? 'tanggal_penetapan_terpidana'
                                  : formState.status_wbp_kasus_id ===
                                    'ca91a6a8-4a1e-4bb3-a6bf-7a2e708a2064' //id terdakwa
                                  ? 'tanggal_penetapan_terdakwa'
                                  : formState.status_wbp_kasus_id ===
                                    'e9e467a1-9132-4787-8938-7517da9ba964'
                                  ? 'tanggal_penetapan_tersangka'
                                  : ''
                              }
                              onChange={handleChange}
                              value={
                                formState.status_wbp_kasus_id ===
                                '55ae39b7-dbad-4c89-8968-6d1e2450c963' //id terpidana
                                  ? formState.tanggal_penetapan_terpidana
                                  : formState.status_wbp_kasus_id ===
                                    'ca91a6a8-4a1e-4bb3-a6bf-7a2e708a2064' //id terdakwa
                                  ? formState.tanggal_penetapan_terdakwa
                                  : formState.status_wbp_kasus_id ===
                                    'e9e467a1-9132-4787-8938-7517da9ba964'
                                  ? formState.tanggal_penetapan_tersangka
                                  : ''
                              }
                              // value={formState.tanggal_penetapan_terpidana}

                              disabled={isDetail}
                            />
                            <p className="error-text">
                              {errors.map((item) =>
                                item === 'tanggal_penetapan_terpidana'
                                  ? 'Masukan tanggal penetapan '
                                  : item === 'tanggal_penetapan_terdakwa'
                                  ? 'Masukan tanggal penetapan '
                                  : item === 'tanggal_penetapan_tersangka'
                                  ? 'Masukan tanggal penetapan'
                                  : ''
                              )}
                            </p>
                          </div> */}

                          {formState.status_wbp_kasus_id === '' ||
                          formState.status_wbp_kasus_id === null ? null : (
                            <>
                              {/* Tanggal Penetapan Terpidana*/}
                              <div
                                className={`form-group w-full  ${formState.status_wbp_kasus_id === '55ae39b7-dbad-4c89-8968-6d1e2450c963' ? 'block' : 'hidden'}`}
                              >
                                <label
                                  className="  block text-sm font-medium text-black dark:text-white"
                                  htmlFor="id"
                                >
                                  Tanggal penetapan terpidana
                                </label>
                                <input
                                  type="date"
                                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                                  name="tanggal_penetapan_terpidana"
                                  onChange={handleChange}
                                  value={formState.tanggal_penetapan_terpidana}
                                  disabled={isDetail}
                                />
                                <p className="error-text">
                                  {errors.map((item) =>
                                    item === 'tanggal_penetapan_terpidana'
                                      ? 'Masukan tanggal penetapan'
                                      : '',
                                  )}
                                </p>
                              </div>

                              {/* Tanggal Penetapan Terdakwa*/}
                              <div
                                className={`form-group w-full  ${formState.status_wbp_kasus_id === 'ca91a6a8-4a1e-4bb3-a6bf-7a2e708a2064' ? 'block' : 'hidden'}`}
                              >
                                <label
                                  className="  block text-sm font-medium text-black dark:text-white"
                                  htmlFor="id"
                                >
                                  Tanggal penetapan terdakwa
                                </label>
                                <input
                                  type="date"
                                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                                  name="tanggal_penetapan_terdakwa"
                                  onChange={handleChange}
                                  value={formState.tanggal_penetapan_terdakwa}
                                  disabled={isDetail}
                                />
                                <p className="error-text">
                                  {errors.map((item) =>
                                    item === 'tanggal_penetapan_terdakwa'
                                      ? 'Masukan tanggal penetapan'
                                      : '',
                                  )}
                                </p>
                              </div>

                              {/* Tanggal Penetapan Tersangka*/}
                              <div
                                className={`form-group w-full  ${formState.status_wbp_kasus_id === 'e9e467a1-9132-4787-8938-7517da9ba964' ? 'block' : 'hidden'}`}
                              >
                                <label
                                  className="  block text-sm font-medium text-black dark:text-white"
                                  htmlFor="id"
                                >
                                  Tanggal penetapan tersangka
                                </label>
                                <input
                                  type="date"
                                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                                  name="tanggal_penetapan_tersangka"
                                  onChange={handleChange}
                                  value={formState.tanggal_penetapan_tersangka}
                                  disabled={isDetail}
                                />
                                <p className="error-text">
                                  {errors.map((item) =>
                                    item === 'tanggal_penetapan_tersangka'
                                      ? 'Masukan tanggal penetapan'
                                      : '',
                                  )}
                                </p>
                              </div>
                            </>
                          )}

                          {/* Tanggal Masa Penahanan */}
                          <div className="form-group w-full ">
                            <label
                              className="  block text-sm font-medium text-black dark:text-white"
                              htmlFor="id"
                            >
                              Tanggal Masa Penahanan
                            </label>
                            <input
                              type="date"
                              className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                              name="tanggal_masa_penahanan_otmil"
                              onChange={handleChange}
                              value={formState.tanggal_masa_penahanan_otmil}
                              disabled={isDetail}
                            />
                            <p className="error-text">
                              {errors.map((item) =>
                                item === 'tanggal_masa_penahanan_otmil'
                                  ? 'Masukan tanggal masa penahanan'
                                  : '',
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ----- DATA KESEHATAN ----- */}
                    <div className="mt-4">
                      <p className="mt-10 mb-3 text-center bg-slate-500 font-bold text-white rounded-md">
                        Data Kesehatan
                      </p>

                      <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            {/* Penyakit */}
                            <div className="form-group w-full flex flex-col">
                              <label
                                className="  block text-sm font-medium text-black dark:text-white"
                                htmlFor="id"
                              >
                                Penyakit
                              </label>
                              <input
                                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                                name="penyakit"
                                placeholder="Nama penyakit"
                                onChange={handleChange}
                                value={formState.penyakit}
                                disabled={isDetail}
                              />
                              <p className="error-text">
                                {errors.map((item) =>
                                  item === 'penyakit'
                                    ? 'Masukan nama penyakit'
                                    : '',
                                )}
                              </p>
                            </div>

                            {/* Berat Badan */}
                            <div className="form-group w-full flex flex-col">
                              <label
                                className="  block text-sm font-medium text-black dark:text-white"
                                htmlFor="id"
                              >
                                Berat Badan
                              </label>
                              <input
                                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                                name="berat_badan"
                                placeholder="Berapa berat badan"
                                onChange={handleChange}
                                value={formState.berat_badan}
                                disabled={isDetail}
                              />
                              <p className="error-text">
                                {errors.map((item) =>
                                  item === 'berat_badan'
                                    ? 'Masukan berat badan'
                                    : '',
                                )}
                              </p>
                            </div>

                            {/* Tinggi Badan */}
                            <div className="form-group w-full flex flex-col">
                              <label
                                className="  block text-sm font-medium text-black dark:text-white"
                                htmlFor="id"
                              >
                                Tinggi Badan
                              </label>
                              <input
                                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                                name="tinggi_badan"
                                placeholder="Berapa tinggi badan"
                                onChange={handleChange}
                                value={formState.tinggi_badan}
                                disabled={isDetail}
                              />
                              <p className="error-text">
                                {errors.map((item) =>
                                  item === 'tinggi_badan'
                                    ? 'Masukan tinggi badan'
                                    : '',
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ----- DATA PERILAKU ----- */}
                    <div className="mt-4">
                      <p className="mt-10 mb-3 text-center bg-slate-500 font-bold text-white rounded-md">
                        Data Perilaku
                      </p>

                      <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            {/* Pola Makan */}
                            <div className="form-group w-full flex flex-col">
                              <label
                                className="  block text-sm font-medium text-black dark:text-white"
                                htmlFor="id"
                              >
                                Pola Makan
                              </label>
                              <input
                                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                                name="pola_makan"
                                placeholder="Nama pola makan"
                                onChange={handleChange}
                                value={formState.pola_makan}
                                disabled={isDetail}
                              />
                              <p className="error-text">
                                {errors.map((item) =>
                                  item === 'pola_makan'
                                    ? 'Masukan nama pola makan'
                                    : '',
                                )}
                              </p>
                            </div>

                            {/* Jenis Olahraga */}
                            <div className="form-group w-full flex flex-col">
                              <label
                                className=" block text-sm font-medium text-black dark:text-white"
                                htmlFor="id"
                              >
                                Jenis Olahraga
                              </label>
                              <select
                                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                                name="jenis_olahraga"
                                onChange={handleChange}
                                value={formState.jenis_olahraga}
                                disabled={isDetail}
                              >
                                <option disabled value="">
                                  Pilih Jenis Olahraga
                                </option>
                                <option value="0">Futsal</option>
                                <option value="1">Voli</option>
                                <option value="2">Badminton</option>
                                <option value="3">Berenang</option>
                                <option value="4">Golf</option>
                                <option value="5">Basket</option>
                                <option value="6">Sepak Bola</option>
                              </select>
                              <p className="error-text">
                                {errors.map((item) =>
                                  item === 'jenis_olahraga'
                                    ? 'Pilih jenis olahraga'
                                    : '',
                                )}
                              </p>
                            </div>

                            {/* Konsumsi Zat Adiktif */}
                            <div className="form-group w-full flex flex-col">
                              <label
                                className=" block text-sm font-medium text-black dark:text-white"
                                htmlFor="id"
                              >
                                Jenis Zat Adiktif
                              </label>
                              <select
                                className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                                name="zat_adiktif"
                                onChange={handleChange}
                                value={formState.zat_adiktif}
                                disabled={isDetail}
                              >
                                <option disabled value="">
                                  Pilih Jenis Zat Adiktif
                                </option>
                                <option value="0">Nikotin</option>
                                <option value="1">Alkohol</option>
                                <option value="2">Kafein</option>
                                <option value="3">Amfetamin</option>
                                <option value="4">Ganja</option>
                                <option value="5">Kokain</option>
                                <option value="6">Heroin</option>
                              </select>
                              <p className="error-text">
                                {errors.map((item) =>
                                  item === 'zat_adiktif'
                                    ? 'Pilih jenis zat adiktif'
                                    : '',
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {isDetail ? null : (
                      <>
                        {/*  Akses Zona  */}
                        <div className=" grid grid-cols-3 gap-5 justify-normal pt-4">
                          <div className="w-full col-span-3">
                            <h3 className="mt-10 mb-3 text-center bg-slate-500 font-bold text-white rounded-md">
                              Akses Zona
                            </h3>

                            <div className="border-slate-500 grid grid-cols-3 gap-5  p-2 border rounded-lg ">
                              {isEdit
                                ? autocompleteDataZona
                                    ?.filter(
                                      (item: any) =>
                                        !formState.akses_ruangan_otmil_id.includes(
                                          item.ruangan_otmil_id,
                                        ),
                                    )
                                    .map((zonaItem: any) => (
                                      <div
                                        key={zonaItem.ruangan_otmil_id}
                                        className={`gap-2 py-2 [word-wrap: break-word] flex flex-col h-fit cursor-default items-center justify-between rounded-[16px] border-4 ${
                                          zonaItem.nama_zona === 'Hijau'
                                            ? 'border-green-500'
                                            : zonaItem.nama_zona === 'Kuning'
                                              ? 'border-yellow-500'
                                              : zonaItem.nama_zona === 'Merah'
                                                ? 'border-red-500'
                                                : 'border-slate-800'
                                        } bg-slate-800 bg-[transparent] px-[12px] text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear  hover:!shadow-none dark:text-neutral-200`}
                                        data-te-ripple-color="dark"
                                      >
                                        <p className="text-xs capitalize font-semibold">
                                          {' '}
                                          {zonaItem.nama_ruangan_otmil}
                                        </p>
                                        <button
                                          className="text-white w-full bg-green-500 border-white border-[1px] rounded-md font-bold text-[9px]"
                                          onClick={(e) => {
                                            e.preventDefault(); // Prevent page reload
                                            handleAddZona(
                                              zonaItem.ruangan_otmil_id,
                                              'akses_ruangan_otmil_id',
                                            );
                                          }}
                                        >
                                          Ijinkan
                                        </button>
                                        {/* <button
                                    className="text-white w-full bg-yellow-500 rounded-md  font-bold text-[9px]"
                                    onClick={(e) => {
                                      e.preventDefault(); // Prevent page reload
                                      handleAddZona(
                                        zonaItem.ruangan_otmil_id,
                                        'zona_kuning'
                                      );
                                    }}
                                  >
                                    Awasi
                                  </button> */}
                                        <button
                                          className="text-white w-full bg-red-500 border-white border-[1px] rounded-md font-bold text-[9px]"
                                          onClick={(e) => {
                                            e.preventDefault(); // Prevent page reload
                                            handleAddZona(
                                              zonaItem.ruangan_otmil_id,
                                              'zona_merah',
                                            );
                                          }}
                                        >
                                          Larang
                                        </button>
                                      </div>
                                    ))
                                : autocompleteDataZona?.map((zonaItem: any) => (
                                    <div
                                      key={zonaItem.ruangan_otmil_id}
                                      className={`gap-2 py-2 [word-wrap: break-word] flex flex-col h-fit cursor-default items-center justify-between rounded-[16px] border-4  ${
                                        zonaItem.nama_zona === 'Hijau'
                                          ? 'border-green-500'
                                          : zonaItem.nama_zona === 'Kuning'
                                            ? 'border-yellow-400'
                                            : zonaItem.nama_zona === 'Merah'
                                              ? 'border-red-500'
                                              : 'border-slate-500'
                                      } bg-slate-500 bg-[transparent] px-[12px] text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear  hover:!shadow-none dark:text-neutral-200`}
                                      data-te-ripple-color="dark"
                                    >
                                      <p className="text-xs text-white capitalize font-semibold">
                                        {' '}
                                        {zonaItem.nama_ruangan_otmil}
                                      </p>
                                      <button
                                        className="text-white w-full bg-green-500 border-white border-[1px] rounded-md font-bold text-[9px]"
                                        onClick={(e) => {
                                          e.preventDefault(); // Prevent page reload
                                          handleAddZona(
                                            zonaItem.ruangan_otmil_id,
                                            'akses_ruangan_otmil_id',
                                          );
                                        }}
                                      >
                                        Ijinkan
                                      </button>

                                      <button
                                        className="text-white w-full bg-red-500 border-white border-[1px] rounded-md font-bold text-[9px]"
                                        onClick={(e) => {
                                          e.preventDefault(); // Prevent page reload
                                          handleAddZona(
                                            zonaItem.ruangan_otmil_id,
                                            'zona_merah',
                                          );
                                        }}
                                      >
                                        Larang
                                      </button>
                                    </div>
                                  ))}
                            </div>
                            {/* Display errors */}
                            {/* {errors.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))} */}
                          </div>
                        </div>
                      </>
                    )}

                    {/*  Zona  */}
                    <div className=" grid grid-cols-2 gap-5 justify-normal pt-4">
                      <div className="w-full ">
                        <h3 className="text-md font-semibold mb-2">
                          Zona Hijau
                        </h3>

                        <div className="border-green-500 min-h-[10rem] flex gap-2 p-2 border flex-col rounded-lg items-stretch justify-start">
                          {isDetail
                            ? formState.akses_ruangan_otmil.map((item: any) => (
                                <div
                                  className=" w-full [word-wrap: break-word] flex  cursor-default items-center justify-between rounded-[16px] border border-green-400 bg-[#eceff1] bg-[transparent] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:border-green-500 hover:!shadow-none dark:text-neutral-200"
                                  data-te-ripple-color="dark"
                                >
                                  <p className="capitalize text-center">
                                    {item.nama_ruangan_otmil}
                                  </p>
                                </div>
                              ))
                            : formState.akses_ruangan_otmil_id?.map(
                                (zonaId: any) => (
                                  <div
                                    key={zonaId}
                                    className=" w-full [word-wrap: break-word] flex  cursor-default items-center justify-between rounded-[16px] border border-green-400 bg-[#eceff1] bg-[transparent] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:border-green-500 hover:!shadow-none dark:text-neutral-200"
                                    data-te-ripple-color="dark"
                                  >
                                    <p className="capitalize text-center">
                                      {
                                        zona.find(
                                          (zonaItem: any) =>
                                            zonaItem.ruangan_otmil_id ===
                                            zonaId,
                                        )?.nama_ruangan_otmil
                                      }
                                    </p>
                                    <span
                                      data-te-chip-close
                                      onClick={() =>
                                        handleRemoveZona(
                                          zonaId,
                                          'akses_ruangan_otmil_id',
                                        )
                                      }
                                      className="float-right w-4 cursor-pointer pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] transition-all duration-200 ease-in-out hover:text-[#8b8b8b] dark:text-neutral-400 dark:hover:text-neutral-100"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="h-3 w-3"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M6 18L18 6M6 6l12 12"
                                        />
                                      </svg>
                                    </span>
                                  </div>
                                  // <div
                                  //   key={zonaId}
                                  //   className="bg-white text-black px-2 py-1 rounded-md flex items-center space-x-1 hover:bg-red-200 h-6"
                                  // >
                                  //   <span className="text-sm">
                                  //     {zona.find((zonaItem) => zonaItem.id === zonaId)?.nama}
                                  //   </span>
                                  //   <button
                                  //     onClick={() => handleRemoveZona(zonaId, 'zona_merah')}
                                  //     className="text-red-600 hover:text-red-900 focus:outline-none p-1 hover:bg-red-200 rounded-md"
                                  //   >
                                  //     X
                                  //   </button>
                                  // </div>
                                ),
                              )}
                        </div>

                        {/* Display errors */}
                      </div>

                      {/* <div className="w-full ">
                    <h3 className="text-md font-semibold mb-2">Zona Kuning</h3>

                    <div className="border-yellow-500 min-h-[10rem] flex gap-2 p-2 border flex-col rounded-lg items-stretch justify-start">
                      {formState.zona_kuning?.map((zonaId: any) => (
                        <div
                          key={zonaId}
                          className=" w-full [word-wrap: break-word] flex cursor-default items-center justify-between rounded-[16px] border border-yellow-400 bg-[#eceff1] bg-[transparent] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:border-yellow-500 hover:!shadow-none dark:text-neutral-200"
                          data-te-ripple-color="dark"
                        >
                          <p className="capitalize">
                            {
                              zona.find(
                                (zonaItem: any) =>
                                  zonaItem.ruangan_otmil_id === zonaId
                              )?.nama_ruangan_otmil
                            }
                          </p>
                          <span
                            data-te-chip-close
                            onClick={() =>
                              handleRemoveZona(zonaId, 'zona_kuning')
                            }
                            className="float-right w-4 cursor-pointer pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] transition-all duration-200 ease-in-out hover:text-[#8b8b8b] dark:text-neutral-400 dark:hover:text-neutral-100"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="h-3 w-3"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </span>
                        </div>

                      ))}
                    </div>


                  </div> */}

                      <div className="w-full ">
                        <h3 className="text-md font-semibold mb-2">
                          Zona Merah
                        </h3>

                        {/* <div className="border-red-500 min-h-[10rem] flex gap-2 p-2 border flex-col rounded-lg items-stretch justify-start">
                          {formState.zona_merah?.map((zonaId: any) => (
                            <div
                              key={zonaId}
                              className="w-full [word-wrap: break-word] flex cursor-default items-center justify-between rounded-[16px] border border-red-400 bg-[#eceff1] bg-[transparent] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:border-red-500 hover:!shadow-none dark:text-neutral-200"
                              data-te-ripple-color="dark"
                            >
                              <p className="capitalize">
                                {
                                  zona.find(
                                    (zonaItem: any) =>
                                      zonaItem.ruangan_otmil_id === zonaId
                                  )?.nama_ruangan_otmil
                                }
                              </p>
                              <span
                                data-te-chip-close
                                onClick={() =>
                                  handleRemoveZona(zonaId, 'zona_merah')
                                }
                                className="float-right w-4 cursor-pointer pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] transition-all duration-200 ease-in-out hover:text-[#8b8b8b] dark:text-neutral-400 dark:hover:text-neutral-100"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="h-3 w-3"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </span>
                            </div>
                            // <div
                            //   key={zonaId}
                            //   className="bg-white text-black px-2 py-1 rounded-md flex items-center space-x-1 hover:bg-red-200 h-6"
                            // >
                            //   <span className="text-sm">
                            //     {zona.find((zonaItem) => zonaItem.id === zonaId)?.nama}
                            //   </span>
                            //   <button
                            //     onClick={() => handleRemoveZona(zonaId, 'zona_merah')}
                            //     className="text-red-600 hover:text-red-900 focus:outline-none p-1 hover:bg-red-200 rounded-md"
                            //   >
                            //     X
                            //   </button>
                            // </div>
                          ))}
                        </div> */}
                        <div className="border-red-500 min-h-[10rem] flex gap-2 p-2 border flex-col rounded-lg items-stretch justify-start">
                          {isDetail
                            ? formState.akses_ruangan_otmil.map((item: any) => (
                                <div
                                  className=" w-full [word-wrap: break-word] flex  cursor-default items-center justify-between rounded-[16px] border border-red-400 bg-[#eceff1] bg-[transparent] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:border-red-500 hover:!shadow-none dark:text-neutral-200"
                                  data-te-ripple-color="dark"
                                >
                                  <p className="capitalize text-center">
                                    {item.nama_ruangan_otmil}
                                  </p>
                                </div>
                              ))
                            : formState.zona_merah?.map((zonaId: any) => (
                                <div
                                  key={zonaId}
                                  className=" w-full [word-wrap: break-word] flex  cursor-default items-center justify-between rounded-[16px] border border-red-400 bg-[#eceff1] bg-[transparent] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:border-red-500 hover:!shadow-none dark:text-neutral-200"
                                  data-te-ripple-color="dark"
                                >
                                  <p className="capitalize text-center">
                                    {
                                      zona.find(
                                        (zonaItem: any) =>
                                          zonaItem.ruangan_otmil_id === zonaId,
                                      )?.nama_ruangan_otmil
                                    }
                                  </p>
                                  <span
                                    data-te-chip-close
                                    onClick={() =>
                                      handleRemoveZona(
                                        zonaId,
                                        'akses_ruangan_otmil_id',
                                      )
                                    }
                                    className="float-right w-4 cursor-pointer pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] transition-all duration-200 ease-in-out hover:text-[#8b8b8b] dark:text-neutral-400 dark:hover:text-neutral-100"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      className="h-3 w-3"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                      />
                                    </svg>
                                  </span>
                                </div>
                                // <div
                                //   key={zonaId}
                                //   className="bg-white text-black px-2 py-1 rounded-md flex items-center space-x-1 hover:bg-red-200 h-6"
                                // >
                                //   <span className="text-sm">
                                //     {zona.find((zonaItem) => zonaItem.id === zonaId)?.nama}
                                //   </span>
                                //   <button
                                //     onClick={() => handleRemoveZona(zonaId, 'zona_merah')}
                                //     className="text-red-600 hover:text-red-900 focus:outline-none p-1 hover:bg-red-200 rounded-md"
                                //   >
                                //     X
                                //   </button>
                                // </div>
                              ))}
                        </div>

                        {/* Display errors */}
                      </div>
                    </div>
                  </div>
                </div>

                {errors.filter((item: string) => item.startsWith('INVALID_ID'))
                  .length > 0 && (
                  <>
                    <br />
                    <div className="error">
                      {errors
                        .filter((item: string) =>
                          item.startsWith('INVALID_ID'),
                        )[0]
                        .replace('INVALID_ID_', '')}{' '}
                      is not a valid bond
                    </div>
                  </>
                )}
                {errors.length > 0 && (
                  <div className="error mt-4">
                    <p className="text-red-400">
                      Ada data yang masih belum terisi !
                    </p>
                  </div>
                )}
                {/* {errors.filter((item: string) => !item.startsWith('INVALID_ID'))
                  .length > 0 && (
                  <div className="error mt-4">
                    <span>Please input :</span>
                    <p className="text-red-400">
                      {errors
                        .filter(
                          (item: string) => !item.startsWith('INVALID_ID')
                        )
                        .join(', ')}
                    </p>
                  </div>
                )} */}
                <br></br>

                {isDetail ? null : isEdit ? (
                  <button
                    className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
                      buttonLoad ? 'bg-slate-400' : ''
                    }`}
                    type="submit"
                    disabled={buttonLoad}
                  >
                    {buttonLoad ? (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      ''
                    )}
                    Ubah Data Tersangka
                  </button>
                ) : (
                  <button
                    className={`items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 ${
                      buttonLoad ? 'bg-slate-400' : ''
                    }`}
                    type="submit"
                    disabled={buttonLoad}
                  >
                    {buttonLoad ? (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      ''
                    )}
                    Tambah Data Tersangka
                  </button>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
