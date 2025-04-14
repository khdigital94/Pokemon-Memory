export default function Scores({ currentScore, highScore }) {
	return (
		<div className="flex gap-20 mt-8">
			<p>Current Score: {currentScore}</p>
			<p>Highscore: {highScore}</p>
		</div>
	);
}
