/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Collapse,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Typography,
} from "antd";
import { MdDelete } from "react-icons/md";
import ReuseButton from "../../Button/ReuseButton";
import { toast } from "sonner";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useAddClassMutation } from "../../../redux/features/class/classAPi";
import { useState } from "react";

interface AddClassModalProps {
  selectedLevel: string;
  isAddClassModalVisible: boolean;
  handleCancel: () => void;
}

const AddClassModal: React.FC<AddClassModalProps> = ({
  selectedLevel,
  isAddClassModalVisible,
  handleCancel,
}) => {
  const [activeKey, setActiveKey] = useState<string[]>(["0"]);

  const [form] = Form.useForm();
  const [addClass] = useAddClassMutation();
  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        levelId: selectedLevel?.[0],
        className: values.className.trim(),
        section: values.sections.map((s: string) => s.trim()),
      };
      const res = await tryCatchWrapper(
        addClass,
        { body: payload },
        "Adding Level..."
      );

      if (res?.statusCode === 201) {
        form.resetFields();
        handleCancel();
      }
    } catch (error: any) {
      console.log("Validation failed:", error);

      const firstError =
        error?.errorFields?.[0]?.errors?.[0] || "Validation failed";

      toast.error(firstError);
    }
  };

  return (
    <Modal
      open={isAddClassModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <Form form={form} layout="vertical" className="p-4">
        {/* Class Name Input */}
        <Typography.Title level={5} className="mb-2">
          Class Name
        </Typography.Title>
        <Form.Item
          name="className"
          rules={[{ required: true, message: "Please enter class name" }]}
        >
          <Input
            placeholder="Class Name"
            className="h-12 rounded-md border border-gray-300"
            autoComplete="off"
          />
        </Form.Item>

        {/* Sections List */}
        <Typography.Title level={5}>Section</Typography.Title>
        <Form.List
          name="sections"
          initialValue={[""]}
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 1) {
                  return Promise.reject(
                    new Error("At least one section is required")
                  );
                }
                if (names.some((name: string) => !name?.trim())) {
                  return Promise.reject(
                    new Error("All sections must be filled")
                  );
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              <ConfigProvider
                theme={{
                  components: {
                    Collapse: {
                      contentBg: "#ffffff",
                      headerBg: "#ffffff",
                      colorTextHeading: "#111827",
                      colorText: "#374151",
                    },
                  },
                }}
              >
                <Collapse
                  className="!border-none mb-4"
                  accordion
                  activeKey={activeKey}
                  onChange={(key) =>
                    setActiveKey(Array.isArray(key) ? key : [key])
                  }
                >
                  {fields.map(({ key, name, ...restField }, idx) => (
                    <Collapse.Panel
                      header={`Section ${idx + 1}`}
                      key={String(key)}
                      extra={
                        fields.length > 1 ? (
                          <MdDelete
                            className="text-red-600 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              remove(name);
                            }}
                            size={22}
                          />
                        ) : null
                      }
                    >
                      <Form.Item
                        {...restField}
                        name={name}
                        rules={[
                          {
                            required: true,
                            message: "Please enter section name",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Type Section"
                          className="h-12 rounded-md border border-gray-300"
                          autoComplete="off"
                        />
                      </Form.Item>
                    </Collapse.Panel>
                  ))}
                </Collapse>
              </ConfigProvider>

              <ReuseButton
                icon={<PlusOutlined />}
                variant="outline"
                onClick={async () => {
                  try {
                    // Validate existing section fields before adding
                    const values = await form.validateFields(["sections"]);
                    const lastIndex = fields.length;

                    // Add new section
                    add("");

                    // Set form value explicitly (optional in most cases)
                    form.setFieldsValue({
                      sections: [...values.sections, ""],
                    });

                    // Set newly added panel as active
                    setActiveKey([String(lastIndex)]);

                    // Optional: scroll into view
                    setTimeout(() => {
                      document
                        .querySelector(`[data-node-key="${lastIndex}"]`)
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                    }, 100);
                  } catch (err) {
                    toast.error("Please fill out all existing sections first.");
                  }
                }}
                className="!w-fit"
              >
                Add More Section
              </ReuseButton>
            </>
          )}
        </Form.List>

        {/* Submit */}
        <div className="mt-5">
          <Form.Item className="mt-6">
            <Button
              type="primary"
              block
              size="large"
              onClick={handleSave}
              className="!bg-[#28314E] border-[#28314E]"
            >
              Add Class
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default AddClassModal;
