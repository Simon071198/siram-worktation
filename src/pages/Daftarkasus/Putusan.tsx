import React, { useState } from 'react';

export const Putusan = () => {

    return (
        <div className="container py-[16px]">
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="flex flex-col">
                    <div className="grid grid-cols-10 text-center  rounded-t-md bg-gray-2 dark:bg-slate-600 ">
                        <div className="p-2.5 xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Tanggal Putusan
                            </h5>
                        </div>
                        <div className="p-2.5 xl:p-5 col-span-9 bg-slate-50">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Tanggal Putusan
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}