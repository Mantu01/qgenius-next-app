import { Bell, User, Shield, Globe,ChevronRight } from 'lucide-react';
import Link from 'next/link';

const SettingPage = () => {
  
  const settingsSections = [
    {
      title: "Account",
      icon: <User className="w-5 h-5" />,
      items: [
        { label: "Profile Information", description: "Update your personal details",url:'/profile/settings/edit' },
        { label: "Password", description: "Change your password" },
        { label: "Email & Phone", description: "Manage your contact information" }
      ]
    },
    {
      title: "Preferences",
      icon: <Globe className="w-5 h-5" />,
      items: [
        { label: "Language", description: "Change display language" },
        { label: "Appearance", description: "Light or dark theme" },
        { label: "Accessibility", description: "Adjust for your needs" }
      ]
    },
    {
      title: "Notifications",
      icon: <Bell className="w-5 h-5" />,
      items: [
        { label: "Push Notifications", description: "Manage app alerts" },
        { label: "Email Notifications", description: "Updates via email" }
      ]
    },
    {
      title: "Privacy & Security",
      icon: <Shield className="w-5 h-5" />,
      items: [
        { label: "Privacy Settings", description: "Control your data" },
        { label: "Security Options", description: "Keep your account secure" },
        { label: "Two-Factor Authentication", description: "Add an extra layer of security" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {settingsSections.map((section, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-green-50 dark:bg-gray-700 text-green-600 dark:text-green-400">
                    {section.icon}
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{section.title}</h2>
                </div>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {section.items.map((item, itemIndex) => (
                  <Link 
                    href={item.url || '#'} 
                    key={itemIndex} 
                    className="block px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium text-gray-900 dark:text-white truncate">{item.label}</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 truncate">{item.description}</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SettingPage;