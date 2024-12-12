import { Link, useLocation } from 'react-router-dom';


function ModalPlayer() {
    const location = useLocation();
    const mode = location.state?.mode || 'Normal';

  return (
    <div>
      <h1 className='text-[100px] text-center'>Kích thước bảng</h1>
        <div className='text-center flex h-[60vh] justify-center items-center flex-col'>
            <div className='flex gap-10 items-center'>
                <Link to='/gamenormal' state={{ mode }}
                      className='text-3xl rounded-[20px] bg-white hover:bg-black hover:text-white flex items-center justify-center text-center border w-[200px] h-[200px]'>3x3</Link>
                <Link to='/game5x5' state={{ mode }}
                      className='text-3xl rounded-[20px] bg-white hover:bg-black hover:text-white flex items-center justify-center text-center border w-[200px] h-[200px]'>5x5</Link>
                <Link to=''
                      className='text-3xl rounded-[20px] bg-white hover:bg-black hover:text-white flex items-center justify-center text-center border w-[200px] h-[200px]'>7x7</Link>
                <Link to=''
                      className='text-3xl rounded-[20px] bg-white hover:bg-black hover:text-white flex items-center justify-center text-center border w-[200px] h-[200px]'>Vô
                    Cực</Link>
            </div>
        </div>
        <div className='text-center flex justify-center items-center'>
            <Link className='w-[300px] h-[50px] mb-[39px] rounded-[20px] border-2 bg-black text-white hover:bg-white hover:text-black  flex items-center justify-center text-center text-3xl' to='/gamemode'>Quay về</Link>
        </div>
    </div>
  )
}

export default ModalPlayer
