# UserApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**userControllerGetUsers**](#usercontrollergetusers) | **GET** /user | |
|[**userControllerPatchUser**](#usercontrollerpatchuser) | **PATCH** /user/{id} | |

# **userControllerGetUsers**
> userControllerGetUsers()


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let status: 'Pending' | 'Active' | 'Deactivated'; // (optional) (default to undefined)
let role: 'Admin' | 'Officer' | 'Student'; // (optional) (default to undefined)

const { status, data } = await apiInstance.userControllerGetUsers(
    status,
    role
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **status** | [**&#39;Pending&#39; | &#39;Active&#39; | &#39;Deactivated&#39;**]**Array<&#39;Pending&#39; &#124; &#39;Active&#39; &#124; &#39;Deactivated&#39;>** |  | (optional) defaults to undefined|
| **role** | [**&#39;Admin&#39; | &#39;Officer&#39; | &#39;Student&#39;**]**Array<&#39;Admin&#39; &#124; &#39;Officer&#39; &#124; &#39;Student&#39;>** |  | (optional) defaults to undefined|


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

# **userControllerPatchUser**
> userControllerPatchUser(body)


### Example

```typescript
import {
    UserApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let id: string; // (default to undefined)
let body: object; //

const { status, data } = await apiInstance.userControllerPatchUser(
    id,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

