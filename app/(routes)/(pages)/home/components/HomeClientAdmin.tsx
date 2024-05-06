import { AdminDashboard } from "./test/AdminDashboard"

const HomeClientAdmin: React.FC = () => {
  return (
    <div>
      <AdminDashboard
      accounts={[{label: "eddu", email: "gaming"} ]}
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