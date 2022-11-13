import { BaseService } from "../../libs/base.service";
import { IUserFull, UserService } from "../../libs/user.service";
import { SearchTable } from "../wrapper/SearchTable";
import { UpdateUserDialog } from "./UpdateUserDialog";

interface UserTableRowProps {
  item: IUserFull;
}

function UserTableRow({ item }: UserTableRowProps) {
  return (
    <tr>
      <td>{item.user_id}</td>
      <td>
        {item.user_firstname} {item.user_lastname}
      </td>
      <td>{item.user_email}</td>
      <td>{item.user_phone_number}</td>
      <td>
        <UpdateUserDialog />
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
