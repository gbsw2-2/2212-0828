import { useRef, useState, useEffect } from "react";
import Viewer from "./components/Viewer.jsx";
import Even from "./components/Even.jsx";
import Controller from "./components/Controller.jsx";
import "./App.css";

function App() {
  /* 상태만들기 */
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // 레퍼런스 변수 didMountRef를 만들고 초기값 지정
  const didMountRef = useRef(false);

  /* Controller 에 넘겨줄 상태값 변경 함수 만들기 */
  const handleSetCount = (value) => {
    setCount(count + value);
  };

  const handleSetText = (e) => {
    setText(e.target.value);
  };

  // 상태변수 count, text 값이 변경될 때 컴포넌트 업데이트 발생
  // 이때 useEffect를 이용해서 콜백함수 실행
  useEffect(() => {
    console.log(`상태 업데이트 ${count} ${text}`);
  }, [count, text]);

  // 컴포넌트 생애주기 중 업데이트가 발생하는 3가지 조건 중 상태변수가 변경될 때
  // count, text State 변수가 변경될 때,
  // 컴포넌트 업데이트시에 useEffect의 콜백함수가 실행 -> 현재는 콜백함수가 콘솔에 출력하기

  // 두 번째 인자인 의존성 배열에 값이 없으면,
  // 컴포넌트가 랜더링될 때마다 useEffect의 콜백함수가 실행

  // useEffect(() => {
  //   console.log('업데이트');
  // })

  // 컴포넌트가 마운트될 때 didMountRef가 false -> 이 때는 콘솔에 출력하지 않음
  // 컴포넌트가 업데이트될 때 didMountRef가 true -> 이 때 콘솔에 출력
  useEffect(() => {
    if (didMountRef.current) {
      didMountRef = true;
      return;
    } else {
      console.log("컴포넌트 업데이트!!!");
    }
  });

  // 컴포넌트 마운트 시점에만 실행 : 의존성 배열에 값이 없을 때
  useEffect(() => {
    console.log("업데이트 ");
  }, []);

  useEffect(() => {
    const intervalID = setInterval(() => {
      console.log("깜빡");
    }, 1000);
    return () => {
      console.log("cleanup");
      clearInterval(intervalID);
    };
  });
  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <input type="text" value={text} onInput={handleSetText}></input>
      </section>
      <section>
        {/* props : 부모컴포넌트에서 자식컴포넌트에게 보내주는 함수*/}
        <Viewer count={count} />
        {count % 2 === 0 && <Even />}
      </section>
      <section>
        <Controller handleSetCount={handleSetCount} />
      </section>
    </div>
  );
}

export default App;
