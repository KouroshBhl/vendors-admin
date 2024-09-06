import LogoImage from '../../public/logo.jpg';

function Logo() {
  return (
    <div className='flex justify-center items-center'>
      <img src={LogoImage} alt='vendors' className='w-24 h-24' />
    </div>
  );
}

export default Logo;
