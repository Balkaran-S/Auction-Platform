import React from 'react';

export default function Signup() {
    return (
        <>
        <form class='container-fluid p-3'>
            <div class="mb-3">
                <label class="form-label">Username</label>
                <input type="text" class="form-control" id="username" />
            </div>
            <div class="mb-3">
                <label class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" />
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" />
            </div>
           
         
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        </>
    )
}
