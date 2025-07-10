import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  margin-top: 0.5rem;
  font-weight: 300;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>AI Image Generator</Title>
      <Subtitle>Transform your imagination into stunning visuals</Subtitle>
    </HeaderContainer>
  );
};

export default Header;
