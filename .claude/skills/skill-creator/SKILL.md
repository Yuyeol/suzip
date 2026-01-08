---
name: skill-creator
description: Create new Claude Code skills following standardized format
---

# Skill Creator

## Our Skill File Convention

이 프로젝트의 스킬은 3-section 구조를 따릅니다:

1. **Our Convention** - 프로젝트의 규칙과 패턴 설명
   - "이 프로젝트는 X 패턴을 따릅니다"로 시작
   - 동작 위주 설명 (Use/Create/Verify)
   - 선택 가이드 (Use when / Don't use for)

2. **Project-Specific Rules** - 필수 규칙 나열
   - 짧은 bullet points
   - 절대 금지 사항 명시

3. **Example Output** - 완성된 결과물 예시
   - 실제 파일 경로 포함
   - 전체 코드 또는 명령어 결과
   - "Example Output (설명)" 형식 제목

## Project-Specific Rules

- **File location**: `.claude/skills/{skill-name}/skill.md`
- **Naming**: kebab-case
- **Frontmatter**: `name`, `description` 필수
- **Structure**: 3-section (Convention → Rules → Example)
- **Language**: 한국어 본문, 영어 코드
- **Example**: 완성된 결과물 (플레이스홀더 금지)
