import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { decrease, increase } from "./counterSlice";
import { useState } from "react";
import { addTodo, deleteTodo } from "./todoSlice";

function App() {
  // counter - 상태 읽기
  const count = useSelector((state) => state.counter.value);
  // counter - 상태 변경 요청 (업데이트)
  const dispatch = useDispatch();

  // todo - 상태 관리
  const [text, setText] = useState("");
  // todo - 상태 읽기
  const todos = useSelector((state) => state.todo.list);
  // todo - store 변경 요청
  const todoDispatch = useDispatch();
  // todo - 목록추가 함수
  const handleAdd = () => {
    if (text === "") return;
    todoDispatch(addTodo(text));
    setText("");
  };

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increase())}>+</button>
      <button onClick={() => dispatch(decrease())}>-</button>
      <hr />

      <h1>할 일 목록</h1>
      <p>
        목록 입력:{" "}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
      </p>
      <br />
      <button type="text" onClick={handleAdd}>
        추가
      </button>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button onClick={() => todoDispatch(deleteTodo(todo.id))}>
            삭제
          </button>
        </div>
      ))}
    </>
  );
}
export default App;
