import {React, useState} from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import DatePicker from 'react-datepicker';
import dayjs from "dayjs";

const AddSidang = () => {
     const navigate = useNavigate();

     const [pengacaraEror, setPengacaraEror] = useState(false);

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
      <div className="px-10">
        <div className="bg-slate-500 p-5 shadow-xl rounded-md">
            <form action="">
              <div className="grid grid-cols-1 gap-4 mt-5">
                <div className="grid grid-cols-2 gap-4 justify-normal">
                  <div className="form-group w-full">
                    <label 
                      className="block mb-1 text-base font-medium text-black dark:text-white"
                      htmlFor="id">
                        Nama Sidang
                    </label>
                    <select 
                      className="w-full rounded border border-stroke dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary p-nama"
                      name="" 
                      id=""
                    >
                      <option value="">
                        Pilih tahap sidang{" "}
                      </option>
                      <option value="Tahap Pertama">Tahap Pertama</option>
                      <option value="Tahap Pertama">Tahap Kedua</option>
                      <option value="Tahap Pertama">Tahap Ketiga</option>
                    </select>
                  </div>
                  <div className="">
                    <label 
                      className="block mb-1 text-base font-medium text-black dark:text-white"
                      htmlFor="id">
                        Pilih Jenis Sidang
                    </label>
                    <select 
                      className="w-full rounded border border-stroke dark:text-gray dark:bg-slate-800 py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary p-nama"
                      name="" 
                      id=""
                    >
                      <option value="">
                        Pilih jenis sidang{" "}
                      </option>
                    </select>
                  </div>
                </div>
                <div className="form-group w-full ">
                    <label
                      className="block mb-1 text-base font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Anggota Oditur Penuntut
                    </label>
                    <Select
                      className="basic-multi-select p-anggota"
                      isMulti
                      classNamePrefix="select"
                      // defaultValue={
                      //   isEdit || isDetail
                      //     ? formState?.oditurHolder?.map((item: any) => ({
                      //         value: item.oditur_penuntut_id,
                      //         label: item.nama_oditur,
                      //       }))
                      //     : ''
                      // }
                      placeholder={'Pilih oditur penuntut'}
                      isClearable={true}
                      isSearchable={true}
                      // isDisabled={isDetail}
                      name="oditur_penuntut_id"
                      styles={customStyles}
                      // options={jaksa?.map((item: any) => ({
                      //   value: item.oditur_penuntut_id,
                      //   label: item.nama_oditur,
                      // }))}
                      // onChange={handleSelectJaksa}
                    />
                    <p className="error-text">
                      {/* {errors.map((item) => */}
                        {/* item === '' ? 'Pilih jaksa' : '', */}
                      {/* )} */}
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4 justify-normal">
                <div className="form-group w-full ">
                      <label
                        className="block mb-1 text-base font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Ketua Oditur
                      </label>
                      <Select
                        className="basic-select p-ketua"
                        classNamePrefix="select"
                        // defaultValue={
                        //   isEdit || isDetail
                        //     ? {
                        //         value:
                        //           formState.role_ketua_oditur_holder
                        //             ?.oditur_penuntut_id,
                        //         label:
                        //           formState.role_ketua_oditur_holder
                        //             ?.nama_oditur,
                        //       }
                        //     : formState.oditur_penuntut_id
                        // }
                        placeholder={'Pilih ketua oditur'}
                        isClearable={true}
                        isSearchable={true}
                        // isDisabled={isDetail}
                        name="oditur_penuntut_id"
                        styles={customStyles}
                        // options={jaksa
                        //   .filter((item) =>
                        //     formState?.oditur_penuntut_id?.includes(
                        //       item.oditur_penuntut_id,
                        //     ),
                        //   )
                        //   .map((item: any) => ({
                        //     value: item.oditur_penuntut_id,
                        //     label: item.nama_oditur,
                        //   }))}
                        // onChange={handleSelectKetuaHakim}
                      />
                      <p className="error-text">
                        {/* {errors.map((item) =>
                          item === 'role_ketua_jaksa'
                            ? 'Pilih ketua oditur'
                            : '',
                        )} */}
                      </p>
                    </div>
                    <div className="form-group w-full ">
                      <label
                        className="block mb-1 text-base font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Kasus
                      </label>
                      <Select
                        className="basic-single p-kasus"
                        classNamePrefix="select"
                        // defaultValue={
                        //   isEdit || isDetail
                        //     ? {
                        //         value: formState.kasus_id,
                        //         label: formState.nama_kasus,
                        //       }
                        //     : formState.kasus_id
                        // }
                        placeholder={'Pilih kasus'}
                        isClearable={true}
                        isSearchable={true}
                        // isDisabled={isDetail}
                        name="kasus_id"
                        styles={customStyles}
                        // options={kasus.map((item: any) => ({
                        //   value: item.kasus_id,
                        //   label: item.nama_kasus,
                        // }))}
                        // onChange={handleKasus}
                      />
                      {/* <p className="error-text">
                        {errors.map((item) =>
                          item === 'kasus_id' ? 'Pilih kasus' : '',
                        )}
                      </p> */}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 justify-normal">
                <div className="form-group w-full ">
                      <label
                        className="block mb-1 text-base font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Nomor Kasus
                      </label>
                      <input
                        className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-2.5 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-nomor"
                        // onChange={handleChange}
                        placeholder="Nomor kasus"
                        name="nomor_kasus"
                        // value={formState?.nomor_kasus}
                        disabled
                      />
                      <p className="error-text">
                        {/* {errors.map((item) =>
                          item === 'role_ketua_jaksa'
                            ? 'Pilih ketua oditur'
                            : '',
                        )} */}
                      </p>
                    </div>
                    <div className="form-group w-full ">
                      <label
                        className="block mb-1 text-base font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Pengadilan Militer
                      </label>
                      <Select
                        className="basic-single p-kasus"
                        classNamePrefix="select"
                        // defaultValue={
                        //   isEdit || isDetail
                        //     ? {
                        //         value: formState.kasus_id,
                        //         label: formState.nama_kasus,
                        //       }
                        //     : formState.kasus_id
                        // }
                        placeholder={'Pilih pengadilan militer'}
                        isClearable={true}
                        isSearchable={true}
                        // isDisabled={isDetail}
                        name="kasus_id"
                        styles={customStyles}
                        // options={kasus.map((item: any) => ({
                        //   value: item.kasus_id,
                        //   label: item.nama_kasus,
                        // }))}
                        // onChange={handleKasus}
                      />
                      {/* <p className="error-text">
                        {errors.map((item) =>
                          item === 'kasus_id' ? 'Pilih kasus' : '',
                        )}
                      </p> */}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 justify-normal">
                  <div className="form-group w-full ">
                    <label
                      className="block mb-1 text-base font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Juru Sita
                    </label>
                    <input
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-2.5 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-nomor"
                      // onChange={handleChange}
                      placeholder="Juru sita"
                      name="juru_sita"
                       // value={formState?.juru_sita}
                      disabled
                    />
                    <p className="error-text">
                      {/* {errors.map((item) =>
                        item === 'juru_sita'
                          ? 'Pilih juru sita'
                          : '',
                      )} */}
                    </p>
                  </div>
                  <div className="form-group w-full ">
                    <label
                      className="block mb-1 text-base font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Pengawas Peradilan Militer
                    </label>
                    <input
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-2.5 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-nomor"
                      // onChange={handleChange}
                      placeholder="Pengawas peradilan militer"
                      name="pengawas_peradilan_militer"
                       // value={formState?.pengawas_peradilan_militer}
                      disabled
                    />
                    <p className="error-text">
                      {/* {errors.map((item) =>
                        item === 'pengawas_peradilan_militer'
                          ? 'Pilih juru sita'
                          : '',
                      )} */}
                    </p>
                  </div>
                </div>
                <div className="form-group w-full ">
                    <label
                      className="block mb-1 text-base font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Agenda Sidang
                    </label>
                    <input
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-2.5 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-agenda"
                      // onChange={handleChange}
                      placeholder="Agenda sidang"
                      name="agenda_sidang"
                      // value={formState.agenda_sidang}
                      // disabled={isDetail}
                    />
                    <p className="error-text">
                      {/* {errors.map((item) =>
                        item === 'agenda_sidang' ? 'Masukan agenda sidang' : '',
                      )} */}
                    </p>
                </div>
                <div className="form-group w-full ">
                    <label
                      className="block mb-1 text-base font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Hasil Keputusan Sidang
                    </label>
                    <input
                      className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-2.5 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary input-agenda"
                      // onChange={handleChange}
                      placeholder="Hasil keputusan sidang"
                      name="hasil_keputusan_sidang"
                      // value={formState.hasil_keputusan_sidang}
                      // disabled={isDetail}
                    />
                    <p className="error-text">
                      {/* {errors.map((item) =>
                        item === 'hasil_keputusan_sidang' ? 'Masukan agenda sidang' : '',
                      )} */}
                    </p>
                </div>
                {/* jadwal sidang */}
                <div className="grid grid-cols-4 gap-4 justify-normal">
                  <div className="form-group w-full ">
                    <label 
                      htmlFor="id"
                      className="block mb-1 text-base font-medium text-black dark:text-white"
                      >
                        Jadwal Sidang
                      </label>
                      <div className="flex flex-row">
                        <DatePicker
                          // selected={
                          //   formState.jadwal_sidang
                          //     ? dayjs(formState.jadwal_sidang).toDate()
                          //     : dayjs().toDate()
                          // }
                          // onChange={handleJadwalSidang}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeCaption="Pilih Waktu"
                          dateFormat="dd/MM/yyyy HH:mm"
                          // customInput={<ExampleCustomTimeInput />}
                          className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-mulai"
                          name="jadwal_sidang"
                          disabled={false}
                          locale="id"
                        />
                        <input
                          type="text"
                          className="w-1/4 rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary text-center"
                          name="zona_waktu"
                          // value={formState.zona_waktu}
                          disabled
                        />
                        <p className="error-text">
                        {/* {errors.map((item) =>
                          item === 'jadwal_sidang'
                            ? 'Masukan jadwal sidang'
                            : '',
                        )} */}
                      </p>
                      </div>
                  </div>
                  {/* perubahan jadwal sidang */}
                  <div className="form-group w-full ">
                    <label 
                      htmlFor="id"
                      className="block mb-1 text-base font-medium text-black dark:text-white"
                      >
                        Perubahan Jadwal Sidang
                      </label>
                      <div className="flex flex-row">
                        <DatePicker
                          // selected={
                          //   formState.perubahan_jadwal_sidang
                          //     ? dayjs(formState.perubahan_jadwal_sidang).toDate()
                          //     : dayjs().toDate()
                          // }
                          // onChange={handleJadwalSidang}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeCaption="Pilih Waktu"
                          dateFormat="dd/MM/yyyy HH:mm"
                          // customInput={<ExampleCustomTimeInput />}
                          className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-mulai"
                          name="perubahan_jadwal_sidang"
                          disabled={false}
                          locale="id"
                        />
                        <input
                          type="text"
                          className="w-1/4 rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary text-center"
                          name="zona_waktu"
                          // value={formState.zona_waktu}
                          disabled
                        />
                        <p className="error-text">
                        {/* {errors.map((item) =>
                          item === 'jadwal_sidang'
                            ? 'Masukan jadwal sidang'
                            : '',
                        )} */}
                      </p>
                      </div>
                  </div>
                  {/* Waktu Mulai */}
                  <div className="form-group w-full ">
                    <label 
                      htmlFor="id"
                      className="block mb-1 text-base font-medium text-black dark:text-white"
                      >
                        Waktu Mulai
                      </label>
                      <div className="flex flex-row">
                        <DatePicker
                          // selected={
                          //   formState.waktu_mulai
                          //     ? dayjs(formState.waktu_mulai).toDate()
                          //     : dayjs().toDate()
                          // }
                          // onChange={handleJadwalSidang}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeCaption="Pilih Waktu"
                          dateFormat="dd/MM/yyyy HH:mm"
                          // customInput={<ExampleCustomTimeInput />}
                          className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-mulai"
                          name="waktu_mulai"
                          disabled={false}
                          locale="id"
                        />
                        <input
                          type="text"
                          className="w-1/4 rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary text-center"
                          name="zona_waktu"
                          // value={formState.zona_waktu}
                          disabled
                        />
                        <p className="error-text">
                        {/* {errors.map((item) =>
                          item === 'waktu_mulai'
                            ? 'Masukan jadwal sidang'
                            : '',
                        )} */}
                      </p>
                      </div>
                  </div>
                  {/* waktu selesai */}
                  <div className="form-group w-full ">
                    <label 
                      htmlFor="id"
                      className="block mb-1 text-base font-medium text-black dark:text-white"
                      >
                        Waktu Selesai
                      </label>
                      <div className="flex flex-row">
                        <DatePicker
                          // selected={
                          //   formState.waktu_selesai
                          //     ? dayjs(formState.waktu_selesai).toDate()
                          //     : dayjs().toDate()
                          // }
                          // onChange={handleJadwalSidang}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeCaption="Pilih Waktu"
                          dateFormat="dd/MM/yyyy HH:mm"
                          // customInput={<ExampleCustomTimeInput />}
                          className="w-full rounded border border-stroke py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary i-mulai"
                          name="waktu_selesai"
                          disabled={false}
                          locale="id"
                        />
                        <input
                          type="text"
                          className="w-1/4 rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-[9.5px] pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary text-center"
                          name="zona_waktu"
                          // value={formState.zona_waktu}
                          disabled
                        />
                        <p className="error-text">
                        {/* {errors.map((item) =>
                          item === 'waktu_selesai'
                            ? 'Masukan jadwal sidang'
                            : '',
                        )} */}
                      </p>
                      </div>
                  </div>
                    
                </div>
                <div className="grid grid-cols-2 gap-4 justify-normal">
                <div className="form-group w-full ">
                      <label
                        className="block mb-1 text-base font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Ahli
                      </label>
                      <Select
                        className="basic-select p-ketua"
                        classNamePrefix="select"
                        // defaultValue={
                        //   isEdit || isDetail
                        //     ? {
                        //         value:
                        //           formState.role_ketua_oditur_holder
                        //             ?.oditur_penuntut_id,
                        //         label:
                        //           formState.role_ketua_oditur_holder
                        //             ?.nama_oditur,
                        //       }
                        //     : formState.oditur_penuntut_id
                        // }
                        placeholder={'Pilih ahli'}
                        isClearable={true}
                        isSearchable={true}
                        // isDisabled={isDetail}
                        name="ahli_id"
                        styles={customStyles}
                        // options={jaksa
                        //   .filter((item) =>
                        //     formState?.oditur_penuntut_id?.includes(
                        //       item.oditur_penuntut_id,
                        //     ),
                        //   )
                        //   .map((item: any) => ({
                        //     value: item.oditur_penuntut_id,
                        //     label: item.nama_oditur,
                        //   }))}
                        // onChange={handleSelectKetuaHakim}
                      />
                      <p className="error-text">
                        {/* {errors.map((item) =>
                          item === 'role_ketua_jaksa'
                            ? 'Pilih ketua oditur'
                            : '',
                        )} */}
                      </p>
                    </div>
                    <div className="form-group w-full ">
                      <label
                        className="block mb-1 text-base font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Saksi
                      </label>
                      <Select
                        className="basic-single p-kasus"
                        classNamePrefix="select"
                        // defaultValue={
                        //   isEdit || isDetail
                        //     ? {
                        //         value: formState.saksi_id,
                        //         label: formState.nama_saksi,
                        //       }
                        //     : formState.saksi_id
                        // }
                        placeholder={'Pilih saksi'}
                        isClearable={true}
                        isSearchable={true}
                        // isDisabled={isDetail}
                        name="saksi_id"
                        styles={customStyles}
                        // options={kasus.map((item: any) => ({
                        //   value: item.saksi_id,
                        //   label: item.nama_saksi,
                        // }))}
                        // onChange={handleKasus}
                      />
                      {/* <p className="error-text">
                        {errors.map((item) =>
                          item === 'saksi_id' ? 'Pilih kasus' : '',
                        )}
                      </p> */}
                    </div>
                </div>
                <div className="">
                  {/* <div className="flex -items-center block mb-1 text-base font-medium text-black dark:text-white">
                    Pengacara
                  </div> */}
                  <div className="flex items-center">
                      <p className="block mb-1 text-base font-medium text-black dark:text-white">Pengacara</p>
                      <p
                        // className={`${
                        //   pengacaraEror ? 'block' : 'hidden'
                        // } ml-4 text-red-400 text-sm`}
                      >
                        {/* Masukan nama pengacara */}
                      </p>
                    </div>
                    <div className="border-[1px] border-blue-500 rounded-md p-2">
                      <div className="flex flex-row gap-2">
                          <input 
                            type="text"
                            placeholder="Masukan Pengacara"
                            className="w-full rounded border border-stroke  dark:bg-slate-800 py-3 pl-3 pr-4.5 text-white focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                            />
                            <button
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
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 justify-normal">
                  <div className="form-group w-full">
                    <label className="block mb-1 text-base font-medium text-black dark:text-white">Vonis</label>
                      <div className="grid grid-cols-3 gap-4 border px-2 py-2 rounded-lg border-blue-500 i-vonis">
                      <div className="form-group w-full ">
                        <input
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                          // onChange={handleChange}
                          placeholder="Tahun"
                          name="masa_tahanan_tahun"
                          // value={formState.masa_tahanan_tahun}
                          // disabled={isDetail}
                        />
                        <p className="error-text">
                          {/* {errors.map((item) =>
                            item === 'masa_tahanan_tahun'
                              ? 'Masukan vonis tahun'
                              : '',
                          )} */}
                        </p>
                      </div>
                      <div className="form-group w-full ">
                        <input
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                          // onChange={handleChange}
                          placeholder="Bulan"
                          name="masa_tahanan_bulan"
                          // value={formState.masa_tahanan_bulan}
                          // disabled={isDetail}
                        />
                        <p className="error-text">
                          {/* {errors.map((item) =>
                            item === 'masa_tahanan_bulan'
                              ? 'Masukan vonis tahun'
                              : '',
                          )} */}
                        </p>
                      </div>
                      <div className="form-group w-full ">
                        <input
                          className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                          // onChange={handleChange}
                          placeholder="Hari"
                          name="masa_tahanan_hari"
                          // value={formState.masa_tahanan_hari}
                          // disabled={isDetail}
                        />
                        <p className="error-text">
                          {/* {errors.map((item) =>
                            item === 'masa_tahanan_hari'
                              ? 'Masukan vonis tahun'
                              : '',
                          )} */}
                        </p>
                      </div>
                      </div>
                  </div>
                  <div className="form-group w-full">
                    <label 
                      className="block mb-1 text-base font-medium text-black dark:text-white"
                      htmlFor="id"
                    >
                      Nama Dokumen
                    </label>
                    <input 
                    type="text"
                    className="w-full rounded border border-stroke  dark:text-gray dark:bg-slate-800 py-3 pl-2.5 pr-4.5 mt-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 justify-normal">
                  {/* dokumen */}
                  <div className="relative  block w-full appearance-none overflow-hidden rounded border border-blue-500 bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5">
                    <input 
                      type="file" 
                      id="fileUpload"
                      accept=".pdf, .doc, .docx"
                      className="hidden"
                      />
                      <div className="flex flex-col items-center justify-center space-y-3 p-unggah">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              className="text-blue-500"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                fill="currentColor"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                fill="currentColor"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                fill="currentColor"
                              />
                            </svg>
                          </span>
                          <label
                            htmlFor="fileUpload"
                            className="cursor-pointer"
                          >
                            <span className="text-blue-500 underline">
                              Klik untuk unggah
                            </span>
                          </label>
                          <p className="mt-1.5">Pdf,doc dan docx </p>
                        </div>
                  </div>
                  {/* hasil vonis */}
                  <div className="">
                      <label
                        className="block mb-1 text-base font-medium text-black dark:text-white"
                        htmlFor="id"
                      >
                        Hasil vonis
                      </label>
                      <textarea
                        className="w-full max-h-[149px] min-h-[149px] rounded border border-stroke  py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary t-hasil"
                        name="hasil_vonis"
                        placeholder="Hasil vonis"
                        // onChange={handleChange}
                        // value={formState.hasil_vonis}
                        // disabled={isDetail}
                      />
                      <p className="error-text">
                        {/* {errors.map((item) =>
                          item === 'hasil_vonis' ? 'Masukan hasil vonis' : '',
                        )} */}
                      </p>
                    </div>
                </div>
                <button
                className="items-center btn flex w-full justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                >
                  Tambah Data Sidang
                  </button>
              </div>
            </form>
        </div>
      </div>
     )
}

export default AddSidang;