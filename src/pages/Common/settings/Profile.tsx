import Topbar from "../../../Components/Shared/Topbar";
import { EditIcon } from "../../../Components/svg/leads";
import { useAppSelector } from "../../../redux/hooks";
import ReuseButton from "../../../ui/Button/ReuseButton";
import ProfileInfo from "./ProfileInfo";

const Profile = () => {
  const { collapsed } = useAppSelector((state) => state.auth);
  const { role } = useAppSelector((state) => state.role);

  return (
    <div className=" min-h-screen ">
      <Topbar collapsed={collapsed}>
        <ReuseButton
          children="Edit Profile"
          url={`/${role}/settings/edit-profile`}
          onClick={() => {}}
          variant="outline"
          icon={EditIcon()}
          className=""
        />
      </Topbar>
      <ProfileInfo />
      {/* <EditProfile /> */}
    </div>
  );
};
export default Profile;
