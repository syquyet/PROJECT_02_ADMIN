import axios from "axios";


class LoginRepository {
  async   getUsers() {
    const response = await axios.get(" http://localhost:3000/admin") 
    
    return response.data 
    
    
  }
  createUser(userEntity: any) {
    localStorage.setItem("admin", JSON.stringify(userEntity));
  }
}
export default LoginRepository;