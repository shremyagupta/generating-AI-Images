import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© 2025 AI Image Generator. Powered by advanced AI technology.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
