'use client'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { 
  User,
  Image as ImageIcon, 
  Save, 
  X,
} from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { setUser } from '@/app/store/userSlice'
import { FileUploadButton } from '@/components/profile/edit/FileUploadButton'
import { AccountInfoCard } from '@/components/profile/edit/AccountInfoCard'
import { PlanVerificationCard } from '@/components/profile/edit/PlanVerificationCard.tsx'
import BackButton from '@/components/buttons/BackButton'

const EditPage = () => {
  const router = useRouter()
  const { user } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields },
    setValue,
    watch,
    reset,
    setError,
    clearErrors
  } = useForm<EditFormValues>({
    defaultValues: {
      fullName: '',
      userName: '',
      avatar: null,
      coverImage: null
    }
  })

  React.useEffect(() => {
    if (user) {
      const initialValues = {
        fullName: user.fullName || '',
        userName: user.userName || '',
        avatar: user.avatar,
        coverImage: user.coverImage
      }
      reset(initialValues)
    }
  }, [user, reset])

  const onSubmit = async (inputData: EditFormValues) => {
    try {
      const formData = new FormData();
      const changedFields = Object.entries(dirtyFields).reduce((fields, [key, isDirty]) => {
        if (isDirty) {
          fields.push(key);
        }
        return fields;
      }, [] as string[]);
      if (changedFields.length === 0) {
        toast.info('No changes done');
        return;
      }
      changedFields.forEach((key) => {
        const fieldKey = key as keyof EditFormValues;
        const value = inputData[fieldKey];
        if (fieldKey === 'avatar' || fieldKey === 'coverImage') {
          if (value) {
            formData.append(fieldKey, value);
          }
        }
        formData.append(fieldKey, value as string);
      });
      const { data } = await axios.put('/api/user/me', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      dispatch(setUser(data.user));
      toast.success(data.message);
    } catch (error) {
      setError('userName', {
        type: 'manual',
        //@ts-expect-error: unknown
        message: error.response?.data?.message || 'Failed to update profile. Please try again.'
      });
    }
  };
  //@ts-expect-error: unknown
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setError(fieldName, {
        type: 'manual',
        message: 'File size exceeds 5MB limit'
      })
      return
    }

    setValue(fieldName, file, { shouldDirty: true })
    clearErrors(fieldName)

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      if (fieldName === 'avatar') {
        setValue('avatarPreview', result, { shouldDirty: true })
      } else if (fieldName === 'coverImage') {
        setValue('coverPreview', result, { shouldDirty: true })
      }
    }
    reader.readAsDataURL(file)
  }

  const avatarPreview = watch('avatarPreview') || user?.avatar
  const coverPreview = watch('coverPreview') || user?.coverImage

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 pt-12 pb-8 px-4">
      <div className="max-w-3xl mx-auto">
        <BackButton/>
        {errors.root && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 flex justify-between items-center">
            <span>{errors.root?.message}</span>
            <button onClick={() => clearErrors('root')} className="p-1">
              <X size={16} />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="relative h-56 bg-gray-200 dark:bg-gray-700">
            {coverPreview ? (
              <Image 
                src={coverPreview} 
                alt="Cover image" 
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon size={48} className="text-gray-400 dark:text-gray-500" />
              </div>
            )}
            <div className="absolute top-4 right-4">
              <FileUploadButton
                onChange={(e) => handleFileChange(e, 'coverImage')}
                className="p-2.5"
              />
            </div>
            {errors.coverImage && (
              <div className="absolute bottom-4 left-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm py-1 px-3 rounded-md shadow">
                {errors.coverImage.message}
              </div>
            )}
          </div>

          <div className="relative mx-8 -mt-20">
            <div className="h-36 w-36 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gray-300 dark:bg-gray-600 shadow-lg relative">
              {avatarPreview ? (
                <Image 
                  src={avatarPreview} 
                  alt="Profile avatar" 
                  width={144}
                  height={144}
                  sizes="144px"
                  className="object-cover w-full h-full"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User size={48} className="text-gray-500 dark:text-gray-400" />
                </div>
              )}
              <div className="absolute bottom-2 right-2">
                <FileUploadButton 
                  onChange={(e) => handleFileChange(e, 'avatar')}
                />
              </div>
            </div>
          </div>

          <div className="p-8 pt-12">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute top-3 left-3 text-green-600 dark:text-green-500" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className={`pl-10 w-full border ${errors.fullName ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'} rounded-lg p-2.5 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors`}
                    {...register('fullName', { required: 'Full name is required' })}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fullName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Username</label>
                <div className="relative">
                  <span className="absolute top-3 left-3 text-green-600 dark:text-green-500">@</span>
                  <input
                    type="text"
                    placeholder="Choose a unique username"
                    className={`pl-10 w-full border ${errors.userName ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'} rounded-lg p-2.5 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors`}
                    {...register('userName', { 
                      required: 'Username is required',
                      validate: (value) => !value.includes(' ') || 'Username cannot contain spaces'
                    })}
                  />
                  {errors.userName && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.userName.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-6 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AccountInfoCard
                    email={user?.email || ''}
                    createdAt={user?.createdAt || ''}
                  />

                  <PlanVerificationCard
                    creditsLeft={user?.creaditsLeft || 0}
                    isVerified={user?.isVerified || false}
                  />
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white rounded-lg flex items-center transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPage