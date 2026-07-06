import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get the authenticated user profile' })
  @ApiResponse({ status: 200, description: 'Returns the current user profile.' })
  @ApiResponse({ status: 401, description: 'Authentication required.' })
  getProfile(@CurrentUser() user: any) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'Returns the user.' })
  @ApiResponse({ status: 401, description: 'Authentication required.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  @ApiResponse({ status: 200, description: 'Returns a list of all users.' })
  @ApiResponse({ status: 401, description: 'Authentication required.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Admin role required.' })
  getAllUsers() {
    return this.usersService.findAll();
  }
}
