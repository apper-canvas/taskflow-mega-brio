import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";

const Header = ({ onAddTask, searchValue, onSearchChange, onToggleFilters }) => {
  return (
    <header className="glass-effect border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
              <ApperIcon name="CheckSquare" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold gradient-text">
                TaskFlow
              </h1>
              <p className="text-sm text-gray-600">Smart Task Management</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block w-80">
            <SearchBar 
              value={searchValue}
              onChange={onSearchChange}
              placeholder="Search tasks..."
            />
          </div>
          
          <Button 
            onClick={onToggleFilters}
            variant="outline"
            className="md:hidden"
          >
            <ApperIcon name="Filter" size={18} />
          </Button>

          <Button onClick={onAddTask} className="flex items-center space-x-2">
            <ApperIcon name="Plus" size={18} />
            <span className="hidden sm:inline">Add Task</span>
          </Button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="md:hidden mt-4">
        <SearchBar 
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Search tasks..."
        />
      </div>
    </header>
  );
};

export default Header;