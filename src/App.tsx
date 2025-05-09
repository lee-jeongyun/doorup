import { useState, useEffect } from 'react';
import { styled, createGlobalStyle } from 'styled-components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reset from 'styled-reset';
import Home from './routes/Home';
import { auth } from './firebase';
import Start from './routes/Start';
import CreateAccount from './routes/CreateAccount';
import Profile from './routes/Profile';
import CalendarPage from './routes/CalendarPage';
//import { AuthProvider, useAuth } from './components/AuthContext';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Start />,
//   },
//   {
//     path: '/Home',
//     element: <Home />,
//   },
//   {
//     path: '/create-account',
//     element: <CreateAccount />,
//   },
// ]);

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
  min-height: 100vh; // 💡 최소 높이만 지정 (자동으로 늘어남)
  display: flex;
  justify-content: center;
  padding: 40px 0; // 💡 위아래 여백 추가
  overflow-y: auto; // 💡 필요 시 스크롤 허용
`;

function App() {
  const [isLoading, setLoading] = useState(true);
  //const { user } = useAuth(); // ✅ 이제 컴포넌트 안에서 사용됨

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
    {
      path: '/profile',
      element: <Profile />,
    },
    {
      path: '/calendar',
      element: <CalendarPage />,
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
