import { UserTable } from '@/utils/Constants';

import { knexConnection } from './DatabaseService';

import { User } from '@/types/model/User';

/**
 * @params user id
 * Get a user by id */
export async function getUserById(id: number): Promise<User | undefined> {
  return knexConnection().select<User>('*').from(UserTable).where('id', id)
    .first();
}

/**
 * @params user email
 * Get a user by email */
export async function getUserByEmail(email: string): Promise<User | undefined> {
  return knexConnection().select<User>('*').from(UserTable).where('email', email)
    .first();
}

/**
 * @params user data object
 * Create a new user */
export async function createUser(user: User): Promise<User | undefined> {
  return knexConnection()
    .insert<User>({
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      password: user.password,
      date_of_birth: user.dateOfBirth,
      phone: user.phone,
      contact: user.contact,
      pro_name: user.proName,
      additional_members: user.additionalMembers,
      recommend: user.recommend,
      tour: user.tour,
    })
    .into(UserTable);
}

/**
 * @params user_id, user data object
 * Update a user */
export async function updateUser(id: number, user: User): Promise<User | undefined> {
  return knexConnection()
    .update<User>({
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      password: user.password,
      date_of_birth: user.dateOfBirth,
      phone: user.phone,
      contact: user.contact,
      pro_name: user.proName,
      additional_members: user.additionalMembers,
      recommend: user.recommend,
      tour: user.tour,
    })
    .into(UserTable)
    .where('id', id);
}
