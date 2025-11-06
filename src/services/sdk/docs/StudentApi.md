# StudentApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**studentControllerCreate**](#studentcontrollercreate) | **POST** /students | |
|[**studentControllerDeleteStudent**](#studentcontrollerdeletestudent) | **DELETE** /students/{id} | |
|[**studentControllerFindAll**](#studentcontrollerfindall) | **GET** /students | |
|[**studentControllerPatchStudent**](#studentcontrollerpatchstudent) | **PATCH** /students/{id} | |

# **studentControllerCreate**
> studentControllerCreate(studentRegistrationDto)


### Example

```typescript
import {
    StudentApi,
    Configuration,
    StudentRegistrationDto
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

let studentRegistrationDto: StudentRegistrationDto; //

const { status, data } = await apiInstance.studentControllerCreate(
    studentRegistrationDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **studentRegistrationDto** | **StudentRegistrationDto**|  | |


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

# **studentControllerDeleteStudent**
> studentControllerDeleteStudent()


### Example

```typescript
import {
    StudentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.studentControllerDeleteStudent(
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

# **studentControllerFindAll**
> Array<StudentDto> studentControllerFindAll()


### Example

```typescript
import {
    StudentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

const { status, data } = await apiInstance.studentControllerFindAll();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<StudentDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**0** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **studentControllerPatchStudent**
> studentControllerPatchStudent(studentPatchDto)


### Example

```typescript
import {
    StudentApi,
    Configuration,
    StudentPatchDto
} from './api';

const configuration = new Configuration();
const apiInstance = new StudentApi(configuration);

let id: string; // (default to undefined)
let studentPatchDto: StudentPatchDto; //

const { status, data } = await apiInstance.studentControllerPatchStudent(
    id,
    studentPatchDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **studentPatchDto** | **StudentPatchDto**|  | |
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

