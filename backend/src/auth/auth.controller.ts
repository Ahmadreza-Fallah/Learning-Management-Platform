import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LogoutDto } from './dto/logout.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user account' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({
    status: 409,
    description: 'Email or Username already exists.',
  })
  register(@Body() RegisterDto: RegisterDto) {
    return this.authService.register(RegisterDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with username and password' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful, returns access and refresh tokens.',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials or inactive account.',
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token using a valid refresh token' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({ status: 200, description: 'Tokens refreshed successfully.' })
  @ApiResponse({
    status: 401,
    description: 'Invalid, revoked, or expired refresh token.',
  })
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout and revoke the refresh token' })
  @ApiBody({ type: LogoutDto })
  @ApiResponse({ status: 200, description: 'Logout successful.' })
  @ApiResponse({
    status: 401,
    description: 'Invalid or already revoked refresh token.',
  })
  logout(@Body() logoutDto: LogoutDto) {
    return this.authService.logout(logoutDto);
  }
}
