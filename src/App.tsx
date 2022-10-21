import React, { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hello", value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder="username"
        />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;

// any 타입을 배제하려고 노력해야 한다.
// event : React.FormEvent<HTMLInputElement> => 어떤 타입 지정해야할지는 구글링!
// event에 타입을 지정해줘야 이벤트 함수 안의 오류를 체크할 수 있다.
// TS 에서는 event.target.value 보단 event.currentTarget.value를 사용한다.
