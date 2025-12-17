import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Lock, Download, Shield, Bell, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const { toast } = useToast();
  const [pinEnabled, setPinEnabled] = useState(false);
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState('20:00');

  const handleExport = () => {
    toast({
      title: 'Export started',
      description: 'Your journal entries are being exported to PDF.',
    });
  };

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-2xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-serif font-semibold text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Customize your journal experience
        </p>
      </header>

      <div className="space-y-6">
        {/* Security */}
        <section className="journal-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-secondary">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-serif font-semibold text-lg">Security & Privacy</h2>
              <p className="text-sm text-muted-foreground">
                Protect your journal with PIN or password
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="pin-protection">PIN Protection</Label>
                <p className="text-sm text-muted-foreground">
                  Require PIN to access your journal
                </p>
              </div>
              <Switch
                id="pin-protection"
                checked={pinEnabled}
                onCheckedChange={setPinEnabled}
              />
            </div>

            {pinEnabled && (
              <div className="pl-4 border-l-2 border-border space-y-3 animate-slide-up">
                <div>
                  <Label htmlFor="pin">Set PIN</Label>
                  <Input
                    id="pin"
                    type="password"
                    maxLength={6}
                    placeholder="Enter 4-6 digit PIN"
                    className="max-w-[200px] mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="confirm-pin">Confirm PIN</Label>
                  <Input
                    id="confirm-pin"
                    type="password"
                    maxLength={6}
                    placeholder="Confirm PIN"
                    className="max-w-[200px] mt-1"
                  />
                </div>
                <Button size="sm">
                  <Lock className="h-4 w-4 mr-2" />
                  Save PIN
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Reminders */}
        <section className="journal-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-secondary">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-serif font-semibold text-lg">Daily Reminders</h2>
              <p className="text-sm text-muted-foreground">
                Get reminded to write in your journal
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="reminder-enabled">Enable Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Receive daily notification to journal
                </p>
              </div>
              <Switch
                id="reminder-enabled"
                checked={reminderEnabled}
                onCheckedChange={setReminderEnabled}
              />
            </div>

            {reminderEnabled && (
              <div className="pl-4 border-l-2 border-border animate-slide-up">
                <Label htmlFor="reminder-time">Reminder Time</Label>
                <Input
                  id="reminder-time"
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="max-w-[150px] mt-1"
                />
              </div>
            )}
          </div>
        </section>

        {/* Appearance */}
        <section className="journal-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-secondary">
              <Palette className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-serif font-semibold text-lg">Appearance</h2>
              <p className="text-sm text-muted-foreground">
                Customize how your journal looks
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Theme</Label>
              <Select defaultValue="light">
                <SelectTrigger className="max-w-[200px] mt-1">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Font Size</Label>
              <Select defaultValue="medium">
                <SelectTrigger className="max-w-[200px] mt-1">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Export */}
        <section className="journal-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-secondary">
              <Download className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-serif font-semibold text-lg">Export Data</h2>
              <p className="text-sm text-muted-foreground">
                Download your journal entries as PDF
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Date Range</Label>
              <Select defaultValue="all">
                <SelectTrigger className="max-w-[250px] mt-1">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All entries</SelectItem>
                  <SelectItem value="month">This month</SelectItem>
                  <SelectItem value="year">This year</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export to PDF
            </Button>
          </div>
        </section>

        {/* Version Info */}
        <div className="text-center text-sm text-muted-foreground pt-4">
          <p>Reflecta Journal v1.0.0</p>
          <p className="mt-1">Made with care for daily reflection</p>
        </div>
      </div>
    </div>
  );
}
