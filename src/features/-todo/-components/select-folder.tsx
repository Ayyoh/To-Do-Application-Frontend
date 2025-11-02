import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetFoldersQuery } from "@/hooks/useQuery/useFoldersQuery";

type SelectFolderProps = {
  onSelectFolder: (folderId: number | null) => void; // callback to parent
  defaultFolderId?: number | null; // optional default
};

export function SelectFolder({
  onSelectFolder,
  defaultFolderId,
}: SelectFolderProps) {
  const { data: folders, isLoading } = useGetFoldersQuery();
  const [selected, setSelected] = React.useState<string | undefined>(
    defaultFolderId ? String(defaultFolderId) : undefined
  );

  const handleSelectChange = (value: string) => {
    setSelected(value);
    onSelectFolder(value === "none" ? null : Number(value));
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="font-quicksand font-semibold">Folder</span>

      <Select value={selected} onValueChange={handleSelectChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="No Folder" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Folders</SelectLabel>

            <SelectItem value="none">No Folder</SelectItem>

            {isLoading ? (
              <p className="px-2 text-sm text-gray-500">Loading...</p>
            ) : folders && folders.length > 0 ? (
              folders.map((folder: any) => (
                <SelectItem key={folder.id} value={String(folder.id)}>
                  {folder.folderName}
                </SelectItem>
              ))
            ) : (
              <p className="px-2 text-sm text-gray-500">No folders found</p>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
