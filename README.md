ОТВЕТЫ
--

### Уровень 1 ###
```json
{
  "status": "ok||error",
  "result": {}, // if status = ok
  "error: {} // if status = error
}
```
### error
```json
{
  "type": "short string indicating the error code reported",
  "message": "A human-readable message providing more details about the error."
}
```
|error.code|error.message|
|--|--|
|auth_email_already_register|E-mail is already in use.|
|auth_user_not_found|User Not found.|
|auth_invalid_password|Invalid Password.|



ЗАПРОСЫ
--
## Параметры ##
offset  
limit
