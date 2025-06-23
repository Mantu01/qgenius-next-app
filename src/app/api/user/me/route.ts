import prisma from "@/config/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { sendEmail } from "@/helper/mail/mailer";
import { uploadToCloudinary } from "@/helper/media/uploadImage";

export async function GET(req: NextRequest) {
  try {
    const userId = getDataFromToken(req);
    if(!userId){
      const response=NextResponse.json({message:"Invalid Token"},{status:401});
      response.cookies.delete('token');
      return response
    }
    const user=await prisma.user.findFirst({
      where:{id: userId},
      omit:{
        password:true,
        verifyToken:true,
        verifyTokenExpiry:true,
        forgotPasswordToken:true,
        forgotPasswordTokenExpiry:true
      }
    });
    if(!user){
      return NextResponse.json({ message: "User not found", },{ status: 404 });
    }
    if(!user.isVerified){
      await sendEmail({email:user.email,emailType:"VERIFY",userId:user.id});
    }
    return NextResponse.json({ message: "User found",data:user },{status:200});
  } catch (error) {
    console.error(error);
    //@ts-expect-error: unknown
    return NextResponse.json({ message: error.message},{ status: 500 });
  }
}


// basicInfo={fullName,userName}
// updateEmail={email,password}
// updatePassword={oldPassword,newPassword}
// export async function POST(req: NextRequest) {
//   try {
//     const userId = getDataFromToken(req);
//     if(!userId){
//       return NextResponse.json({message:"Invalid Token"},{status:401});
//     }
//     const {basicInfo,updateEmail,updatePassword,avatar}=await req.json();
//     let updatedUser;
//     if(basicInfo){
//       const {fullName,userName}=basicInfo;
//       const userExists=await prisma.user.findFirst({where:{userName}});
//       if(userName && userExists){
//         return NextResponse.json({ message: "Username already exists" },{ status: 400 });
//       }
//       updatedUser=await prisma.user.update({
//         where:{id:userId},
//         data:{fullName,userName},
//         omit:{password:true,verifyToken:true,verifyTokenExpiry:true,forgotPasswordToken:true,forgotPasswordTokenExpiry:true}
//       });
//     }else if(updateEmail){
//       const {email,password}=updateEmail;
//       const userExists=await prisma.user.findFirst({where:{email}});
//       if(userExists){
//         return NextResponse.json({ message: "Email already registered" },{ status: 400 });
//       }
//       const user=await prisma.user.findFirst({where:{id:userId}});
//       const isPasswordValid=await bcrypt.compare(password,user!.password);
//       if(!isPasswordValid){
//         return NextResponse.json({ message: "Invalid password", },{ status: 401 });
//       }
//       updatedUser=await prisma.user.update({
//         where:{id:userId},
//         data:{email},
//         omit:{password:true,verifyToken:true,verifyTokenExpiry:true,forgotPasswordToken:true,forgotPasswordTokenExpiry:true}
//       });
//       await sendEmail({email:updatedUser.email,emailType:"VERIFY",userId});
//     }else if(updatePassword){
//       const {oldPassword,newPassword}=updatePassword;
//       const user=await prisma.user.findFirst({where:{id:userId}});
//       const isPasswordValid=await bcrypt.compare(oldPassword,user!.password);
//       if(!isPasswordValid){
//         return NextResponse.json({ message: "Invalid password", },{ status: 401 });
//       }
//       const hashedPassword=await bcrypt.hash(newPassword,10);
//       updatedUser=await prisma.user.update({
//         where:{id:userId},
//         data:{password:hashedPassword},
//         omit:{password:true,verifyToken:true,verifyTokenExpiry:true,forgotPasswordToken:true,forgotPasswordTokenExpiry:true}
//       });
//     }
//     if(!updatedUser){
//       return NextResponse.json({ message: "User not found" },{ status: 404 });
//     }
//     return NextResponse.json({ message: "User updated successfully",user:updatedUser },{status:200});
//   } catch (error:any) {
//     console.error(error);
//     return NextResponse.json({ message: error.message },{status:500});
//   }
// }

interface UpdateData {
  fullName?: string;
  userName?: string;
  avatar?: string;
  coverImage?: string;
  // add other fields as needed
}

export async function PUT(req:NextRequest) {
  try {
    const userId = getDataFromToken(req);
    if(!userId){
      return NextResponse.json({message:"Invalid Token"},{status:401});
    }
    const formData=await req.formData();
    const updateData:UpdateData={};
    if(formData.has('fullName')){
      updateData.fullName=formData.get('fullName') as string;
    }
    if(formData.has('userName')){
      updateData.userName=formData.get('userName') as string;
    }
    if(formData.has('avatar')){
      const avatarFile=formData.get('avatar') as File;
      const bytes=await avatarFile.arrayBuffer();
      const buffer=Buffer.from(bytes);
      const result=await uploadToCloudinary(buffer,{folder:'avatar'});
      //@ts-expect-error: unknown
      updateData.avatar=result.secure_url;
    }
    if(formData.has('coverImage')){
      const coverImageFile=formData.get('coverImage') as File;
      const bytes=await coverImageFile.arrayBuffer();
      const buffer=Buffer.from(bytes);
      const result=await uploadToCloudinary(buffer,{folder:'coverImage'});
      //@ts-expect-error: unknown
      updateData.coverImage=result.secure_url;
    }

    const updatedUser=await prisma.user.update({
      where:{id:userId},
      data:updateData
    });

    if(!updatedUser){
      return NextResponse.json({message:"User not found"},{status:404});
    }

    return NextResponse.json({ message: "User updated successfully",user:updatedUser },{status:200});
  } catch (error) {
    console.error(error);
    //@ts-expect-error: unknown
    return NextResponse.json({ message: error.message },{status:500});
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = getDataFromToken(req);
    if(!userId){
      return NextResponse.json({message:"Invalid Token"},{status:401});
    }
    await prisma.user.delete({
      where:{id:userId}
    });
    return NextResponse.json({ message: "User deleted successfully" },{status:200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}


// GET-> get Details of logged in user
// POST-> Update logged in user
// DELETE-> Delete logged in user