import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ onAddTask }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-8 text-center">
      <div className="w-32 h-32 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mb-8 shadow-2xl">
        <ApperIcon name="CheckSquare" size={60} className="text-white" />
      </div>
      
      <h3 className="text-3xl font-display font-bold gradient-text mb-4">
        Ready to Get Things Done?
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-lg leading-relaxed text-lg">
        Your task list is empty, which means it's the perfect time to add your first task and start building momentum towards your goals!
      </p>
      
      <button
        onClick={onAddTask}
        className="btn-primary text-lg px-8 py-3 shadow-lg flex items-center space-x-3"
      >
        <ApperIcon name="Plus" size={20} />
        <span>Create Your First Task</span>
      </button>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl">
        <div className="flex flex-col items-center p-4">
          <div className="w-12 h-12 bg-gradient-to-r from-accent to-orange-500 rounded-lg flex items-center justify-center mb-3">
            <ApperIcon name="Target" size={24} className="text-white" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">Set Priorities</h4>
          <p className="text-sm text-gray-600 text-center">Mark tasks as high, medium, or low priority</p>
        </div>
        
        <div className="flex flex-col items-center p-4">
          <div className="w-12 h-12 bg-gradient-to-r from-success to-green-600 rounded-lg flex items-center justify-center mb-3">
            <ApperIcon name="Calendar" size={24} className="text-white" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">Set Due Dates</h4>
          <p className="text-sm text-gray-600 text-center">Never miss a deadline with date tracking</p>
        </div>
        
        <div className="flex flex-col items-center p-4">
          <div className="w-12 h-12 bg-gradient-to-r from-info to-blue-600 rounded-lg flex items-center justify-center mb-3">
            <ApperIcon name="FolderOpen" size={24} className="text-white" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">Organize</h4>
          <p className="text-sm text-gray-600 text-center">Group tasks by categories for better focus</p>
        </div>
      </div>
    </div>
  );
};

export default Empty;