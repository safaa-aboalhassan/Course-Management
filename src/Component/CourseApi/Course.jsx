import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import { v4 as uuidv4 } from 'uuid';
import { getAllData, createData, deleteData, updateData } from "../Api/Api";
import Swal from "sweetalert2";

export default function Course() {
  const [courselist, setCourselist] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({ name: "", image: "", price: "" });

  // Fetch all courses on component mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllData();
      setCourselist(data);
    };
    fetchData();
  }, []);

  // Handle input changes for the form
  const handleChange = (e) => {
    setNewCourse({
      ...newCourse,
      [e.target.name]: e.target.value,
    });
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      setNewCourse({ name: "", image: "", price: "" });
      setSelectedCourse(null);
    }
  };

  {/******************************************************************************/ }
  // Handle creating a new course
  const handleCreate = async () => {
    if (!newCourse.name || !newCourse.image || !newCourse.price) {
      Swal.fire({
        title: "⚠️ Missing Fields!",
        text: "Please fill all fields before adding a course.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      return;
    }

    const courseWithId = {
      ...newCourse,
      id: uuidv4(), // id فريد
    };

    const addedCourse = await createData(courseWithId);
    if (addedCourse) {
      setCourselist((prevList) => [...prevList, addedCourse]);
      toggleModal();
    }

  };

  {/******************************************************************************/ }
  // Handle updating an existing course
  const handleUpdate = async () => {
    if (!selectedCourse || !selectedCourse.id) {
      console.error("No course selected for update!");
      return;
    }


    const updatedCourse = await updateData(selectedCourse.id, newCourse);
    if (updatedCourse) {
      setCourselist((prevList) =>
        prevList.map((course) =>
          course.id === selectedCourse.id ? updatedCourse : course
        )
      );
      toggleModal();
    }
  };
  {/******************************************************************************/ }
  // Open modal for editing a course
  const openEditModal = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
    setNewCourse({
      name: course.name,
      image: course.image,
      price: course.price
    });

  };

  {/******************************************************************************/ }
  // Handle deleting a course
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const success = deleteData(id);
        if (success) {
          setCourselist((prevList) => prevList.filter((course) => course.id !== id));
  
          Swal.fire({
            title: "Deleted!",
            text: "The course has been successfully deleted.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };
  

  return (
    <>
      {/******************************************************************************/}
      {/* Modal for adding/editing a course */}

      {showModal && (
        <div className="modal d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4 shadow-lg">
              <div className={`modal-header ${selectedCourse ? "bg-info" : "bg-success"} text-white`}>

                <h5 className="modal-title">
                  {selectedCourse ? "✏️ Edit Course" : "🆕 Add New Course"}
                </h5>
                <button type="button" className="btn-close" onClick={toggleModal}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Course Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Course Name"
                    value={newCourse.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    name="image"
                    placeholder="Image URL"
                    value={newCourse.image}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    placeholder="Price"
                    value={newCourse.price}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={selectedCourse ? handleUpdate : handleCreate}
                  className={`btn ${selectedCourse ? "btn-info" : "btn-success"}`}
                >

                  {selectedCourse ? "✔️ Update" : "✔️ Add"}
                </button>
                <button onClick={toggleModal} className="btn btn-danger">
                  ❌ Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/******************************************************************************/}
      {/******************************************************************************/}

      {/* pass data to Table.jsx */}
      <div className="container mx-auto p-6 flex justify-center">
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-end">
          <div className="mb-3">
            <button onClick={toggleModal} className="btn btn-success m-2">
              Add New Course
            </button>
          </div>

          {courselist.map((course, index) => (
            <Table
              key={course.id || `course-${index}`}
              items={course}
              handleUpdate={() => openEditModal(course)}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
}