import React from 'react';
import { RiwayatBuktiData } from './DataDumyKasus';

const RiwayatBukti = () => {
  const formatDate: any = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="">
      {RiwayatBuktiData.map((data, index) => (
        <React.Fragment key={index}>
          <div className="p-2">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="border py-2">Tanggal Penerimaan</td>
                  <td className="pl-2">{formatDate(data.tanggal_penerima)}</td>
                </tr>
                <tr>
                  <td className="border py-2">
                    Jenis dan Uraian lengkap Barang Bukti
                  </td>
                  <td className="pl-2">{data.jenis_uraian}</td>
                </tr>
                <tr>
                  <td className="border py-2">Tempat Penyimpanan</td>
                  <td className="pl-2">{data.tempat_penyimpanan}</td>
                </tr>
                <tr>
                  <td className="border py-2">Nama Penerima</td>
                  <td className="pl-2">{data.nama_penerima}</td>
                </tr>
                <tr>
                  <td className="border py-2">Tgl Penyerahan Barang Bukti</td>
                  <td className="pl-2">{formatDate(data.tgl_penyerahan)}</td>
                </tr>
                <tr>
                  <td className="border py-2">Catatan</td>
                  <td className="pl-2">{data.catatan}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default RiwayatBukti;
