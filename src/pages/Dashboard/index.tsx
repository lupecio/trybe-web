import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import api from '../../services/api';

import { Card, Container, Title, CardList } from './styles';

interface Btc {
  time: {
    updated: Date,
    updatedISO: Date,
    updateduk: Date
  },
  disclaimer: string,
  bpi: {
    USD: {
      code: string,
      rate: string,
      description: string,
      rate_float: number
    },
    BRL: {
      code: string,
      rate: string,
      description: string,
      rate_float: number
    },
    EUR: {
      code: string,
      rate: string,
      description: string,
      rate_float: number
    },
    CAD: {
      code: string,
      rate: string,
      description: string,
      rate_float: number
    },
    BTC: {
      code: string,
      rate: string,
      description: string,
      rate_float: number
    }
  }
}
interface Session {
  token: string;
}

const Dashboard: React.FC = () => {
  const history = useHistory();
  const [auth, setAuth] = useState<Session | null>(null);
  const [btc, setBtc] = useState<Btc | null>(null);
  const [btcNumber, setBtcNumber] = useState<string>('1');

  useEffect(() => {
    let auth = null;
    const authStoraged = localStorage.getItem('@TrybeTest:session');

    if (authStoraged) {
      auth = JSON.parse(authStoraged);
      setAuth(auth);
    } else {
      history.push('login');
    }

    api.get<Btc>('/api/cryto/btc', {
      headers: {
        'Authorization': `Bearer ${auth && auth.token}`
      }
    }).then(response => {
      const btc = response.data;
      setBtcNumber(btc.bpi.BTC.rate);
      setBtc(btc);
    });
  }, []);

  function updateValue() {
    history.push('atualizar-valor');
  }

  return (
    <>
      <Container>
        <Title>
          <button onClick={() => updateValue()}>Atualizar valor monetário</button>
        </Title>
        <Card>
          <span>BTC</span>
          <input type="number" onChange={(e) => setBtcNumber(e.target.value)} value={btcNumber}/>
        </Card>
        <CardList>
          <Card>
            <span>USD</span>
            <span>{ btc && btc.bpi.USD.rate_float * parseFloat(btcNumber) }</span>
          </Card>
          <Card>
            <span>BRL</span>
            <span>{ btc && btc.bpi.BRL.rate_float * parseFloat(btcNumber) }</span>
          </Card>
          <Card>
            <span>EUR</span>
            <span>{ btc && btc.bpi.EUR.rate_float * parseFloat(btcNumber) }</span>
          </Card>
          <Card>
            <span>CAD</span>
            <span>{ btc && btc.bpi.CAD.rate_float * parseFloat(btcNumber) }</span>
          </Card>
        </CardList>
      </Container>
    </>
  )
}

export default Dashboard;
