import { Header } from './components/Header/Header.jsx'
import { Sidebar } from './components/Sidebar/Sidebar.jsx'
import { Post } from './components/Post/Post.jsx'

import './global.css'

import styles from './App.module.css'

function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />

        <main>
          <Post />
        </main>
      </div>
    </>
  )
}

export default App
