import config from "Constants/environment";
import useGet from "Custom Hooks/useGet";
import { Button, Input, Popconfirm, Space, Table, Modal, Form, notification } from "antd";
import React, { useState, useRef, useEffect } from "react";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import axios from "axios";

const AllDeparts = () => {
    const [data10, loading] = useGet(config.engineeringedepars);
    // const [searchText, setSearchText] = useState("");
    // const [searchedColumn, setSearchedColumn] = useState("");
    // const searchInput = useRef(null);
  
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUnit, setEditingUnit] = useState(null);
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
  
    useEffect(() => {
      if (data10) {
        const formattedData = data10.map((item, index) => ({
          key: index,
          id: item.id,
          nameD:item.name
        }));
        setData(formattedData);
      }
    }, [data10]);
  
    // const handleSearch = (selectedKeys, confirm, dataIndex) => {
    //   confirm();
    //   setSearchText(selectedKeys[0]);
    //   setSearchedColumn(dataIndex);
    // };
  
    // const handleReset = (clearFilters) => {
    //   clearFilters();
    //   setSearchText("");
    // };
  
    // const getColumnSearchProps = (dataIndex) => ({
    //   filterDropdown: ({
    //     setSelectedKeys,
    //     selectedKeys,
    //     confirm,
    //     clearFilters,
    //     close,
    //   }) => (
    //     <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
    //       <Input
    //         ref={searchInput}
    //         placeholder={`بحث `}
    //         value={selectedKeys[0]}
    //         onChange={(e) =>
    //           setSelectedKeys(e.target.value ? [e.target.value] : [])
    //         }
    //         onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
    //         style={{ marginBottom: 8, display: "block" }}
    //       />
    //       <Space>
    //         <Button
    //           type="primary"
    //           onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
    //           icon={<SearchOutlined />}
    //           size="small"
    //           style={{ width: 90 }}
    //         >
    //           بحث
    //         </Button>
    //         <Button
    //           onClick={() => clearFilters && handleReset(clearFilters)}
    //           size="small"
    //           style={{ width: 90 }}
    //         >
    //           إعادة تعيين
    //         </Button>
    //         <Button type="link" size="small" onClick={() => close()}>
    //           إغلاق
    //         </Button>
    //       </Space>
    //     </div>
    //   ),
    //   filterIcon: (filtered) => (
    //     <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    //   ),
    //   onFilter: (value, record) =>
    //     record[dataIndex]
    //       ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
    //       : "",
    //   onFilterDropdownOpenChange: (visible) => {
    //     if (visible) {
    //       setTimeout(() => searchInput.current?.select(), 100);
    //     }
    //   },
    //   render: (text) =>
    //     searchedColumn === dataIndex ? (
    //       <Highlighter
    //         highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
    //         searchWords={[searchText]}
    //         autoEscape
    //         textToHighlight={text ? text.toString() : ""}
    //       />
    //     ) : (
    //       text
    //     ),
    // });
  
    const columns = [
     
      {
        title: "اسم القسم الهندسي",
        dataIndex: "nameD",
        // ...getColumnSearchProps("nameD"),
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
        .delete(`${config.baseUrl1}/${config.engineeringedepars}/${record.id}`)
        .then((res) => {
          console.log(`Deleted unit with id: ${record.id}`);
          notification.success({
            message: "تم الحذف بنجاح",
            description: `تم حذف القسم: ${record.nameD}`,
          });
          setData((prevData) => prevData.filter((item) => item.id !== record.id));
        })
        .catch((err) => {
            notification.error({
                message: "خطأ في الحذف",
                description: "حدث خطأ أثناء القسم",
              });
          console.error(err);
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
          const updatedValues = {
          name: values.nameD
          };
  
          axios
            .put(`${config.baseUrl1}/${config.engineeringedepars}/${editingUnit.id}`, updatedValues)
            .then((res) => {
              console.log(`Updated unit with id: ${editingUnit.id}`);
              setIsModalVisible(false);
              setData((prevData) =>
                prevData.map((item) =>
                  item.id === editingUnit.id ? { ...item, ...values } : item
                )
              );
              notification.success({
                message: "تم التعديل بنجاح",
                description: `تم تعديل القسم: ${editingUnit.nameD}`,
              });
            })
            .catch((err) => {
              console.error(err);
              notification.error({
                message: "خطأ في التعديل",
                description: "حدث خطأ أثناء تعديل القسم",
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
    // const [rowSelection, setRowSelection] = useState({});
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
      loading,
      size,
      showHeader,
      // rowSelection,
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
          title="تعديل الوحدة"
         open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onOk={handleEdit}
          okText="حفظ"
          cancelText="إلغاء"
        >
          <Form form={form} layout="vertical">
        
            <Form.Item
              name="nameD"
              label="اسم القسم الهندسي"
              rules={[{ required: false, message: "يرجى إدخال اسم الوحدة" }]}
            >
              <Input />
            </Form.Item>
         </Form>
        </Modal>
      </div>
    );
  };

export default AllDeparts