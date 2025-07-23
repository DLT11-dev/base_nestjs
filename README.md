# NestJS Auth API

Dự án API với hệ thống authentication sử dụng NestJS, Passport, JWT và Swagger.

## 🚀 Tính năng

- ✅ Đăng ký tài khoản với validation
- ✅ Đăng nhập với JWT token
- ✅ Refresh token mechanism
- ✅ Role-based access control (RBAC)
- ✅ Bảo vệ route với JWT Guard và Roles Guard
- ✅ Swagger API Documentation
- ✅ Validation với class-validator
- ✅ Database với TypeORM (SQLite)
- ✅ Hash password với bcryptjs
- ✅ Advanced Logging Middleware với màu sắc
- ✅ Request/Response Interceptor
- ✅ Performance monitoring
- ✅ Error tracking và sanitization
- ✅ Path alias support

## 📦 Cài đặt

```bash
# Cài đặt dependencies
npm install

# Tạo file .env từ env.example
cp env.example .env

# Chỉnh sửa file .env với thông tin của bạn
```

## 🏃‍♂️ Chạy ứng dụng

```bash
# Development mode
npm run start:dev

# Development mode với path alias
npm run start:dev:paths

# Production mode
npm run build
npm run start:prod

# Debug mode
npm run start:debug
```

## 🔗 API Endpoints

**Base URL:** `http://localhost:8081/api/v1`

### Authentication
- `POST /auth/login` - Đăng nhập
- `POST /auth/refresh` - Refresh token

### Users
- `POST /users/register` - Đăng ký tài khoản
- `GET /users/profile` - Lấy thông tin profile (Yêu cầu JWT)
- `GET /users` - Lấy danh sách users (Yêu cầu MANAGER/ADMIN)
- `PATCH /users/:id` - Cập nhật user (Yêu cầu JWT)
- `DELETE /users/:id` - Xóa user (Yêu cầu ADMIN)

## 📚 Swagger Documentation

Truy cập Swagger UI tại: `http://localhost:8081/api`

## 🏗️ Cấu trúc dự án

```
src/
├── modules/             # Business modules
│   ├── auth/           # Authentication module
│   │   ├── guards/     # Passport guards
│   │   ├── strategies/ # Passport strategies
│   │   ├── dto/        # Data Transfer Objects
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── users/          # Users module
│   │   ├── dto/        # Data Transfer Objects
│   │   ├── user.entity.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   └── index.ts        # Export all modules
├── common/             # Shared components
│   ├── decorators/     # Custom decorators
│   ├── enum/          # Enums
│   ├── helpers/       # Helper functions
│   ├── interceptors/  # Global interceptors
│   ├── middleware/    # Global middleware
│   └── models/        # Shared models
├── config/            # Configuration files
├── app.module.ts      # Root module
└── main.ts           # Application entry point
```

## ⚙️ Biến môi trường

Tạo file `.env` với các biến sau:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=nestjs_auth

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=10h
JWT_REFRESH_EXPIRES_IN=21h

# App
PORT=8081
NODE_ENV=development
```

## 🔐 Sử dụng API

### 1. Đăng ký tài khoản

```bash
curl -X POST http://localhost:8081/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "username123",
    "password": "password123",
    "fullName": "Nguyễn Văn A"
  }'
```

### 2. Đăng nhập

```bash
curl -X POST http://localhost:8081/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "username123",
    "password": "password123"
  }'
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "username123",
    "email": "user@example.com",
    "fullName": "Nguyễn Văn A",
    "role": "USER",
    "isActive": true
  }
}
```

### 3. Refresh Token

```bash
curl -X POST http://localhost:8081/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refresh_token": "your-refresh-token-here"
  }'
```

### 4. Truy cập protected route

```bash
curl -X GET http://localhost:8081/api/v1/users/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 5. Cập nhật thông tin user

```bash
curl -X PATCH http://localhost:8081/api/v1/users/1 \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Nguyễn Văn B",
    "email": "newemail@example.com"
  }'
```

## 🎭 Role-based Access Control

Dự án hỗ trợ 3 roles:

- **USER**: Truy cập cơ bản
- **MANAGER**: Quản lý users
- **ADMIN**: Toàn quyền

### Ví dụ sử dụng roles:

```typescript
// Chỉ USER, MANAGER, ADMIN có thể truy cập
@AuthRoles(Role.USER, Role.MANAGER, Role.ADMIN)
async getProfile() { ... }

// Chỉ MANAGER và ADMIN có thể truy cập
@AuthRoles(Role.MANAGER, Role.ADMIN)
async findAll() { ... }

// Chỉ ADMIN có thể truy cập
@AuthRoles(Role.ADMIN)
async delete() { ... }
```

## 📊 Logging System

Dự án có hệ thống logging nâng cao:

### Features:
- **Request/Response logging** với màu sắc
- **Performance monitoring** (phát hiện request chậm >1000ms)
- **Error tracking** với stack trace
- **Request ID tracking**
- **IP address detection**
- **Sanitize sensitive data** (password, token)

### Màu sắc:
- 🟢 **GET** - Xanh lá
- 🔵 **POST** - Xanh dương  
- 🟡 **PUT/PATCH** - Vàng
- 🔴 **DELETE** - Đỏ
- 🟢 **2xx** - Success
- 🟡 **3xx** - Redirect
- 🔴 **4xx** - Client Error
- 🟣 **5xx** - Server Error

## 🛠️ Scripts

- `npm run start:dev` - Chạy development server với hot reload
- `npm run start:dev:paths` - Chạy với path alias support
- `npm run start:debug` - Chạy debug mode
- `npm run build` - Build ứng dụng
- `npm run start:prod` - Chạy production server
- `npm run test` - Chạy tests
- `npm run test:watch` - Chạy tests với watch mode
- `npm run test:cov` - Chạy tests với coverage
- `npm run lint` - Kiểm tra code style
- `npm run format` - Format code với Prettier

## 🗂️ Cấu trúc Modules

Dự án được tổ chức theo mô hình modules để dễ dàng mở rộng và bảo trì:

### Quy tắc tổ chức modules:
1. **Tất cả business logic được đặt trong `src/modules/`**
2. **Mỗi module có cấu trúc nhất quán:**
   - `dto/` - Data Transfer Objects
   - `entities/` - Database entities  
   - `*.controller.ts` - API endpoints
   - `*.service.ts` - Business logic
   - `*.module.ts` - Module configuration
   - `guards/` - Module-specific guards (nếu cần)
   - `strategies/` - Passport strategies (nếu cần)

3. **Import/Export:**
   - Sử dụng path alias để import
   - Export tất cả modules qua `src/modules/index.ts`

### Thêm module mới:
1. Tạo thư mục module trong `src/modules/`
2. Tạo các file cần thiết theo cấu trúc chuẩn
3. Thêm export vào `src/modules/index.ts`
4. Import và sử dụng trong `src/app.module.ts`

## 🔗 Path Alias

Dự án sử dụng path alias để import dễ dàng hơn:

```typescript
// Thay vì
import { UsersService } from '../users/users.service';

// Sử dụng
import { UsersService } from '@/modules/users/users.service';
```

### Các alias có sẵn:
- `@/*` - src/*
- `@common/*` - src/common/*
- `@modules/*` - src/modules/*
- `@config/*` - src/config/*

## 🧪 Testing

```bash
# Chạy unit tests
npm run test

# Chạy tests với watch mode
npm run test:watch

# Chạy tests với coverage
npm run test:cov

# Chạy e2e tests
npm run test:e2e
```

## 📝 Database

- **TypeORM** với SQLite
- **Auto-sync** trong development
- **Entities** được định nghĩa với decorators
- **Migrations** support (có thể thêm sau)

## 🔒 Security Features

- **JWT Authentication** với access và refresh tokens
- **Password hashing** với bcryptjs
- **Role-based authorization**
- **Request validation** với class-validator
- **CORS enabled**
- **Input sanitization**

## 🚀 Deployment

```bash
# Build ứng dụng
npm run build

# Chạy production
npm run start:prod

# Hoặc sử dụng PM2
pm2 start dist/main.js --name nestjs-auth-api
```

## 📄 License

UNLICENSED - Private project
