# LiabilityApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**liabilityControllerCreate**](#liabilitycontrollercreate) | **POST** /liability | Create a new liability (Officer Only)|
|[**liabilityControllerFindAll**](#liabilitycontrollerfindall) | **GET** /liability | Find all liabilities (Officer/Admin Only)|
|[**liabilityControllerFindMy**](#liabilitycontrollerfindmy) | **GET** /liability/me | Find all liabilities for the logged-in student|
|[**liabilityControllerFindOne**](#liabilitycontrollerfindone) | **GET** /liability/{id} | Find one liability by ID (Officer/Admin Only)|
|[**liabilityControllerSoftDelete**](#liabilitycontrollersoftdelete) | **DELETE** /liability/{id} | Soft-delete a liability (Officer/Admin Only)|
|[**liabilityControllerUpdate**](#liabilitycontrollerupdate) | **PATCH** /liability/{id} | Update a liability (Officer/Admin Only)|

# **liabilityControllerCreate**
> Liability liabilityControllerCreate(createLiabilityDto)


### Example

```typescript
import {
    LiabilityApi,
    Configuration,
    CreateLiabilityDto
} from './api';

const configuration = new Configuration();
const apiInstance = new LiabilityApi(configuration);

let createLiabilityDto: CreateLiabilityDto; //

const { status, data } = await apiInstance.liabilityControllerCreate(
    createLiabilityDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createLiabilityDto** | **CreateLiabilityDto**|  | |


### Return type

**Liability**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Liability created successfully |  -  |
|**403** | Forbidden. Not an Officer. |  -  |
|**404** | Student not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **liabilityControllerFindAll**
> Array<Liability> liabilityControllerFindAll()


### Example

```typescript
import {
    LiabilityApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LiabilityApi(configuration);

let status: 'Unpaid' | 'Paid' | 'Cancelled'; //Filter by liability status (optional) (default to undefined)
let studentUsername: string; //Filter by the student ID (optional) (default to undefined)
let sortBy: string; //Field to sort by (e.g., \'dueDate\', \'amount\', \'status\') (optional) (default to undefined)
let sortOrder: 'ASC' | 'DESC'; //Sorty order (\'ASC\' or \'DESC\') (optional) (default to undefined)

const { status, data } = await apiInstance.liabilityControllerFindAll(
    status,
    studentUsername,
    sortBy,
    sortOrder
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **status** | [**&#39;Unpaid&#39; | &#39;Paid&#39; | &#39;Cancelled&#39;**]**Array<&#39;Unpaid&#39; &#124; &#39;Paid&#39; &#124; &#39;Cancelled&#39;>** | Filter by liability status | (optional) defaults to undefined|
| **studentUsername** | [**string**] | Filter by the student ID | (optional) defaults to undefined|
| **sortBy** | [**string**] | Field to sort by (e.g., \&#39;dueDate\&#39;, \&#39;amount\&#39;, \&#39;status\&#39;) | (optional) defaults to undefined|
| **sortOrder** | [**&#39;ASC&#39; | &#39;DESC&#39;**]**Array<&#39;ASC&#39; &#124; &#39;DESC&#39;>** | Sorty order (\&#39;ASC\&#39; or \&#39;DESC\&#39;) | (optional) defaults to undefined|


### Return type

**Array<Liability>**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A list of liabilities. |  -  |
|**403** | Forbidden. Insufficient role. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **liabilityControllerFindMy**
> MyLiabilitiesResponseDto liabilityControllerFindMy()


### Example

```typescript
import {
    LiabilityApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LiabilityApi(configuration);

const { status, data } = await apiInstance.liabilityControllerFindMy();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**MyLiabilitiesResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A list of the student\&#39;s liabilities and their total balance. |  -  |
|**403** | Forbidden. Not a Student. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **liabilityControllerFindOne**
> Liability liabilityControllerFindOne()


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

**Liability**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Liability retrieved successfully |  -  |
|**403** | Forbidden. Insufficient role. |  -  |
|**404** | Liability not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **liabilityControllerSoftDelete**
> liabilityControllerSoftDelete()


### Example

```typescript
import {
    LiabilityApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LiabilityApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.liabilityControllerSoftDelete(
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

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | Liability soft-deleted successfully. |  -  |
|**403** | Forbidden. Insufficient role. |  -  |
|**404** | Liability not found |  -  |
|**409** | Cannot delete a liability that is already paid |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **liabilityControllerUpdate**
> Liability liabilityControllerUpdate(body)


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

**Liability**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Liability updated successfully |  -  |
|**403** | Forbidden. Insufficient role. |  -  |
|**404** | Liability not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

