import { AdminDashboard } from "./test/AdminDashboard"

const HomeClientAdmin: React.FC = () => {
  return (
    <div>
      <AdminDashboard
      mails={[]}
      defaultLayout = {undefined}
      defaultCollapsed = {false}
      navCollapsedSize={1000}
      >
      </AdminDashboard>
    </div>
  );
}

export default HomeClientAdmin;