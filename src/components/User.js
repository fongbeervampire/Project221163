import React, { useState, useEffect } from 'react';
import UserForm from "./UserForm";
import firebaseDb from "firebase";

const User = () => {

    var [currentId, setCurrentId] = useState('');
    var [userObjects, setUserObjects] = useState({})
    
    /*useEffect(() => {
        firebaseDb.child('users').on('value', snapshot => {
            if (snapshot.val() != null) {
                setUserObjects({
                    ...snapshot.val()
                });
            }
        })
    }, [])*/

    const addOrEdit = (obj) => {
        if (currentId == '')
            firebaseDb.child('users').push(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                })
        else
            firebaseDb.child(`users/${currentId}`).set(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                })
    }

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?')) {
            firebaseDb.child(`users/${id}`).remove(
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                })
        }
    }


    return (
        <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4 text-center">Contact Manager</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <UserForm {...({ currentId, userObjects, addOrEdit })} ></UserForm>
                </div>
                <div className="col-md-7">
                    <table className="table table-borderless table-stripped">
                        <thead className="thead-light">
                            <tr>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(userObjects).map((key) => (
                                    <tr key={key}>
                                        <td>{userObjects[key].fullName}</td>
                                        <td>{userObjects[key].mobile}</td>
                                        <td>{userObjects[key].email}</td>
                                        <td className="bg-light">
                                            <a className="btn text-primary" onClick={() => { setCurrentId(key) }}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>
                                            <a className="btn text-danger" onClick={() => { onDelete(key) }}>
                                                <i className="far fa-trash-alt"></i>
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default User;