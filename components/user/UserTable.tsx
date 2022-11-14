import { useState } from "react";
import { BaseService } from "../../libs/base.service";
import { IUserFull, UserService } from "../../libs/user.service";
import { SearchTable } from "../wrapper/SearchTable";
import { UpdateUserDialog } from "./UpdateUserDialog";

interface UserTableRowProps {
  item: IUserFull;
}

function UserTableRow({ item }: UserTableRowProps) {
  const [user, setUser] = useState(item);

  function onChange(data: any) {
    setUser((prev) => ({ ...prev, ...data }));
  }

  return (
    <tr>
      <td>{user.user_id}</td>
      <td>
        {user.user_firstname} {user.user_lastname}
      </td>
      <td>{user.user_email}</td>
      <td>{user.user_phone_number}</td>
      <td>
        <UpdateUserDialog user={user} onChange={onChange} />
      </td>
    </tr>
  );
}

export function UserTable() {
  return (
    <SearchTable
      fetcher={(opts) => {
        const service = new UserService(BaseService.getFetcherWrapper());
        return service.pagination(opts);
      }}
      renderRow={(item, index) => (
        <UserTableRow key={index} item={item}></UserTableRow>
      )}
      headers={["ID", "Name", "Email", "Phone Number", "Actions"]}
    ></SearchTable>
  );
}
