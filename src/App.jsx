// 1. Name + Bild fetchen in useEffect ✅
// 2. Component für die einzelne Karten erstellen
// 3. Function zum neurendern der Karten mit zufälliger Position
// - useState mit nicht ausgewählten Karten
// - useState mit ausgewählten Karten
// - useState mit aktuellem Score
// - useState mit BestScore

import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/card";
import Scores from "./components/scores";

function App() {
	const [pokemon, setPokemon] = useState([]);
	const [selectedPokemon, setSelectedPokemon] = useState([]);
	const [currentScore, setCurrentScore] = useState(0);
	const [highScore, setHighScore] = useState(0);

	// const names = ["Pikachu", "Bulbasaur", "Charmander", "Squirtle", "Meowth", "Psyduck", "Abra", "Eevee", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dragonite", "Mewtwo", "Mew", "Lapras", "Staryu"];
	const names = ["Pikachu", "Bulbasaur", "Charmander"];

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
		}
	};

	return (
		<>
			<div id="app" className="p-12 text-center flex flex-col justify-center items-center text-white">
				<h1 className="text-3xl font-bold uppercase">Pokémon Memory Game</h1>
				<p>Get points by clicking on an image but don't click on any more than once!</p>
				<Scores currentScore={currentScore} highScore={highScore} />
				<div className="flex flex-wrap justify-center gap-6 mt-12">{renderCards()}</div>
				<button type="button" onClick={() => console.log(currentScore)}>
					Klick
				</button>
			</div>
		</>
	);
}

export default App;
