

import { Link } from 'react-router-dom'

function ModePlayer() {
  return (
    <div className='text-center flex justify-center items-center flex-col'>
      <h1 className='text-[100px]'>GameMode</h1>
      <div className='px-2 py-10 rounded-[20px] w-[400px] bg-black'>
        <div className="flex  justify-center items-center flex-col">
          <Link to='/modal' state={{ mode: 'Normal' }} className="w-[300px] h-[100px] mb-[39px] rounded-[20px] border-2 text-white hover:bg-white hover:text-black flex items-center justify-center text-center text-3xl">
            Normal
          </Link>
          <Link to='/modal' state={{ mode: 'Hard' }} className="w-[300px] h-[100px] mb-[39px] rounded-[20px] border-2 text-white  hover:bg-white hover:text-black flex items-center justify-center text-center text-3xl">
            Hard
          </Link>
          <Link to='/' className="w-[300px] h-[100px] rounded-[20px]  text-white hover:bg-white hover:text-black  flex items-center justify-center text-center text-3xl">
            Return
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ModePlayer
