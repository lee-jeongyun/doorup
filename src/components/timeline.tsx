import {
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { auth, db } from '../firebase';

export interface IDiary {
  id: string;
  diaryText: string;
  userId: string;
  createdAt: number;
  date: string;
}

const Wrapper = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 48px auto 0 auto; /* 위는 margin-top, 좌우는 가운데 정렬 */
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 0px; /* 좌우 여백 */
  height: 100px;
  box-sizing: border-box;
`;

const DiaryCard = styled.div`
  background-color: #ffffff;
  border: 2px solid #dddddd;
  border-radius: 16px;
  padding: 15px;
  font-size: 18px;
  line-height: 1.8;
  color: #111111;
  position: relative;
`;

const DiaryDate = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: none;
  font-size: 12px;
  padding: 1px 12px;
  border-radius: 6px;
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 16px;

  &:hover {
    background-color: darkred;
  }
`;

export default function Timeline() {
  const [entries, setEntries] = useState<IDiary[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    const q = query(
      collection(db, 'content'),
      //where('userId', '==', user?.uid),
      orderBy('createdAt', 'desc'),
      limit(25)
    );
    //console.log(user?.uid, 'userId');

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

  const handleDelete = async (id: string) => {
    const ok = confirm('정말 삭제하시겠습니까?');
    if (!ok) return;

    try {
      await deleteDoc(doc(db, 'content', id));
    } catch (e) {
      console.error('삭제 실패:', e);
    }
  };

  return (
    <Wrapper>
      {entries.map((entry) =>
        user?.uid === entry.userId ? (
          <DiaryCard key={entry.id}>
            <DiaryDate>{entry.date}</DiaryDate>
            {user?.uid === entry.userId ? <div>{entry.diaryText}</div> : null}
            {user?.uid === entry.userId && (
              <DeleteButton onClick={() => handleDelete(entry.id)}>
                삭제
              </DeleteButton>
            )}
          </DiaryCard>
        ) : null
      )}
    </Wrapper>
  );
}
