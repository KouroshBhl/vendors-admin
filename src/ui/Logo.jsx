import { Link } from 'react-router-dom';
import LogoImage from '../../public/logo.jpg';

function Logo() {
  return (
    <Link to='/' className='flex justify-center items-center'>
      <img src={LogoImage} alt='vendors' />
    </Link>
  );
}

export default Logo;
