'use client'
import "./login.css";

export default function Home() {
    function handleLogin(event) {
        event.preventDefault();
        const formData = new FormData(document.getElementsByTagName("form")[0], document.getElementsByTagName('button')[0]);
        console.log(formData)
        const hash = globalThis.crypto.subtle.digest('SHA-256', new ArrayBuffer(formData.password))
          .then(hash => {
            fetch('api/login', {method: 'POST', body: JSON.stringify({ username: formData.get('username'), password: [...new Uint8Array(hash)].map(x => x.toString(16).padStart(2, '0')).join('') })})
          });
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
  