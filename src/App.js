import React, { useState } from "react";
import axios from "axios";

function App() {
	const [query, setQuery] = useState("");
	const [result, setResult] = useState("");

	const dateBuilder = () => {
		const d = new Date();
		const months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];

		const days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];

		const day = days[d.getDay()];
		const date = d.getDate();
		const month = months[d.getMonth()];
		const year = d.getFullYear();

		return `${day}, ${date} ${month} ${year}`;
	};

	const fetchData = (event) => {
		if (event.key === "Enter") {
			axios
				.get(
					`${process.env.REACT_APP_BASE_URL}${query}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
				)
				.then((res) => {
					setResult(res.data);
					setQuery("");
					console.log(res.data);
				})
				.catch((err) => console.log(err));
		}
	};

	// result !== ""
	// 	? result.weather[0].main === "Rain"
	// 		? "App rain"
	// 		: "App"
	// 	: "App";

	return (
		<div
			className={
				result !== ""
					? result.weather[0].main === "Thunderstorm" ||
					  result.weather[0].main === "Rain" ||
					  result.weather[0].main === "Rain"
						? "App rain"
						: "App"
					: "App"
			}
		>
			<main>
				<div className="title">Weather App</div>
				<div className="search-box">
					<input
						className="search-bar"
						type="text"
						onChange={(e) => setQuery(e.target.value)}
						value={query}
						placeholder="Search your city...."
						onKeyPress={fetchData}
					/>
				</div>

				{result !== "" ? (
					<div>
						<div className="location-box">
							<div className="location">
								{result.name}, {result.sys.country}
							</div>
							<div className="date">{dateBuilder()}</div>
						</div>
						<div className="weather-box">
							<div className="temp">{Math.round(result.main.temp)}°C</div>
							<div className="weather">{result.weather[0].main}</div>
						</div>
					</div>
				) : (
					""
				)}
				<footer>© Donovan Bailey</footer>
			</main>
		</div>
	);
}

export default App;
