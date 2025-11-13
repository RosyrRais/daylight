import { Outlet } from '@edenx/runtime/router';
import './index.css';
import { AnimatePresence } from 'motion/react';

const Layout = (): JSX.Element => (
  <AnimatePresence>
    <div>
      <Outlet />
    </div>
  </AnimatePresence>
);

export default Layout;
