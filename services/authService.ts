import { User } from '../types';
import { USERS_DB } from '../constants';

/**
 * Simulates a backend API call for logging in a user.
 * @param email - The user's email address.
 * @param password - The user's password.
 * @returns A Promise that resolves with the User object on success.
 * @throws An error with a message on failure.
 */
export const login = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      const normalizedEmail = email.toLowerCase();
      const userRecord = USERS_DB[normalizedEmail];

      if (userRecord && userRecord.password === password) {
        // On success, return the user data but omit the password
        const user: User = {
          id: userRecord.id,
          name: userRecord.name,
          email: normalizedEmail,
          role: userRecord.role as 'nurse' | 'doctor',
        };
        resolve(user);
      } else {
        // On failure, reject with an error message
        reject(new Error('Invalid email or password.'));
      }
    }, 500); // 0.5 second delay
  });
};
