import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/card";
import Scores from "./components/scores";

function App() {
	const [pokemon, setPokemon] = useState([]);
	const [selectedPokemon, setSelectedPokemon] = useState([]);
	const [currentScore, setCurrentScore] = useState(0);
	const [highScore, setHighScore] = useState(0);

	const names = ["Pikachu", "Bulbasaur", "Charmander", "Squirtle", "Meowth", "Psyduck", "Abra", "Eevee", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dragonite", "Mew", "Lapras", "Staryu"];

	useEffect(() => {
		const fetchData = async () => {
			try {
				const urls = names.map((n) => `https://pokeapi.co/api/v2/pokemon/${n}`);
				const responses = await Promise.all(urls.map((url) => fetch(url)));
				const data = await Promise.all(responses.map((res) => res.json()));

				const cards = data.map((pokemon) => ({
					name: pokemon.name,
					sprite: pokemon.sprites.front_default,
					id: pokemon.id,
				}));

				setPokemon(cards);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	const renderCards = () => {
		if (pokemon || pokemon.length !== 0) {
			return pokemon.map((card) => {
				return <Card id={card.id} name={card.name} sprite={card.sprite} handleClick={handleClick} />;
			});
		}
	};

	const shufflePokemon = () => {
		const shuffled = [...pokemon];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		setPokemon(shuffled);
	};

	const handleClick = (id) => {
		const isInSelection = selectedPokemon.find((pokemon) => pokemon.id === id);
		const checkHighscore = () => {
			if (currentScore > highScore) {
				setHighScore(currentScore);
			}
		};

		if (isInSelection) {
			checkHighscore();
			setCurrentScore(0);
			setSelectedPokemon([]);
		} else {
			const selection = pokemon.find((pokemon) => pokemon.id === id);
			const newArr = selectedPokemon;
			newArr.push(selection);
			setSelectedPokemon(newArr);
			setCurrentScore((currentScore) => currentScore + 1);
			shufflePokemon();
		}
	};

	return (
		<>
			<div id="app" className="p-12 text-center flex flex-col justify-center items-center text-white">
				<h1 className="text-3xl font-bold uppercase">Pokémon Memory Game</h1>
				<p>Get points by clicking on a Pokémon but don't click on any more than once!</p>
				<Scores currentScore={currentScore} highScore={highScore} />
				<div className="flex flex-wrap justify-center gap-6 mt-12">{renderCards()}</div>
			</div>
		</>
	);
}

export default App;
