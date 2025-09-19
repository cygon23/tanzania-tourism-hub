import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "admin" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  joinDate: Date;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin Tanzania",
    email: "admin@tanzaniahub.com",
    role: "admin",
    joinDate: new Date("2024-01-01"),
  },
  {
    id: "2", 
    name: "Safari Explorer",
    email: "user@example.com",
    role: "user",
    joinDate: new Date("2024-03-15"),
  },
];

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem("tanzania_user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser({
          ...userData,
          joinDate: new Date(userData.joinDate),
        });
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("tanzania_user");
      }
    }
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password.length >= 6) {
      setUser(foundUser);
      localStorage.setItem("tanzania_user", JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: "user", // Default role
      joinDate: new Date(),
    };
    
    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem("tanzania_user", JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("tanzania_user");
  };

  return (
    <UserContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      isLoading,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}