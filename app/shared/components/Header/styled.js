import { PageHeader } from 'antd';
import styled from 'styled-components';

export const StyledPageHeader = styled(PageHeader)`
  padding: 20px;
  border-bottom: 1px solid #ccc !important;
  .ant-page-header-back svg {
    width: 24px;
    height: 32px;
  }
  .ant-page-header-heading-title {
    font-size: 32px;
    margin-left: 44px;
    color: rgb(240, 90, 34);
  }
`;

export const StyledButtonLogin = styled.button`
  background-color: transparent;
  border: none;
  .login-icon {
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
`;
