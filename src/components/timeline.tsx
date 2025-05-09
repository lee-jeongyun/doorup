import {
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { db } from '../firebase';

export interface IDiary {
  id: string;
  diaryText: string;
  userId: string;
  createdAt: number;
  date: string; // Date 타입이 아니고 string 또는 Timestamp일 수 있음
}

const Wrapper = styled.div`
  padding: 20px;
`;

const DiaryCard = styled.div`
  border: 1px solid gray;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
`;

export default function Timeline() {
  const [entries, setEntries] = useState<IDiary[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, 'content'), // ← 저장할 때 사용한 컬렉션 이름과 일치시켜야 함
      orderBy('createdAt', 'desc'),
      limit(4)
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
    });

    return () => unsubscribe();
  }, []);

  return (
    <Wrapper>
      {entries.map((entry) => (
        <DiaryCard key={entry.id}>
          <div>
            <strong>날짜:</strong> {entry.date}
          </div>
          <div>
            <strong>내용:</strong> {entry.diaryText}
          </div>
        </DiaryCard>
      ))}
    </Wrapper>
  );
}
