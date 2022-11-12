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
  notification,
} from 'antd';
import { v4 } from 'uuid';
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
import { selectIsProcessing, selectDialogConfig } from './selectors';

const ProductLinePage = () => {
  const dialogConfig = useSelector(selectDialogConfig());
  const isProcessing = useSelector(selectIsProcessing());
  const dispatch = useDispatch();
  const key = REDUX_KEY.productLinePage;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const screen = Grid.useBreakpoint();
  const [form] = Form.useForm();
  // eslint-disable-next-line no-unused-vars
  const data = useSelector(selectors.selectProductLineData());
  const [searchValue, setSearchValue] = React.useState('');
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [fileList, setFileList] = React.useState([]);
  const [isOpenViewDetail, setIsOpenViewDetail] = React.useState(false);
  const [titleModal, setTitleModal] = React.useState('');
  const [showAllDesc, setShowAllDesc] = React.useState(false);
  const [productLineId, setProductLineId] = React.useState(undefined);
  const [viewDetailData, setViewDetailData] = React.useState({});
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      width: 80,
      align: 'center',
      responsive: ['xxl', 'xl', 'lg', 'md', 'sm'],
    },
    {
      title: 'Ảnh',
      dataIndex: 'imagePath',
      render: imagePath => (
        <img style={{ width: 100, height: 100 }} src={imagePath} alt="" />
      ),
      width: 150,
      responsive: ['xxl', 'xl', 'lg'],
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      width: !screen.xl || !screen.xxl ? 100 : 200,
      responsive: ['xxl', 'xl', 'lg'],
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
      responsive: ['xxl', 'xl', 'lg'],
    },

    {
      title: 'Thời gian tạo',
      dataIndex: 'createAt',
      width: 250,
      responsive: ['xxl', 'xl', 'lg'],
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
      responsive: screen.lg ? ['xs'] : ['xs', 'sm'],
    },
    {
      title: 'Thao tác',
      render: id => (
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
              onClick={() => handleOpenModal('Sửa', id)}
            />
          </Tooltip>
          <Tooltip title="Xem chi tiết">
            <Button
              icon={<EyeOutlined />}
              shape="circle"
              onClick={() => handleOpenViewDetail(id)}
            />
          </Tooltip>
        </div>
      ),
      width: screen.xs ? 128 : 200,
      dataIndex: 'id',
    },
  ];

  // upload modal

  const handleOpenModal = async (title, id) => {
    if (id) {
      const productLineByID = data.find(item => item.id === id);
      const response = await fetch(productLineByID.imagePath);
      const blob = await response.blob();
      const rawFile = new File([blob], productLineByID.fileName, {
        type: blob.type,
      });
      const file = {
        originFileObj: rawFile,
        uid: v4(),
        name: productLineByID.fileName,
        thumbUrl: productLineByID.imagePath,
      };
      // eslint-disable-next-line no-shadow
      const fileList = {
        file,
        fileList: [file],
      };
      setProductLineId(id);
      // setFileList(fileList);
      form.setFieldsValue({
        name: productLineByID.name,
        description: productLineByID.description,
        image: fileList,
      });
    } else {
      form.setFieldsValue({
        name: '',
        description: '',
        image: [],
      });
    }
    setTitleModal(title);
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    handleResetForm();
  };

  // const handleChange = imgData => {
  //   // eslint-disable-next-line no-shadow
  //   setFileList(imgData.fileList);
  // };

  const handleInputSearch = e => {
    const { value } = e.target;
    setSearchValue(value);
    dispatch(actions.searchProductLine(value));
  };

  const handleResetForm = () => {
    form.setFieldsValue({
      name: '',
      description: '',
      image: [],
    });
    setIsOpenModal(false);
  };

  const handleOpenViewDetail = id => {
    setIsOpenViewDetail(true);
    setViewDetailData(data.find(productLine => productLine.id === id));
  };

  const handleCloseViewDetail = () => {
    setIsOpenViewDetail(false);
    setViewDetailData({});
  };

  const handleSubmitForm = values => {
    dispatch(
      actions.preparePostProductLine({
        name: values.name,
        description: values.description,
        image: values.image.file
          ? values.image.file.originFileObj
          : values.image[0].originFileObj,
        id: productLineId,
      }),
    );
    setProductLineId(undefined);
    if (!isProcessing) {
      handleResetForm();
    }
  };

  const handleDelProductLine = id => {
    dispatch(actions.deleteProductLine(id));
  };

  const handleToggleShowAllDesc = () => {
    setShowAllDesc(prev => !prev);
  };

  React.useEffect(() => {
    const { type, message, description } = dialogConfig;
    if (type) {
      notification[type]({
        message,
        description,
      });
    }
  }, [dialogConfig.type, dialogConfig.message, dialogConfig.description]);

  return (
    <Container>
      <StyledInput
        placeholder="Nhập tên muốn tìm "
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
        columns={columns}
        dataSource={data
          .filter(item => item.id !== '00000000-0000-0000-0000-000000000000')
          .map((item, index) => ({ ...item, stt: index + 1 }))}
        // dataSource={[
        //   {
        //     key: 1,
        //     stt: 1,
        //     name: 'name',
        //     description:
        //       'Chúng ta sẽ truyền props từ file index.jsx sang styled.js . Và điều chỉnh số dòng thông qua props đến thuộc tính css là -webkit-line-clamp . Mặc định số dòng hiển thị mình cho ở đây là 3 dòng .',
        //     imagePath: 'https://picsum.photos/200/300',
        //     createAt: new Date(new Date().valueOf()).toUTCString(),
        //     id: 0,
        //   },
        size="large"
        loading={isProcessing}
      />

      <Modal
        title={titleModal}
        centered
        open={isOpenModal}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
        footer={null}
        getContainer={false}
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
          <Form.Item
            label="Tải file ảnh"
            name="image"
            getValueProps={value => {
              setFileList(value);
            }}
            getValueFromEvent={value => value.fileList}
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn ảnh !',
              },
            ]}
          >
            <Upload
              listType="picture"
              fileList={fileList.fileList}
              maxCount={1}
            >
              <Tooltip title="Đăng tải ảnh">
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
      <Modal
        title="Chi tiết thông tin"
        open={isOpenViewDetail}
        centered
        onCancel={handleCloseViewDetail}
        onOk={handleCloseViewDetail}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Hình ảnh">
            <img
              width={100}
              height={100}
              src={viewDetailData.imagePath}
              alt=""
            />
          </Descriptions.Item>
          <Descriptions.Item label="Tên dòng sản phẩm">
            {viewDetailData.name}
          </Descriptions.Item>
          <Descriptions.Item label="Mô tả">
            {viewDetailData.description}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">
            {viewDetailData.createAt}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </Container>
  );
};
export default ProductLinePage;
