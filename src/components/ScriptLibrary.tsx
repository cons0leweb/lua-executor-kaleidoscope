
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, BookOpen, Star, Clock, ChevronRight } from 'lucide-react';

interface ScriptLibraryProps {
  onSelectScript: (script: string) => void;
}

const ScriptLibrary: React.FC<ScriptLibraryProps> = ({ onSelectScript }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample scripts for different categories
  const basicScripts = [
    { name: "Print Hello World", code: 'print("Hello World!")', stars: 4 },
    { name: "Simple Loop", code: 'for i=1,10 do\n    print("Number: "..i)\nend', stars: 3 },
    { name: "Display Message", code: 'game:GetService("StarterGui"):SetCore("SendNotification", {\n    Title = "Notification",\n    Text = "Script executed successfully!"\n})', stars: 5 },
  ];

  const gameScripts = [
    { name: "Infinite Jump", code: 'local player = game:GetService("Players").LocalPlayer\nlocal userInputService = game:GetService("UserInputService")\nlocal jumping = false\nuserInputService.JumpRequest:Connect(function()\n    if not jumping then\n        jumping = true\n        player.Character:FindFirstChildOfClass("Humanoid"):ChangeState("Jumping")\n        wait()\n        jumping = false\n    end\nend)', stars: 5 },
    { name: "Speed Hack", code: 'local player = game:GetService("Players").LocalPlayer\nlocal character = player.Character or player.CharacterAdded:Wait()\nlocal humanoid = character:WaitForChild("Humanoid")\nhumanoid.WalkSpeed = 50', stars: 4 },
    { name: "Gravity Modifier", code: 'workspace.Gravity = 50', stars: 3 },
  ];

  const utilityScripts = [
    { name: "ESP Names", code: 'local players = game:GetService("Players")\nlocal function createESP(player)\n    local esp = Instance.new("BillboardGui")\n    esp.Name = "ESP"\n    esp.AlwaysOnTop = true\n    esp.Size = UDim2.new(0, 100, 0, 30)\n    esp.StudsOffset = Vector3.new(0, 3, 0)\n\n    local text = Instance.new("TextLabel")\n    text.BackgroundTransparency = 1\n    text.Size = UDim2.new(1, 0, 1, 0)\n    text.Text = player.Name\n    text.TextColor3 = Color3.new(1, 1, 1)\n    text.TextScaled = true\n    text.Parent = esp\n\n    if player.Character and player.Character:FindFirstChild("Head") then\n        esp.Adornee = player.Character.Head\n        esp.Parent = player.Character.Head\n    end\nend\n\nfor _, player in pairs(players:GetPlayers()) do\n    if player ~= players.LocalPlayer then\n        createESP(player)\n    end\nend\n\nplayers.PlayerAdded:Connect(function(player)\n    createESP(player)\nend)', stars: 5 },
    { name: "Teleport to Player", code: 'local players = game:GetService("Players")\nlocal localPlayer = players.LocalPlayer\nlocal targetPlayer = players:FindFirstChild("TargetPlayerName") -- Replace with target player name\n\nif targetPlayer and targetPlayer.Character and localPlayer.Character then\n    localPlayer.Character:SetPrimaryPartCFrame(targetPlayer.Character:GetPrimaryPartCFrame())\nend', stars: 4 },
    { name: "Anti AFK", code: 'local VirtualUser = game:GetService("VirtualUser")\nplayer = game:GetService("Players").LocalPlayer\n\nprint("Anti-AFK started!")\n\ngame:GetService("Players").LocalPlayer.Idled:Connect(function()\n    VirtualUser:Button2Down(Vector2.new(0,0), workspace.CurrentCamera.CFrame)\n    wait(1)\n    VirtualUser:Button2Up(Vector2.new(0,0), workspace.CurrentCamera.CFrame)\n    print("Anti-AFK prevented kick!")\nend)', stars: 5 },
  ];

  const recentScripts = [
    ...basicScripts.slice(0, 1),
    ...gameScripts.slice(0, 1),
    ...utilityScripts.slice(0, 1),
  ];

  const renderStars = (count: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={12} 
        className={i < count ? "text-mocha-yellow fill-mocha-yellow" : "text-gray-500"} 
      />
    ));
  };

  const renderScriptList = (scripts: typeof basicScripts) => {
    const filteredScripts = scripts.filter(
      script => script.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="space-y-1">
        {filteredScripts.length === 0 ? (
          <div className="p-3 text-center text-sm text-gray-500">No scripts found</div>
        ) : (
          filteredScripts.map((script, index) => (
            <div 
              key={index}
              className="p-2.5 hover:bg-executor-dark cursor-pointer border-l-2 border-transparent hover:border-executor-purple transition-all group"
              onClick={() => onSelectScript(script.code)}
            >
              <div className="flex justify-between items-center">
                <p className="text-executor-light text-sm">{script.name}</p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight size={14} className="text-executor-purple" />
                </div>
              </div>
              <div className="flex mt-1 items-center justify-between">
                <div className="flex">{renderStars(script.stars)}</div>
                <span className="text-xs text-gray-500">{script.code.length} chars</span>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <Card className="bg-executor-secondary border-executor-purple border-opacity-30 overflow-hidden shadow-lg">
      <div className="bg-executor-dark px-4 py-2 border-b border-executor-purple border-opacity-30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen size={14} className="text-mocha-lavender" />
          <span className="text-executor-light font-medium">Script Library</span>
        </div>
      </div>
      
      <div className="p-2 border-b border-executor-purple border-opacity-10">
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-2.5 text-gray-500" />
          <input
            type="text"
            placeholder="Search scripts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-executor-dark rounded-md py-2 pl-8 pr-4 text-sm text-executor-light border border-executor-purple border-opacity-20 focus:outline-none focus:border-executor-purple focus:border-opacity-50"
          />
        </div>
      </div>
      
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="grid grid-cols-4 w-full bg-executor-dark">
          <TabsTrigger value="recent" className="text-executor-light text-xs py-1.5">
            <Clock size={12} className="mr-1" /> Recent
          </TabsTrigger>
          <TabsTrigger value="basic" className="text-executor-light text-xs py-1.5">Basic</TabsTrigger>
          <TabsTrigger value="game" className="text-executor-light text-xs py-1.5">Game</TabsTrigger>
          <TabsTrigger value="utility" className="text-executor-light text-xs py-1.5">Utility</TabsTrigger>
        </TabsList>
        <div className="h-[280px] custom-scrollbar overflow-y-auto">
          <TabsContent value="recent" className="p-0 m-0">
            {renderScriptList(recentScripts)}
          </TabsContent>
          <TabsContent value="basic" className="p-0 m-0">
            {renderScriptList(basicScripts)}
          </TabsContent>
          <TabsContent value="game" className="p-0 m-0">
            {renderScriptList(gameScripts)}
          </TabsContent>
          <TabsContent value="utility" className="p-0 m-0">
            {renderScriptList(utilityScripts)}
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
};

export default ScriptLibrary;
