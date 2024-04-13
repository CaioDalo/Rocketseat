import { Header } from "./components/Header/Header.js";
import { Sidebar } from "./components/Sidebar/Sidebar.js";
import { Post, PostType } from "./components/Post/Post.js";

import "./global.css";

import styles from "./App.module.css";

const posts: PostType[] = [
	{
		id: 1,
		author: {
			avatarUrl: "https://github.com/CaioDalo.png",
			name: "Caio Daló",
			role: "Front-end Developer",
		},
		content: [
			{ type: "paragraph", text: "Fala galeraa 👋" },
			{
				type: "paragraph",
				text: "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
			},
			{ type: "link", text: "jane.design/doctorcare" },
			{ type: "hashtags", text: "#novoprojeto #nlw #rocketseat" },
		],
		publishedAt: new Date("2024-02-28 14:57:00"),
	},
	{
		id: 2,
		author: {
			avatarUrl: "https://github.com/diego3g.png",
			name: "Diego Fernandes",
			role: "CTO Rocketseat",
		},
		content: [
			{ type: "paragraph", text: "Fala galeraa 👋" },
			{
				type: "paragraph",
				text: "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
			},
			{ type: "link", text: "jane.design/doctorcare" },
			{ type: "hashtags", text: "#novoprojeto #nlw #rocketseat" },
		],
		publishedAt: new Date("2024-03-12 20:32:00"),
	},
];

function App() {
	return (
		<>
			<Header />

			<div className={styles.wrapper}>
				<Sidebar />

				<main>
					{posts.map((post) => (
						<Post key={post.id} post={post} />
					))}
				</main>
			</div>
		</>
	);
}

export default App;
