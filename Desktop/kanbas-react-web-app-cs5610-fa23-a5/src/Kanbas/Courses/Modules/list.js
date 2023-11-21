import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  addModule, deleteModule, updateModule, setModule,
  setModules,
} from "./modulesReducer";
import { findModulesForCourse, createModule} from "./client";
import * as client from "./client";

function ModuleList() {
  const { courseId } = useParams();
  useEffect(() => {
    findModulesForCourse(courseId)
      .then((modules) =>
        dispatch(setModules(modules))
    );
  }, [courseId]);
  const handleAddModule = () => {
    createModule(courseId, module).then((module) => {
      dispatch(addModule(module));
    });
  };

  const handleDeleteModule = (moduleId) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };


  return (
    <ul className="list-group">
    {modules
      .filter((module) => module.course === courseId)
      .map((module, index) => (
        <li key={index} className="list-group-item">
          <button
            onClick={() => handleDeleteModule(module._id)}
          >
            Delete
          </button>
          <h3>{module.name}</h3>
        </li>
      ))}
  </ul>
);

}
export default ModuleList;

