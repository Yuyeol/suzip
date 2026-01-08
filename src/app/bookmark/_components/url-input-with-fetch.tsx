"use client";

import { useEffect } from "react";
import {
  Control,
  useWatch,
  Path,
  FieldValues,
  useFormState,
} from "react-hook-form";
import FormInput from "@/shared/components/core/form-input";
import Button from "@/shared/components/core/button";
import { usePostOgMetadata } from "@/shared/hooks/queries/og-metadata/usePostOgMetadata";

interface Props<T extends FieldValues> {
  control: Control<T>;
  urlFieldName: Path<T>;
  onMetadataFetched: (data: {
    title: string | null;
    description: string | null;
    thumbnail: string | null;
  }) => void;
}

export default function UrlInputWithFetch<T extends FieldValues>({
  control,
  urlFieldName,
  onMetadataFetched,
}: Props<T>) {
  const { mutate, isPending, isSuccess, reset } = usePostOgMetadata();
  const url = useWatch({ control, name: urlFieldName });
  const { errors } = useFormState({ control });

  const urlError = errors[urlFieldName];
  const isUrlValid = url && !urlError;

  // URL 변경 시 성공 상태 리셋
  useEffect(() => {
    reset();
  }, [url, reset]);

  const handleFetch = () => {
    const urlValue = url as string;
    if (!urlValue) return;

    mutate(
      { url: urlValue },
      {
        onSuccess: (data) => {
          onMetadataFetched(data);
        },
        onError: (error) => {
          console.error("Failed to fetch metadata:", error);
        },
      }
    );
  };

  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <FormInput
          name={urlFieldName}
          control={control}
          label="URL"
          type="url"
          placeholder="https://example.com"
          rules={{
            required: "URL을 입력해주세요",
            pattern: {
              value: /^https?:\/\/.+/,
              message: "올바른 URL 형식이 아닙니다 (http:// 또는 https://)",
            },
          }}
        />
      </div>
      {!isSuccess && (
        <div className="pt-7">
          <Button
            type="button"
            variant={isUrlValid ? "primary" : "primary-light"}
            size="md"
            onClick={handleFetch}
            disabled={isPending || !isUrlValid}
          >
            {isPending ? "확인 중..." : "확인"}
          </Button>
        </div>
      )}
    </div>
  );
}
