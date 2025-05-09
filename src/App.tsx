import React, { useState, useEffect } from 'react';
import { styled, createGlobalStyle } from 'styled-components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reset from 'styled-reset';
import Home from './routes/Home';
import { auth } from './firebase';
import Start from './routes/Start';
import CreateAccount from './routes/CreateAccount';
import { AuthProvider, useAuth } from './components/AuthContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Start />,
  },
  {
    path: '/Home',
    element: <Home />,
  },
  {
    path: '/create-account',
    element: <CreateAccount />,
  },
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  *{
    box-sizing: border-box;
  }
  body{
    background-color:black;
    color:white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setLoading] = useState(true);
  const { user } = useAuth(); // ✅ 이제 컴포넌트 안에서 사용됨

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Start />,
    },
    {
      path: '/Home',
      element: <Home />,
    },
    {
      path: '/create-account',
      element: <CreateAccount />,
    },
  ]);

  const init = async () => {
    await auth.authStateReady();
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  if (isLoading) return; // ← 깜깜한 화면 방지

  return (
    <Wrapper>
      <GlobalStyles />
      <RouterProvider router={router} />
    </Wrapper>
  );
}

export default App;
