import styled from 'styled-components';
import { Table, Input, Button } from 'antd';

export const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  align-items: center;
  flex-direction: column;
  background: ${props => props.theme.colors.background};
`;

export const StyledTable = styled(Table)`
  width: 100%;
`;

export const StyledInput = styled(Input)`
  width: 30%;
  align-self: flex-end;
  margin-bottom: 20px;
`;

export const StyledButton = styled(Button)`
  align-self: flex-end;
  margin-bottom: 20px;
  width: 10%;
`;

export const StyledSpanButton = styled.span`
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100%;
  gap: 10px;
`;
