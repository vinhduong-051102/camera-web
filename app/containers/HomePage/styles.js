import styled from 'styled-components';
import { Table, Input, Button, Form } from 'antd';

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

export const StyledInput = styled(Input.Search)`
  width: 30%;
  align-self: flex-end;
  margin-bottom: 20px;
  .ant-btn-loading-icon {
    display: flex;
    justify-content: center;
  }
  @media screen and (max-width: 1025px) {
    width: 100%;
    padding-top: 20px;
  }
`;

export const StyledButton = styled(Button)`
  align-self: flex-end;
  margin-bottom: 20px;
  width: 12%;
  @media screen and (max-width: 1025px) and (min-width: 600px) {
    width: 23%;
    padding-top: 20px;
  }
  @media screen and (max-width: 599px) {
    width: 70%;
    align-self: center;
  }
`;

export const StyledSpanButton = styled.span`
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100%;
  gap: 10px;
`;

export const StyledSubmitFormButton = styled(Form.Item)`
  .ant-form-item-control-input-content {
    display: flex !important;
    justify-content: flex-end !important;
  }
`;
