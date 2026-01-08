"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { useGetFolders } from "@/shared/hooks/queries/folders/useGetFolders";
import DropdownSelect from "@/shared/components/dropdown/dropdown-select";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}

export default function FolderSelector<T extends FieldValues>({
  name,
  control,
}: Props<T>) {
  const { data: folders = [], isLoading } = useGetFolders({
    search: null,
    sort: null,
    order: null,
  });

  const folderOptions = [
    { value: undefined, label: "폴더 없음" },
    ...folders.map((f) => ({ value: f.id, label: f.name })),
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">폴더</label>
      <Controller
        name={name}
        control={control}
        rules={{ required: "폴더를 선택해주세요" }}
        render={({ field, fieldState }) => (
          <div className="flex flex-col">
            <DropdownSelect
              options={folderOptions}
              value={field.value}
              onChange={field.onChange}
              error={!!fieldState.error}
              fullWidth={true}
              className="px-4 py-3"
              contentClassName="min-w-[280px]"
              renderLabel={(option) =>
                option?.value ? `📁 ${option.label}` : "폴더 없음"
              }
              placeholder={isLoading ? "로딩 중..." : "폴더 선택"}
            />
            {fieldState.error?.message && (
              <p className="mt-1 text-sm text-danger">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
}
