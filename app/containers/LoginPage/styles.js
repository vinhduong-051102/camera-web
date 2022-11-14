import styled from 'styled-components';
import { Form, Button } from 'antd';

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  flex-direction: column;
  background: ${props => props.theme.colors.background};
  background-size: cover;
`;

export const StyledForm = styled(Form)`
  background: white;
  border-radius: 40px;
  margin: auto 0;
  padding: 0 20px;
  width: 70vw;
  max-width: 800px;
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

export const StyledFormItemImg = styled(Form.Item)`
  .ant-form-item-row {
    justify-content: center !important;
  }
`;
