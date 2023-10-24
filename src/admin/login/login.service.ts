
import LoginRepository from "./login.reponsitory";


class LoginService {
  async loginUser(userModal: any) {
    const loginRepository = new LoginRepository();
    const accountsDB = await loginRepository.getUsers();

    let userEntity: any = {};
    for (const userDB of accountsDB) {
      if (userDB.email === userModal.email) {
        if (userDB.password === userModal.password) {
          userEntity = { ...userDB };
          break;
        }
      }
    }

    if (userEntity.id) {
      loginRepository.createUser(userEntity.id);
      return {
        status: "success",
        data: "",
        messge: "Đăng nhập thành công",
      };
    } else {
      return {
        status: "fail",
        data: "",
        messge: "đăng nhập thất bại",
      };
    }
  }
  validator(userModal: any) {
    const error = {
      isError: false,
      email: "",
      password: "",
    };
    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!userModal.email.match(validRegex)) {
      error.isError = true;
      error.email = "*Nhập đúng định dạng email";
    }
    if (!userModal.password) {
      error.isError = true;
      error.password = "*Mật khẩu không được để trống";
    }

    return error;
  }

  renderValidator(error: any) {
    const errorElements = document.querySelectorAll(".error");
    errorElements.forEach((element) => {
      for (const key in error) {
        if (key === element.id.slice(6)) {
          element.textContent = error[key];
        }
      }
    });
  }
}
export default LoginService;
