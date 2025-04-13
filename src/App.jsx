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

function App() {
	const [pokemon, setPokemon] = useState([]);
	const [selectedCards, setSelectedCards] = useState("");
	const [currentScore, setCurrentScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);

	const names = ["Pikachu", "Bulbasaur", "Charmander", "Squirtle", "Meowth", "Psyduck", "Abra", "Eevee", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dragonite", "Mewtwo", "Mew", "Lapras", "Staryu"];

	useEffect(() => {
		const fetchData = async () => {
			try {
				const urls = names.map((n) => `https://pokeapi.co/api/v2/pokemon/${n}`);
				const responses = await Promise.all(urls.map((url) => fetch(url)));
				const data = await Promise.all(responses.map((res) => res.json()));

				const cards = data.map((pokemon) => ({
					name: pokemon.name,
					sprite: pokemon.sprites.front_default,
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
				return <Card id={card.id} name={card.name} sprite={card.sprite} />;
			});
		}
	};

	return (
		<>
			<div id="app" className="p-12 text-center text-white">
				<h1 className="text-3xl font-bold uppercase">Pokémon Memory Game</h1>
				<p>Get points by clicking on an image but don't click on any more than once!</p>
				<div className="flex flex-wrap justify-center gap-6 mt-12">{renderCards()}</div>
			</div>
		</>
	);
}

export default App;
