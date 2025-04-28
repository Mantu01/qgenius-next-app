import Link from "next/link";

interface input{
  children:React.ReactNode,
  url:string,
  primary?:boolean
}

const ProfileButton = ({ primary, children,url }:input) => (
  <Link
    href={url} 
    className={`${primary 
      ? "bg-red-600 hover:bg-red-700 text-white" 
      : "border border-green-600 text-black dark:text-white dark:border-green-400 hover:bg-green-600 hover:text-white dark:hover:bg-green-600"
    } font-medium py-2 px-6 rounded-lg transition duration-200 shadow-sm hover:shadow-md flex-1 md:flex-none`}
  >
    {children}
  </Link >
);

export default ProfileButton;