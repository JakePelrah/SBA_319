import { useEffect, useRef, useState } from 'react'
import { Modal } from 'bootstrap'
import './App.css'


function App() {
  const [dogs, setDogs] = useState([])
  const [name, setName] = useState('')
  const [breed, setBreed] = useState('')
  const [gender, setGender] = useState('')
  const editModalRef = useRef(null)

  useEffect(() => {
    fetchDogs()
    editModalRef.current = new Modal(editModalRef.current)
  }, [])

  function fetchDogs() {
    fetch('/dogs')
      .then(res => res.json())
      .then(setDogs)
  }

  function insert(e) {
    e.preventDefault()
    if (name && breed && gender) {
      fetch('/insertDog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, breed, gender })
      }).then(() => {
        setBreed('')
        setGender('')
        setName('')
        fetchDogs()
      })
    }
  }


  function deleteRecord(e, id) {
    e.preventDefault()
    fetch('/deleteDog', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    }).then(fetchDogs)
  }

  function editRecord(e, dog) {
    e.preventDefault()
    console.log(dog)
    fetch('/updateDog', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: dog._id, updates: { name: 'BUSTER', breed: 'OX' } }),
    }).then(fetchDogs)
    editModalRef.current.show()
  }

  const renderDogs = dogs?.map(dog => <tr data-id={dog._id}>
    <td>{dog.name}</td>
    <td>{dog.breed}</td>
    <td>{dog.gender}</td>
    <td><button onClick={(e) => editRecord(e, dog)} className='edit-btn btn me-2'>Edit</button>
      <button onClick={(e) => deleteRecord(e, dog._id)} className='delete-btn btn'>Delete</button></td>
  </tr>)

  return (
    <div className=''>

      <div ref={editModalRef} class="modal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className='d-flex'>
        <span scope="col"><input value={name} onChange={(e) => setName(e.target.value.toUpperCase())} type='text'></input></span>
        <span scope="col"><input value={breed} onChange={(e) => setBreed(e.target.value.toUpperCase())} type='text'></input></span>
        <span scope="col"><select onChange={(e) => setGender(e.target.value.toUpperCase())} class="form-select" aria-label="Default select example">
          <option value="" selected>Open this select menu</option>
          <option value="SPAYED">Spayed</option>
          <option value="NEUTERED">Neutered</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select></span>
        <button className='custom-btn btn' onClick={insert}>Add</button>
      </div>

      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Breed</th>
            <th scope="col">Gender</th>
            <th scope="col">Modify</th>
          </tr>
        </thead>
        <tbody>
          {renderDogs}

        </tbody>
      </table>

    </div>

  )
}

export default App




