import React, {useState} from "react";

const apiUrl = process.env.REACT_APP_BACKEND_APP_API_BASE_URL

function LoginForm() {
    const [formData, setFormData] = useState({email: "", password: ""});
    const [errors, setErrors] = useState({email:[], password: []});

    function handleChange(event) {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value}))
        setErrors({ ...errors, [name]: [] });
    }

    function handleLogin(event) {
        event.preventDefault();
        const email = formData.email.trim();
        const password = formData.password.trim();

        fetch(`${apiUrl}user/login`, {
            method: 'POST',
            body: JSON.stringify({
                "email": email,
                "password": password,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            return response.json()
        })
        .then(data => {
            if (data && data.access_token) {
                localStorage.clear();
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                window.location.href = '/'
            } else if (data && data.errors) {
                console.log(data.errors)
            }
        })
    // }

    setFormData({id: "", title: "", description: ""});
    }
    return (
        <>
        <h1 className="text-center mb-3">LoginForm</h1>
        <div className="row">
            <div className="col-7 mx-auto mb-4">
                {/* onSubmit={formData.id ? (e) => handleUpdateBlog(e, formData.id) : (e) => handleAddBlog(e)} */}
                <form className="row g-3" onSubmit={handleLogin}>
                    <div className="col-auto">
                        <input type="text" name='email' value={formData.email} onChange={handleChange} className="form-control-plaintext" id="email" placeholder="Email"></input>
                    </div>
                    <div className="col-auto">
                        <input type="password" name='password' value={formData.password} onChange={handleChange} className="form-control-plaintext" id="password" placeholder="Password"></input>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-warning">Login</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default LoginForm;