export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  isEdit?: boolean;
}
export const UserColumns = [
  {
    key: 'name',
    type: 'text',
    label: 'First Name',
    required: true,
  },
  {
    key: 'username',
    type: 'text',
    label: 'Username',
    required: true,
  },
  {
    key: 'email',
    type: 'email',
    label: 'Email',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: 'Action',
  },
];
