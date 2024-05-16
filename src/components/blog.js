import React, {useState, useEffect} from "react";

const apiUrl = process.env.REACT_APP_BACKEND_APP_API_BASE_URL

// Blog listing component - testing changes
function BlogList({blogList, handleEdit, handleDelete}) {
    return (
    <div className="row">
        <div className="col-10 mx-auto">
            <table className="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Description length</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {blogList && blogList.length > 0 ? (blogList.map(blog => 
                    <tr key={blog.id}>
                        <td>{blog.blog_title}</td>
                        <td>{blog.description}</td>
                        <td>{blog.description_length}</td>
                        <td><button onClick={() => handleEdit(blog.id, blog.blog_title, blog.description)} className="btn btn-info">Edit</button></td>
                        <td><button onClick={() => handleDelete(blog.id)} className="btn btn-danger">Delete</button></td>
                    </tr>
                )) : <tr><td colSpan='5' className='text-center p-4'>No blogs Found</td></tr>}
            </tbody>
            </table> 
        </div>
    </div>
    )
}

// Form component
function BlogForm({previousFormData, handleChange, handleAddBlog, handleUpdateBlog}) {
    return (
        <div className="row">
            <div className="col-7 mx-auto mb-4">
                <form className="row g-3" onSubmit={previousFormData.id ? (e) => handleUpdateBlog(e, previousFormData.id) : (e) => handleAddBlog(e)}>
                    <div className="col-auto">
                        <input type="hidden" name='id' value={previousFormData.id} onChange={handleChange} className="form-control-plaintext" id="title" placeholder="Blog title"></input>
                    </div>
                    <div className="col-auto">
                        <input type="text" name='title' value={previousFormData.title} onChange={handleChange} className="form-control-plaintext" id="title" placeholder="Blog title"></input>
                    </div>
                    <div className="col-auto">
                        <input type="text" name='description' value={previousFormData.description} onChange={handleChange} className="form-control-plaintext" id="description" placeholder="Blog description"></input>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-warning">{previousFormData.id ? 'Update' : 'Create'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

// Main component
function Blog() {
    // all blogs - state
    const [blogs, setBlogs] = useState([]);
    const [errors, setErrors] = useState({title:[], description: []});

    // new blog - form state
    const [formData, setFormData] = useState({id:"", title: "", description: ""});

    // Fetch all blogs - api
    useEffect(() => {
        fetch(`${apiUrl}blogs`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json();
        })
        .then((json) => {
            if (json.blogs_count > 0) {
                setBlogs(json.response)
            } else {
                setBlogs([]);
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, []) // [] => will call the useEffect only once

    // Handle the form field changes
    function handleChange(event) {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value}))
        setErrors({ ...errors, [name]: [] });
    }

    // create blog
    function addBlog(event) {
        event.preventDefault();
        const blog_title = formData.title.trim();
        const blog_description = formData.description.trim();

        // if (blog_title && blog_description) {
            fetch(`${apiUrl}create_blog`, {
                method: 'POST',
                body: JSON.stringify({
                    "blog_title": blog_title,
                    "description": blog_description,
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                return response.json()
            })
            .then(data => {
                if (data && data.blog) {
                    setBlogs([...blogs, data.blog])
                } else if (data && data.errors) {
                    console.log(data.errors)
                }
            })
        // }

        setFormData({id: "", title: "", description: ""});
    }

    // Update the form with selected blog data
    function handleEdit(id, blog_title, description) {
        setFormData({id: id, title: blog_title, description: description});
    }

    // Update the blog
    function updateBlog(event, blogId) {
        event.preventDefault();
        const blog_title = formData.title.trim();
        const blog_description = formData.description.trim();

        if (blog_title && blog_description) {
            fetch(`${apiUrl}blogs/${blogId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    "blog_title": blog_title,
                    "description": blog_description,
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((data) => {
                if (data && data.blog) {
                    setBlogs((blogs) => blogs.map(blog => (blog.id === blogId ? data.blog : blog)));
                }
            })
        }

        setFormData({id: "", title: "", description: ""})
    }

    // Delete the blog
    function deleteBlog(blogId) {
        fetch(`${apiUrl}blogs/${blogId}`, {
            method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => response.json())
            .then(() => {
                setBlogs(blogs => blogs.filter(blog => blog.id !== blogId))
            })
    }

    return (
        <section>
            <h1 className="text-center mb-3">Blogs</h1>
            <BlogForm previousFormData={formData} handleChange={handleChange} handleAddBlog={addBlog} handleUpdateBlog={updateBlog} />
            <BlogList blogList={blogs} handleEdit={handleEdit} handleDelete={deleteBlog}/>
        </section>
    )
}

export default Blog;
