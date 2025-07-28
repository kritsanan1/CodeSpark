import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Settings2, Palette, Brain, Code, Users } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/layout/sidebar";

export default function Settings() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const [settings, setSettings] = useState({
    // AI Settings
    aiEnabled: true,
    aiSuggestions: true,
    aiAutoComplete: false,
    aiModel: "local",
    
    // Editor Settings
    fontSize: "14",
    tabSize: "2",
    wordWrap: true,
    minimap: true,
    lineNumbers: true,
    
    // Community Settings
    shareUsageData: false,
    publicProfile: true,
    communityNotifications: true,
    
    // Performance Settings
    autoSave: true,
    autoSaveInterval: "30",
    cacheEnabled: true,
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Setting updated",
      description: "Your preference has been saved.",
    });
  };

  const settingsSections = [
    {
      id: "ai",
      title: "AI Assistant",
      icon: Brain,
      description: "Configure AI-powered features and suggestions",
    },
    {
      id: "editor",
      title: "Code Editor",
      icon: Code,
      description: "Customize your coding environment",
    },
    {
      id: "appearance",
      title: "Appearance",
      icon: Palette,
      description: "Theme and visual preferences",
    },
    {
      id: "community",
      title: "Community",
      icon: Users,
      description: "Social features and privacy settings",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar 
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        projects={[]}
        currentProject={null}
        onProjectSelect={() => {}}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b dyad-border bg-card p-6">
          <div className="flex items-center space-x-3">
            <Settings2 className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-2xl font-bold dyad-text">Settings</h1>
              <p className="text-muted-foreground">Customize your Dyad experience</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* AI Assistant Settings */}
            <Card className="dyad-surface dyad-border">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="dyad-text">AI Assistant</CardTitle>
                    <CardDescription>Configure AI-powered features and suggestions</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base dyad-text">Enable AI Assistant</Label>
                    <p className="text-sm text-muted-foreground">
                      Turn on AI-powered code suggestions and assistance
                    </p>
                  </div>
                  <Switch
                    checked={settings.aiEnabled}
                    onCheckedChange={(checked) => handleSettingChange("aiEnabled", checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base dyad-text">Real-time Suggestions</Label>
                    <p className="text-sm text-muted-foreground">
                      Show AI suggestions while you type
                    </p>
                  </div>
                  <Switch
                    checked={settings.aiSuggestions}
                    onCheckedChange={(checked) => handleSettingChange("aiSuggestions", checked)}
                    disabled={!settings.aiEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base dyad-text">Auto-completion</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically complete code based on AI suggestions
                    </p>
                  </div>
                  <Switch
                    checked={settings.aiAutoComplete}
                    onCheckedChange={(checked) => handleSettingChange("aiAutoComplete", checked)}
                    disabled={!settings.aiEnabled}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-base dyad-text">AI Model</Label>
                  <Select value={settings.aiModel} onValueChange={(value) => handleSettingChange("aiModel", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">Local</Badge>
                          <span>Local Model (Recommended)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="cloud" disabled>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">Cloud</Badge>
                          <span>Cloud Model (Coming Soon)</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Editor Settings */}
            <Card className="dyad-surface dyad-border">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Code className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="dyad-text">Code Editor</CardTitle>
                    <CardDescription>Customize your coding environment</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-base dyad-text">Font Size</Label>
                    <Select value={settings.fontSize} onValueChange={(value) => handleSettingChange("fontSize", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12px</SelectItem>
                        <SelectItem value="14">14px</SelectItem>
                        <SelectItem value="16">16px</SelectItem>
                        <SelectItem value="18">18px</SelectItem>
                        <SelectItem value="20">20px</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-base dyad-text">Tab Size</Label>
                    <Select value={settings.tabSize} onValueChange={(value) => handleSettingChange("tabSize", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 spaces</SelectItem>
                        <SelectItem value="4">4 spaces</SelectItem>
                        <SelectItem value="8">8 spaces</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <Label className="text-base dyad-text">Word Wrap</Label>
                    <Switch
                      checked={settings.wordWrap}
                      onCheckedChange={(checked) => handleSettingChange("wordWrap", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-base dyad-text">Minimap</Label>
                    <Switch
                      checked={settings.minimap}
                      onCheckedChange={(checked) => handleSettingChange("minimap", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-base dyad-text">Line Numbers</Label>
                    <Switch
                      checked={settings.lineNumbers}
                      onCheckedChange={(checked) => handleSettingChange("lineNumbers", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-base dyad-text">Auto Save</Label>
                    <Switch
                      checked={settings.autoSave}
                      onCheckedChange={(checked) => handleSettingChange("autoSave", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Appearance Settings */}
            <Card className="dyad-surface dyad-border">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                    <Palette className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="dyad-text">Appearance</CardTitle>
                    <CardDescription>Theme and visual preferences</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-base dyad-text">Theme</Label>
                  <Select value={theme} onValueChange={(value: "light" | "dark") => setTheme(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dark">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-gray-900 rounded border"></div>
                          <span>Dark Theme</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="light">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-white rounded border"></div>
                          <span>Light Theme</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Community Settings */}
            <Card className="dyad-surface dyad-border">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="dyad-text">Community</CardTitle>
                    <CardDescription>Social features and privacy settings</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base dyad-text">Public Profile</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow others to see your profile and contributions
                    </p>
                  </div>
                  <Switch
                    checked={settings.publicProfile}
                    onCheckedChange={(checked) => handleSettingChange("publicProfile", checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base dyad-text">Community Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about community activity
                    </p>
                  </div>
                  <Switch
                    checked={settings.communityNotifications}
                    onCheckedChange={(checked) => handleSettingChange("communityNotifications", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base dyad-text">Share Usage Data</Label>
                    <p className="text-sm text-muted-foreground">
                      Help improve Dyad by sharing anonymous usage statistics
                    </p>
                  </div>
                  <Switch
                    checked={settings.shareUsageData}
                    onCheckedChange={(checked) => handleSettingChange("shareUsageData", checked)}
                  />
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
