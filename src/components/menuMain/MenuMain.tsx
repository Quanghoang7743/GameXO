
import { Link } from 'react-router-dom'




function MenuMain() {
  return (
    <div className=' flex items-center  h-screen relative'>
      <div className='px-2 ml-[5rem] py-10 rounded-[20px] w-[400px]   bg-black'>
        <div className="flex  justify-center items-center flex-col">
          <Link to='/gamemode' className="w-[300px] h-[100px] mb-[39px] rounded-[20px] bg-white flex items-center justify-center text-center text-3xl">
            SinglePlayer
          </Link>
          <Link to='' className="w-[300px] h-[100px] mb-[39px] rounded-[20px] text-white hover:bg-white hover:text-black  flex items-center justify-center text-center text-3xl">
            MutilPlayer
          </Link>
          <Link to='' className="w-[300px] h-[100px] mb-[39px] rounded-[20px] text-white  hover:bg-white hover:text-black flex items-center justify-center text-center text-3xl">
            Setting
          </Link>
          <Link to='' className="w-[300px] h-[100px] rounded-[20px] text-white hover:bg-white hover:text-black  flex items-center justify-center text-center text-3xl">
            Quit Game
          </Link>
        </div>
      </div>
      <div className='absolute right-[20rem] top-[10rem]'>
        <h1 className='text-[100px]'>Cờ Ca Rô</h1>
      </div>
      <div className='absolute right-5 bottom-[2rem]'>
        <input className='w-[400px] h-[50px] rounded-[20px] bg-black text-white p-2 outline ' placeholder='Enter Username'/>
      </div>
    </div>
  )
}

export default MenuMain
