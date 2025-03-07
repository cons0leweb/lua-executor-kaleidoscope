
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ScriptLibraryProps {
  onSelectScript: (script: string) => void;
}

const ScriptLibrary: React.FC<ScriptLibraryProps> = ({ onSelectScript }) => {
  // Sample scripts for different categories
  const basicScripts = [
    { name: "Print Hello World", code: 'print("Hello World!")' },
    { name: "Simple Loop", code: 'for i=1,10 do\n    print("Number: "..i)\nend' },
    { name: "Display Message", code: 'game:GetService("StarterGui"):SetCore("SendNotification", {\n    Title = "Notification",\n    Text = "Script executed successfully!"\n})' },
  ];

  const gameScripts = [
    { name: "Infinite Jump", code: 'local player = game:GetService("Players").LocalPlayer\nlocal userInputService = game:GetService("UserInputService")\nlocal jumping = false\nuserInputService.JumpRequest:Connect(function()\n    if not jumping then\n        jumping = true\n        player.Character:FindFirstChildOfClass("Humanoid"):ChangeState("Jumping")\n        wait()\n        jumping = false\n    end\nend)' },
    { name: "Speed Hack", code: 'local player = game:GetService("Players").LocalPlayer\nlocal character = player.Character or player.CharacterAdded:Wait()\nlocal humanoid = character:WaitForChild("Humanoid")\nhumanoid.WalkSpeed = 50' },
    { name: "Gravity Modifier", code: 'workspace.Gravity = 50' },
  ];

  const utilityScripts = [
    { name: "ESP Names", code: 'local players = game:GetService("Players")\nlocal function createESP(player)\n    local esp = Instance.new("BillboardGui")\n    esp.Name = "ESP"\n    esp.AlwaysOnTop = true\n    esp.Size = UDim2.new(0, 100, 0, 30)\n    esp.StudsOffset = Vector3.new(0, 3, 0)\n\n    local text = Instance.new("TextLabel")\n    text.BackgroundTransparency = 1\n    text.Size = UDim2.new(1, 0, 1, 0)\n    text.Text = player.Name\n    text.TextColor3 = Color3.new(1, 1, 1)\n    text.TextScaled = true\n    text.Parent = esp\n\n    if player.Character and player.Character:FindFirstChild("Head") then\n        esp.Adornee = player.Character.Head\n        esp.Parent = player.Character.Head\n    end\nend\n\nfor _, player in pairs(players:GetPlayers()) do\n    if player ~= players.LocalPlayer then\n        createESP(player)\n    end\nend\n\nplayers.PlayerAdded:Connect(function(player)\n    createESP(player)\nend)' },
    { name: "Teleport to Player", code: 'local players = game:GetService("Players")\nlocal localPlayer = players.LocalPlayer\nlocal targetPlayer = players:FindFirstChild("TargetPlayerName") -- Replace with target player name\n\nif targetPlayer and targetPlayer.Character and localPlayer.Character then\n    localPlayer.Character:SetPrimaryPartCFrame(targetPlayer.Character:GetPrimaryPartCFrame())\nend' },
    { name: "Anti AFK", code: 'local VirtualUser = game:GetService("VirtualUser")\nplayer = game:GetService("Players").LocalPlayer\n\nprint("Anti-AFK started!")\n\ngame:GetService("Players").LocalPlayer.Idled:Connect(function()\n    VirtualUser:Button2Down(Vector2.new(0,0), workspace.CurrentCamera.CFrame)\n    wait(1)\n    VirtualUser:Button2Up(Vector2.new(0,0), workspace.CurrentCamera.CFrame)\n    print("Anti-AFK prevented kick!")\nend)' },
  ];

  return (
    <Card className="bg-executor-secondary border-executor-purple border-opacity-30 overflow-hidden shadow-lg">
      <div className="bg-executor-dark px-4 py-2 border-b border-executor-purple border-opacity-30">
        <span className="text-executor-light font-medium">Script Library</span>
      </div>
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid grid-cols-3 w-full bg-executor-dark">
          <TabsTrigger value="basic" className="text-executor-light">Basic</TabsTrigger>
          <TabsTrigger value="game" className="text-executor-light">Game</TabsTrigger>
          <TabsTrigger value="utility" className="text-executor-light">Utility</TabsTrigger>
        </TabsList>
        <div className="h-[300px] custom-scrollbar overflow-y-auto">
          <TabsContent value="basic" className="p-0 m-0">
            {basicScripts.map((script, index) => (
              <div 
                key={index}
                className="p-3 hover:bg-executor-dark cursor-pointer border-b border-executor-purple border-opacity-10"
                onClick={() => onSelectScript(script.code)}
              >
                <p className="text-executor-light">{script.name}</p>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="game" className="p-0 m-0">
            {gameScripts.map((script, index) => (
              <div 
                key={index}
                className="p-3 hover:bg-executor-dark cursor-pointer border-b border-executor-purple border-opacity-10"
                onClick={() => onSelectScript(script.code)}
              >
                <p className="text-executor-light">{script.name}</p>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="utility" className="p-0 m-0">
            {utilityScripts.map((script, index) => (
              <div 
                key={index}
                className="p-3 hover:bg-executor-dark cursor-pointer border-b border-executor-purple border-opacity-10"
                onClick={() => onSelectScript(script.code)}
              >
                <p className="text-executor-light">{script.name}</p>
              </div>
            ))}
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
};

export default ScriptLibrary;
