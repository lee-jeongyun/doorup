//import { styled } from 'styled-components';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import {
  Input,
  Title,
  Wrapper,
  Form,
  Switcher,
} from '../components/authComponents';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Start() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [error, setError] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //setError('');
    if (isLoading || email === '' || password === '') {
      return;
    }
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/Home');
    } catch (e) {
      if (e instanceof FirebaseError) {
        //setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Wrapper>
      <Title>안녕하세요</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          type="email"
          required
          placeholder="이메일"
        ></Input>
        <Input
          onChange={onChange}
          name="password"
          value={password}
          type="password"
          required
          placeholder="비밀번호"
        ></Input>
        <Input type="submit" value="로그인" />
        <Switcher>
          <Link to="/create-account">회원가입</Link>
        </Switcher>
      </Form>
    </Wrapper>
  );
}
