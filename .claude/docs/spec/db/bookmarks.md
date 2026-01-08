# bookmarks

북마크(링크) 저장 테이블

## 필드
- `id`: UUID (PK, 자동 생성)
- `title`: 북마크 제목 (필수, OG 자동 추출)
- `url`: 링크 URL (필수)
- `description`: 설명 (선택, OG 자동 추출)
- `memo`: 사용자 메모 (선택)
- `thumbnail`: OG 이미지 URL (선택, OG 자동 추출)
- `folder_id`: 폴더 ID (선택, FK → folders.id)
- `is_favorite`: 즐겨찾기 여부 (기본값: false)
- `user_id`: 사용자 ID (필수)
- `created_at`: 생성 시간 (자동)
- `updated_at`: 수정 시간 (자동)

## 설정
- `folder_id`: 폴더 삭제 시 NULL로 변경 (ON DELETE SET NULL)
- `updated_at`: 수정 시 자동 업데이트 (트리거)
- RLS: 사용자는 본인 데이터만 CRUD 가능
- 인덱스: user_id, folder_id, created_at (성능 최적화)

```sql
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  memo TEXT,
  thumbnail TEXT,
  folder_id UUID REFERENCES folders(id) ON DELETE SET NULL,
  is_favorite BOOLEAN DEFAULT false,
  user_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX idx_bookmarks_folder_id ON bookmarks(folder_id);
CREATE INDEX idx_bookmarks_created_at ON bookmarks(created_at DESC);

CREATE TRIGGER update_bookmarks_updated_at
  BEFORE UPDATE ON bookmarks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookmarks"
  ON bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookmarks"
  ON bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookmarks"
  ON bookmarks FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks"
  ON bookmarks FOR DELETE
  USING (auth.uid() = user_id);
```

## 필드 구분

### OG 자동 추출 필드
북마크 생성 시 URL에서 자동으로 추출됩니다.
- `title`: og:title → twitter:title → HTML title
- `description`: og:description → twitter:description → meta description
- `thumbnail`: og:image → twitter:image

### 사용자 입력 필드
- `memo`: 사용자가 직접 작성하는 메모

### 처리 방식
1. URL blur 시 POST /api/og-metadata 호출
2. title, description, thumbnail 자동 채우기
3. 사용자가 수정 가능
4. memo는 순수 사용자 입력
