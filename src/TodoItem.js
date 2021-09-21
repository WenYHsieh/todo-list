import React from 'react';
import styled from 'styled-components';

const TodoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10px;
  width: 100%;
  margin-top: 10px;
  background-color: #f4f5f4;
  padding: 10px 5px;
`

const Todo = styled.div`
  color: black;
  ${props => props.$isDone && `
    text-decoration: line-through;
    color: gray
  `
  }
`
const Button = styled.div`
  width: 50px;
  height: 20px;
  font-size: 5px;
  text-align: center;
  border: 1px solid gray;
  margin-left: 10px;
  line-height: 20px;
  &:hover {
    box-shadow: 1px 2px 1px 1px rgb(0, 0, 0, 0.2);
    cursor: pointer;
  }
`
const ButtonWrapper = styled.div`
  display: flex;
  
`

export default function TodoItem ({ id, content, isDone, handleDeleteTodo, handleToggleIsDone }) {
  return (
  <TodoWrapper data-todo-id={id}>
    <Todo $isDone={isDone} key={id}> {content} </Todo>
    <ButtonWrapper>
      <Button onClick={()=>{handleToggleIsDone(id)}}> {isDone ? 'unDone':'Done'} </Button>
      <Button onClick={()=>{handleDeleteTodo(id)}}>delete</Button>
    </ButtonWrapper>
  </TodoWrapper>
  )
}