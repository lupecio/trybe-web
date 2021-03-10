import React, { useState, useEffect, FormEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';
import api from '../../services/api';

import { Container, Form, Error } from './styles';

interface CurrencyValue {
  currency: string;
  value: number;
}

interface Session {
  token: string;
}

const Register: React.FC = () => {
  const history = useHistory();
  const [value, setValue] = useState('');
  const [auth, setAuth] = useState<Session | null>(null);
  const [currency, setCurrency] = useState('BRL');
  const [currencies, setCurrencies] = useState<{[key: string]: string} >({'BRL': '','EUR': '', 'CAD': ''})
  const [inputError, setInputError] = useState('');

  async function handleUpdate(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!value) {
      setInputError('Digite o novo valor');
      return;
    }

    console.log(currency);
    if (!currency) {
      setInputError('Escolha uma moeda');
      return;
    }

    try {
      const response = await api.post<CurrencyValue>('api/cryto/btc', {
        currency,
        value: parseFloat(value)
      }, {
        headers: {
          'Authorization': `Bearer ${auth && auth.token}`
        }
      });

      const update = response.data;

      setInputError('');

      if (update) {
        history.push('/');
      }
    } catch (err) {
      setInputError(err.response.data.message);
    }
  }

  useEffect(() => {
    let auth = null;
    const authStoraged = localStorage.getItem('@TrybeTest:session');

    if (authStoraged) {
      auth = JSON.parse(authStoraged);
      setAuth(auth);
    } else {
      history.push('login');
    }

    api.get<{[key: string]: string} >('/currencies', {
      headers: {
        'Authorization': `Bearer ${auth && auth.token}`
      }
    }).then(response => {
      const currencies: {[key: string]: string}  = response.data;
      setCurrencies(currencies);
    });
  }, []);

  return (
    <>
      <Container>
        <Form hasError={!!inputError} onSubmit={handleUpdate}>
          <select onChange={(e) => setCurrency(e.target.value)}>
            <option value='BRL'>BRL</option>
            <option value='EUR'>EUR</option>
            <option value='CAD'>CAD</option>
          </select>

          <span>Valor atual:</span> {currencies[currency || 'BRL']}
          <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Novo Valor." />

          <button type="submit">Atualizar</button>
        </Form>

        <Link to='/'>
          Voltar
        </Link>

        {inputError && <Error>{inputError}</Error>}
      </Container>
    </>
  )
}

export default Register;
