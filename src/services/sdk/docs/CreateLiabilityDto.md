# CreateLiabilityDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**studentUsername** | **string** | The student\&#39;s username | [default to undefined]
**type** | **string** | The type of liability | [default to undefined]
**amount** | **number** | The monetary amount of the liability | [default to undefined]
**dueDate** | **string** | The date the liability is due (YYYY-MM-DD) | [default to undefined]

## Example

```typescript
import { CreateLiabilityDto } from './api';

const instance: CreateLiabilityDto = {
    studentUsername,
    type,
    amount,
    dueDate,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
