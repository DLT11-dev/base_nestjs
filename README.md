# NestJS Auth API

Dự án API với hệ thống authentication sử dụng NestJS, Passport, JWT và Swagger.

## Tính năng

- ✅ Đăng ký tài khoản
- ✅ Đăng nhập với JWT
- ✅ Bảo vệ route với JWT Guard
- ✅ Swagger API Documentation
- ✅ Validation với class-validator
- ✅ Database với TypeORM (SQLite)
- ✅ Hash password với bcrypt
- ✅ Advanced Logging Middleware với màu sắc
- ✅ Request/Response Interceptor
- ✅ Performance monitoring
- ✅ Error tracking

## Cài đặt

```bash
# Cài đặt dependencies
npm install

# Tạo file .env từ env.example
cp env.example .env

# Chỉnh sửa file .env với thông tin của bạn
```

## Chạy ứng dụng

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## API Endpoints

### Authentication
- `POST /auth/login` - Đăng nhập
- `POST /users/register` - Đăng ký tài khoản

### Users (Yêu cầu JWT)
- `GET /users/profile` - Lấy thông tin profile
- `GET /users` - Lấy danh sách users

### Demo (Test Logging)
- `GET /demo/test` - Test endpoint cơ bản
- `POST /demo/test-post` - Test POST với body
- `GET /demo/error` - Test endpoint tạo lỗi
- `GET /demo/slow` - Test endpoint chậm (>1s)
- `GET /demo/:id` - Test GET với ID parameter (1, 2, 3 hoặc bất kỳ để test 404)

## Swagger Documentation

Truy cập Swagger UI tại: `http://localhost:3000/api`

## Cấu trúc dự án

```
src/
├── auth/                 # Authentication module
│   ├── guards/          # Passport guards
│   ├── strategies/      # Passport strategies
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── users/               # Users module
│   ├── dto/            # Data Transfer Objects
│   ├── user.entity.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── app.module.ts        # Root module
└── main.ts             # Application entry point
```

## Biến môi trường

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
JWT_EXPIRES_IN=1d

# App
PORT=3000
NODE_ENV=development
```

## Sử dụng API

### 1. Đăng ký tài khoản

```bash
curl -X POST http://localhost:3000/users/register \
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
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "username123",
    "password": "password123"
  }'
```

### 3. Truy cập protected route

```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 4. Test Logging

```bash
# Test endpoint cơ bản
curl -X GET http://localhost:3000/demo/test

# Test POST với body
curl -X POST http://localhost:3000/demo/test-post \
  -H "Content-Type: application/json" \
  -d '{"test": "data", "number": 123}'

# Test endpoint lỗi
curl -X GET http://localhost:3000/demo/error

# Test endpoint chậm
curl -X GET http://localhost:3000/demo/slow

# Test GET với ID (thành công)
curl -X GET http://localhost:3000/demo/1
curl -X GET http://localhost:3000/demo/2

# Test GET với ID (404 error)
curl -X GET http://localhost:3000/demo/999
```

## Scripts

- `npm run start:dev` - Chạy development server với hot reload
- `npm run start:dev:paths` - Chạy với path alias support
- `npm run build` - Build ứng dụng
- `npm run start:prod` - Chạy production server
- `npm run test` - Chạy tests
- `npm run lint` - Kiểm tra code style

## Path Alias

Dự án sử dụng path alias để import dễ dàng hơn:

```typescript
// Thay vì
import { UsersService } from '../users/users.service';

// Sử dụng
import { UsersService } from '@users/users.service';
```

### Các alias có sẵn:
- `@/*` - src/*
- `@common/*` - src/common/*
- `@auth/*` - src/auth/*
- `@users/*` - src/users/*
- `@demo/*` - src/demo/* 