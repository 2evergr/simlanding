# simlanding

온도더시 회사 및 고래풀 브랜드를 소개하는 정적 랜딩페이지입니다. 헤더 메뉴와 첫 화면 버튼은 없으며, 시오콘부 영역에서 영양성분·제품정보 페이지로 이동할 수 있습니다.

## 구조

- `index.html`: 회사 소개 → 고래풀 → 시오콘부 → 문의, 공유 메타데이터
- `product_detail.html`: 기존 시오콘부 표기정보 페이지 (독립 경로 유지)
- `css/style.scss`: 랜딩페이지 스타일 원본
- `css/style.css`, `css/style.css.map`: 배포용 컴파일 결과
- `img/ondo/`: 새 랜딩페이지 WebP 이미지와 소셜 공유 이미지
- `img/ondo/story/`: 회사 소개 스크롤 스토리용 컨셉 이미지 3종
- `js/company-story.js`: 회사 소개 스크롤 위치에 맞춰 항목과 이미지 상태를 전환하는 최소 스크립트
- `js/product-carousel.js`: 시오콘부 이미지 4장의 자동 슬라이드와 수동 선택 기능
- `docs/landing-v2.md`: 디자인 기준, 이미지 출처 및 검증 기록

회사 소개 스크롤 스토리와 제품 이미지 슬라이드에 JavaScript를 사용합니다. 제품 슬라이드는 화면에 보일 때 자동 재생되며, 모션 감소 설정에서는 자동 재생하지 않습니다. 루트 `favicon.ico`는 사이트 파비콘으로 유지합니다.

## 로컬 확인

```sh
npm ci
npm run build:css
python3 -m http.server 8766 --bind 127.0.0.1
```

`http://127.0.0.1:8766/`을 열어 확인합니다. SCSS를 수정한 뒤에는 컴파일된 CSS와 소스맵도 함께 반영합니다.

```sh
npm run watch:css
```

폰트는 Pretendard를 우선 사용하고 설치되어 있지 않으면 운영체제의 한국어 산세리프 폰트를 사용합니다. 외부 폰트·스크립트 요청 없이 표시됩니다.

## 배포

GitHub Pages와 기존 `CNAME` 설정을 유지합니다. 이 작업 브랜치는 검토용이며 main 병합·푸시는 별도로 진행합니다.
