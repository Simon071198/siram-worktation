import React, { useState } from 'react';

export const RiwayatPerkara = () => {

    const dataDummy = [
        { tanggal: "Rabu, 13 Mar. 2024", tahapan: "Pendaftaran", proses: "Pendaftaran Perkara" },
        { tanggal: "Kamis, 14 Mar. 2024", tahapan: "Pemeriksaan", proses: "Pemeriksaan Saksi" },
        { tanggal: "Jumat, 15 Mar. 2024", tahapan: "Sidang", proses: "Sidang Pembacaan Putusan" },
        { tanggal: "Sabtu, 16 Mar. 2024", tahapan: "Eksekusi", proses: "Eksekusi Putusan" },
        { tanggal: "Minggu, 17 Mar. 2024", tahapan: "Penyelesaian", proses: "Penyelesaian Perkara" },
        { tanggal: "Senin, 18 Mar. 2024", tahapan: "Pendaftaran", proses: "Pendaftaran Perkara" },
        { tanggal: "Selasa, 19 Mar. 2024", tahapan: "Pemeriksaan", proses: "Pemeriksaan Saksi" },
        { tanggal: "Rabu, 20 Mar. 2024", tahapan: "Sidang", proses: "Sidang Pembacaan Putusan" },
        { tanggal: "Kamis, 21 Mar. 2024", tahapan: "Eksekusi", proses: "Eksekusi Putusan" },
        { tanggal: "Jumat, 22 Mar. 2024", tahapan: "Penyelesaian", proses: "Penyelesaian Perkara" }
    ]

    return (
        <div className="container py-[16px]">
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="flex flex-col">
                    <div className="grid grid-cols-10 text-center  rounded-t-md bg-gray-2 dark:bg-slate-600 ">
                        <div className="p-2.5 xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                No
                            </h5>
                        </div>

                        <div className="p-2.5 xl:p-5 col-span-3">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Tanggal
                            </h5>
                        </div>
                        <div className="p-2.5 xl:p-5 col-span-3">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Tahapan
                            </h5>
                        </div>

                        <div className="p-2.5 xl:p-5 col-span-3">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Proses
                            </h5>
                        </div>
                    </div>
                </div>
                {dataDummy.map((item: any, index: any) => {
                    return (
                        <div>
                            <div className="grid grid-cols-10 rounded-sm bg-meta-4 hover:bg-sky-950">
                                <div
                                    //   onClick={() => handleDetailClick(item)}
                                    className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer border-b border-slate-600 dark:border-gray-600"
                                >
                                    <p className="hidden text-black dark:text-white sm:block">
                                        {index + 1}
                                    </p>
                                </div>
                                <div
                                    //   onClick={() => handleDetailClick(item)}
                                    className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-3 border-b border-slate-600 dark:border-gray-600"
                                >
                                    <p className="hidden text-black dark:text-white sm:block">
                                        {item.tanggal}
                                    </p>
                                </div>
                                <div
                                    //   onClick={() => handleDetailClick(item)}
                                    className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-3 border-b border-slate-600 dark:border-gray-600"
                                >
                                    <p className="hidden text-black dark:text-white sm:block">
                                        {item.tahapan}
                                    </p>
                                </div>
                                <div
                                    //   onClick={() => handleDetailClick(item)}
                                    className="flex items-center justify-center gap-3 p-2.5 xl:p-5 cursor-pointer col-span-3 border-b border-slate-600 dark:border-gray-600"
                                >
                                    <p className="hidden text-black dark:text-white sm:block">
                                        {item.proses}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}