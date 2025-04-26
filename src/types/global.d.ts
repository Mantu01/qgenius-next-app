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

}

export {}