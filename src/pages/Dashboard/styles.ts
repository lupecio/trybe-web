import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  max-width: 100%;
  align-content: space-between;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50px;
  border-radius: 5px;
  align-items: center;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  margin: 5px;

  a {
    text-decoration: none;
    color: #ffffff;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
`

export const CardList = styled.div`
  display: flex;
  flex-direction: row;
`;
