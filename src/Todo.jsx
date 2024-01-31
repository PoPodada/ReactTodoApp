import { useState } from "react";
import "./style.css"
import { InputTodo } from "./components/inputTodo";
import { IncompleteTodos } from "./components/incompleteTodos";
import { CompleteTodos } from "./components/completeTodos";
export const Todo = () => {
  const [todoText,settodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setcompleteTodos] = useState([]);
  const onChangeTodoText = (event) => settodoText(event.target.value);
  const onClickAdd = () =>{
    if(todoText === "") return;
    const newTodos = [...incompleteTodos,todoText];
    setIncompleteTodos(newTodos);
    settodoText("");


  };
  const onClickDelete = (index) =>{
    const newTodos = [...incompleteTodos];
    newTodos.splice(index,1);
    setIncompleteTodos(newTodos);
  };
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index,1);

    const newCompleteTodos = [...completeTodos,incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos)
    setcompleteTodos(newCompleteTodos);
  };
  const onClickBack = (index) =>{
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index,1);

    const newIncompleteTodos = [...incompleteTodos,completeTodos[index]];
    setcompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);

  }
  const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5;
  return (
    <>
      <InputTodo todoText = {todoText} onChange = {onChangeTodoText} onClick = {onClickAdd} disabled = {isMaxLimitIncompleteTodos}/>
      {isMaxLimitIncompleteTodos && (
      <p style={{color:"red"}}>登録できるTODOは5個までだよ</p>
      )}
      <IncompleteTodos todos = {incompleteTodos} onClickComplete = {onClickComplete} onClickDelete = {onClickDelete}/>
      <CompleteTodos todos = {completeTodos} onClickBack = {onClickBack}/>
    </>
  );
}


