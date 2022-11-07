import styled from 'styled-components';
import { Table, Input, Button, Form, Select } from 'antd';

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
  //align-self: flex-end;
  //margin-bottom: 20px;
  .ant-btn-loading-icon {
    display: flex;
    justify-content: center;
  }
  @media screen and (max-width: 1025px) {
    width: 100%;
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

export const StyledDescription = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const FilterContainer = styled.div`
  width: 30%;
  align-self: flex-end;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media screen and (max-width: 1025px) {
    width: 100%;
    padding-top: 20px;
  }
`;

export const StyledSelect = styled(Select)`
  margin-left: 10px;
  width: 150px;
  text-align: center;
  //padding-top: 20px;
`;
