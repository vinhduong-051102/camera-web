import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
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
  Select,
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
import { selectIsProcessing, selectDialogConfig } from './selectors';
import { fetchDataProductsSuccess } from '../../shared/components/Sidebar/actions';

const ProductsPage = () => {
  const schema = yup.object().shape({
    price: yup
      .number()
      .required('Vui lòng nhập giá sản phẩm')
      .typeError('Vui lòng chỉ nhập số')
      .positive('Vui lòng chỉ nhập số dương'),
    discount: yup
      .number()
      .required('Vui lòng nhập phần trăm giảm giá sản phẩm')
      .typeError('Vui lòng chỉ nhập số')
      .positive('Vui lòng chỉ nhập số dương'),
    bonus: yup
      .number()
      .required('Vui lòng nhập hoa hồng sản phẩm')
      .typeError('Vui lòng chỉ nhập số')
      .positive('Vui lòng chỉ nhập số dương'),
  });

  const yupSync = {
    async validator({ field }, value) {
      await schema.validateSyncAt(field, { [field]: value });
    },
  };

  const listProductId = useSelector(selectors.selectListProductLineId());
  const dialogConfig = useSelector(selectDialogConfig());
  const isProcessing = useSelector(selectIsProcessing());
  const dispatch = useDispatch();
  const key = REDUX_KEY.productLinePage;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const screen = Grid.useBreakpoint();
  const [form] = Form.useForm();
  // eslint-disable-next-line no-unused-vars
  const data = useSelector(selectors.selectProductsData());
  const [searchValue, setSearchValue] = React.useState('');
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [fileList, setFileList] = React.useState([]);
  const [isOpenViewDetail, setIsOpenViewDetail] = React.useState(false);
  const [titleModal, setTitleModal] = React.useState('');
  const [showAllDesc, setShowAllDesc] = React.useState(false);
  const [productId, setProductId] = React.useState(undefined);
  const [productLineId, setProductLineId] = React.useState(listProductId[0]);
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      width: 80,
      align: 'center',
      responsive: ['xxl', 'xl', 'lg', 'md', 'sm'],
    },
    // {
    //   title: 'Ảnh',
    //   dataIndex: 'imagePath',
    //   render: imagePath => (
    //     <img style={{ width: 100, height: 100 }} src={imagePath} alt="" />
    //   ),
    //   width: 150,
    //   responsive: ['xxl', 'xl', 'lg'],
    // },
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
      title: 'Giá',
      dataIndex: 'price',
      responsive: screen.xl ? ['xxl', 'xl', 'lg'] : [''],
    },
    {
      title: 'Khuyến mãi',
      dataIndex: 'discount',
      responsive: screen.xl ? ['xxl', 'xl', 'lg'] : [''],
    },
    {
      title: 'Hoa hồng',
      dataIndex: 'bonus',
      responsive: screen.xl ? ['xxl', 'xl', 'lg'] : [''],
    },
    {
      title: 'Tổng',
      dataIndex: 'total',
      responsive: screen.xl ? ['xxl', 'xl', 'lg'] : [''],
    },
    {
      title: 'Thông tin chung về giá',
      render: (text, record) => (
        <Descriptions
          column={{ md: 1 }}
          size="small"
          labelStyle={{ fontWeight: 'bold' }}
        >
          <Descriptions.Item label="Giá">{record.price}</Descriptions.Item>
          <Descriptions.Item label="Khuyến mại">
            {record.discount}
          </Descriptions.Item>
          <Descriptions.Item label="Hoa hồng">{record.bonus}</Descriptions.Item>
          <Descriptions.Item label="Tổng">{record.total}</Descriptions.Item>
        </Descriptions>
      ),
      width: 300,
      responsive: screen.lg && !screen.xl && !screen.xxl ? ['lg'] : [''],
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
            onConfirm={() => handleDelProduct(id)}
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
        </div>
      ),
      dataIndex: 'id',
      width: 150,
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
      render: (id, record) => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Popconfirm
            title="Xác nhận xoá"
            okText="Xác nhận"
            cancelText="Huỷ"
            onConfirm={() => handleDelProduct(id)}
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
              <Descriptions.Item label="Giá">{record.price}</Descriptions.Item>
              <Descriptions.Item label="Khuyến mại">
                {record.discount}
              </Descriptions.Item>
              <Descriptions.Item label="Hoa hồng">
                {record.bonus}
              </Descriptions.Item>
              <Descriptions.Item label="Tổng">{record.total}</Descriptions.Item>
            </Descriptions>
          </Modal>
        </div>
      ),
      width: screen.xs ? 128 : 200,
      dataIndex: 'id',
      responsive: screen.lg ? ['xs'] : ['xs', 'sm'],
    },
  ];

  // upload modal

  const handleOpenModal = (title, id) => {
    setTitleModal(title);
    setIsOpenModal(true);
    setProductId(id);
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
    dispatch(actions.searchProducts(value));
  };

  const handleResetForm = () => {
    setIsOpenModal(false);
    form.setFieldsValue({
      name: '',
      description: '',
      bonus: '',
      price: '',
      discount: '',
      productLineId: '',
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
    const listImageFile = values.image.fileList.map(img => img.originFileObj);
    dispatch(
      actions.preparePostProduct({
        ...values,
        image: listImageFile,
        id: productId,
      }),
    );
    if (!isProcessing) {
      handleResetForm();
      setProductId(undefined);
    }
  };

  const handleDelProduct = id => {
    dispatch(actions.deleteProduct(id));
  };

  const handleToggleShowAllDesc = () => {
    setShowAllDesc(prev => !prev);
  };

  const handleFilterDataByProductLineId = value => {
    setProductLineId(value);
    dispatch(fetchDataProductsSuccess(value));
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
        dataSource={data}
        size="large"
        loading={isProcessing}
        footer={() => (
          <Select
            options={listProductId.map(id => ({ value: id, label: id }))}
            style={
              !screen.lg && !screen.xl && !screen.xxl
                ? { width: '98%' }
                : { width: 320 }
            }
            defaultValue={productLineId}
            onChange={handleFilterDataByProductLineId}
            value={productLineId}
          />
        )}
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
            label="Tên sản phẩm"
            name="name"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập phẩm tên sản phẩm !',
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
            label="Giá"
            name="price"
            rules={[yupSync]}
            style={{ marginBottom: 24 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phần trăm giảm giá"
            name="discount"
            rules={[yupSync]}
            style={{ marginBottom: 24 }}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Hoa hồng" style={{ marginBottom: 24 }}>
            <Input.Group compact>
              <Form.Item
                style={{ width: '75%' }}
                name="bonus"
                rules={[yupSync]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={{ width: '25%' }}
                name="idBonusType"
                rules={[{ required: true, message: 'Vui lòng chọn đơn vị' }]}
              >
                <Select>
                  <Select.Option value="1">VND</Select.Option>
                  <Select.Option value="2">%</Select.Option>
                </Select>
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item
            label="ID dòng sản phẩm"
            name="productLineId"
            style={{ marginBottom: 24 }}
            rules={[
              { required: true, message: 'Vui lòng chọn ID dòng sản phẩm' },
            ]}
          >
            <Select
              options={listProductId.map(id => ({ value: id, label: id }))}
            />
          </Form.Item>
          <Form.Item
            label="Tải file ảnh"
            name="image"
            rules={[{ required: true, message: 'Chọn tối thiểu 1 ảnh' }]}
          >
            <Upload
              listType="picture"
              fileList={fileList}
              onChange={handleChange}
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
    </Container>
  );
};
export default ProductsPage;
