import { styled } from 'styled-components';
import LogoImage from '../../public/logo.jpg';

function Logo() {
  return (
    <StyledLogo>
      <StyledImage src={LogoImage} alt='vendors' />
    </StyledLogo>
  );
}

const StyledLogo = styled.div`
  text-align: center;
`;

const StyledImage = styled.img`
  height: 9.6rem;
  width: auto;
`;

export default Logo;
