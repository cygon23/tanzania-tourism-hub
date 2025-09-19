import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Shield, Globe } from "lucide-react";

export default function DashboardSettings() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Dashboard{" "}
          <span className="bg-gradient-to-r from-safari to-ocean bg-clip-text text-transparent">
            Settings
          </span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Customize your Tanzania Tourism Hub experience.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="p-6 border-2 border-border/50">
            <div className="flex items-center space-x-2 mb-6">
              <User className="w-5 h-5 text-safari" />
              <h3 className="text-lg font-semibold text-foreground">Profile Settings</h3>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john@example.com" />
              </div>
              <div>
                <Label htmlFor="organization">Organization</Label>
                <Input id="organization" defaultValue="Tanzania Tourism Board" />
              </div>
              <Button className="w-full bg-safari hover:bg-safari-light">
                Update Profile
              </Button>
            </div>
          </Card>

          <Card className="p-6 border-2 border-border/50">
            <div className="flex items-center space-x-2 mb-6">
              <Bell className="w-5 h-5 text-ocean" />
              <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
            </div>
            <div className="space-y-4">
              {[
                { label: "Email Notifications", description: "Receive updates via email" },
                { label: "Booking Alerts", description: "New booking notifications" },
                { label: "Data Updates", description: "Tourism data refresh alerts" },
                { label: "System Maintenance", description: "Maintenance announcements" },
              ].map((setting, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground">{setting.label}</div>
                    <div className="text-sm text-muted-foreground">{setting.description}</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 border-2 border-border/50">
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="w-5 h-5 text-sunset" />
              <h3 className="text-lg font-semibold text-foreground">Security</h3>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button variant="outline" className="w-full border-sunset/30 text-sunset hover:bg-sunset/10">
                Update Password
              </Button>
            </div>
          </Card>

          <Card className="p-6 border-2 border-border/50">
            <div className="flex items-center space-x-2 mb-6">
              <Globe className="w-5 h-5 text-safari" />
              <h3 className="text-lg font-semibold text-foreground">Preferences</h3>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="language">Language</Label>
                <select className="w-full p-2 border border-input rounded-md bg-background">
                  <option>English</option>
                  <option>Swahili</option>
                  <option>French</option>
                </select>
              </div>
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <select className="w-full p-2 border border-input rounded-md bg-background">
                  <option>East Africa Time (EAT)</option>
                  <option>UTC</option>
                  <option>GMT</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">Dark Mode</div>
                  <div className="text-sm text-muted-foreground">Toggle dark theme</div>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}