import { useState, useEffect } from "react";
import Loader from "../../common/Loader";
import { useLocation, useNavigate } from 'react-router-dom';
import { Error403Message } from '../../utils/constants';
import { Alerts } from './AlertDaftarKasus';

const Penuntutan = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
     const delay = setTimeout(() => {
         setLoading(false);
     }, 900);

     return () => clearTimeout(delay);
 }, []);

 return (
     <div>
       {loading ? (
           <Loader />
       ) : (
           <div className="pt-3 flex flex-row">
               <div className="flex flex-col shadow-default dark:border-strokedark dark:bg-slate-600">
                    <div className="flex-none w-44">
                    Tanggal Tuntutan
                    </div>
                    <div className="flex-initial w-75">
                    Isi Tuntutan
                    </div>
               </div>
               <div className="">
                    1
               </div>
          </div>
       )}
     </div>
      );

};

export default Penuntutan;