import { navigation } from "../until/navigation";
import LoginService from "./login.service";

class LoginEvent {
  async onLogin(userModal: any) {
    const loginService = new LoginService();
    const error = loginService.validator(userModal);
    loginService.renderValidator(error);
    if (error.isError) {
      return;
    }
    const response = await loginService.loginUser(userModal);
    if (response.status === "success") {
      // alert(response.messge);
      navigation("/");
    } else {
      if (response.status === "fail") {
        alert(response.messge);
      }
    }
  }
}
export default LoginEvent;
