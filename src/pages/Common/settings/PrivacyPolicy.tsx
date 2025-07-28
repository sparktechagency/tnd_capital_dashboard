import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import ReuseButton from "../../../ui/Button/ReuseButton";
import Topbar from "../../../Components/Shared/Topbar";
import { useAppSelector } from "../../../redux/hooks";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { collapsed } = useAppSelector((state) => state.auth);

  const handleOnSave = () => {
    console.log(content);
  };

  return (
    <div className=" min-h-screen ">
      <Topbar collapsed={collapsed}></Topbar>
      <div className=" flex justify-center items-center mt-10">
        <div className="w-full">
          <div className="">
            <JoditEditor
              ref={editor}
              value={content}
              config={{ height: 500, theme: "light", readonly: false }}
              onBlur={(newContent) => setContent(newContent)}
            />
          </div>
          <ReuseButton
            variant="secondary"
            htmlType="submit"
            className="mt-5"
            onClick={handleOnSave}
          >
            Save
          </ReuseButton>
        </div>
      </div>
    </div>
  );
};
export default PrivacyPolicy;
