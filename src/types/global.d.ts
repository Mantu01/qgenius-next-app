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
    updatedAt:string;
  }
  interface RootState {
    user: {
      user: User;
      isAuthenticated:boolean
    };
    chat:{
      chat:Message[];
      selectedChat:{
        id:string;
        header:string;
      };
    }
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

  interface FormValues {
    fullName: string;
    userName: string;
    avatar: File | null;
    coverImage: File | null;
    avatarPreview?: string;
    coverPreview?: string;
  }

  interface EditFormValues {
    fullName: string
    userName: string
    avatar: string | null
    coverImage: string | null
    avatarPreview?: string
    coverPreview?: string
  }

  interface Message {
  role: 'user' | 'assistant';
  content: string;
}

}

export {}