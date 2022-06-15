import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
const Header = () => {
  return (
    <HeaderContainer>
      <Image src={'/cocktail.png'} width="30%" height="100%" />
      <h1>My Cocktail</h1>
      <Link href={`/favorites`}>
        <a>⭐️</a>
      </Link>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: pink;
  height: 60px;
  z-index: 2;

  h1 {
    position: absolute;
    width: 50%;
    height: 100%;
    top: 0.2em;
    left: 25%;
    margin: 0;
    text-align: center;
  }

  a {
    display: block;
    position: absolute;
    right: 0;
    font-size: 2em;
    padding: 10px;
  }
`;

export default Header;
