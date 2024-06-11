import React, { useEffect, useState } from "react";
import {
  getDatabase,
  push,
  ref,
  set,
  onValue,
  remove,
  update,
} from "firebase/database";
import { MdOutlineDeleteForever } from "react-icons/md";

const App = () => {
  let [task, setTask] = useState("");
  let [taskTwo, setTaskTwo] = useState("");
  let [taskThree, setTaskThree] = useState("");
  let [alluser, setAlluser] = useState([]);
  let [editmodel, setEditmodel] = useState(false);
  let [updatedtask, setupdatedtask] = useState("");
  let [updatedtaskTwo, setupdatedtaskTwo] = useState("");
  let [updatedtaskThree, setupdatedtaskThree] = useState("");
  let [Id, setId] = useState("");

  let handlechange = (e) => {
    setTask(e.target.value);
  };

  let handlechangeTwo = (e) => {
    setTaskTwo(e.target.value);
  };

  let handlechangeThree = (e) => {
    setTaskThree(e.target.value);
  };

  let handleClick = () => {
    const db = getDatabase();
    set(push(ref(db, "users/")), {
      name: task,
      contact: taskTwo,
      Address: taskThree,
    }).then(() => {
      alert("DATA ADDED!");
      setTask("");
      setTaskTwo("");
      setTaskThree("");
    });
  };

  let handleDelete = (received) => {
    const db = getDatabase();
    remove(ref(db, "users/" + received));
  };

  let handleEdit = (id) => {
    setId(id);
    setEditmodel(true);
  };
  let handleRemove = () => {
    setEditmodel(false);
  };

  let handleUpdatedtask = (e) => {
    setupdatedtask(e.target.value);
  };
  let handleUpdatedtaskTwo = (e) => {
    setupdatedtaskTwo(e.target.value);
  };
  let handleUpdatedtaskThree = (e) => {
    setupdatedtaskThree(e.target.value);
  };
  let handleUpdatedtaskUpdate = () => {
    const db = getDatabase();
    update(ref(db, "users/" + Id), {
      name: updatedtask,
      contact: updatedtaskTwo,
      Address: updatedtaskThree,
    }).then(() => {
      setEditmodel(false);
    });
  };

  useEffect(() => {
    const db = getDatabase();
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push({ ...item.val(), id: item.key });
      });
      setAlluser(array);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-3">
        <label className="text-4xl font-bold underline underline-offset-8">
          ADD DATA
        </label>
        <input
          onChange={handlechange}
          value={task}
          className="w-4/12 py-4 px-3 mt-4 outline-1 outline-inherit outline-dotted border-x-8 border-red-500 rounded-md"
          type="text"
          placeholder="Input Your task"
        />
        <input
          onChange={handlechangeTwo}
          value={taskTwo}
          className="w-4/12 py-4 px-3 mt-4 outline-1 outline-inherit outline-dotted border-x-8 border-red-500 rounded-md"
          type="number"
          placeholder="Input Your Number"
        />
        <input
          onChange={handlechangeThree}
          value={taskThree}
          className="w-4/12 py-4 px-3 mt-4 outline-1 outline-inherit outline-dotted border-x-8 border-red-500 rounded-md"
          type="text"
          placeholder="Input Your Address"
        />
        <button
          onClick={handleClick}
          className="transition-all hover:outline-1 hover:outline-double hover:outline-red-500 py-3 px-4 bg-green-600 text-white font-bold rounded-md"
        >
          Submit
        </button>
        <ul className="w-3/12">
          {alluser.map((item) => {
            return (
              <li className="font-bold flex flex-row justify-between items-center my-2 uppercase">
                <p>{item.name}</p>
                <p>{item.contact}</p>
                <p>{item.Address}</p>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-2xl py-1 px-2 bg-red-600 rounded-full "
                >
                  <MdOutlineDeleteForever />
                </button>
                <button
                  onClick={() => handleEdit(item.id)}
                  className="font-bold py-1 px-2 bg-blue-400 rounded-full"
                >
                  Edit
                </button>
              </li>
            );
          })}
        </ul>
        {editmodel && (
          <div className="w-[700px] h-[400px] bg-slate-600 rounded-md absolute top-0 left-1/4 flex flex-col justify-center items-center">
            <input
              onChange={handleUpdatedtask}
              className="w-4/12 py-4 px-3 mt-4 outline-1 outline-inherit outline-dotted border-x-8 border-red-500 rounded-md"
              type="text"
              placeholder="Input Your task"
            />
            <input
              onChange={handleUpdatedtaskTwo}
              className="w-4/12 py-4 px-3 mt-4 outline-1 outline-inherit outline-dotted border-x-8 border-red-500 rounded-md"
              type="number"
              placeholder="Input Your Number"
            />
            <input
              onChange={handleUpdatedtaskThree}
              className="w-4/12 py-4 px-3 mt-4 outline-1 outline-inherit outline-dotted border-x-8 border-red-500 rounded-md"
              type="text"
              placeholder="Input Your Address"
            />
            <button
              onClick={handleUpdatedtaskUpdate}
              className="transition-all hover:outline-1 hover:outline-double hover:outline-red-500 py-3 px-4 bg-green-600 text-white font-bold rounded-md mt-3"
            >
              Update
            </button>
            <button
              onClick={handleRemove}
              className=" text-white text-xl font-bold py-2 px-3 rounded-full bg-red-500 absolute top-4 right-10"
            >
              X
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
