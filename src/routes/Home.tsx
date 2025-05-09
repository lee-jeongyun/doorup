import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  Greeting,
  DateText,
  Label,
  DiaryInput,
  ButtonRow,
  Button,
  RightButtons,
  Contents,
} from '../components/Homecomponent';
import useSpeechRecognition from '../hooks/useSpeechRecognitionHooks';
//import { useAuth } from '../components/AuthContext';
import { addDoc, collection } from 'firebase/firestore';
import Timeline from '../components/timeline';

const getKoreanDate = (): string => {
  const today = new Date();

  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };

  const formatter = new Intl.DateTimeFormat('ko-KR', options);
  return formatter.format(today);
};

const Home = () => {
  const navigate = useNavigate();
  //const { user } = useAuth();
  const user = auth.currentUser;
  const [diaryText, setDiaryText] = useState<string>('');
  const {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();

  React.useEffect(() => {
    if (text) {
      setDiaryText((prev) => (prev + ' ' + text).trim());
    }
  }, [text]);
  console.log(user);

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user || diaryText === '' || diaryText.length > 200) return;
    try {
      await addDoc(collection(db, 'content'), {
        diaryText,
        date: getKoreanDate(),
        username: user.displayName || 'Anonymous',
        userId: user.uid,
        createdAt: Date.now(),
      });
      setDiaryText('');
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  return (
    <Container>
      <Greeting>{user?.displayName ?? '익명'}님, 안녕하세요!</Greeting>
      <DateText>오늘은 {getKoreanDate()}입니다.</DateText>

      <Label htmlFor="diary">오늘의 일기</Label>
      <DiaryInput
        id="diary"
        value={diaryText}
        onChange={(e) => setDiaryText(e.target.value)}
        placeholder="일기를 입력하세요..."
      />

      <ButtonRow>
        {hasRecognitionSupport ? (
          <Button onClick={isListening ? stopListening : startListening}>
            {isListening ? '녹음 중지' : '음성으로 입력하기'}
          </Button>
        ) : (
          <Button disabled>음성 인식 미지원</Button>
        )}
        <Button onClick={onSubmit}>저장하기</Button>
      </ButtonRow>
      <RightButtons>
        <Button onClick={() => navigate('/calendar')}>달력 보기</Button>

        <Button onClick={() => navigate('/profile')}>내 정보</Button>
      </RightButtons>
      <Contents>
        <Timeline />
      </Contents>
    </Container>
  );
};

export default Home;
