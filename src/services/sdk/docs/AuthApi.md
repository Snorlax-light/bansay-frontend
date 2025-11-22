# AuthApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authControllerGetMe**](#authcontrollergetme) | **GET** /auth/me | |
|[**authControllerLogin**](#authcontrollerlogin) | **POST** /auth/login | |
|[**authControllerRegister**](#authcontrollerregister) | **POST** /auth/register | |

# **authControllerGetMe**
> authControllerGetMe()


### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

const { status, data } = await apiInstance.authControllerGetMe();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerLogin**
> LoginResponseDto authControllerLogin(userLoginDto)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    UserLoginDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let userLoginDto: UserLoginDto; //

const { status, data } = await apiInstance.authControllerLogin(
    userLoginDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userLoginDto** | **UserLoginDto**|  | |


### Return type

**LoginResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**0** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerRegister**
> RegisterResponseDto authControllerRegister(userRegisterDto)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    UserRegisterDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let userRegisterDto: UserRegisterDto; //

const { status, data } = await apiInstance.authControllerRegister(
    userRegisterDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userRegisterDto** | **UserRegisterDto**|  | |


### Return type

**RegisterResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**0** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

