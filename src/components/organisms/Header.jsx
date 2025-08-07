import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "@/App";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
const Header = ({ onAddTask, searchValue, onSearchChange, onToggleFilters }) => {
  const { logout } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);
  
  const handleLogout = () => {
    logout();
  };
  
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

          {user && (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 hidden sm:inline">
                {user.firstName} {user.lastName}
              </span>
              <Button onClick={handleLogout} variant="outline" className="flex items-center space-x-2">
                <ApperIcon name="LogOut" size={16} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          )}
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