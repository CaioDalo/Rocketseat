import { Avatar } from "../Avatar/Avatar";
import { Comment } from "../Comment/Comment";

import styles from "./Post.module.css";

export function Post() {
	return (
		<article className={styles.post}>
			<header>
				<div className={styles.author}>
					<Avatar src="https://github.com/CaioDalo.png" />
					<div className={styles.authorInfo}>
						<strong>Caio Daló</strong>
						<span>Web Developer</span>
					</div>
				</div>

				<time title="28 de Fevereiro às 14:58h" dateTime="2024-02-28 14:57:00">
					Publicado há 1h
				</time>
			</header>

			<div className={styles.content}>
				<p>Fala galeraa &nbsp; 👋</p>
				<p>
					Acabei de subir mais um projeto no meu portifa. É um projeto que fiz
					no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀
				</p>
				<p>
					<a href="#">👉 &nbsp; jane.design/doctorcare</a>
				</p>
				<p>
					<a href="#">#novoprojeto</a>&nbsp;
					<a href="#">#nlw</a>&nbsp;
					<a href="#">#rocketseat</a>&nbsp;
				</p>
			</div>

			<form action="" className={styles.commentForm}>
				<strong>Deixe seu comentário</strong>
				<textarea placeholder="Deixe seu comentário" />

				<footer>
					<button type="submit">Comentar</button>
				</footer>
			</form>

			<div className={styles.commentsList}>
				<Comment />
				<Comment />
				<Comment />
			</div>
		</article>
	);
}
