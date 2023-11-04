import db from "../Database";
import { Link } from "react-router-dom";
import { React, useState } from "react";

/* create new courses, 
update existing course titles, 
and remove courses */
function Dashboard({ courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse }
) {
  // const [courses, setCourses] = useState(db.courses);
  // const [course, setCourse] = useState({
  //   name: "New Course",      number: "New Number",
  //   startDate: "2023-09-10", endDate: "2023-12-15",
  // });

  // const updateCourse = () => {
  //   setCourses(
  //     courses.map((c) => {
  //       if (c._id === course._id) {
  //         return course;
  //       } else {
  //         return c;
  //       }
  //     })
  //   );
  // };
  // const addNewCourse = () => {
  //   setCourses([...courses,
  //             { ...course,
  //               _id: new Date().getTime() }]);
  // };

  // const deleteCourse = (courseId) => {
  //   setCourses(courses.filter((course) => course._id !== courseId));
  // };


  
  return (
    <div>
      <h1>Dashboard</h1>
      <input value={course.name} className="form-control"
             onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      <input value={course.number} className="form-control"
             onChange={(e) => setCourse({ ...course, number: e.target.value }) } />
      <input value={course.startDate} className="form-control" type="date"
             onChange={(e) => setCourse({ ...course, startDate: e.target.value }) }/>
      <input value={course.endDate} className="form-control" type="date"
             onChange={(e) => setCourse({ ...course, endDate: e.target.value }) } />

      <button onClick={addNewCourse} >
        Add
      </button>
      <button onClick={updateCourse} >
        Update
      </button>

      <hr />
      <h2>Published Courses ({courses.length})</h2>
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div className="col">
          {courses.map((course, index) => (
            
            <div class="card h-100">
              <img src="/images/react.png" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{course.name}</h5>

                <Link
                  key={course._id}
                  to={`/Kanbas/Courses/${course._id}`}
                  className="btn btn-primary"
                >
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      setCourse(course);
                    }}>
                    Edit
                  </button>

                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      deleteCourse(course._id);
                    }}>
                    Delete
                  </button>

                  {course.name}
                </Link>
                <p class="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div>
          

          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
