import React from 'react';
import AdminTemplate from '../../template/AdminTemplate';
type Props = {
  children: JSX.Element | JSX.Element[];
};

const PrivateRoute = (props: Props) => {
  const { children } = props;
  return <AdminTemplate>{children}</AdminTemplate>;
};

export default PrivateRoute;
