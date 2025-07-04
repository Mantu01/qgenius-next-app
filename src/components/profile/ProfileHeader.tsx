import Image from "next/image";

const ProfileHeader = ({ user }: { user: User }) => (
  <div className="relative">
    <div className="h-48 bg-green-100 dark:bg-green-900">
      {user.coverImage && (
        <Image
          src={user.coverImage}  // ✅ removed the unsafe assertion
          alt="Cover"
          fill  // ✅ Makes the image fill the parent container
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
    </div>

    <div className="absolute -bottom-16 left-6 md:left-10">
      <div className="h-32 w-32 rounded-full bg-gray-200 dark:bg-gray-700 border-4 border-white dark:border-gray-800 overflow-hidden shadow-lg ring-4 ring-red-600/20">
        {user.avatar && (
          <Image
            src={user.avatar}  // ✅ removed the unsafe assertion
            alt={user.fullName}
            fill  // ✅ Makes the image fill the parent container
            className="object-cover"
          />
        )}
      </div>
    </div>
  </div>
);

export default ProfileHeader;
