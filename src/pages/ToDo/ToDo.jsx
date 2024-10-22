import { useState, useEffect, useRef } from "react";
import { fetchTodos } from "../../data/todo";
import "./Todo.css";
import { Placeholder } from "react-bootstrap";

const initItemsPerPage = 5;
const initOnlyWaiting = false;

function Todo() {
  // todosRaw -> filters -> todos -> display
  const [todosRaw, setTodosRaw] = useState([]);
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [todos, setTodos] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [curPage, setCurPage] = useState(0);

  const itemsPerPageRef = useRef();
  const onlyWaitingRef = useRef();

  useEffect(() => {
    setTodosRaw(fetchTodos());
    setOnlyWaiting(initOnlyWaiting);
    itemsPerPageRef.current.value = initItemsPerPage;
    setItemsPerPage(initItemsPerPage);
    onlyWaitingRef.current.checked = initOnlyWaiting;
  }, []);

  useEffect(() => {
    if (onlyWaiting) {
      setTodos(todosRaw.filter((todo) => !todo.completed));
    } else {
      setTodos(todosRaw);
    }
  }, [todosRaw, onlyWaiting]);

  useEffect(() => {
    setNumPages(Math.ceil(todos.length / itemsPerPage));
  }, [todos, itemsPerPage]);

  useEffect(() => {
    if (numPages <= 0) setCurPage(0);
    else if (curPage === 0) setCurPage(1);
    else if (curPage > numPages) setCurPage(numPages);
  }, [numPages]);

  function deleteClick(id) {
    setTodosRaw(todosRaw.filter((todo) => todo.id !== id));
  }

  function waitingClick(id) {
    const todoSelected = todosRaw.find((todo) => {
      return todo.id === id;
    });

    todoSelected.completed = true;
    setTodosRaw([...todosRaw]); /// force state change
  }

  function addClick(id, title) {
    const newItem = {
      id ,
      title,
      completed: false,
      userId: 1,
    }

  setTodosRaw([...todosRaw,newItem])
  }

  function modalShow() {
    document.getElementById("my_modal_1").showModal()
  }

  // Modal Control //
 function resetInput() {

   newIdRef.current.value = "";
   newTitleRef.current.value = "";
 }



  const newIdRef = useRef();
  const newTitleRef = useRef();

  return (
    <div className="todo-container ">
      {/* filters */}
      <div className="todo-filters-container flex justify-content-between align-items-center">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            // checked
            onChange={(e) => {
              setOnlyWaiting(e.target.checked);
            }}
            ref={onlyWaitingRef}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
            Show only &nbsp;
            <button className="btn btn-xs btn-warning">
              waiting
              <span className="bi bi-clock"> </span>
            </button>
          </label>
        </div>
        <select
          className="form-select mb-2"
          aria-label="Default select example"
          defaultValue={5}
          style={{ width: "200px" }}
          onChange={(e) => {
            setItemsPerPage(e.target.value);
          }}
          ref={itemsPerPageRef}
        >
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={50}>50 items per page</option>
          <option value={100}>100 items per page</option>
        </select>
      </div>

      {/* table */}
      <table className="table table-striped ">
        <thead className="table-dark">
          <tr className="">
            <th>ID</th>
            <th>Title</th>
            <th style={{ textAlign: "right" }} >
              Completed
              <button
                className="btn btn-xs btn-primary bi bi-plus-square-dotted ml-2"
                onClick={() =>
                  modalShow()
                }
              ></button>
              <dialog id="my_modal_1" className="modal" data-theme="light">
                <div className="modal-box text-black text-center">
                  <h3 className="font-bold text-lg ">ADD TITLE</h3>
                  <div className="py-4 text-xl ">ID :
                    <span>
                      <input
                      id="title-id"
                        type="text"
                        className="input input-bordered w-full max-w-xs ml-2"
                        value={Number(todosRaw.reduce((prev, todo) => {
                          return todo.id > prev ? todo.id : prev;
                        }, 0)) + 1}
                        ref={newIdRef}
                        disabled
                      />
                    </span>
                  </div>
                  <div className="py-4 text-xl mr-6"> Title : 
                    <span>
                      <input
                        type="text"
                        className="input input-bordered w-full max-w-xs ml-2"
                        placeholder="Title"
                        ref={newTitleRef}
                        required
                      />
                    </span>
                  </div>
                  <div className="modal-action">
                      <button
                        className="btn"
                        onClick={() => {
                          const id = newIdRef.current.value;
                          const title = newTitleRef.current.value.trim();
                          title ? addClick(id, title) + resetInput() + alert("Added"): alert("Please enter a title");
                        }}
                      >
                        Submit
                      </button>
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </th>
          </tr>
        </thead>
        <tbody>
          {todos
            .filter((todo, index) => {
              const min = (curPage - 1) * itemsPerPage;
              const max = curPage * itemsPerPage - 1;
              return index >= min && index <= max;
            })
            .map((todo) => {
              return (
                <tr key={todo.id}>
                  <td className="">
                    <span
                      className="badge-sm bg-neutral text-white"
                      
                    >
                      {todo.id}
                    </span>
                  </td>
                  <td style={{ textAlign: "left" }}>{todo.title}</td>
                  <td style={{ textAlign: "right" }}>
                    {/*
 <span
 className={
'badge ' + (todo.completed ? 'bg-success' : 'bgwarning')
 }
 >
 {todo.completed ? 'done' : 'waiting'}
 &nbsp;
 <span
 className={
 'bi ' + (todo.completed ? 'bi-check' : 'bi-clock')
 }
 > /span>
 </span>
 */}
                    {todo.completed ? (
                      <span className="badge badge-md bg-success">
                        done&nbsp;
                        <span className="bi bi-check"> </span>
                      </span>
                    ) : (
                      <button
                        className="btn btn-xs btn-warning"
                        onClick={() => {
                          waitingClick(todo.id);
                        }}
                      >
                        waiting&nbsp;
                        <span className="bi bi-clock"> </span>
                      </button>
                    )}
                    &nbsp;
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => {
                        deleteClick(todo.id);
                      }}
                    >
                      <span className="bi bi-trash"> </span>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {/* page control */}
      <div className="">
        <button
          className={
            "todo-space btn btn-sm mr-1 " +
            (curPage <= 1 ? "btn-outline-secondary" : "btn-outline-primary")
          }
          onClick={() => {
            setCurPage(1);
          }}
          disabled={curPage <= 1}
        >
          First
        </button>
        <button
          className={
            "btn btn-sm mr-2 " +
            (curPage <= 1 ? "btn-outline-secondary" : "btn-outline-primary")
          }
          onClick={() => curPage > 1 && setCurPage(curPage - 1)}
          disabled={curPage <= 1}
        >
          Previous
        </button>
        <span className="mr-2">
          {curPage}&nbsp;/&nbsp;{numPages}
        </span>
        <button
          className={
            "btn btn-sm mr-1 " +
            (curPage >= numPages
              ? "btn-outline-secondary"
              : "btn-outline-primary")
          }
          onClick={() => curPage < numPages && setCurPage(curPage + 1)}
          disabled={curPage >= numPages}
        >
          Next
        </button>
        <button
          className={
            "todo-space btn btn-sm " +
            (curPage >= numPages
              ? "btn-outline-secondary"
              : "btn-outline-primary")
          }
          onClick={() => {
            setCurPage(numPages);
          }}
          disabled={curPage >= numPages}
        >
          Last
        </button>
      </div>
    </div>
  );
}

export default Todo;
