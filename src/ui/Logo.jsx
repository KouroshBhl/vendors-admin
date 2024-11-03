import LogoImage from '../../public/logo.jpg';

function Logo() {
  return (
    <div className='flex justify-center items-center'>
      <img src={LogoImage} alt='vendors' className='w-16 h-16' />
    </div>
  );
}

export default Logo;
