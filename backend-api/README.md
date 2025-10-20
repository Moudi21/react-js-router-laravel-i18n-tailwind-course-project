## API Endpoint Map

All endpoints are prefixed with `/api` and require authentication (using Laravel Sanctum).

### 1. Get Authenticated User
- **Method:** GET
- **Endpoint:** `/api/me`
- **Description:** Returns the current authenticated user's information.
- **Headers:**  
  `Authorization: Bearer <your_token_here>`

---

### 2. Profile Management

#### a. Update Profile
- **Method:** PUT
- **Endpoint:** `/api/profile/update`
- **Description:** Update authenticated user's profile data.
- **Body:** JSON with updated profile fields.
- **Headers:**  
  `Authorization: Bearer <your_token_here>`

#### b. Update Password
- **Method:** PUT
- **Endpoint:** `/api/profile/password`
- **Description:** Change the authenticated user's password.
- **Body:** JSON with `current_password`, `new_password`.
- **Headers:**  
  `Authorization: Bearer <your_token_here>`

#### c. Upload Profile Photo
- **Method:** POST
- **Endpoint:** `/api/profile/photo`
- **Description:** Upload or change the profile photo.
- **Body:** `multipart/form-data` with new photo.
- **Headers:**  
  `Authorization: Bearer <your_token_here>`

#### d. Delete Profile Photo
- **Method:** DELETE
- **Endpoint:** `/api/profile/photo`
- **Description:** Delete the user's profile photo.
- **Headers:**  
  `Authorization: Bearer <your_token_here>`

---

### Example Curl Request

```sh
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8000/api/me
```

---

```sh
add this to .env

APP_URL=http://localhost:8000 backend localhost
FRONTEND_URL=http://localhost:5173 Frontend localhost
---

   composer install
   ```
5. Generate app key:
   ```
   php artisan key:generate
   ```
6. Run migrations (if any):
   ```
   php artisan migrate
   ```
7. Start server:
   ```
   php artisan serve
   ```

---