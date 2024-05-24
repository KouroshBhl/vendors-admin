import { styled } from 'styled-components';
import { StyledNavLink } from './MainNav';
function SubNav({ subMenu, icon, toPage }) {
  return (
    <StyledSubNav>
      <StyledNavLink to={toPage}>
        {icon}
        <span>{subMenu}</span>
      </StyledNavLink>
    </StyledSubNav>
  );
}

export default SubNav;

const StyledSubNav = styled.div`
  margin-left: 2.4rem;
`;
