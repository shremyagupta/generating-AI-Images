import React, { useState } from 'react';
import styled from 'styled-components';
import ImageGenerator from './components/ImageGenerator';
import Header from './components/Header';
import Footer from './components/Footer';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <MainContent>
        <ImageGenerator />
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

export default App;
