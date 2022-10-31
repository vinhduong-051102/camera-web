import React from 'react';
import { Form, Input, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Container,
  StyledFormItem,
  StyledButton,
  StyledForm,
  StyledFormItemImg,
} from './styles';
import { login } from './actions';
import { REDUX_KEY } from '../../utils/constants';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import loginBanner from '../../images/login-banner.svg';
import loginBG from '../../images/login-bg.svg';

const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const accessToken = useSelector(selectors.selectAccessToken());
  const key = REDUX_KEY.loginPage;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const handleSubmit = values => {
    dispatch(login(values));
  };
  React.useEffect(() => {
    if (accessToken !== '') {
      history.push('/');
    }
  }, [accessToken]);
  return (
    <Container style={{ backgroundImage: `url(${loginBG})` }}>
      <StyledForm
        name="basic"
        labelCol={{
          lg: { span: 4, offset: 3 },
          md: { span: 24 },
          sm: { span: 24 },
        }}
        wrapperCol={{ lg: { span: 12 }, md: { span: 24 }, sm: { span: 24 } }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <StyledFormItemImg>
          <img src={loginBanner} alt="" style={{ width: '100%' }} />
        </StyledFormItemImg>
        <StyledFormItem
          label="Tên đăng nhập"
          name="username"
          rules={[{ required: true, message: 'Vui lòng nhập tên đăng !' }]}
        >
          <Input />
        </StyledFormItem>
        <StyledFormItem
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật !' }]}
        >
          <Input.Password />
        </StyledFormItem>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ lg: { offset: 6, span: 12 }, md: { span: 24 } }}
        >
          <Checkbox>Duy trì đăng nhập</Checkbox>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            lg: { offset: 10, span: 6 },
            md: { offset: 6, span: 12 },
          }}
        >
          <StyledButton type="primary" htmlType="submit" size="large">
            Đăng nhập
          </StyledButton>
        </Form.Item>
      </StyledForm>
    </Container>
  );
};

export default LoginPage;
