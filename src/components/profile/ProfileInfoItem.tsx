import { LucideIcon } from "lucide-react";

const ProfileInfoItem = ({ icon: Icon, text }: { icon: LucideIcon; text: string }) => (
  <div className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
    <Icon size={20} className="text-green-600 dark:text-green-400 flex-shrink-0" />
    <span className="ml-3 text-gray-700 dark:text-gray-300">{text}</span>
  </div>
);

export default ProfileInfoItem;
