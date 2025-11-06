# LiabilityApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**liabilityControllerCreate**](#liabilitycontrollercreate) | **POST** /liability | |
|[**liabilityControllerFindAll**](#liabilitycontrollerfindall) | **GET** /liability | |
|[**liabilityControllerFindOne**](#liabilitycontrollerfindone) | **GET** /liability/{id} | |
|[**liabilityControllerRemove**](#liabilitycontrollerremove) | **DELETE** /liability/{id} | |
|[**liabilityControllerUpdate**](#liabilitycontrollerupdate) | **PATCH** /liability/{id} | |

# **liabilityControllerCreate**
> liabilityControllerCreate(body)


### Example

```typescript
import {
    LiabilityApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LiabilityApi(configuration);

let body: object; //

const { status, data } = await apiInstance.liabilityControllerCreate(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **liabilityControllerFindAll**
> liabilityControllerFindAll()


### Example

```typescript
import {
    LiabilityApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LiabilityApi(configuration);

const { status, data } = await apiInstance.liabilityControllerFindAll();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **liabilityControllerFindOne**
> liabilityControllerFindOne()


### Example

```typescript
import {
    LiabilityApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LiabilityApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.liabilityControllerFindOne(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **liabilityControllerRemove**
> liabilityControllerRemove()


### Example

```typescript
import {
    LiabilityApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LiabilityApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.liabilityControllerRemove(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **liabilityControllerUpdate**
> liabilityControllerUpdate(body)


### Example

```typescript
import {
    LiabilityApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LiabilityApi(configuration);

let id: string; // (default to undefined)
let body: object; //

const { status, data } = await apiInstance.liabilityControllerUpdate(
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

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

