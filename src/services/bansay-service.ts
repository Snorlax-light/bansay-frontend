import {
  AuthApi,
  LiabilityApi,
  type UserLoginDto,
  type UserRegisterDto,
  type CreateLiabilityDto,
  type Liability,
  type MyLiabilitiesResponseDto,
  type LiabilityControllerFindAllStatusEnum,
  type LiabilityControllerFindAllSortOrderEnum,
} from './sdk';

export interface QueryLiabilityParams {
  status?: LiabilityControllerFindAllStatusEnum;
  studentUsername?: string;
  sortBy?: string;
  sortOrder?: LiabilityControllerFindAllSortOrderEnum;
}

export interface UpdateLiabilityDto {
  studentUsername?: string;
  type?: 'tuition' | 'fee' | 'fine' | 'other';
  amount?: number;
  dueDate?: string;
}

const isDevEnv = process.env.NODE_ENV == 'development';
const baseUrl: string = isDevEnv ? 'http://localhost:3030' :
'https://6f12ecy5s4.execute-api.us-east-2.amazonaws.com/prod';

export class BansayService {
  private static instance?: BansayService;

  private authApi = new AuthApi({
    basePath: baseUrl,
    isJsonMime: () => true,
  });

  private liabilityApi = new LiabilityApi({
    basePath: baseUrl,
    isJsonMime: () => true,
    accessToken: () => localStorage.getItem('accessToken') || '', //needs local storage token for auth
  });

  static getInstance() {
    this.instance = this.instance || new BansayService();
    return this.instance;
  }

  // for authentication
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
      throw new Error(response.statusText || 'Bad Request');
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
      throw new Error(response.statusText || 'Bad Request');
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


  // liability services

  // Officer only: Create liability
  async createLiability(data: CreateLiabilityDto): Promise<Liability> {
    const response = await this.liabilityApi.liabilityControllerCreate(data);
    if (response.status === 201 || response.status === 200) {
      return response.data;
    }
    throw new Error(response.statusText || 'Failed to create liability');
  }

  // Student only: Get my liabilities
  async getMyLiabilities(): Promise<MyLiabilitiesResponseDto> {
    const response = await this.liabilityApi.liabilityControllerFindMy();
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(response.statusText || 'Failed to fetch liabilities');
  }

  // Officer/Admin: Get all liabilities with optional filters
  async getAllLiabilities(query?: QueryLiabilityParams): Promise<Liability[]> {
    const response = await this.liabilityApi.liabilityControllerFindAll(
      query?.status,
      query?.studentUsername,
      query?.sortBy,
      query?.sortOrder
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(response.statusText || 'Failed to fetch liabilities');
  }

  // Officer/Admin: Get liability by ID
  async getLiabilityById(id: number): Promise<Liability> {
    const response = await this.liabilityApi.liabilityControllerFindOne(String(id));
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(response.statusText || 'Liability not found');
  }

  // Officer/Admin: Update liability
  async updateLiability(id: number, data: UpdateLiabilityDto): Promise<Liability> {
    const response = await this.liabilityApi.liabilityControllerUpdate(String(id), data);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(response.statusText || 'Failed to update liability');
  }

  // Officer/Admin: Soft delete liability
  async deleteLiability(id: number): Promise<void> {
    const response = await this.liabilityApi.liabilityControllerSoftDelete(String(id));
    if (response.status !== 204 && response.status !== 200) {
      throw new Error(response.statusText || 'Failed to delete liability');
    }
  }
}
