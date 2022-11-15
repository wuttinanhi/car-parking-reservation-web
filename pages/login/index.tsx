import LoginForm from "../../components/auth/login";

export default function LoginIndex() {
  return (
    <div className="vh-100 max-vh-100 max-vw-100 ">
      <div className="row h-100 mx-0">
        <div className="col-sm-12 my-auto">
          <div className="w-25 mx-auto">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
