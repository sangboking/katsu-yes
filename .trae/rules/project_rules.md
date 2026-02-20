# 프로젝트 코딩 규칙

## 1. 함수 선언 및 변수

- 모든 함수는 `const`를 사용한 **Arrow Function**으로 작성한다.
- 재할당이 없는 변수는 반드시 `const`를 사용하며, `var`는 절대 금지한다.

## 2. 조건문 제어 (Anti If-Else)

- `if-else` 구조를 지양한다.
- **Early Return** 패턴을 사용하여 로직의 깊이(Depth)를 최소화한다.
- 다중 조건은 `Object Literal`이나 `Map`을 활용한 매핑 전략을 사용한다.
- 간단한 분기는 삼항 연산자나 논리 연산자(`&&`, `||`, `??`)를 활용한다.
- 삼항 연산자를 이중으로 사용하지 않는다.

## 3. 코드 품질

- Optional Chaining(`?.`)과 Nullish Coalescing(`??`)을 적극 활용하여 런타임 에러를 방지한다.
- 모든 컴포넌트와 함수는 단일 책임 원칙(SRP)을 준수하여 작게 쪼갠다.

## 4. type

- type은 interface로 선언한다.

## 5. 반드시 지켜줘

- NaverMap.tsx파일의 <Srcript> 태그에서 https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId= 이걸 절대로 바꾸지말것.
- 패키지 설치시 pnpm을 사용한다.

## 6.css

- css는 tailwindcss를 사용한다.
