import React from "react";
import axios from "axios";
const LoginPage = ()=>{
    const checkLogin = () => {
        const user = sessionStorage.getItem("user");
        if(user){
            window.open('/', '_self' )
        }
    }
    //checkLogin();
    const handleSubmit = (event)=>{
        event.preventDefault();
        const { email, pass } = document.forms[0];
        console.log(email.value, pass.value)

        axios.post("http://localhost:3001/user/user/login",
         {
            email: email.value,
            password: pass.value
        })
        .then(function (response) {
            console.log(response.data);
            if(response.status==200){
                const {email, name} = response.data
                console.log(email)
            sessionStorage.setItem("user", {email: email, name: name})
            sessionStorage.setItem("username", name)
            sessionStorage.setItem("useremail", email)
            }
          })
          .catch(function (error) {
            console.log(error);

        });
    }
    return(
        <section className="vh-100 gradient-custom">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white" style={{borderRadius: '1rem'}}>
                <div className="card-body p-5 text-center">
                    <form onSubmit={handleSubmit}>
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">Please enter your login and password!</p>
                    <div className="form-outline form-white mb-4">
                      <input type="email" id="typeEmailX" name='email' className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="typeEmailX">Email</label>
                    </div>
                    <div className="form-outline form-white mb-4">
                      <input type="password" id="typePasswordX" name='pass' className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="typePasswordX">Password</label>
                    </div>
                    <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
                    <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

                  </div>
                  </form>
                  <div>
                    <p className="mb-0">Don't have an account? <a href="/signup" className="text-white-50 fw-bold">Sign Up</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default LoginPage;