import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  PlusCircleOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import {
  Upload,
  Form,
  Input,
  Modal,
  Button,
  Tooltip,
  Grid,
  Popconfirm,
  Descriptions,
} from 'antd';
import {
  Container,
  StyledTable,
  StyledInput,
  StyledButton,
  StyledSpanButton,
  StyledSubmitFormButton,
  StyledDescription,
} from './styles';
import * as selectors from '../../shared/components/Sidebar/selectors';
import reducer from './reducer';
import saga from './saga';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { REDUX_KEY } from '../../utils/constants';
import * as actions from './actions';
import { selectIsProcessing } from './selectors';

const HomePage = () => {
  const isProcessing = useSelector(selectIsProcessing());
  const dispatch = useDispatch();
  const key = REDUX_KEY.homePage;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const screen = Grid.useBreakpoint();
  const [form] = Form.useForm();
  // eslint-disable-next-line no-unused-vars
  const data = useSelector(selectors.selectData());
  const [searchValue, setSearchValue] = React.useState('');
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [fileList, setFileList] = React.useState([]);
  const [isOpenViewDetail, setIsOpenViewDetail] = React.useState(false);
  const [titleModal, setTitleModal] = React.useState('');
  const [showAllDesc, setShowAllDesc] = React.useState(false);
  const PcColumns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      width: 80,
      align: 'center',
    },
    {
      title: 'Ảnh',
      dataIndex: 'imagePath',
      render: imagePath => (
        <img style={{ width: 100, height: 100 }} src={imagePath} alt="" />
      ),
      width: 150,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      width: !screen.xl || !screen.xxl ? 100 : 200,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      render: description =>
        showAllDesc ? (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <span
            style={{ fontSize: 'inherit' }}
            onClick={handleToggleShowAllDesc}
          >
            {description}
          </span>
        ) : (
          <StyledDescription onClick={handleToggleShowAllDesc}>
            {description}
          </StyledDescription>
        ),
    },

    {
      title: 'Thời gian tạo',
      dataIndex: 'createAt',
      width: 250,
    },
    {
      title: 'Thao tác',
      render: id => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}
        >
          <Popconfirm
            title="Xác nhận xoá"
            okText="Xác nhận"
            cancelText="Huỷ"
            onConfirm={() => handleDelProductLine(id)}
          >
            <Tooltip title="Xoá">
              <Button
                icon={<DeleteOutlined />}
                shape="circle"
                danger
                type="primary"
              />
            </Tooltip>
          </Popconfirm>
          <Tooltip title="Sửa">
            <Button
              icon={<EditOutlined />}
              shape="circle"
              type="primary"
              onClick={() => handleOpenModal('Sửa')}
            />
          </Tooltip>
        </div>
      ),
      dataIndex: 'id',
      width: 150,
    },
  ];

  const mbColumns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      align: 'center',
      width: 100,
    },
    {
      title: 'Thông tin chung',
      render: (text, record) => (
        <div>
          <img src={record.imagePath} alt="" width={100} height={100} />
          <p>{record.name}</p>
        </div>
      ),
      align: 'center',
    },
    {
      title: 'Thao tác',
      render: (id, record) => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Popconfirm
            title="Xác nhận xoá"
            okText="Xác nhận"
            cancelText="Huỷ"
            onConfirm={() => handleDelProductLine(id)}
          >
            <Tooltip title="Xoá">
              <Button
                icon={<DeleteOutlined />}
                shape="circle"
                danger
                type="primary"
              />
            </Tooltip>
          </Popconfirm>
          <Tooltip title="Sửa">
            <Button
              icon={<EditOutlined />}
              shape="circle"
              type="primary"
              onClick={() => handleOpenModal('Sửa')}
            />
          </Tooltip>
          <Tooltip title="Xem chi tiết">
            <Button
              icon={<EyeOutlined />}
              shape="circle"
              onClick={handleOpenViewDetail}
            />
          </Tooltip>
          <Modal
            title="Chi tiết thông tin"
            open={isOpenViewDetail}
            centered
            onCancel={handleCloseViewDetail}
            onOk={handleCloseViewDetail}
          >
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Hình ảnh">
                <img width={100} height={100} src={record.imagePath} alt="" />
              </Descriptions.Item>
              <Descriptions.Item label="Tên dòng sản phẩm">
                {record.name}
              </Descriptions.Item>
              <Descriptions.Item label="Mô tả">
                {record.description}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tạo">
                {record.createAt}
              </Descriptions.Item>
            </Descriptions>
          </Modal>
        </div>
      ),
      width: screen.xs ? 128 : 200,
      dataIndex: 'id',
    },
  ];

  // upload modal

  const handleOpenModal = title => {
    setTitleModal(title);
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleChange = imgData => {
    // eslint-disable-next-line no-shadow
    setFileList(imgData.fileList);
  };

  const handleInputSearch = e => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleResetForm = () => {
    form.setFieldsValue({
      name: '',
      description: '',
    });
    setFileList([]);
  };

  const handleOpenViewDetail = () => {
    setIsOpenViewDetail(true);
  };

  const handleCloseViewDetail = () => {
    setIsOpenViewDetail(false);
  };

  const handleSubmitForm = values => {
    if (titleModal === 'Sửa') {
      alert('submit edit');
    } else if (titleModal === 'Thêm mới') {
      dispatch(
        actions.preparePostProductLine({
          name: values.name,
          description: values.description,
          image: values.image.file.originFileObj,
        }),
      );
    }
    if (!isProcessing) {
      handleResetForm();
    }
  };

  const handleDelProductLine = id => {
    alert(id);
  };

  const handleToggleShowAllDesc = () => {
    setShowAllDesc(prev => !prev);
  };

  return (
    <Container>
      <StyledInput
        placeholder="Nhập id muốn tìm "
        onChange={handleInputSearch}
        value={searchValue}
        loading={searchValue !== '' && isProcessing}
        size="large"
      />
      <StyledButton
        shape="round"
        type="primary"
        size="large"
        onClick={() => handleOpenModal('Thêm mới')}
      >
        <StyledSpanButton>
          Thêm mới <PlusCircleOutlined />
        </StyledSpanButton>
      </StyledButton>
      <StyledTable
        columns={screen.xs || (screen.sm && !screen.lg) ? mbColumns : PcColumns}
        // dataSource={data}
        dataSource={[
          {
            key: 1,
            stt: 1,
            name: 'name',
            description:
              'Chúng ta sẽ truyền props từ file index.jsx sang styled.js . Và điều chỉnh số dòng thông qua props đến thuộc tính css là -webkit-line-clamp . Mặc định số dòng hiển thị mình cho ở đây là 3 dòng .',
            imagePath: 'https://picsum.photos/200/300',
            createAt: new Date(new Date().valueOf()).toUTCString(),
            id: 0,
          },
        ]}
        size="large"
      />

      <Modal
        title={titleModal}
        centered
        open={isOpenModal}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          style={{ margin: 'auto', width: '100%' }}
          onFinish={handleSubmitForm}
          form={form}
        >
          <Form.Item
            label="Tên dòng sản phẩm"
            name="name"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập phẩm tên dòng sản phẩm !',
              },
            ]}
            style={{ marginBottom: 24 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mô tả!',
              },
            ]}
            style={{ marginBottom: 24 }}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Tải file ảnh" name="image">
            <Upload
              listType="picture"
              fileList={fileList}
              onChange={handleChange}
              maxCount={1}
            >
              <Tooltip
                title={
                  fileList.length === 1 ? 'Cập nhập lại ảnh ' : 'Đăng tải ảnh'
                }
              >
                <Button
                  type="primary"
                  size="medium"
                  icon={<UploadOutlined />}
                  shape="round"
                />
              </Tooltip>
            </Upload>
          </Form.Item>
          <StyledSubmitFormButton wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit" loading={isProcessing}>
              Xác nhận
            </Button>
          </StyledSubmitFormButton>
        </Form>
      </Modal>
    </Container>
  );
};
export default HomePage;
