import React, { useState } from 'react';
import Select from 'react-select';
import { CustomStyles } from './CustomStyle';

const WbpInsert = () => {
  interface type {
    [key: string]: any;
  }
  const [errors, setErrors] = useState<string[]>([]);
  const [formState, setFormState] = useState<type>({
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
    nama_status_wbp_kasus: '',
    jenis_perkara_id: '',
    vonis_tahun_perkara: '',
    vonis_bulan_perkara: '',
    vonis_hari_perkara: '',
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
    // lokasi_otmil_id: dataAdmin.lokasi_otmil_id,
    is_deleted: '0',
    status_wbp_kasus_id: '',
    tanggal_penetapan_tersangka: '',
    tanggal_penetapan_terdakwa: '',
    tanggal_penetapan_terpidana: '',
    zat_adiktif: '',
    jenis_olahraga: '',
  });

  const handleChange = (e: any) => {
    if (e.target.name === 'gelang_id') {
      // const selectedGelang = gelang.find(
      //   (item: any) => item.gelang_id === e.target.value,
      // );
      // setFormState({
      //   ...formState,
      //   gelang_id: e.target.value,
      //   DMAC: selectedGelang ? selectedGelang.dmac : '',
      // });
    } else if (e.target.name === 'is_sick') {
      const newWbpSickness =
        e.target.value === '0' ? '' : formState.wbp_sickness;
      setFormState({
        ...formState,
        is_sick: e.target.value,
        wbp_sickness: newWbpSickness,
      });
    } else {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        setFormState({ ...formState, foto_wajah: reader.result });
      };
      reader.readAsDataURL(file);
    }
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
  return (
    <div className="bg-slate-600 w-full h-full p-6">
      <div className="form group w-full h-[360px]">
        <div className="mb-4">
          <p className="text-center bg-slate-500 font-bold text-white rounded-md">
            Data Tersangka
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Foto Wajah */}
          <div className="mt-1 flex flex-col items-center h-65">
            {formState.foto_wajah ? (
              <img
                className="object-contain w-[300px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                src={formState.foto_wajah}
                alt="Image Preview"
              />
            ) : (
              <img
                className="w-[300px] h-[300px] mb-2 border-2 border-gray-200 border-dashed rounded-md"
                src="https://via.placeholder.com/300x300"
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
                <div className="f-unggah-gambar cursor-pointer bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-4 rounded">
                  Unggah Gambar
                </div>
              </label>

              <button
                onClick={handleRemoveFoto}
                className="t-remove-gambar cursor-pointer bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-2 rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
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

          <div className="flex flex-col gap-4">
            {/* Nama */}
            <div className="f-nama form-group w-full flex flex-col">
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
                // onChange={handleChange}
                // value={formState.nama}
              />
              <p className="error-text">
                {errors.map((item) => (item === 'nama' ? 'Masukan nama' : ''))}
              </p>
            </div>

            {/* Pangkat */}
            <div className="f-pangkat form-group w-full flex flex-col">
              <label
                className="  block text-sm font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Pangkat
              </label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                styles={CustomStyles}
                isClearable={true}
                isSearchable={true}
                placeholder="Pilih Pangkat"
                name="pangkat_id"
                // options={pangkat.map((item: any) => ({
                //   value: item.pangkat_id,
                //   label: item.nama_pangkat,
                // }))}
                // onChange={handleSelectPangkat}
              />
              <p className="error-text">
                {errors.map((item) =>
                  item === 'pangkat_id' ? 'Pilih pangkat' : '',
                )}
              </p>
            </div>

            {/* Matra */}
            <div className="f-pangkat form-group w-full flex flex-col">
              <label
                className="  block text-sm font-medium text-black dark:text-white"
                htmlFor="id"
              >
                Matra
              </label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                styles={CustomStyles}
                isClearable={true}
                isSearchable={true}
                placeholder="Pilih Matra"
                name="pangkat_id"
                // options={pangkat.map((item: any) => ({
                //   value: item.pangkat_id,
                //   label: item.nama_pangkat,
                // }))}
                // onChange={handleSelectPangkat}
              />
              <p className="error-text">
                {errors.map((item) =>
                  item === 'maatra_id' ? 'Pilih matra' : '',
                )}
              </p>
            </div>

            {/* NRP  */}
            <div className="f-nrp form-group w-full flex flex-col">
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
                // onChange={handleChange}
                value={formState.nrp}
              />
              <p className="error-text">
                {errors.map((item) =>
                  item === 'nrp' ? 'Masukan nomor registrasi' : '',
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        {/* Pendidikan*/}
        <div className="f-pendidikan form-group w-full flex flex-col ">
          <label
            className="  block text-sm font-medium text-black dark:text-white"
            htmlFor="id"
          >
            Pendidikan Militer
          </label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            styles={CustomStyles}
            name="pendidikan_id"
            isClearable={true}
            isSearchable={true}
            placeholder="Pilih Pendidikan"

            // options={pendidikan.map((item) => ({
            //   value: item.pendidikan_id,
            //   label: item.nama_pendidikan,
            // }))}
            // onChange={handleSelectPendidikan}
          />
          <p className="error-text">
            {errors.map((item) =>
              item === 'pendidikan_id' ? 'Pilih pendidikan' : '',
            )}
          </p>
        </div>

        {/* Kesatuan */}
        <div className="f-kesatuan form-group w-full flex flex-col">
          <label
            className="  block text-sm font-medium text-black dark:text-white"
            htmlFor="id"
          >
            Kesatuan
          </label>

          <Select
            className="basic-single"
            classNamePrefix="select"
            styles={CustomStyles}
            name="kesatuan_id"
            isClearable={true}
            isSearchable={true}
            placeholder="Pilih Kesatuan"
            // options={kesatuan.map((item: any) => ({
            //   value: item.kesatuan_id,
            //   label: item.nama_kesatuan,
            // }))}
            // onChange={handleSelectKesatuan}
          />
          <p className="error-text">
            {errors.map((item) =>
              item === 'kesatuan_id' ? 'Pilih kesatuan' : '',
            )}
          </p>
        </div>

        {/* Jenis Kelamin */}
        <div className="f-kelamin form-group w-full flex flex-col">
          <label
            className=" block text-sm font-medium text-black dark:text-white"
            htmlFor="id"
          >
            Jenis Kelamin
          </label>
          <select
            className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
            name="jenis_kelamin"
            // onChange={handleChange}
            value={formState.jenis_kelamin}
          >
            <option disabled value="">
              Pilih Jenis Kelamin
            </option>
            <option value="1">Laki-laki</option>
            <option value="0">Perempuan</option>
          </select>
          <p className="error-text">
            {errors.map((item) =>
              item === 'jenis_kelamin' ? 'Pilih jenis kelamin' : '',
            )}
          </p>
        </div>

        {/* Agama */}
        <div className="f-agama form-group w-full flex flex-col">
          <label
            className="  block text-sm font-medium text-black dark:text-white"
            htmlFor="id"
          >
            Agama
          </label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            styles={CustomStyles}
            name="agama_id"
            isClearable={true}
            isSearchable={true}
            placeholder="Pilih Agama"
            // options={agama.map((item: any) => ({
            //   value: item.agama_id,
            //   label: item.nama_agama,
            // }))}
            // onChange={handleSelectAgama}
          />
          <p className="error-text">
            {errors.map((item) => (item === 'agama_id' ? 'Pilih agama' : ''))}
          </p>
        </div>

        {/* Tempat Lahir */}
        <div className="f-tempat-lahir form-group w-full flex flex-col">
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
            // onChange={handleChange}
            value={formState.tempat_lahir}
          />
          <p className="error-text">
            {errors.map((item) =>
              item === 'tempat_lahir' ? 'Masukan tempat_lahir' : '',
            )}
          </p>
        </div>

        {/* Tanggal Lahir */}
        <div className="f-tanggal-lahir form-group w-full flex flex-col">
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
            // onChange={handleChange}
            value={formState.tanggal_lahir}
          />
          <p className="error-text">
            {errors.map((item) =>
              item === 'tanggal_lahir' ? 'Masukan tanggal lahir' : '',
            )}
          </p>
        </div>

        {/* Provinsi */}
        <div className="f-provinsi form-group w-full flex flex-col">
          <label
            className="  block text-sm font-medium text-black dark:text-white"
            htmlFor="id"
          >
            Provinsi
          </label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            placeholder={'Pilih provinsi'}
            isClearable={true}
            isSearchable={true}
            name="provinsi_id"
            styles={CustomStyles}
            // options={provinsi.map((item: any) => ({
            //   value: item.provinsi_id,
            //   label: item.nama_provinsi,
            // }))}
            // onChange={handleSelectProvinsi}
          />
          <p className="error-text">
            {errors.map((item) =>
              item === 'provinsi_id' ? 'Pilih provinsi' : '',
            )}
          </p>
        </div>

        {/* Kota */}
        <div className="f-kota form-group w-full flex flex-col">
          <label
            className="  block text-sm font-medium text-black dark:text-white"
            htmlFor="id"
          >
            Kota
          </label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            placeholder={'Pilih kota'}
            isClearable={true}
            isSearchable={true}
            name="kota_id"
            styles={CustomStyles}
            // options={kota
            //   .filter((item: any) => {
            //     return item.provinsi_id === formState.provinsi_id;
            //   })
            //   .map((item) => ({
            //     value: item.kota_id,
            //     label: item.nama_kota,
            //   }))}
            // onChange={handleSelectKota}
          />
          <p className="error-text">
            {errors.map((item) => (item === 'kota_id' ? 'Pilih Kota' : ''))}
          </p>
        </div>
      </div>

      {/* Alamat */}
      <div className="f-alamat form-group w-full flex flex-col mt-3">
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
          // onChange={handleChange}
        />
        <p className="error-text">
          {errors.map((item) => (item === 'alamat' ? 'Masukan alamat' : ''))}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* Status Kawin */}
        <div className="f-status-kawin form-group w-full flex flex-col">
          <label
            className="  block text-sm font-medium text-black dark:text-white"
            htmlFor="id"
          >
            Status Kawin
          </label>

          <Select
            className="basic-single"
            classNamePrefix="select"
            styles={CustomStyles}
            name="status_kawin_id"
            isClearable={true}
            isSearchable={true}
            placeholder="Pilih Status Kawin"
            // options={statusKawin.map((item) => ({
            //   value: item.status_kawin_id,
            //   label: item.nama_status_kawin,
            // }))}
            // onChange={handleSelectStatusKawin}
          />
          <p className="error-text">
            {errors.map((item) =>
              item === 'status_kawin_id' ? 'Pilih status nikah' : '',
            )}
          </p>
        </div>

        {/* Kontak Keluarga Nama */}
        <div className="f-nama-keluarga form-group w-full flex flex-col">
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
            // onChange={handleChange}
            value={formState.nama_kontak_keluarga}
          />
          <p className="error-text">
            {errors.map((item) =>
              item === 'nama_kontak_keluarga' ? 'Masukan nama keluarga' : '',
            )}
          </p>
        </div>

        {/* Status Keluarga */}
        <div className="f-status-keluarga form-group w-full flex flex-col">
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
            // onChange={handleChange}
            value={formState.hubungan_kontak_keluarga}
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
        <div className="f-kontak-keluarga form-group w-full flex flex-col">
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
            // onChange={handleChange}
          />
          <p className="error-text">
            {errors.map((item) =>
              item === 'nomor_kontak_keluarga' ? 'Masukan kontak keluarga' : '',
            )}
          </p>
        </div>

        {/* Keahlian */}
        <div className="f-keahlian form-group w-full ">
          <label
            className="  block text-sm font-medium text-black dark:text-white"
            htmlFor="id"
          >
            Keahlian
          </label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            styles={CustomStyles}
            name="bidang_keahlian_id"
            isClearable={true}
            isSearchable={true}
            placeholder="Pilih Keahlian"
            // options={keahlian.map((item: any) => ({
            //   value: item.bidang_keahlian_id,
            //   label: item.nama_bidang_keahlian,
            // }))}
            // onChange={handleSelectBidangKeahlian}
          />
          <p className="error-text">
            {errors.map((item) =>
              item === 'bidang_keahlian_id' ? 'Pilih keahlian' : '',
            )}
          </p>
        </div>
      </div>

      <div className="mb-4 mt-4">
        <p className="text-center bg-slate-500 font-bold text-white rounded-md">
          Data Perkara
        </p>
      </div>

      <div className="mt-4">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4">
            {/* jenis perkara */}
            <div className="f-alamat form-group w-full flex flex-col">
              <label
                htmlFor="id"
                className="block text-sm font-medium text-black dark:text-white"
              >
                Jenis Perkara
              </label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                styles={CustomStyles}
                name="jenis_perkara_id"
                isClearable={true}
                isSearchable={true}
                placeholder="Pilih Jenis Perkara"
                // options={jenisPerkara.map((item: any) => ({
                //   value: item.jenis_perkara_id,
                //   label: item.nama_jenis_perkara,
                // }))}
                // onChange={handleSelectJenisPerkara}
              />
              <p className="error-text">
                {errors.map((item) =>
                  item === 'jenis_perkara_id' ? 'Pilih jenis perkara' : '',
                )}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="">
                <label
                  htmlFor="id"
                  className="block text-sm font-medium text-black dark:text-white"
                >
                  Vonis Tahun
                </label>
                <input
                  type="text"
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                  name="vonis_tahun_perkara"
                  // onChange={handleChange}
                  value={formState.vonis_tahun_perkara}
                  disabled
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'vonis_tahun_perkara'
                      ? 'Masukan tanggal masa penahanan'
                      : '',
                  )}
                </p>
              </div>
              <div className="form-group w-full">
                <label
                  htmlFor="id"
                  className="block text-sm font-medium text-black dark:text-white"
                >
                  Vonis Bulan
                </label>
                <input
                  type="text"
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                  name="vonis_bulan_perkara"
                  // onChange={handleChange}
                  value={formState.vonis_bulan_perkara}
                  disabled
                />
              </div>
              <div className="form-group w-full">
                <label
                  htmlFor="id"
                  className="block text-sm font-medium text-black dark:text-white"
                >
                  Vonis Hari
                </label>
                <input
                  type="text"
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[11.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                  name="vonis_hari_perkara"
                  // onChange={handleChange}
                  value={formState.vonis_hari_perkara}
                  disabled
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Tanggal diTahan */}
              <div className="f-tanggal-ditahan form-group w-full ">
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
                  // onChange={handleChange}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'tanggal_ditahan_otmil'
                      ? 'Masukan tanggal ditahan'
                      : '',
                  )}
                </p>
              </div>

              {/* Gelang */}
              {/* <div className="f-gelang form-group w-full ">
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
                            (wbp: any) => wbp.gelang_id === item.gelang_id,
                          );
                          return (
                            <option value={item.gelang_id} key={item.gelang_id}>
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
                                  (wbp: any) => wbp.gelang_id || wbp.gelang_id,
                                )
                                .includes(item.gelang_id),
                          )
                          .map((item: any) => (
                            <option value={item.gelang_id}>
                              {item.nama_gelang}
                            </option>
                          ))}
                </select>
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'gelang_id' ? 'Pilih gelang' : '',
                  )}
                </p>
              </div> */}

              {/* DMAC Gelang */}
              <div className="f-dmac-gelang form-group w-full ">
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
                  // onChange={handleChange}
                  // value={formState.DMAC}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'DMAC' ? 'Pilih gelang dulu' : '',
                  )}
                </p>
              </div>

              {/* Residivis */}
              <div className="f-residivis form-group w-full ">
                <label
                  className="  block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Residivis
                </label>

                <select
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                  name="residivis"
                  // onChange={handleChange}
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
              <div className="f-hunian-tahanan form-group w-full ">
                <label
                  className="  block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Hunian Tahanan
                </label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  styles={CustomStyles}
                  name="hunian_wbp_otmil_id"
                  isClearable={true}
                  isSearchable={true}
                  placeholder="Pilih Hunian Tahanan"
                  // options={hunian.map((item: any) => ({
                  //   value: item.hunian_wbp_otmil_id,
                  //   label: item.nama_hunian_wbp_otmil,
                  // }))}
                  // onChange={handleSelectHunianTahanan}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'hunian_wbp_otmil_id' ? 'Pilih hunian' : '',
                  )}
                </p>
              </div>

              {/* Nomor Tahanan*/}
              <div className="f-nomor-tahanan form-group w-full ">
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
                  // onChange={handleChange}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'nomor_tahanan' ? 'Masukan nomor tahanan' : '',
                  )}
                </p>
              </div>

              {/* Terisolasi */}
              <div className="f-status-terisolasi form-group w-full ">
                <label
                  className="  block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Terisolasi (?)
                </label>
                <select
                  className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                  name="is_isolated"
                  // onChange={handleChange}
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
              <div className="f-status-tersangka form-group w-full ">
                <label
                  className="  block text-sm font-medium text-black dark:text-white"
                  htmlFor="id"
                >
                  Status Tersangka
                </label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  styles={CustomStyles}
                  name="status_wbp_kasus_id"
                  isDisabled={true}
                  isClearable={true}
                  isSearchable={true}
                  placeholder="Pilih Status"
                  // options={statusWbp.map((item: any) => ({
                  //   value: item.status_wbp_kasus_id,
                  //   label: item.nama_status_wbp_kasus,
                  // }))}
                  // onChange={handleSelectWbpStatus}
                />
                <p className="error-text">
                  {errors.map((item) =>
                    item === 'status_wbp_kasus_id' ? 'Pilih status' : '',
                  )}
                </p>
              </div>

              {formState.status_wbp_kasus_id === '' ||
              formState.status_wbp_kasus_id === null ? null : (
                <>
                  {/* Tanggal Penetapan Terpidana*/}
                  <div
                    className={`f-tanggal-terpidana form-group w-full  ${formState.status_wbp_kasus_id === '55ae39b7-dbad-4c89-8968-6d1e2450c963' ? 'block' : 'hidden'}`}
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
                      // onChange={handleChange}
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
                    className={`f-tanggal-terdakwa form-group w-full  ${formState.status_wbp_kasus_id === 'ca91a6a8-4a1e-4bb3-a6bf-7a2e708a2064' ? 'block' : 'hidden'}`}
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
                      // onChange={handleChange}
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
                    className={`f-tanggal-tersangka form-group w-full  ${formState.status_wbp_kasus_id === 'e9e467a1-9132-4787-8938-7517da9ba964' ? 'block' : 'hidden'}`}
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
                      // onChange={handleChange}
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
              <div className="f-tanggal-masa-penahanan form-group w-full ">
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
                  // onChange={handleChange}
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

        <div className="mt-4">
          <p className="mt-10 mb-3 text-center bg-slate-500 font-bold text-white rounded-md">
            Data Kesehatan
          </p>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Penyakit */}
                <div className="f-penyakit form-group w-full ">
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
                    <div className="f-nama-penyakit form-group w-full flex flex-col">
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
        </div>

        <div className="mt-4">
          <p className="mt-10 mb-3 text-center bg-slate-500 font-bold text-white rounded-md">
            Data Perilaku
          </p>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Jenis Olahraga */}
                <div className="f-jenis-olahraga form-group w-full flex flex-col">
                  <label
                    className=" block text-sm font-medium text-black dark:text-white"
                    htmlFor="id"
                  >
                    Jenis Olahraga
                  </label>
                  <select
                    className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                    name="jenis_olahraga"
                    // onChange={handleChange}
                    // value={formState.jenis_olahraga}
                    // disabled={isDetail}
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
                      item === 'jenis_olahraga' ? 'Pilih jenis olahraga' : '',
                    )}
                  </p>
                </div>

                {/* Konsumsi Zat Adiktif */}
                <div className="f-zat-adiktif form-group w-full flex flex-col">
                  <label
                    className=" block text-sm font-medium text-black dark:text-white"
                    htmlFor="id"
                  >
                    Jenis Zat Adiktif
                  </label>
                  <select
                    className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                    name="zat_adiktif"
                    // onChange={handleChange}
                    // value={formState.zat_adiktif}
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
                      item === 'zat_adiktif' ? 'Pilih jenis zat adiktif' : '',
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WbpInsert;
