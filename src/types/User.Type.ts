type TRole =
  | 'admin'
  | 'supervisor'
  | 'hr'
  | 'hubManager'
  | 'spokeManager'
  | 'fieldOfficer';
type TStatus = 'active' | 'blocked' | 'deactivated';

type IUser = {
  _id: string;
  uid: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  image: string;
  address: string;
  nid: string;
  hubId: string;
  spokeId: string;
  hubUid: string;
  spokeUid: string;
  cv: string;
  isDeleted: boolean;
  isAssignSpoke: boolean;
  role: TRole;
  status: TStatus;
  customFields: Map<string, unknown>;
};

export type { TRole, TStatus, IUser };
