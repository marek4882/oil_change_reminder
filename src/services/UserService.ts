import { User, mockUser } from "../models/User";

export class UserService {
  private static readonly currentUserKey = "currentUser";

  public static getCurrentUser(): User | null {
    const userData = localStorage.getItem(UserService.currentUserKey);
    return userData ? JSON.parse(userData) : null;
  }

  public static setCurrentUser(user: User): void {
    localStorage.setItem(UserService.currentUserKey, JSON.stringify(user));
  }
  public static getAllMockUsers(): User[] {
    return mockUser;
  }
  public static fetchUsers(): User[] {
    const usersData = localStorage.getItem("users");
    return usersData ? JSON.parse(usersData) : [];
  }

  // New login method
  public static login(email: string, password: string): boolean {
    const users = this.getAllMockUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      this.setCurrentUser(user);
      return true; // Login successful
    }
    return false; // Login failed
  }

  public static logout(): void {
    localStorage.removeItem(UserService.currentUserKey);
  }
}

UserService.setCurrentUser(mockUser[0]);
