import React, { useState, useEffect } from 'react';
import type { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import { StyledCalendar } from '../components/StyledCalendar';
import { Container } from '../components/Homecomponent';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';

type CalendarValue = CalendarProps['value'];

interface IDiary {
  id: string;
  diaryText: string;
  userId: string;
  createdAt: number;
  date: string;
}

const DiaryList = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DiaryCard = styled.div`
  background: #f4f4f4;
  padding: 16px;
  border-radius: 12px;
  color: black;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [entries, setEntries] = useState<IDiary[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const formatKoreanDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    };
    return new Intl.DateTimeFormat('ko-KR', options).format(date);
  };

  const handleChange = (value: CalendarValue) => {
    if (!value) return;

    const selected = Array.isArray(value) ? value[0] ?? new Date() : value;
    if (selected instanceof Date) {
      setSelectedDate(selected);
    }
  };

  useEffect(() => {
    setLoading(true);
    const formattedDate = formatKoreanDate(selectedDate);

    const q = query(
      collection(db, 'content'),
      where('date', '==', formattedDate),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const diaryList = snapshot.docs.map((doc) => {
        const { diaryText, createdAt, date, userId } = doc.data();
        return {
          id: doc.id,
          diaryText,
          createdAt,
          date,
          userId,
        };
      });
      setEntries(diaryList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [selectedDate]);

  return (
    <Container>
      <StyledCalendar
        onChange={handleChange}
        value={selectedDate}
        calendarType="gregory"
        locale="ko-KR"
      />
      <h3 style={{ marginTop: '30px' }}>
        📖 {formatKoreanDate(selectedDate)}의 일기 목록
      </h3>
      <DiaryList>
        {loading ? (
          <p>불러오는 중...</p>
        ) : entries.length === 0 ? (
          <p>작성된 일기가 없습니다.</p>
        ) : (
          entries.map((entry) => (
            <DiaryCard key={entry.id}>
              <div>{entry.diaryText}</div>
              <div>{new Date(entry.createdAt).toLocaleString()}</div>
            </DiaryCard>
          ))
        )}
      </DiaryList>
    </Container>
  );
};

export default CalendarPage;
