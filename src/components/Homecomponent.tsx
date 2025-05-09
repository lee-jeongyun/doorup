import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  width: 90vw; // 전체 화면의 90% 너비
  max-width: 1000px; // 더 넓은 화면에서 확장 허용
  margin: 40px auto; // 상단 여백 추가
  padding: 40px; // 내부 여백 확장
  background: white;
  color: black;
  border-radius: 16px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  font-family: 'Arial', sans-serif;
`;

export const Greeting = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const DateText = styled.div`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

export const DiaryInput = styled.textarea`
  width: 100%;
  height: 120px;
  resize: none;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 15px;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 15px;
`;

export const Button = styled.button`
  flex: 1;
  padding: 10px;
  font-size: 15px;
  border: none;
  border-radius: 6px;
  background-color: #eee;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

export const Form = styled.form`
  flex: 1;
  padding: 10px;
  font-size: 15px;
  border: none;
  border-radius: 6px;
  background-color: #eee;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

export const RightButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Contents = styled.div``;
