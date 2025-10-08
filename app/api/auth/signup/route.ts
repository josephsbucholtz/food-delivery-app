import {hashPassword} from '@/lib/auth-utils';
import prisma from '@/lib/prisma';
import {NextRequest, NextResponse} from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const {firstName, lastName, email, phoneNumber, password} =
        await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
          {error: 'Email and password are required'}, {status: 400});
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({where: {email}});

    if (existingUser) {
      return NextResponse.json(
          {error: 'User with this email already exists'}, {status: 400});
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName: firstName || null,
        lastName: lastName || null,
        name: firstName && lastName ? `${firstName} ${lastName}` :
                                      firstName || lastName || null,
        email,
        phoneNumber: phoneNumber || null,
        password: hashedPassword,
        role: 'USER',  // Default role
      } as any,        // Type assertion to allow password field
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        name: true,
        role: true,
        createdAt: true,
      }
    });

    return NextResponse.json({
      message: 'User created successfully',
      user,
    });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({error: 'Internal server error'}, {status: 500});
  }
}