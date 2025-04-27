declare global {
  interface InputFieldProps {
    id: string;
    register: UseFormRegister;
    type: string;
    label: string;
    icon?: React.ReactNode;
    placeholder?: string;
    required?: boolean;
    showPasswordToggle?: boolean;
    showPassword?: boolean;
    togglePassword?: () => void;
    toggleIcon?:React.ReactNode
  }

  interface LoginData{
    email:string,
    password:string
  }


  interface SignupData{
    fullName:string,
    userName:string,
    email:string,
    password:string
  }

  interface LinkProps{
    text:string,
    href:string,
    linkText:string
  }

  interface User {
    id: string;
    fullName: string;
    userName: string;
    email: string;
    avatar: string | null;
    coverImage: string | null;
    creaditsLeft: number;
    isVerified: boolean;
    createdAt: string;
  }
  interface RootState {
    user: {
      user: User;
      isAuthenticated:boolean
    };
  }

  interface SectionItem {
    name: string;
    path: string;
    icon: React.ReactNode;
  };
  
  interface Section {
    title: string;
    items: SectionItem[];
  };
  
  interface SectionMap {
    [key: string]: {
      active: boolean;
      sections: Section[];
    };
  };

}

export {}