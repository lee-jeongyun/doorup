import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
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
import { doc, setDoc } from 'firebase/firestore';

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [Fname, setFname] = useState('');
  const [Mname, setMname] = useState('');
  const [Kname, setKname] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'name') setName(value);
    else if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'Fname') setFname(value);
    else if (name === 'Mname') setMname(value);
    else if (name === 'Kname') setKname(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || email === '' || password === '') return;

    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(credentials.user, {
        displayName: name,
      });

      await setDoc(doc(db, 'family', credentials.user.uid), {
        fname: Fname,
        mname: Mname,
        kname: Kname.split(',').map((k) => k.trim()),
      });

      navigate('/Home');
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>환영합니다</Title>
      <Form onSubmit={onSubmit}>
        <Input
          name="name"
          value={name}
          onChange={onChange}
          placeholder="이름"
          required
        />
        <Input
          name="email"
          value={email}
          onChange={onChange}
          type="email"
          placeholder="이메일"
          required
        />
        <Input
          name="password"
          value={password}
          onChange={onChange}
          type="password"
          placeholder="비밀번호"
          required
        />
        <Input
          name="Fname"
          value={Fname}
          onChange={onChange}
          placeholder="부"
          required
        />
        <Input
          name="Mname"
          value={Mname}
          onChange={onChange}
          placeholder="모"
          required
        />
        <Input
          name="Kname"
          value={Kname}
          onChange={onChange}
          placeholder="자녀 (쉼표로 구분)"
        />
        <Input type="submit" value="회원가입" />
        <Switcher>
          <Link to="/">로그인</Link>
        </Switcher>
      </Form>
    </Wrapper>
  );
}
