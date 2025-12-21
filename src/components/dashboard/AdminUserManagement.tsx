import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users,
  Search,
  MoreVertical,
  Shield,
  User,
  Mail,
  Calendar,
  Ban,
  CheckCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockUsers = [
  { id: "1", name: "Admin Tanzania", email: "admin@tanzaniahub.com", role: "admin", status: "active", joinDate: "Jan 1, 2024", trips: 0 },
  { id: "2", name: "Safari Explorer", email: "user@example.com", role: "user", status: "active", joinDate: "Mar 15, 2024", trips: 8 },
  { id: "3", name: "John Traveler", email: "john@email.com", role: "user", status: "active", joinDate: "Apr 20, 2024", trips: 3 },
  { id: "4", name: "Jane Adventure", email: "jane@email.com", role: "user", status: "suspended", joinDate: "May 5, 2024", trips: 1 },
  { id: "5", name: "Mike Explorer", email: "mike@email.com", role: "user", status: "active", joinDate: "Jun 10, 2024", trips: 5 },
];

export default function AdminUserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users] = useState(mockUsers);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: "Total Users", value: users.length, icon: Users, color: "safari" },
    { label: "Active Users", value: users.filter(u => u.status === "active").length, icon: CheckCircle, color: "ocean" },
    { label: "Admins", value: users.filter(u => u.role === "admin").length, icon: Shield, color: "sunset" },
    { label: "Suspended", value: users.filter(u => u.status === "suspended").length, icon: Ban, color: "destructive" },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          User{" "}
          <span className="bg-gradient-to-r from-safari to-ocean bg-clip-text text-transparent">
            Management
          </span>
        </h2>
        <p className="text-muted-foreground">
          Manage platform users and their permissions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="p-4 border-2 border-border/50">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-${stat.color}/10`}>
                  <IconComponent className={`w-5 h-5 text-${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="bg-gradient-to-r from-safari to-ocean text-white">
          Add New User
        </Button>
      </div>

      {/* Users Table */}
      <Card className="border-2 border-border/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Joined</TableHead>
              <TableHead className="hidden md:table-cell">Trips</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-safari to-ocean flex items-center justify-center">
                      {user.role === "admin" ? (
                        <Shield className="w-5 h-5 text-white" />
                      ) : (
                        <User className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Mail className="w-3 h-3 mr-1" />
                        {user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.role === "admin" ? "default" : "secondary"} 
                    className={user.role === "admin" ? "bg-sunset" : ""}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === "active" ? "outline" : "destructive"}
                    className={user.status === "active" ? "border-green-500 text-green-500" : ""}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className="text-muted-foreground flex items-center text-sm">
                    <Calendar className="w-3 h-3 mr-1" />
                    {user.joinDate}
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className="text-foreground font-medium">{user.trips}</span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit User</DropdownMenuItem>
                      <DropdownMenuItem>Change Role</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        {user.status === "active" ? "Suspend User" : "Activate User"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No users found</h3>
          <p className="text-muted-foreground">Try adjusting your search</p>
        </div>
      )}
    </div>
  );
}
