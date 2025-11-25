import { AuthApi, type UserLoginDto, type UserRegisterDto } from './sdk'
const isDevEnv = process.env.NODE_ENV == 'development';
const baseUrl: string = isDevEnv ? 'http://localhost:3030' :
  'http://ec2-18-219-109-27.us-east-2.compute.amazonaws.com:3030';
export class BansayService {

  private static instance?: BansayService;
  private authApi = new AuthApi({
    basePath: baseUrl,
    isJsonMime: () => true,
    accessToken: () => localStorage.getItem('accessToken') || '',
  })
  static getInstance() {
    this.instance = this.instance || new BansayService();
    return this.instance;
  }
  async loginUser(data: UserLoginDto) {
    const response = await this.authApi.authControllerLogin(data);
    if (response.status == 201 || response.status == 200) {
      //save access token (response.data.accessToken) to localStorage
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
      }
      // User data is NOT stored in localStorage for data privacy
      // Use getCurrentUser() to fetch user data when needed
      return response.data;
    } else {
      throw new Error(response.statusText || "Bad Request");
    }
  }
  async registerUser(data: UserRegisterDto) {
    const response = await this.authApi.authControllerRegister(data);
    if (response.status == 201 || response.status == 200) {
      if (response.data.user) {
        // Note: Register might not return a token depending on backend implementation, 
        // but if it does or if we want to auto-login, we'd handle it here.
        // The current backend register response seems to only return the user.
        // If auto-login is needed after register, we might need to call login or backend needs to return token.
        // For now, we just return the data.
      }
      return response.data;
    } else {
      throw new Error(response.statusText || "Bad Request");
    }
  }

  async getCurrentUser() {
    const response = await this.authApi.authControllerGetMe();
    if (response.status == 200) {
      return response.data;
    } else {
      throw new Error(response.statusText || "Failed to get current user");
    }
  }

  logout() {
    localStorage.removeItem('accessToken');
  }
}

