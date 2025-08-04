import React, { useState } from "react";
import Header from "@/components/organisms/Header";
import FilterSidebar from "@/components/organisms/FilterSidebar";
import TaskList from "@/components/organisms/TaskList";
import TaskModal from "@/components/organisms/TaskModal";
import CategoryModal from "@/components/organisms/CategoryModal";

const TasksPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    status: [],
    priority: [],
    category: []
  });
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [categories, setCategories] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  React.useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const categoryService = await import("@/services/api/categoryService");
      const data = await categoryService.default.getAll();
      setCategories(data);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  const handleFilterChange = (type, value) => {
    if (type === "clear") {
      setSelectedFilters({
        status: [],
        priority: [],
        category: []
      });
      return;
    }

    setSelectedFilters(prev => {
      const currentFilters = prev[type] || [];
      const isSelected = currentFilters.includes(value);
      
      return {
        ...prev,
        [type]: isSelected 
          ? currentFilters.filter(item => item !== value)
          : [...currentFilters, value]
      };
    });
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleTaskSave = () => {
    setRefreshTrigger(prev => prev + 1);
    loadCategories(); // Refresh categories to update task counts
  };

  const handleCategorySave = () => {
    loadCategories();
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onAddTask={handleAddTask}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onToggleFilters={() => setIsFilterSidebarOpen(true)}
      />
      
      <div className="flex">
        <FilterSidebar
          categories={categories}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          onManageCategories={() => setIsCategoryModalOpen(true)}
          isOpen={isFilterSidebarOpen}
          onClose={() => setIsFilterSidebarOpen(false)}
        />
        
        <main className="flex-1 min-h-[calc(100vh-80px)]">
          <TaskList
            searchValue={searchValue}
            selectedFilters={selectedFilters}
            onEditTask={handleEditTask}
            onAddTask={handleAddTask}
            refreshTrigger={refreshTrigger}
          />
        </main>
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        task={editingTask}
        onSave={handleTaskSave}
      />

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSave={handleCategorySave}
      />
    </div>
  );
};

export default TasksPage;