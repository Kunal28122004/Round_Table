import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateTaskDialog } from "@/components/CreateTaskDialog";

const tasks = [
  {
    id: 1,
    title: "Design user interface for login screen",
    description: "Create wireframes and mockups for the authentication flow",
    priority: "High",
    status: "In Progress",
    dueDate: "2025-07-20",
    assignee: "Krish Prajapati",
    department: "Design"
  },
  {
    id: 2,
    title: "Implement REST API endpoints",
    description: "Build backend services for user management",
    priority: "Medium",
    status: "To Do",
    dueDate: "2025-07-25",
    assignee: "Dev Team",
    department: "Development"
  },
  {
    id: 3,
    title: "Write unit tests for components",
    description: "Ensure code coverage is above 80%",
    priority: "Low",
    status: "To Do",
    dueDate: "2025-07-30",
    assignee: "QA Team",
    department: "Testing"
  },
  {
    id: 4,
    title: "Setup CI/CD pipeline",
    description: "Configure automated deployment process",
    priority: "High",
    status: "Completed",
    dueDate: "2025-07-15",
    assignee: "DevOps",
    department: "Infrastructure"
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High": return "bg-red-100 text-red-800 border-red-200";
    case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Low": return "bg-green-100 text-green-800 border-green-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed": return "bg-dot-green text-white";
    case "In Progress": return "bg-dot-blue text-white";
    case "To Do": return "bg-dot-orange text-white";
    default: return "bg-gray-500 text-white";
  }
};

export default function Tasks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [taskList, setTaskList] = useState(tasks);

  const handleAddTask = (newTask: {
    title: string;
    description?: string;
    priority?: string;
    status?: string;
    dueDate?: string;
    assignee?: string;
    department?: string;
  }) => {
    const task = {
      id: taskList.length + 1,
      title: newTask.title,
      description: newTask.description || "",
      priority: newTask.priority || "Medium",
      status: newTask.status || "To Do",
      dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
      assignee: newTask.assignee || "Unassigned",
      department: newTask.department || "General"
    };
    setTaskList((prev) => [task, ...prev]);
  };

  const filteredTasks = taskList.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "todo") return matchesSearch && task.status === "To Do";
    if (selectedTab === "progress") return matchesSearch && task.status === "In Progress";
    if (selectedTab === "completed") return matchesSearch && task.status === "Completed";
    
    return matchesSearch;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
        <CreateTaskDialog onAddTask={handleAddTask}>
          <Button className="bg-gradient-primary text-white shadow-soft hover:shadow-lg transition-all duration-300">
            <Plus className="mr-2 h-4 w-4" />
            Create Task
          </Button>
        </CreateTaskDialog>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background border-border"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="todo">To Do</TabsTrigger>
          <TabsTrigger value="progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          <div className="grid gap-4">
            {filteredTasks.map((task) => (
              <Card key={task.id} className="bg-gradient-card shadow-card border-border/50 hover:shadow-soft transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-lg text-foreground">{task.title}</h3>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <p className="text-muted-foreground">{task.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                        <Badge variant="outline">{task.department}</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Assigned to: {task.assignee}</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">No tasks found</div>
              <Button className="bg-gradient-primary text-white">
                <Plus className="mr-2 h-4 w-4" />
                Create your first task
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
