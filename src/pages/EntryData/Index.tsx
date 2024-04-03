import { useState } from 'react'
import ProgressBar from '../../components/ProgressBar'
import { useNavigate } from 'react-router-dom'

const EntryData = () => {
  const navigate = useNavigate()
  const [currentForm, setCurrentForm] = useState(0)
  
  const formList = [
    {
      "nama": "form 1",
      "component": (<div>
        <input type="text" placeholder='form 1' />
      </div>)
    },
    {
      "nama": "form 2",
      "component": (<div>
        <input type="text" placeholder='form 2' />
      </div>)
    },
    {
      "nama": "form 3",
      "component": (<div>
        <input type="text" placeholder='form 3' />
      </div>)
    },
    {
      "nama": "form 4",
      "component": (<div>
        <input type="text" placeholder='form 4' />
      </div>)
    },
    {
      "nama": "form 5",
      "component": (<div>
        <input type="text" placeholder='form 5' />
      </div>)
    },
    {
      "nama": "form 6",
      "component": (<div>
        <input type="text" placeholder='form 6' />
      </div>)
    },
  ]
  function handleNext(){
    if(currentForm + 1 == formList.length){
      return navigate('/daftar-kasus')
    }
    setCurrentForm(currentForm + 1)
  }
  return (
    <div>
      <ProgressBar list={formList} currentForm={currentForm}/>
      <div className="h-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-15 xl:pb-1 flex flex-col gap-12">
        <h1 className='font-bold text-2xl'>{formList[currentForm].nama}</h1>
        <div className="">{formList[currentForm].component}</div>
        <div className="flex justify-end">
        <button className='bg-slate-500 w-20 text-xl font-bold rounded-sm' onClick={handleNext}>Next</button>
        </div>
      </div>
    
    </div>
  )
}

export default EntryData