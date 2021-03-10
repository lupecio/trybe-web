import React, { useState, useEffect, FormEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';
import api from '../../services/api';

import { Container, Form, Error } from './styles';

interface Session {
  user: {
    id: string;
    name: string;
    email: string;
    balance: number;
  }
  token: string;
}

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState<Session | null>(null);
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    localStorage.setItem('@TrybeTest:session', JSON.stringify(session));
  }, [session]);

  async function handleLogin(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!email) {
      setInputError('Digite o email');
      return;
    }

    if (!password) {
      setInputError('Digite a senha');
      return;
    }

    try {
      const response = await api.post<Session>('api/login', {
        email,
        password
      });

      const session = response.data;

      setSession(session);
      setInputError('');

      if (session) {
        history.push('/');
      }
    } catch (err) {
      setInputError(err.response.data.message);
    }
  }

  return (
    <>
      <Container>
        <Form hasError={!!inputError} onSubmit={handleLogin}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite o email." />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite a senha." />

          <button type="submit">Entrar</button>
        </Form>

        {inputError && <Error>{inputError}</Error>}
      </Container>
    </>
  )
}

export default Login;
