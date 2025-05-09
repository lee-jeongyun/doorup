import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 80px 20px;
  min-height: 100vh;
`;

const Card = styled.div`
  background-color: white;
  padding: 48px;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
  color: black;
  width: 100%;
  max-width: 500px;
  margin-top: 60px;
`;

const Title = styled.h2`
  font-size: 32px;
  margin-bottom: 32px;
  text-align: center;
  font-weight: bold;
`;

const Info = styled.p`
  margin: 18px 0;
  font-size: 18px;
  line-height: 1.6;
`;

const Label = styled.span`
  font-weight: bold;
  display: inline-block;
  width: 90px;
`;

const LogoutButton = styled.button`
  margin-top: 40px;
  width: 100%;
  padding: 14px;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  background-color: crimson;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #b80000;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 32px;
  left: 32px;
  background: none;
  border: none;
  color: #1d9bf0;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: #0c7cc0;
  }

  svg {
    margin-right: 8px;
    font-size: 22px;
  }
`;

interface FamilyData {
  fname?: string;
  mname?: string;
  kname?: string[];
}

export default function Profile() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [family, setFamily] = useState<FamilyData>({});

  useEffect(() => {
    const fetchFamily = async () => {
      if (!user) return;
      const ref = doc(db, 'family', user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setFamily(snap.data() as FamilyData);
      }
    };

    fetchFamily();
  }, [user]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <Wrapper>
      <BackButton onClick={() => navigate('/Home')}>← 뒤로가기</BackButton>
      <Card>
        <Title>👤 내 정보</Title>
        <Info>
          <Label>이름:</Label>
          {user?.displayName ?? '익명'}
        </Info>

        <Info>
          <Label>부:</Label>
          {family.fname ?? '없음'}
        </Info>
        <Info>
          <Label>모:</Label>
          {family.mname ?? '없음'}
        </Info>
        <Info>
          <Label>자녀:</Label>
          {family.kname?.join(', ') ?? '없음'}
        </Info>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </Card>
    </Wrapper>
  );
}
