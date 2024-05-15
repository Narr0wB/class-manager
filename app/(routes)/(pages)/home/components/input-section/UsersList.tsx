type UsersListProps = {
} & React.HTMLAttributes<HTMLDivElement>

const UsersList: React.FC<UsersListProps> = (props) => {
  return (
    <div id="users-list" {...props}>
    </div>
  )
}

UsersList.displayName = "UsersList";

export default UsersList;