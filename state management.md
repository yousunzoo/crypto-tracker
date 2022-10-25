# recoil

: React JS에서 state management 역할을 하는 library

- 왜 state management가 필요한가?

* 테마 스위치 제작하기

- 함수도 type이 될 수 있다.
- App의 isDark 값을 Chart.tsx가 받기까지..
  => App => Router => Coin => Chart

* global state : 어플리케이션이 무언가를 인지해야 할 때 사용한다.
  => 어플리케이션이 특정 value에 접근해야 할 때 쓴다.

- 예) 로그인한 것과 안한것의 ui를 다르게 하려면?
  : App에서 isLoggedIn을 설정하고 모든 섹션에 공유해야 한다.

- recoil과 같은 state management library를 사용하면 props를 엄청 내려보내지 않아도 component가 이들에 언제 접근할지 선택 가능하다.

- 일종의 버블을 형성해서 부모가 자식에게 prop을 내려주는 계층 구조 대신에, state를 어떤 bubble 안에 넣고 header, chart가 직접 접근 가능하도록 한다.

=> state management는 여러 컴포넌트들이 공유할 state(global state)와 state manipulation 함수들을 여러 단계의 props를 거쳐서 전달하는 번거로움을 해결할 수 있다.
