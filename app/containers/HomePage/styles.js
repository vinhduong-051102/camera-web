import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  align-items: center;
  flex-direction: column;
  background: ${props => props.theme.colors.background};
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const DataContainer = styled.div`
  display: flex;
  width: 100%;
  height: 850px;
  margin: 20px;
  padding: 10px;
  overflow-y: auto;
  border: 1px solid red;
  column-gap: 10px;
`;

export { Container, ButtonContainer, DataContainer };
