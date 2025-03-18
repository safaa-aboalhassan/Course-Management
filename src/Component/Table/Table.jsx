import React from 'react';

export default function Table({ items, handleDelete, handleUpdate }) {
  if (!items) {
    return <p>No courses available</p>;
  }

  let { id, name, price } = items;

  return (
    <>
      <table className="table table-striped shadow-lg">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Course Name</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{id}</th>
            <td>{name}</td>
            <td>{price} SDG</td>
            <td>
              <button onClick={() => handleUpdate(items)} className="btn btn-info mx-2">
                Update
              </button>
              <button onClick={() => handleDelete(id)} className="btn btn-danger">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}