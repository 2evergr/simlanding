# simlanding

ONDO THE SEA 고래풀 정적 랜딩 페이지입니다.

## 구조

- `index.html`: 페이지 마크업과 메타 태그
- `css/style.scss`: 원본 SCSS
- `css/style.css`: 브라우저가 로드하는 컴파일된 CSS
- `js/whale-grass.js`: 히어로 parallax와 GSAP ScrollTrigger 애니메이션
- `img/whale-grass/`: 페이지 이미지 자산

## 로컬 확인

브라우저에서 `index.html`을 직접 열어 확인할 수 있습니다.

## SCSS 수정

처음 한 번 의존성을 설치합니다.

```sh
npm install
```

SCSS를 CSS로 컴파일합니다.

```sh
npm run build:css
```

수정 중 자동 컴파일이 필요하면 watch 명령을 사용합니다.

```sh
npm run watch:css
```

`index.html`은 `css/style.css`를 로드하므로 스타일 변경 시 컴파일된 CSS도 함께 커밋해야 합니다.
