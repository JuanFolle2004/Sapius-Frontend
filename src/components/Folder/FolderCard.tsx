import { Folder } from "../../types";

interface FolderCardProps {
  folder: Folder;
  courseCount: number;
  progress: number;
  onClick: () => void;
}

export default function FolderCard({ folder, courseCount, progress, onClick }: FolderCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-md transition"
    >
      <h3 className="text-lg font-semibold text-gray-800">{folder.title}</h3>
      <p className="text-sm text-gray-600">{folder.description}</p>
      <p className="text-sm text-teal-600 mt-2">{courseCount} games</p>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div
          className="bg-teal-500 h-2 rounded-full"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
    </div>
  );
}
