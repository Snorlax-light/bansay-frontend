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
const baseUrl: string = isDevEnv
  ? 'http://localhost:3030'
  : 'http://ec2-18-219-109-27.us-east-2.compute.amazonaws.com:3030';

export class BansayService {
  private static instance?: BansayService;

  private authApi = new AuthApi({
    basePath: baseUrl,
    isJsonMime: () => true,
  });

  private liabilityApi = new LiabilityApi({
    basePath: baseUrl,
    isJsonMime: () => true,
    accessToken: () => localStorage.getItem('accessToken') || '',
  });

  static getInstance() {
    this.instance = this.instance || new BansayService();
    return this.instance;
  }

  // for authentication
  async loginUser(data: UserLoginDto) {
    const response = await this.authApi.authControllerLogin(data);
    if (response.status == 201 || response.status == 200) {
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
