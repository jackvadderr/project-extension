'use client';

import Image from 'next/image';

export default function ProfileForm() {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Profile</h1>
      <div className="flex items-center gap-4 mb-6">
        <Image
          src="/avatar.svg"
          alt="Profile Picture"
          width={64}
          height={64}
          className="rounded-full"
        />
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Change picture</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md">Delete picture</button>
        </div>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Profile name</label>
          <input
            type="text"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            defaultValue="Kevin Heart"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            value="@kevinunhuy"
            disabled
          />
          <p className="text-xs text-gray-500 mt-1">Available change in 25/04/2024</p>
        </div>
        <div>
          <label className="block text-sm font-medium">Status recently</label>
          <input
            type="text"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            defaultValue="On duty"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">About me</label>
          <textarea
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            defaultValue="Discuss only on work hour, unless you wanna discuss about music 🙏🏻"
          />
        </div>
        <button className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md cursor-not-allowed" disabled>
          Save changes
        </button>
      </form>
    </div>
  );
}
