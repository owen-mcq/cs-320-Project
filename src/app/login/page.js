'use client'
import "./login.css";

export default function Home() {
    function handleLogin(event) {
        event.preventDefault();
        const formData = new FormData(document.getElementsByTagName("form")[0], document.getElementsByTagName('button')[0]);
        
        const hash = globalThis.crypto.subtle.digest('SHA-256', new ArrayBuffer(formData.password)).then(console.log);
        console.log(hash);
    }

    return (
        <main>
          <form onSubmit={handleLogin}>
            <input name="username" autoComplete="on" type="text" placeholder="Username"/>
            <input name="password" autoComplete="on" type="password" placeholder="Password"/>
            <button>Login</button>
          </form>
        </main>
    );
  }
  