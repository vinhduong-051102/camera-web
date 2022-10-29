import styled from 'styled-components';
import { Form, Button } from 'antd';

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  flex-direction: column;
  background: ${props => props.theme.colors.background};
  background-image: url('http://10.2.22.166:1234/239026434b096753779aeac1eda32cb7.svg');
  background-size: cover;
`;

export const StyledForm = styled(Form)`
  background: white;
  border-radius: 40px;
  margin: auto 0;
  width: 70vw;
`;

export const StyledFormItem = styled(Form.Item)`
  margin-bottom: 24px !important;
`;

export const StyledButton = styled(Button)`
  width: 100%;
  align-items: center;
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: white;
  box-sizing: border-box;
  border-radius: 8px;
`;
