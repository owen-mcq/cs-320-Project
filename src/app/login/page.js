'use client'
import "./login.css";

export default function Home() {
    function handleLogin(event) {
        event.preventDefault();
        const formData = new FormData(document.getElementsByTagName("form")[0], document.getElementsByTagName('button')[0]);
        console.log(formData)
        fetch('api/login', {method: 'POST', body: JSON.stringify({ username: formData.get('username'), password: formData.get('password')})});
    }

    return (
        <main>
          <form action="/api/login" method="POST" >
            <input name="username" autoComplete="on" type="text" placeholder="Username"/>
            <input name="password" autoComplete="on" type="password" placeholder="Password"/>
            <button>Login</button>
          </form>
        </main>
    );
  }
  