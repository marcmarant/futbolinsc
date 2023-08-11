import { Logout } from './Logout'

export const Nav = ({ user }) => {

  return (
      <div>
        <h2>Bienvenido al Nav, {user.uid}</h2>
        <Logout />
      </div>
  );
};