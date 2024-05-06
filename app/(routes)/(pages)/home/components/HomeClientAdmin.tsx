import { Mail } from "./test/AdminDashboard"

const HomeClientAdmin: React.FC = () => {
  return (
    <div>
      <Mail
      accounts={[{label: "eddu", email: "gaming"} ]}
      mails={[]}
      defaultLayout = {undefined}
      defaultCollapsed = {false}
      navCollapsedSize={1000}
      >
      </Mail>
    </div>
  );
}

export default HomeClientAdmin;