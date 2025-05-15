import { ClockIcon } from "@heroicons/react/24/outline";
import { TimelineItem } from "../pages/TimelineItems";
import { EquipmentDetailsCard } from "../utils/EquipmentDetailCard";



export const EquipmentHistory2 = () => {
  return (
    <div className="pt-10 min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <EquipmentDetailsCard />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Equipment History
        </h2>
        
        <div className="relative">
          {/* Vertical Timeline */}
          <div className="absolute left-4 top-0 h-full border-l-2 border-yellow-300 dark:border-ywllow-600"></div>

          <div className="space-y-10">
            <TimelineItem
              title="Created"
              user="Admin"
              date="2025-05-12 09:32 AM"
              transaction=""
            />
            <TimelineItem
              title="Transferred"
              user="User456"
              date="2025-05-12 09:32 AM"
              transaction="TXN-87654321"
            />
            <TimelineItem
              title="Transferred"
              user="User456"
              date="2025-05-12 09:32 AM"
              transaction="TXN-87654321"
            />
            <TimelineItem
              title="Transferred"
              user="User456"
              date="2025-05-12 09:32 AM"
              transaction="TXN-87654321"
            />
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

