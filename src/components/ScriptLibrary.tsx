
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, BookOpen, Star, Clock, ChevronRight, Heart, Save, FileCode, Download } from 'lucide-react';
import { toast } from "sonner";

interface ScriptLibraryProps {
  onSelectScript: (script: string) => void;
}

interface Script {
  name: string;
  code: string;
  stars: number;
  isFavorite?: boolean;
}

const ScriptLibrary: React.FC<ScriptLibraryProps> = ({ onSelectScript }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favoriteScripts, setFavoriteScripts] = useState<Script[]>([]);
  const [recentScripts, setRecentScripts] = useState<Script[]>([]);
  
  // Sample scripts for different categories
  const basicScripts: Script[] = [
    { name: "Print Hello World", code: 'print("Hello World!")', stars: 4 },
    { name: "Simple Loop", code: 'for i=1,10 do\n    print("Number: "..i)\nend', stars: 3 },
    { name: "Display Message", code: 'game:GetService("StarterGui"):SetCore("SendNotification", {\n    Title = "Notification",\n    Text = "Script executed successfully!"\n})', stars: 5 },
  ];

  const gameScripts: Script[] = [
    { name: "Infinite Jump", code: 'local player = game:GetService("Players").LocalPlayer\nlocal userInputService = game:GetService("UserInputService")\nlocal jumping = false\nuserInputService.JumpRequest:Connect(function()\n    if not jumping then\n        jumping = true\n        player.Character:FindFirstChildOfClass("Humanoid"):ChangeState("Jumping")\n        wait()\n        jumping = false\n    end\nend)', stars: 5 },
    { name: "Speed Hack", code: 'local player = game:GetService("Players").LocalPlayer\nlocal character = player.Character or player.CharacterAdded:Wait()\nlocal humanoid = character:WaitForChild("Humanoid")\nhumanoid.WalkSpeed = 50', stars: 4 },
    { name: "Gravity Modifier", code: 'workspace.Gravity = 50', stars: 3 },
  ];

  const utilityScripts: Script[] = [
    { name: "ESP Names", code: 'local players = game:GetService("Players")\nlocal function createESP(player)\n    local esp = Instance.new("BillboardGui")\n    esp.Name = "ESP"\n    esp.AlwaysOnTop = true\n    esp.Size = UDim2.new(0, 100, 0, 30)\n    esp.StudsOffset = Vector3.new(0, 3, 0)\n\n    local text = Instance.new("TextLabel")\n    text.BackgroundTransparency = 1\n    text.Size = UDim2.new(1, 0, 1, 0)\n    text.Text = player.Name\n    text.TextColor3 = Color3.new(1, 1, 1)\n    text.TextScaled = true\n    text.Parent = esp\n\n    if player.Character and player.Character:FindFirstChild("Head") then\n        esp.Adornee = player.Character.Head\n        esp.Parent = player.Character.Head\n    end\nend\n\nfor _, player in pairs(players:GetPlayers()) do\n    if player ~= players.LocalPlayer then\n        createESP(player)\n    end\nend\n\nplayers.PlayerAdded:Connect(function(player)\n    createESP(player)\nend)', stars: 5 },
    { name: "Teleport to Player", code: 'local players = game:GetService("Players")\nlocal localPlayer = players.LocalPlayer\nlocal targetPlayer = players:FindFirstChild("TargetPlayerName") -- Replace with target player name\n\nif targetPlayer and targetPlayer.Character and localPlayer.Character then\n    localPlayer.Character:SetPrimaryPartCFrame(targetPlayer.Character:GetPrimaryPartCFrame())\nend', stars: 4 },
    { name: "Anti AFK", code: 'local VirtualUser = game:GetService("VirtualUser")\nplayer = game:GetService("Players").LocalPlayer\n\nprint("Anti-AFK started!")\n\ngame:GetService("Players").LocalPlayer.Idled:Connect(function()\n    VirtualUser:Button2Down(Vector2.new(0,0), workspace.CurrentCamera.CFrame)\n    wait(1)\n    VirtualUser:Button2Up(Vector2.new(0,0), workspace.CurrentCamera.CFrame)\n    print("Anti-AFK prevented kick!")\nend)', stars: 5 },
  ];

  // Load favorites and recent scripts from localStorage on component mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('favorite-scripts');
      if (savedFavorites) {
        setFavoriteScripts(JSON.parse(savedFavorites));
      }

      const savedRecent = localStorage.getItem('recent-scripts');
      if (savedRecent) {
        setRecentScripts(JSON.parse(savedRecent));
      } else {
        // Initialize with some recent scripts if none exist
        setRecentScripts([
          ...basicScripts.slice(0, 1),
          ...gameScripts.slice(0, 1),
          ...utilityScripts.slice(0, 1),
        ]);
      }
    } catch (error) {
      console.error('Failed to load scripts:', error);
    }
  }, []);

  // Add script to recently used
  const addToRecentScripts = (script: Script) => {
    // Check if script is already in recent list
    const existingIndex = recentScripts.findIndex(s => s.name === script.name);
    let newRecentScripts;
    
    if (existingIndex !== -1) {
      // Move to the top if already exists
      newRecentScripts = [
        script,
        ...recentScripts.slice(0, existingIndex),
        ...recentScripts.slice(existingIndex + 1)
      ].slice(0, 5); // Keep only the 5 most recent
    } else {
      // Add to the top if doesn't exist
      newRecentScripts = [script, ...recentScripts].slice(0, 5);
    }
    
    setRecentScripts(newRecentScripts);
    localStorage.setItem('recent-scripts', JSON.stringify(newRecentScripts));
  };

  // Toggle favorite status of a script
  const toggleFavorite = (script: Script) => {
    const existingIndex = favoriteScripts.findIndex(s => s.name === script.name);
    let newFavorites;
    
    if (existingIndex !== -1) {
      // Remove from favorites
      newFavorites = favoriteScripts.filter(s => s.name !== script.name);
      toast.info(`Removed "${script.name}" from favorites`);
    } else {
      // Add to favorites
      newFavorites = [...favoriteScripts, script];
      toast.success(`Added "${script.name}" to favorites`);
    }
    
    setFavoriteScripts(newFavorites);
    localStorage.setItem('favorite-scripts', JSON.stringify(newFavorites));
  };

  // Check if a script is in favorites
  const isFavorite = (script: Script) => {
    return favoriteScripts.some(s => s.name === script.name);
  };

  const handleScriptSelect = (script: Script) => {
    onSelectScript(script.code);
    addToRecentScripts(script);
  };

  const renderStars = (count: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={12} 
        className={i < count ? "text-mocha-yellow fill-mocha-yellow" : "text-gray-500"} 
      />
    ));
  };

  const renderScriptList = (scripts: Script[]) => {
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
            >
              <div className="flex justify-between items-center">
                <p 
                  className="text-executor-light text-sm cursor-pointer flex-grow"
                  onClick={() => handleScriptSelect(script)}
                >
                  {script.name}
                </p>
                <div className="flex space-x-1">
                  <button
                    onClick={() => toggleFavorite(script)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-executor-secondary rounded-md"
                    title={isFavorite(script) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart 
                      size={14} 
                      className={isFavorite(script) ? "text-mocha-red fill-mocha-red" : "text-executor-light"} 
                    />
                  </button>
                  <button
                    onClick={() => handleScriptSelect(script)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-executor-secondary rounded-md"
                    title="Load script"
                  >
                    <ChevronRight size={14} className="text-executor-purple" />
                  </button>
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

  // Add a custom script to the library
  const handleAddCustomScript = () => {
    const scriptName = prompt("Enter script name:");
    if (!scriptName) return;
    
    const customScript: Script = {
      name: scriptName,
      code: '-- Custom script: ' + scriptName + '\n\nprint("Custom script executed!")',
      stars: 3
    };
    
    // Add to favorites
    const newFavorites = [...favoriteScripts, customScript];
    setFavoriteScripts(newFavorites);
    localStorage.setItem('favorite-scripts', JSON.stringify(newFavorites));
    
    toast.success(`Added "${scriptName}" to favorites`);
  };

  return (
    <Card className="bg-executor-secondary border-executor-purple border-opacity-30 overflow-hidden shadow-lg">
      <div className="bg-executor-dark px-4 py-2 border-b border-executor-purple border-opacity-30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen size={14} className="text-mocha-lavender" />
          <span className="text-executor-light font-medium">Script Library</span>
        </div>
        <button
          onClick={handleAddCustomScript}
          className="text-executor-light hover:text-executor-purple transition-colors"
          title="Add Custom Script"
        >
          <Save size={14} />
        </button>
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
        <TabsList className="grid grid-cols-5 w-full bg-executor-dark">
          <TabsTrigger value="recent" className="text-executor-light text-xs py-1.5">
            <Clock size={12} className="mr-1" /> Recent
          </TabsTrigger>
          <TabsTrigger value="favorite" className="text-executor-light text-xs py-1.5">
            <Heart size={12} className="mr-1" /> Favorites
          </TabsTrigger>
          <TabsTrigger value="basic" className="text-executor-light text-xs py-1.5">Basic</TabsTrigger>
          <TabsTrigger value="game" className="text-executor-light text-xs py-1.5">Game</TabsTrigger>
          <TabsTrigger value="utility" className="text-executor-light text-xs py-1.5">Utility</TabsTrigger>
        </TabsList>
        <div className="h-[280px] custom-scrollbar overflow-y-auto">
          <TabsContent value="recent" className="p-0 m-0">
            {renderScriptList(recentScripts)}
          </TabsContent>
          <TabsContent value="favorite" className="p-0 m-0">
            {renderScriptList(favoriteScripts)}
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
