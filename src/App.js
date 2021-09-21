import React, { useState, useRef, useEffect, useMemo } from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";

const AppWrapper = styled.div`
  width: 500px;
  margin: 20vh auto;
  border: 1px solid #aba7aa;
  border-radius: 5px;
  padding: 10px;
`;

const Title = styled.div`
  color: rgb(100,100,100);
  font-weight: bold;
  font-size: 20px
`
const Input = styled.input`
  width: 400px;
  border: none;
  background-color: #eaeaff;
  padding: 5px;
  transition: 0.8s;
  &:hover{
    cursor: pointer;
  }
  &:focus{
    outline: none;
    border-bottom: 1px solid gray;
  }
`
const InputWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  align-items: center;
`
const Button = styled.div`
  width: 80px;
  font-size: 12px;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 8px 10px;
  text-align: center;
  box-sizing: border-box;
  margin-left: 15px;
  &:hover{
    cursor: pointer;
  }
  ${(props) => {    
    if (props.$all) return `
      background-color: #cdabdb
    `
    if (props.$done) return `
      background-color: #954ab2
    `
    if (props.$undone) return `
      background-color: #671cbc
    `
    if (props.$general) return `
      background-color: #9bddcd
    `
    }
  }
`
const MainWrapper = styled.div`
  width: 100%;
`
const Filter = styled.div`
  display: flex;
  width: 100%;
  margin: 10px auto;
`
function writeTodoToLocalStorage(todos) {
  window.localStorage.setItem('todos', JSON.stringify(todos))
}

export default function App() {

  const id = useRef(1);
  const [todos, setTodos] = useState(() => {
    let todoData = window.localStorage.getItem('todos') || '';
    todoData = JSON.parse(todoData)
    if (todoData.length === 0) {
      todoData = []
    } else {
      id.current = todoData[0].id + 1
    }
    return todoData
  })

  // 管理 input 的值
  const [value, setValue] = useState('')

  // 管理 localStorage
  useEffect( () => {
    writeTodoToLocalStorage(todos)
  }, [todos])

  // 管理 filter
  const [filter, setFilter] = useState("all");

  const handleButtonClick = () => {
    // input 打完字就會按按鈕，這時候把 value 記錄到的最後的值放到 todo
    if (!value) return
    setTodos([
      {
        id: id.current,
        content: value,
        isDone: false
      },
      ...todos
    ])
    // 新的 todo 加進去之後， input 的地方就清空 
    setValue('')
    id.current++
  }
    
  const handleInputChange = (e) => {
    // input 變化，把 state 設成輸入的值
    setValue(e.target.value)
  }

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleToggleIsDone = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo
      return {
        ...todo,
        isDone: !todo.isDone
      }
    }))
  }

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
    if (filter === 'all') return todo
    // done: 回傳 todo.isDone true, 反之
    return filter === 'done' ? todo.isDone : !todo.isDone
    })
  }, [todos, filter])
  // dependencies: todos or filter (derived from todos and filters two states) 變化的時候就應該重新計算，其餘的時候不會重新計算

  const handleSwitchFilter = (currentfilter) => {
    setFilter(currentfilter)
  }

  const handleClearAll = () => {
    setTodos([])
  }

  return (
    <AppWrapper>
      <Title>
        Todo List
      </Title>
      <MainWrapper>
      <InputWrapper>
          <Input value={value} placeholder='please input todos' onChange={handleInputChange}/>
          <Button $general onClick={handleButtonClick}> Add </Button>
      </InputWrapper>
      <Filter>
        <Button $all $isFilter onClick={() => handleSwitchFilter("all")}> All </Button>
        <Button $done $isFilter onClick={() => handleSwitchFilter("done")}> Completed </Button>
        <Button $undone $isFilter onClick={() => handleSwitchFilter("undone")}> Active </Button>
        <Button $general $isFilter onClick={handleClearAll}> Clear all </Button>
      </Filter>
        {
          filteredTodos.map((todo) => <TodoItem id={todo.id} content={todo.content} isDone={todo.isDone} handleDeleteTodo={handleDeleteTodo} handleToggleIsDone={handleToggleIsDone} />)
        }
      </MainWrapper>
    </AppWrapper>
  );
}