interface input{
  children:React.ReactNode
  primary?:boolean
}

const ProfileButton = ({ primary, children }:input) => (
  <button 
    className={`${primary 
      ? "bg-red-600 hover:bg-red-700 text-white" 
      : "border border-blue-600 text-black dark:text-white dark:border-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600"
    } font-medium py-2 px-6 rounded-lg transition duration-200 shadow-sm hover:shadow-md flex-1 md:flex-none`}
  >
    {children}
  </button>
);

export default ProfileButton;