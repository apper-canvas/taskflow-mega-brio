import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TaskCard from "@/components/organisms/TaskCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import taskService from "@/services/api/taskService";

const TaskList = ({ 
  searchValue, 
  selectedFilters, 
  onEditTask, 
  onAddTask,
  refreshTrigger 
}) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [refreshTrigger]);

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId);
      if (!task) return;

      const updatedTask = {
        ...task,
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null
      };

      await taskService.update(taskId, updatedTask);
      
      // Update local state
      setTasks(prev => prev.map(t => t.Id === taskId ? updatedTask : t));
      
      if (updatedTask.completed) {
        toast.success("🎉 Task completed! Great job!");
        
        // Add completion animation class
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        if (taskElement) {
          taskElement.classList.add("task-complete-animation");
        }
      } else {
        toast.info("Task marked as active");
      }
    } catch (err) {
      console.error("Error toggling task completion:", err);
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(t => t.Id !== taskId));
      toast.success("Task deleted successfully");
    } catch (err) {
      console.error("Error deleting task:", err);
      toast.error("Failed to delete task");
    }
  };

  // Filter tasks based on search and filters
  const filteredTasks = tasks.filter(task => {
    // Search filter
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      const matchesSearch = 
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Status filter
    if (selectedFilters.status?.length > 0) {
      const isCompleted = task.completed;
      const hasActiveFilter = selectedFilters.status.includes("active");
      const hasCompletedFilter = selectedFilters.status.includes("completed");
      
      if (hasActiveFilter && hasCompletedFilter) {
        // Both filters selected, show all
      } else if (hasActiveFilter && isCompleted) {
        return false;
      } else if (hasCompletedFilter && !isCompleted) {
        return false;
      }
    }

    // Priority filter
    if (selectedFilters.priority?.length > 0) {
      if (!selectedFilters.priority.includes(task.priority)) {
        return false;
      }
    }

    // Category filter
    if (selectedFilters.category?.length > 0) {
      if (!selectedFilters.category.includes(task.categoryId)) {
        return false;
      }
    }

    return true;
  });

  // Group tasks by completion status
  const activeTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadTasks} />;
  if (tasks.length === 0) return <Empty onAddTask={onAddTask} />;

  if (filteredTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mb-6">
          <ApperIcon name="Search" size={32} className="text-white" />
        </div>
        <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
          No tasks found
        </h3>
        <p className="text-gray-600 max-w-md">
          Try adjusting your search terms or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Active Tasks */}
      {activeTasks.length > 0 && (
        <div>
          <h2 className="text-xl font-display font-bold text-gray-900 mb-4 flex items-center">
            <div className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full mr-3"></div>
            Active Tasks ({activeTasks.length})
          </h2>
          <div className="space-y-3">
            {activeTasks.map((task) => (
              <TaskCard
                key={task.Id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onEdit={onEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h2 className="text-xl font-display font-bold text-gray-600 mb-4 flex items-center">
            <div className="w-3 h-3 bg-gradient-to-r from-success to-green-600 rounded-full mr-3"></div>
            Completed Tasks ({completedTasks.length})
          </h2>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <TaskCard
                key={task.Id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onEdit={onEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;