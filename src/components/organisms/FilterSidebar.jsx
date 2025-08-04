import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import CategoryPill from "@/components/molecules/CategoryPill";

const FilterSidebar = ({ 
  categories,
  selectedFilters,
  onFilterChange,
  onManageCategories,
  isOpen,
  onClose
}) => {
  const statusFilters = [
    { key: "active", label: "Active", icon: "Circle" },
    { key: "completed", label: "Completed", icon: "CheckCircle" }
  ];

  const priorityFilters = [
    { key: "high", label: "High Priority", icon: "AlertCircle" },
    { key: "medium", label: "Medium Priority", icon: "Clock" },
    { key: "low", label: "Low Priority", icon: "Minus" }
  ];

  const FilterButton = ({ filter, type }) => (
    <button
      onClick={() => onFilterChange(type, filter.key)}
      className={`
        w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200
        ${selectedFilters[type]?.includes(filter.key)
          ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md transform scale-[1.02]"
          : "text-gray-700 hover:bg-gray-100"
        }
      `}
    >
      <ApperIcon name={filter.icon} size={16} />
      <span className="text-sm font-medium">{filter.label}</span>
    </button>
  );

  const sidebarContent = (
    <div className="space-y-6">
      {/* Status Filters */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
          <ApperIcon name="Filter" size={16} className="mr-2" />
          Status
        </h3>
        <div className="space-y-1">
          {statusFilters.map((filter) => (
            <FilterButton key={filter.key} filter={filter} type="status" />
          ))}
        </div>
      </div>

      {/* Priority Filters */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
          <ApperIcon name="Star" size={16} className="mr-2" />
          Priority
        </h3>
        <div className="space-y-1">
          {priorityFilters.map((filter) => (
            <FilterButton key={filter.key} filter={filter} type="priority" />
          ))}
        </div>
      </div>

      {/* Category Filters */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center">
            <ApperIcon name="FolderOpen" size={16} className="mr-2" />
            Categories
          </h3>
          <Button 
            onClick={onManageCategories}
            variant="ghost"
            size="sm"
            className="text-xs"
          >
            <ApperIcon name="Settings" size={14} />
          </Button>
        </div>
        <div className="space-y-2">
          {categories.map((category) => (
            <CategoryPill
              key={category.Id}
              category={category}
              isSelected={selectedFilters.category?.includes(category.Id)}
              onClick={() => onFilterChange("category", category.Id)}
            />
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <div className="pt-4 border-t border-gray-200">
        <Button 
          onClick={() => onFilterChange("clear")}
          variant="outline"
          size="sm"
          className="w-full flex items-center space-x-2"
        >
          <ApperIcon name="X" size={14} />
          <span>Clear All Filters</span>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white border-r border-gray-200 p-6 overflow-y-auto">
        {sidebarContent}
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
          ></div>
          <div className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-display font-semibold">Filters</h2>
                <Button onClick={onClose} variant="ghost" size="sm">
                  <ApperIcon name="X" size={20} />
                </Button>
              </div>
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;