import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import config from "Constants/environment";
import useGet from "Custom Hooks/useGet";
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  notification,
} from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";


const AllWorks = () => {
  const [data10, loading] = useGet(config.workplaces);
  const [data11, loading2] = useGet(config.engineeringunits);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (data10 && data11) {
      const formattedData = data10.map((item, index) => {
        const idWork =
          data11.find((item2) => item.engineeringUnitsId === item2.id)?.name || "";

        return {
          key: index,
          id: item.id,
          nameU: idWork,
          namew: item.name,
          location: item.location,
        };
      });
      setData(formattedData);
    }
  }, [data10, data11]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`بحث`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            بحث
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            إعادة تعيين
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            إغلاق
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "اسم الوحدة الهندسية",
      dataIndex: "nameU",
      key: "nameU",
    },
    {
      title: "اسم مكان العمل",
      dataIndex: "namew",
      key: "namew",
      ...getColumnSearchProps("namew"),
    },
    {
      title: "موقع مكان العمل",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "الإجراءات",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="هل أنت متأكد من الحذف؟"
            onConfirm={() => handleDelete(record)}
            okText="نعم"
            cancelText="لا"
          >
            <Button type="link" icon={<DeleteOutlined />}>حذف</Button>
          </Popconfirm>
          <Button type="link" icon={<EditOutlined />} onClick={() => showEditModal(record)}>
            تعديل
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = (record) => {
    axios
      .delete(`${config.baseUrl1}/${config.workplaces}/${record.id}`)
      .then(() => {
        notification.success({
          message: "تم الحذف بنجاح",
          description: `تم حذف المكان: ${record.namew}`,
        });
        setData((prevData) => prevData.filter((item) => item.id !== record.id));
        console.log(record.id)
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: "خطأ في الحذف",
          description: "حدث خطأ أثناء حذف مكان العمل",
        });
      });

  };

  const showEditModal = (record) => {
    setEditingUnit(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleEdit = () => {
    form
      .validateFields()
      .then((values) => {
        const unitId = data11.find((item) => item.name === values.nameU)?.id;

        const updatedValues = {
          engineeringUnitsId: unitId,
          name: values.namew,
          location: values.location,
          phone: "6554", // Assuming phone is not being updated but kept here
        };

        axios
          .put(
            `${config.baseUrl1}/${config.workplaces}/${editingUnit.id}`,
            updatedValues
          )
          .then(() => {
            notification.success({
              message: "تم التعديل بنجاح",
              description: `تم تعديل المكان: ${editingUnit.namew}`,
            });
            setIsModalVisible(false);
            setData((prevData) =>
              prevData.map((item) =>
                item.id === editingUnit.id
                  ? {
                    ...item,
                    nameU: values.nameU,
                    namew: values.namew,
                    location: values.location,
                  }
                  : item
              )
            );
            setEditingUnit(null); // Clear editing unit after successful edit
          })
          .catch((err) => {
            console.error(err);
            notification.error({
              message: "خطأ في التعديل",
              description: "حدث خطأ أثناء تعديل مكان العمل",
            });
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const [bordered, setBordered] = useState(false);
  const [size, setSize] = useState("large");
  const [showHeader, setShowHeader] = useState(true);
  const [hasData, setHasData] = useState(true);
  const [tableLayout, setTableLayout] = useState();
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState();

  const scroll = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = "100vw";
  }

  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis,
  }));

  if (xScroll === "fixed") {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = "right";
  }

  const tableProps = {
    bordered,
    loading: loading || loading2,
    size,
    showHeader,
    scroll,
    tableLayout,
  };
  return (
    <div className="bg-gray-100 h-full w-full p-1">
      <Table
        {...tableProps}
        pagination={false}
        columns={tableColumns}
        dataSource={hasData ? data : []}
        scroll={scroll}
        className="mt-10"
      />
      <Modal
        title="تعديل مكان العمل"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleEdit}
        okText="حفظ"
        cancelText="إلغاء"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nameU"
            label="اسم الوحدة الهندسية"
            rules={[{ required: false, message: "يرجى اختيار اسم الوحدة" }]}
          >
            <Select>
              {data11 &&
                data11.map((unit) => (
                  <Select.Option key={unit.id} value={unit.name}>
                    {unit.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="namew"
            label="اسم مكان العمل"
            rules={[{ required: false, message: "يرجى إدخال اسم مكان العمل" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label="موقع مكان العمل"
            rules={[{ required: false, message: "يرجى إدخال موقع مكان العمل" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AllWorks;