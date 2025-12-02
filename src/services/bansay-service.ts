import { AuthApi, type UserLoginDto, type UserRegisterDto } from './sdk';
const isDevEnv = process.env.NODE_ENV === 'development';
const baseUrl: string = isDevEnv
  ? 'http://localhost:3030'
  : 'http://ec2-18-219-109-27.us-east-2.compute.amazonaws.com:3030';
export class BansayService {
  private static instance?: BansayService;
  private authApi = new AuthApi({
    basePath: baseUrl,
    isJsonMime: () => true,
  });
  static getInstance() {
    this.instance = this.instance || new BansayService();
    return this.instance;
  }
  async loginUser(data: UserLoginDto) {
    const response = await this.authApi.authControllerLogin(data);
    if (response.status == 201 || response.status == 200) {
      //save access token (response.data.accessToken) to localStorage
      return response.data;
    } else {
      throw new Error(response.statusText || 'Bad Request');
    }
  }
  async registerUser(data: UserRegisterDto) {
    const response = await this.authApi.authControllerRegister(data);
    if (response.status == 201 || response.status == 200) {
      return response.data;
    } else {
      throw new Error(response.statusText || 'Bad Request');
    }
  }
}
