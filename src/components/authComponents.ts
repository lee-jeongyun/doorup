import { styled } from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: #fef6e4; /* 부드러운 크림톤 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  font-size: 38px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  max-width: 400px;
  background-color: white;
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  padding: 16px 24px;
  border-radius: 12px;
  border: 2px solid #ccc;
  font-size: 18px;
  width: 100%;
  background-color: #fff;

  &:focus {
    border-color: #a00;
    outline: none;
  }

  &[type='submit'] {
    background-color: #a00;
    color: white;
    font-weight: bold;
    border: none;
    font-size: 20px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #800;
    }
  }
`;

export const Error = styled.span`
  font-weight: 600;
  color: tomato;
  font-size: 16px;
`;

export const Switcher = styled.div`
  text-align: center;
  margin-top: 24px;
  font-size: 18px;

  a {
    color: #1d9bf0;
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
