import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Avatar } from "../Avatar/Avatar";
import { Comment } from "../Comment/Comment";

import styles from "./Post.module.css";

export function Post({ author, content, publishedAt }) {
	const publishedDateFormatted = format(
		publishedAt,
		"d 'de' LLLL 'às' HH:mm'h'",
		{
			locale: ptBR,
		}
	);

	const relativeDateToNow = formatDistanceToNow(publishedAt, {
		locale: ptBR,
		addSuffix: true,
	});

	return (
		<article className={styles.post}>
			<header>
				<div className={styles.author}>
					<Avatar src={author.avatarUrl} />
					<div className={styles.authorInfo}>
						<strong>{author.name}</strong>
						<span>{author.role}</span>
					</div>
				</div>

				<time
					title={publishedDateFormatted}
					dateTime={publishedAt.toISOString()}
				>
					{relativeDateToNow}
				</time>
			</header>

			<div className={styles.content}>
				{content.map((item, index) => {
					switch (item.type) {
						case "paragraph":
							return <p key={index}>{item.text}</p>;
						case "link":
							return (
								<p key={index}>
									<a href="#">👉 &nbsp; {item.text}</a>
								</p>
							);
						case "hashtags":
							return <p key={index}>{item.text}</p>;
						default:
							return null;
					}
				})}
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
